<?php

    require_once('../../config/database_quereies.php');





    class Product
    {
        private $quere;
        public function __construct()
        {
            $this->quere = new Quere();
        }
        public function Insert_Product($name, $reference, $measure_unit, $categoryID, $type, $department){
                $tableName = 'product';
                $columns = '(`name`, `reference`, `measure_unit`, `categoryID`, `type`, `department`)';
                $data = "('$name', '$reference', '$measure_unit', $categoryID, '$type', '$department')";
                $status = $this->quere->InsertInto($tableName, $columns, $data);
                return $status;
        }
        
        public function Update_Product_Data($ID, $name, $reference, $measure_unit, $categoryID, $type, $department){
                $tableName = 'product';
                $columnsANDdata = "`name`='$name', `reference`='$reference', `measure_unit`='$measure_unit', `categoryID`= $categoryID, `type`='$type', `department`='$department'";
                $condition = "WHERE `ID` = '$ID'";
                $status = $this->quere->Update($tableName, $columnsANDdata, $condition);
                return $status;
        }
        public function Delete_Products($ID){
                $tableName = 'product';
                $condition = "WHERE `ID` = '$ID'";
                $status = $this->quere->Delete($tableName, $condition);
                return $status;
        }

        public function Get_Products(){
            $tableProduct = 'product';
            $rows = $this->quere->SelectAll($tableProduct);
            return $rows;
        }
    }
?>