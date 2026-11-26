<?php 

    require_once('../../config/database_quereies.php');

    class User_Branch
        {
            private $quere;

            public function __construct(){
                $this->quere = new Quere();
            }

            public function Insert_User_Branch($userID, $branchID,  $name){
                    $tableName = 'user_branch';
                    $columns = '(`userID`, `branchID`, `name`)';
                    $data = "($userID, $branchID, '$name')";
                    $status = $this->quere->InsertInto($tableName, $columns, $data);
                    return $status;
            }

            public function Delete_User_Branch($userID, $branchID){
                $tableName = 'user_branch';
                $condition = "WHERE `userID` = $userID AND `branchID` = $branchID";
                $status = $this->quere->Delete($tableName, $condition);
                return $status;
            }

            public function Get_User_Branch_By_ID($userID){
                $tableName = 'user_branch';
                $columns = '*';
                $condition = "WHERE `userID` = '$userID'";
                $rows = $this->quere->SelectFromTableByCondition($tableName, $columns, $condition);
                return $rows; 
            }

            public function Get_User_Branches(){
                $tableName = 'user_branch';
                $rows = $this->quere->SelectAll($tableName);
                    return $rows;
            }
        }
?>