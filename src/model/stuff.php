<?php
    require_once('../../config/database_quereies.php');

    class Stuff
    {
        private $quere;
        public function __construct() { $this->quere = new Quere(); }

        public function Insert_Stuff($name){
            return $this->quere->InsertInto('stuffing', ['name' => $name]);
        }
        public function Update_Stuff_Data($name, $ID){
            return $this->quere->Update('stuffing', ['name' => $name], ['ID' => $ID]);
        }
        public function Delete_Stuff($ID){
            return $this->quere->Delete('stuffing', ['ID' => $ID]);
        }
        public function Get_Stuff(){
            return $this->quere->SelectAll('stuffing');
        }
    }
?>
