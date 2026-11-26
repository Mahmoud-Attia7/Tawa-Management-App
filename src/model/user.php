<?php
    require_once('../../config/database_quereies.php');




    class User
    {
        private $quere;
        public function __construct()
        {
            $this->quere = new Quere();
        }
        public function Login($email, $password){
                $tableName = 'user';
                $columns = ' `userID`, `employeeName`, `phoneNumber`, `role`, `departmentID`';
                $condition = "WHERE `email` = '$email' AND `userPassword` = '$password'";
                $rows = $this->quere->SelectFromTableByCondition($tableName, $columns, $condition);
                return $rows[0];                  
        }
        public function Select_User($email){
                $tableName = 'user';
                $columns = '`userID`, `userPassword`, `employeeName`, `phoneNumber`, `email`, `role`';
                $condition = "WHERE `email` = '$email'";
                $rows = $this->quere->SelectFromTableByCondition($tableName, $columns, $condition);
                return $rows[0]; 
        }
        public function Insert_User($employeeName, $password, $phone_number, $email, $role, $departmentID){
                $tableName = 'user';
                $columns = '(`employeeName`, `userPassword`, `phoneNumber`, `email`, `role`, `departmentID`)';
                $data = "('$employeeName', '$password', $phone_number, '$email', $role, $departmentID)";
                $status = $this->quere->InsertInto($tableName, $columns, $data);
                return $status;
        }
        
        public function Update_User_Data($userID, $employeeName, $password, $phone_number, $email, $role, $departmentID){
                echo $email;
                $tableName = 'user';
                $columnsANDdata = "`employeeName`='$employeeName', `userPassword`='$password', `phoneNumber`=$phone_number, `email`='$email',`role`=$role, `departmentID` = $departmentID";
                $condition = "WHERE `userID` = '$userID'";
                $status = $this->quere->Update($tableName, $columnsANDdata, $condition);
                return $status;
        }
        public function Delete_User($email){
                $tableName = 'user';
                $condition = "WHERE `email` = '$email'";
                $status = $this->quere->Delete($tableName, $condition);
                return $status;
        }

        public function Get_Users(){
                $tableUser = 'user';
                $rows = $this->quere->SelectAll($tableUser);
                return $rows;
            }
    }
?>