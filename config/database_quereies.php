<?php
    require_once('database_conection.php');

	class Quere {
	    private $database;
	    private $connection;
	
	    public function __construct() {
	        $this->database = new DatabaseConection();
	    }
	
	    public function InsertInto($table, $columns, $data) {
	        try {
	            $this->connection = $this->database->connectToDatabase();
	            $statement = "INSERT INTO `$table` $columns VALUES $data";
	            $this->connection->query($statement);
	            $this->database->closeDatabase();
	            return 'inserted successfully!!';
	        } catch (PDOException $error) {
	            throw new Exception('save client failed: ' . $error->getMessage());
	        }
	    }
	
	    public function SelectFromTableByCondition($table, $columns, $condition) {
	        try {
	            $this->connection = $this->database->connectToDatabase();
	            $statement = "SELECT $columns FROM $table $condition";
	            $excQuery = $this->connection->query($statement);
	            $rows = $excQuery->fetchAll(PDO::FETCH_ASSOC);
	            $this->database->closeDatabase();
	            return $rows;
	        } catch (PDOException $error) {
	            throw new Exception('select from table failed: ' . $error->getMessage());
	        }
	    }
	
	    public function SelectAll($table) {
	        try {
	            $this->connection = $this->database->connectToDatabase();
	            $statement = "SELECT * FROM $table";
	            $excQuery = $this->connection->query($statement);
	            $rows = $excQuery->fetchAll(PDO::FETCH_ASSOC);
	            $this->database->closeDatabase();
	            return $rows;
	        } catch (PDOException $error) {
	            throw new Exception('select all failed: ' . $error->getMessage());
	        }
	    }
	
	    public function Update($table, $columnsANDdata, $condition) {
	        try {
	            $this->connection = $this->database->connectToDatabase();
	            $statement = "UPDATE $table SET $columnsANDdata $condition";
	            $this->connection->query($statement);
	            $this->database->closeDatabase();
	            return 'data updated successfully!!';
	        } catch (PDOException $error) {
	            throw new Exception('update data failed: ' . $error->getMessage());
	        }
	    }
	
	    public function Delete($table, $condition) {
	        try {
	            $this->connection = $this->database->connectToDatabase();
	            $statement = "DELETE FROM $table $condition";
	            $this->connection->query($statement);
	            $this->database->closeDatabase();
	            return "User Deleted!!";
	        } catch (PDOException $error) {
	            throw new Exception('delete user failed: ' . $error->getMessage());
	        }
	    }
	}
?>