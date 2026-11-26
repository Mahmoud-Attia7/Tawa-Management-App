<?php
    require_once('../../config/database_quereies.php');

    class User_Area
    {
        private $quere;
        public function __construct() { $this->quere = new Quere(); }

        public function Insert_User_Area($userID, $areaID, $name){
            return $this->quere->InsertInto('user_area', ['userID' => $userID, 'areaID' => $areaID, 'name' => $name]);
        }
        public function Delete_User_Area($userID, $areaID){
            return $this->quere->Delete('user_area', ['userID' => $userID, 'areaID' => $areaID]);
        }
        public function Get_User_Area_By_ID($userID){
            return $this->quere->SelectWhere('user_area', '*', ['userID' => $userID]);
        }
        public function Get_User_Area(){
            return $this->quere->SelectAll('user_area');
        }
    }
?>
