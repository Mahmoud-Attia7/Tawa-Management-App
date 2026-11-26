<?php
    require_once('../../config/database_quereies.php');

    class Category
    {
        private $quere;
        public function __construct() { $this->quere = new Quere(); }

        public function Insert_Category($name){
            return $this->quere->InsertInto('category', ['name' => $name]);
        }
        public function Update_Category_Data($name, $ID){
            return $this->quere->Update('category', ['name' => $name], ['ID' => $ID]);
        }
        public function Delete_Category($ID){
            return $this->quere->Delete('category', ['ID' => $ID]);
        }
        public function Get_Category(){
            return $this->quere->SelectAll('category');
        }
    }
?>
