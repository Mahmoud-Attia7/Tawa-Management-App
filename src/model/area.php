<?php
    require_once('../../config/database_quereies.php');



    class Area
    {
        private $quere;
        public function __construct()
        {
            $this->quere = new Quere();
        }
        public function Insert_Area($name){
                $tableName = 'area';
                $columns = '(`name`)';
                $data = "('$name')";
                $status = $this->quere->InsertInto($tableName, $columns, $data);
                return $status;
        }
        
        public function Update_Area_Data($name, $areaID){
                $tableName = 'area';
                $columnsANDdata = "`name`='$name'";
                $condition = "WHERE `areaID` = '$areaID'";
                $status = $this->quere->Update($tableName, $columnsANDdata, $condition);
                return $status;
        }
        public function Delete_Area($areaID){
                $tableName = 'area';
                $condition = "WHERE `areaID` = '$areaID'";
                $status = $this->quere->Delete($tableName, $condition);
                return $status;
        }

        public function Get_Areas(){
                $tableUser = 'area';
                $rows = $this->quere->SelectAll($tableUser);
                return $rows;
        }
    }
?>