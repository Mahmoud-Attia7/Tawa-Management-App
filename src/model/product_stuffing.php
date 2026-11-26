<?php 

    require_once('../../config/database_quereies.php');


    class Product_Stuffing
        {
            private $quere;

            public function __construct(){
                $this->quere = new Quere();
            }

            public function Insert_Product_Stuffing($productID, $stuffID,  $name){
                    $tableName = 'product_stuffing';
                    $columns = '(`productID`, `stuffID`, `name`)';
                    $data = "($productID, $stuffID, '$name')";
                    $status = $this->quere->InsertInto($tableName, $columns, $data);
                    return $status;
            }

            public function Delete_Product_Stuffing($productID, $stuffID){
                $tableName = 'product_stuffing';
                $condition = "WHERE `productID` = $productID AND `stuffID` = $stuffID";
                $status = $this->quere->Delete($tableName, $condition);
                return $status;
            }

            public function Get_Product_Stuffing_By_ID($productID){
                $tableName = 'product_stuffing';
                $columns = '*';
                $condition = "WHERE `productID` = '$productID'";
                $rows = $this->quere->SelectFromTableByCondition($tableName, $columns, $condition);
                return $rows; 
            }

            public function Get_Product_Stuffing(){
                $tableName = 'product_stuffing';
                $rows = $this->quere->SelectAll($tableName);
                    return $rows;
            }
        }
?>