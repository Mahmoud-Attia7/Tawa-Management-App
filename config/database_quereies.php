<?php
    require_once('database_conection.php');

    // Small query helper. Every value goes through a prepared statement
    // (bound parameters), so user input can never change the SQL itself.
    // Table and column names only ever come from the code, never from input.
    class Quere {
        private $database;

        public function __construct() {
            $this->database = new DatabaseConection();
        }

        // Run any SQL with "?" placeholders and return the PDO statement.
        public function run($sql, $params = []) {
            $values = [];
            foreach ($params as $value) {
                $values[] = is_bool($value) ? (int) $value : $value;
            }
            $statement = $this->database->connectToDatabase()->prepare($sql);
            $statement->execute($values);
            return $statement;
        }

        // INSERT INTO `table` (`col`, ...) VALUES (?, ...)
        public function InsertInto($table, array $row) {
            try {
                $columns = '`' . implode('`, `', array_keys($row)) . '`';
                $placeholders = implode(', ', array_fill(0, count($row), '?'));
                $this->run("INSERT INTO `$table` ($columns) VALUES ($placeholders)", array_values($row));
                return 'inserted successfully!!';
            } catch (PDOException $error) {
                throw new Exception('insert failed: ' . $error->getMessage());
            }
        }

        // SELECT columns FROM `table` WHERE `col` = ? AND ... [suffix]
        public function SelectWhere($table, $columns, array $where = [], $suffix = '') {
            try {
                [$whereSql, $params] = $this->buildWhere($where);
                $statement = $this->run("SELECT $columns FROM `$table` $whereSql $suffix", $params);
                return $statement->fetchAll(PDO::FETCH_ASSOC);
            } catch (PDOException $error) {
                throw new Exception('select from table failed: ' . $error->getMessage());
            }
        }

        public function SelectAll($table) {
            return $this->SelectWhere($table, '*');
        }

        // UPDATE `table` SET `col` = ?, ... WHERE `col` = ? AND ...
        public function Update($table, array $set, array $where) {
            try {
                $setSql = implode(', ', array_map(fn($column) => "`$column` = ?", array_keys($set)));
                [$whereSql, $whereParams] = $this->buildWhere($where);
                $this->run("UPDATE `$table` SET $setSql $whereSql", array_merge(array_values($set), $whereParams));
                return 'data updated successfully!!';
            } catch (PDOException $error) {
                throw new Exception('update data failed: ' . $error->getMessage());
            }
        }

        // DELETE FROM `table` WHERE `col` = ? AND ...
        public function Delete($table, array $where) {
            try {
                if (!$where) {
                    throw new Exception('refusing to delete without a condition');
                }
                [$whereSql, $params] = $this->buildWhere($where);
                $this->run("DELETE FROM `$table` $whereSql", $params);
                return 'deleted successfully!!';
            } catch (PDOException $error) {
                throw new Exception('delete failed: ' . $error->getMessage());
            }
        }

        private function buildWhere(array $where) {
            if (!$where) {
                return ['', []];
            }
            $parts = array_map(fn($column) => "`$column` = ?", array_keys($where));
            return ['WHERE ' . implode(' AND ', $parts), array_values($where)];
        }
    }
?>
