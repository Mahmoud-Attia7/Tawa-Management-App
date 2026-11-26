<?php
    require_once('../../config/database_quereies.php');




    class Stuff
    {
        private $quere;
        public function __construct()
        {
            $this->quere = new Quere();
        }
        public function Insert_Stuff($name){
                $tableName = 'stuffing';
                $columns = '(`name`)';
                $data = "('$name')";
                $status = $this->quere->InsertInto($tableName, $columns, $data);
                return $status;
        }
        
        public function Update_Stuff_Data($name, $ID){
                $tableName = 'stuffing';
                $columnsANDdata = "`name`='$name'";
                $condition = "WHERE `ID` = '$ID'";
                $status = $this->quere->Update($tableName, $columnsANDdata, $condition);
                return $status;
        }
        public function Delete_Stuff($ID){
                $tableName = 'stuffing';
                $condition = "WHERE `ID` = '$ID'";
                $status = $this->quere->Delete($tableName, $condition);
                return $status;
        }

        public function Get_Stuff(){
                $tableUser = 'stuffing';
                $rows = $this->quere->SelectAll($tableUser);
                return $rows;
        }
    }    
?>