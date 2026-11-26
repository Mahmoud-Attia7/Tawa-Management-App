<?php
    require_once('../../config/database_quereies.php');

    class User_Branch
    {
        private $quere;
        public function __construct() { $this->quere = new Quere(); }

        public function Insert_User_Branch($userID, $branchID, $name){
            return $this->quere->InsertInto('user_branch', ['userID' => $userID, 'branchID' => $branchID, 'name' => $name]);
        }
        public function Delete_User_Branch($userID, $branchID){
            return $this->quere->Delete('user_branch', ['userID' => $userID, 'branchID' => $branchID]);
        }
        public function Get_User_Branch_By_ID($userID){
            return $this->quere->SelectWhere('user_branch', '*', ['userID' => $userID]);
        }
        public function Get_User_Branches(){
            return $this->quere->SelectAll('user_branch');
        }
    }
?>
