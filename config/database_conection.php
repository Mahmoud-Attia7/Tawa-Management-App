<?php
    class DatabaseConection {
        private $dns = "mysql:host=localhost;port=3306;dbname=tawa_management_application;charset=utf8mb4";
        private $database_username = "root";
        private $database_password = "";
        private $connection = null;

        public function __construct()
        {
            $this->open();
        }

        private function open() {
            $this->connection = new PDO($this->dns, $this->database_username, $this->database_password);
            $this->connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        }

        public function connectToDatabase() {
            try {
                // Reopen the connection if a previous query closed it
                if ($this->connection === null) {
                    $this->open();
                }
                return $this->connection;
            } catch (PDOException $error) {
                throw new Exception('Connection failed: ' . $error->getMessage());
            }
        }
        
        public function closeDatabase(){
            $this->connection = null;
        }
    }
?>
