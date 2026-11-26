<?php
    require_once('../../config/database_quereies.php');

    class User
    {
        private $quere;
        // Columns that are safe to send to the browser (never the password).
        private const PUBLIC_COLUMNS = '`userID`, `employeeName`, `phoneNumber`, `email`, `role`, `departmentID`';

        public function __construct() { $this->quere = new Quere(); }

        // Returns the user's public data, or null if the email/password is wrong.
        // Old plain-text passwords still work once and are upgraded to a hash on login.
        public function Login($email, $password){
            $rows = $this->quere->SelectWhere('user', '`userID`, `userPassword`', ['email' => $email]);
            if (!$rows || !is_string($password) || $password === '') {
                return null;
            }
            $stored = (string) $rows[0]['userPassword'];
            $isHash = password_get_info($stored)['algo'] !== null && password_get_info($stored)['algo'] !== 0;

            if ($isHash) {
                if (!password_verify($password, $stored)) {
                    return null;
                }
            } else {
                if (!hash_equals($stored, $password)) {
                    return null;
                }
                $this->quere->Update('user', ['userPassword' => password_hash($password, PASSWORD_DEFAULT)], ['userID' => $rows[0]['userID']]);
            }
            $user = $this->quere->SelectWhere('user', self::PUBLIC_COLUMNS, ['userID' => $rows[0]['userID']]);
            return $user[0];
        }

        public function Select_User($email){
            $rows = $this->quere->SelectWhere('user', self::PUBLIC_COLUMNS, ['email' => $email]);
            return $rows ? $rows[0] : null;
        }

        public function Insert_User($employeeName, $password, $phone_number, $email, $role, $departmentID){
            return $this->quere->InsertInto('user', [
                'employeeName' => $employeeName,
                'userPassword' => password_hash((string) $password, PASSWORD_DEFAULT),
                'phoneNumber'  => $phone_number,
                'email'        => $email,
                'role'         => $role,
                'departmentID' => $departmentID,
            ]);
        }

        // An empty password keeps the current one.
        public function Update_User_Data($userID, $employeeName, $password, $phone_number, $email, $role, $departmentID){
            $set = [
                'employeeName' => $employeeName,
                'phoneNumber'  => $phone_number,
                'email'        => $email,
                'role'         => $role,
                'departmentID' => $departmentID,
            ];
            if (is_string($password) && $password !== '') {
                $set['userPassword'] = password_hash($password, PASSWORD_DEFAULT);
            }
            return $this->quere->Update('user', $set, ['userID' => $userID]);
        }

        public function Delete_User($email){
            return $this->quere->Delete('user', ['email' => $email]);
        }

        public function Get_Users(){
            return $this->quere->SelectWhere('user', self::PUBLIC_COLUMNS);
        }
    }
?>
