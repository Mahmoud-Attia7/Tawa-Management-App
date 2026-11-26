<?php
    require_once('../../config/database_quereies.php');

    class Product
    {
        private $quere;
        public function __construct() { $this->quere = new Quere(); }

        public function Insert_Product($name, $reference, $measure_unit, $categoryID, $type, $department){
            return $this->quere->InsertInto('product', [
                'name' => $name, 'reference' => $reference, 'measure_unit' => $measure_unit,
                'categoryID' => $categoryID, 'type' => $type, 'department' => $department,
            ]);
        }
        public function Update_Product_Data($ID, $name, $reference, $measure_unit, $categoryID, $type, $department){
            return $this->quere->Update('product', [
                'name' => $name, 'reference' => $reference, 'measure_unit' => $measure_unit,
                'categoryID' => $categoryID, 'type' => $type, 'department' => $department,
            ], ['ID' => $ID]);
        }
        public function Delete_Products($ID){
            return $this->quere->Delete('product', ['ID' => $ID]);
        }
        public function Get_Products(){
            return $this->quere->SelectAll('product');
        }
    }
?>
