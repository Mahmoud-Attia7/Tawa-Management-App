<?php
    require_once('../../config/database_quereies.php');

    class Role
    {
        private $quere;
        public function __construct() { $this->quere = new Quere(); }

        public function Get_Roles(){
            return $this->quere->SelectAll('role');
        }
    }
?>
