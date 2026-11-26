<?php
    require_once('../../config/database_quereies.php');

    class Area
    {
        private $quere;
        public function __construct() { $this->quere = new Quere(); }

        public function Insert_Area($name){
            return $this->quere->InsertInto('area', ['name' => $name]);
        }
        public function Update_Area_Data($name, $areaID){
            return $this->quere->Update('area', ['name' => $name], ['areaID' => $areaID]);
        }
        public function Delete_Area($areaID){
            return $this->quere->Delete('area', ['areaID' => $areaID]);
        }
        public function Get_Areas(){
            return $this->quere->SelectAll('area');
        }
    }
?>
