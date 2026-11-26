<?php 

    require_once('../../config/database_quereies.php');


    class User_Area
        {
            private $quere;

            public function __construct(){
                $this->quere = new Quere();
            }

            public function Insert_User_Area($userID, $areaID,  $name){
                    $tableName = 'user_area';
                    $columns = '(`userID`, `areaID`, `name`)';
                    $data = "($userID, $areaID, '$name')";
                    $status = $this->quere->InsertInto($tableName, $columns, $data);
                    return $status;
            }

            public function Delete_User_Area($userID, $areaID){
                $tableName = 'user_area';
                $condition = "WHERE `userID` = $userID AND `areaID` = $areaID";
                $status = $this->quere->Delete($tableName, $condition);
                return $status;
            }

            public function Get_User_Area_By_ID($userID){
                $tableName = 'user_area';
                $columns = '*';
                $condition = "WHERE `userID` = '$userID'";
                $rows = $this->quere->SelectFromTableByCondition($tableName, $columns, $condition);
                return $rows; 
            }

            public function Get_User_Area(){
                $tableName = 'user_area';
                $rows = $this->quere->SelectAll($tableName);
                    return $rows;
            }
        }
?>