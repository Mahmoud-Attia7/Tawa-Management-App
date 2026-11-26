<?php
    // Stateless login tokens: "<base64 payload>.<HMAC signature>".
    // The secret is derived from the database credentials, which only the server knows.
    const TOKEN_LIFETIME = 12 * 60 * 60; // 12 hours

    function token_secret() {
        $db = require __DIR__ . '/db_settings.php';
        return hash('sha256', 'tawa-token|' . $db['username'] . '|' . $db['password'] . '|' . $db['database'] . '|' . __DIR__);
    }

    function b64url($data) {
        return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
    }

    function issue_token($userID) {
        $payload = b64url(json_encode(['uid' => (int) $userID, 'exp' => time() + TOKEN_LIFETIME]));
        return $payload . '.' . b64url(hash_hmac('sha256', $payload, token_secret(), true));
    }

    // Returns the user ID inside a valid, unexpired token, or null.
    function verify_token($token) {
        if (!is_string($token) || substr_count($token, '.') !== 1) {
            return null;
        }
        [$payload, $signature] = explode('.', $token);
        $expected = b64url(hash_hmac('sha256', $payload, token_secret(), true));
        if (!hash_equals($expected, $signature)) {
            return null;
        }
        $data = json_decode(base64_decode(strtr($payload, '-_', '+/')), true);
        if (!is_array($data) || ($data['exp'] ?? 0) < time()) {
            return null;
        }
        return (int) $data['uid'];
    }

    // Which permission (role name in user_role) each write action needs.
    // Reads only need a valid login. Any one of the listed roles is enough.
    const ORDER_WRITERS = ['write order', 'branch'];
    const ORDER_WORKFLOW = ['write order', 'branch', 'relayer', 'cake', 'hala arabi', 'hala coffe', 'fatayer', 'red & chocolate'];

    function required_roles($script, $flag) {
        if ($script === 'order.php') {
            // Item changes and uploads; 'get' and 'download' are reads.
            return in_array($flag, ['get', 'download'], true) ? [] : ORDER_WORKFLOW;
        }
        $map = [
            'insert' => ['write user'], 'delete' => ['write user'], 'update' => ['write user'],
            'updateUserRoles' => ['write user'], 'update user branch' => ['write user'], 'update user area' => ['write user'],
            'insert order' => ORDER_WRITERS,
            'update order' => ORDER_WORKFLOW, 'Submited' => ORDER_WORKFLOW, 'Canceled' => ORDER_WORKFLOW,
            'insert product' => ['write product'], 'update product' => ['write product'],
            'delete product' => ['write product'], 'update Product Stufing' => ['write product'],
            'insert category' => ['write category'], 'update category' => ['write category'], 'delete category' => ['write category'],
            'insert stuff' => ['write stuff'], 'update stuff' => ['write stuff'], 'delete stuff' => ['write stuff'],
            'insert branch' => ['write branchs'], 'update branch' => ['write branchs'], 'delete branch' => ['write branchs'],
            'insert area' => ['write area'], 'update area' => ['write area'], 'delete area' => ['write area'],
        ];
        return $map[$flag] ?? [];
    }

    function user_has_any_role($userID, array $roles) {
        require_once __DIR__ . '/database_quereies.php';
        $placeholders = implode(', ', array_fill(0, count($roles), '?'));
        $rows = (new Quere())->run(
            "SELECT COUNT(*) AS n FROM `user_role` WHERE `userID` = ? AND `isAvailable` = 1 AND `roleName` IN ($placeholders)",
            array_merge([$userID], $roles)
        )->fetchAll(PDO::FETCH_ASSOC);
        return ((int) $rows[0]['n']) > 0;
    }

    // Stops the request unless it carries a valid token (401) and the user
    // has the permission the requested action needs (403).
    // Sign-in requests and CORS preflight checks are let through.
    function require_login() {
        static $checked = false;
        if ($checked) {
            return;
        }
        $checked = true;

        if (($_SERVER['REQUEST_METHOD'] ?? '') === 'OPTIONS') {
            http_response_code(204);
            exit;
        }
        $body = json_decode(file_get_contents('php://input'), true);
        $flag = is_array($body) ? ($body['flag'] ?? null) : null;
        if ($flag === 'sign in') {
            return;
        }
        $token = $_SERVER['HTTP_X_AUTH_TOKEN'] ?? ($_POST['token'] ?? null);
        $userID = verify_token($token);
        if ($userID === null) {
            http_response_code(401);
            echo json_encode(['error' => 'Not logged in']);
            exit;
        }
        if (($_SERVER['REQUEST_METHOD'] ?? '') === 'POST') {
            $script = basename($_SERVER['SCRIPT_FILENAME'] ?? '');
            $roles = required_roles($script, $flag);
            if ($roles && !user_has_any_role($userID, $roles)) {
                http_response_code(403);
                echo json_encode(['error' => 'You do not have permission for this action']);
                exit;
            }
        }
    }
?>
