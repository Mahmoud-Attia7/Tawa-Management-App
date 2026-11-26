<?php 
    require_once('../../config/database_quereies.php');


    class User_Role
        {
            private $quere;

            public function __construct(){
                $this->quere = new Quere();
            }

            public function Insert_User_Role($userID, $roleID, $isAvailable, $roleName){
                    $tableName = 'user_role';
                    $columns = '(`userID`, `roleID`, `isAvailable`, `roleName`)';
                    $data = "($userID, $roleID, $isAvailable, '$roleName')";
                    $status = $this->quere->InsertInto($tableName, $columns, $data);
                    return $status;
            }
            
            public function Update_User_Role($userID, $roleID, $isAvailable){
                $tableName = 'user_role';
                $columnsANDdata = " `isAvailable` = $isAvailable";
                $condition = "WHERE `userID` = $userID AND `roleID` = $roleID";
                $status = $this->quere->Update($tableName, $columnsANDdata, $condition);
                return $status;
            }

            public function Delete_User_Roles($userID){
                $tableName = 'user_role';
                $condition = "WHERE `userID` = $userID";
                $status = $this->quere->Delete($tableName, $condition);
                return $status;
            }
            public function Get_User_Roles_By_ID($userID){
                $tableName = 'user_role';
                $columns = '*';
                $condition = "WHERE `userID` = '$userID'";
                $rows = $this->quere->SelectFromTableByCondition($tableName, $columns, $condition);
                return $rows; 
            }

            public function Get_User_Role(){
                $tableName = 'user_role';
                $rows = $this->quere->SelectAll($tableName);
                    return $rows;
            }


        }
?>