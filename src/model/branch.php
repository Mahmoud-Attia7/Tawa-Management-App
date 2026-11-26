<?php
    require_once('../../config/database_quereies.php');



    class Branch
    {
        private $quere;
        public function __construct()
        {
            $this->quere = new Quere();
        }
        public function Insert_Branch($areaID, $name, $areaName){
                $tableName = 'branch';
                $columns = '(`areaID`, `name`, `areaName`)';
                $data = "('$areaID', '$name', '$areaName')";
                $status = $this->quere->InsertInto($tableName, $columns, $data);
                return $status;
        }
        public function Update_Branch_Data($name, $branchID, $areaID, $areaName){
                $tableName = 'branch';
                $columnsANDdata = "`name`='$name', `areaID`='$areaID', `areaName`='$areaName'";
                $condition = "WHERE `branchID` = '$branchID'";
                $status = $this->quere->Update($tableName, $columnsANDdata, $condition);
                return $status;
        }
        public function Delete_Branch($branchID){
                $tableName = 'branch';
                $condition = "WHERE `branchID` = $branchID";
                $status = $this->quere->Delete($tableName, $condition);
                return $status;
        }
        public function Get_Branchs(){
                $tableUser = 'branch';
                $rows = $this->quere->SelectAll($tableUser);
                return $rows;
        }
    }
?>