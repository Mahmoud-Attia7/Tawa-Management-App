<?php
    require_once('../../config/database_quereies.php');

    class User_Role
    {
        private $quere;
        public function __construct() { $this->quere = new Quere(); }

        public function Insert_User_Role($userID, $roleID, $isAvailable, $roleName){
            return $this->quere->InsertInto('user_role', ['userID' => $userID, 'roleID' => $roleID, 'isAvailable' => $isAvailable, 'roleName' => $roleName]);
        }
        public function Update_User_Role($userID, $roleID, $isAvailable){
            return $this->quere->Update('user_role', ['isAvailable' => $isAvailable], ['userID' => $userID, 'roleID' => $roleID]);
        }
        public function Delete_User_Roles($userID){
            return $this->quere->Delete('user_role', ['userID' => $userID]);
        }
        public function Get_User_Roles_By_ID($userID){
            return $this->quere->SelectWhere('user_role', '*', ['userID' => $userID]);
        }
        public function Get_User_Role(){
            return $this->quere->SelectAll('user_role');
        }
    }
?>
