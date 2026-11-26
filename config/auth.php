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

    // Stops the request with 401 unless it carries a valid token.
    // Sign-in requests and CORS preflight checks are let through.
    function require_login() {
        if (($_SERVER['REQUEST_METHOD'] ?? '') === 'OPTIONS') {
            http_response_code(204);
            exit;
        }
        $body = json_decode(file_get_contents('php://input'), true);
        if (is_array($body) && ($body['flag'] ?? null) === 'sign in') {
            return;
        }
        $token = $_SERVER['HTTP_X_AUTH_TOKEN'] ?? ($_POST['token'] ?? null);
        if (verify_token($token) === null) {
            http_response_code(401);
            echo json_encode(['error' => 'Not logged in']);
            exit;
        }
    }
?>
