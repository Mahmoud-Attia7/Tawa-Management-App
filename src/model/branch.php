<?php
    require_once('../../config/database_quereies.php');

    class Branch
    {
        private $quere;
        public function __construct() { $this->quere = new Quere(); }

        public function Insert_Branch($areaID, $name, $areaName){
            return $this->quere->InsertInto('branch', ['areaID' => $areaID, 'name' => $name, 'areaName' => $areaName]);
        }
        public function Update_Branch_Data($name, $branchID, $areaID, $areaName){
            return $this->quere->Update('branch', ['name' => $name, 'areaID' => $areaID, 'areaName' => $areaName], ['branchID' => $branchID]);
        }
        public function Delete_Branch($branchID){
            return $this->quere->Delete('branch', ['branchID' => $branchID]);
        }
        public function Get_Branchs(){
            return $this->quere->SelectAll('branch');
        }
    }
?>
