<?php
    require_once('../../config/database_quereies.php');

    class Product_Stuffing
    {
        private $quere;
        public function __construct() { $this->quere = new Quere(); }

        public function Insert_Product_Stuffing($productID, $stuffID, $name){
            return $this->quere->InsertInto('product_stuffing', ['productID' => $productID, 'stuffID' => $stuffID, 'name' => $name]);
        }
        public function Delete_Product_Stuffing($productID, $stuffID){
            return $this->quere->Delete('product_stuffing', ['productID' => $productID, 'stuffID' => $stuffID]);
        }
        public function Get_Product_Stuffing_By_ID($productID){
            return $this->quere->SelectWhere('product_stuffing', '*', ['productID' => $productID]);
        }
        public function Get_Product_Stuffing(){
            return $this->quere->SelectAll('product_stuffing');
        }
    }
?>
