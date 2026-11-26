<?php
    class DatabaseConection {
        // One shared connection per request. Every model creates its own
        // DatabaseConection, so without this a single request opened ~13
        // MySQL connections and hit the hosting's connection limit.
        private static $shared = null;

        private function open() {
            $db = require __DIR__ . '/db_settings.php';
            $dns = "mysql:host={$db['host']};port={$db['port']};dbname={$db['database']};charset=utf8mb4";
            self::$shared = new PDO($dns, $db['username'], $db['password']);
            self::$shared->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        }

        public function connectToDatabase() {
            try {
                if (self::$shared === null) {
                    $this->open();
                }
                return self::$shared;
            } catch (PDOException $error) {
                throw new Exception('Connection failed: ' . $error->getMessage());
            }
        }
        
        public function closeDatabase(){
            // Kept for compatibility; the shared connection closes when the request ends.
        }
    }
?>
