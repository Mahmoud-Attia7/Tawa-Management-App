<?php
    require_once('../../config/database_quereies.php');



    class Category
    {
        private $quere;
        public function __construct()
        {
            $this->quere = new Quere();
        }
        public function Insert_Category($name){
                $tableName = 'category';
                $columns = '(`name`)';
                $data = "('$name')";
                $status = $this->quere->InsertInto($tableName, $columns, $data);
                return $status;
        }
        
        public function Update_Category_Data($name, $ID){
                $tableName = 'category';
                $columnsANDdata = "`name`='$name'";
                $condition = "WHERE `ID` = '$ID'";
                $status = $this->quere->Update($tableName, $columnsANDdata, $condition);
                return $status;
        }
        public function Delete_Category($ID){
                $tableName = 'category';
                $condition = "WHERE `ID` = '$ID'";
                $status = $this->quere->Delete($tableName, $condition);
                return $status;
        }

        public function Get_Category(){
                $tableUser = 'category';
                $rows = $this->quere->SelectAll($tableUser);
                return $rows;
        }
    }    
?>