<?php
    require __DIR__ . '/vendor/autoload.php';

    use PHPJasper\PHPJasper;

    

    class Order_Details_Report{
        private $inputJRXML;
        private $inputJasper;
        private $output;
        private $jasper;

        public function __construct() {
            $this->jasper = new PHPJasper;
            // The report design lives in the repo; jasperstarter compiles the .jrxml when it runs.
            $this->inputJRXML = __DIR__ . '/reports/OrderDetails.jrxml';
            $this->inputJasper = $this->inputJRXML;
            $this->output = __DIR__ . '/vendor/geekcom/phpjasper/jasper reports';    
        }

        public function Compile_Report(){
            $this->jasper->compile($this->inputJRXML)->execute();
        }

        public function Execute_Report($userID, $masterID, $Reference, $department){
            // Users who don't belong to one production department see every department.
            if ($department === null || $department === '') {
                $department = 'all';
            }
            $db = require __DIR__ . '/../../config/db_settings.php';
            $outputWithFileName = $this->output . '/OrderDetailsReport' . $userID;
            $options = [ 
                'format' => ['html'],
                'params' => [
                    'orderReference' => $Reference,
                    'masterID' => $masterID,
                    'department' =>  $department
                ],
                'db_connection' => [
                    'driver' => 'mysql',
                    'username' => $db['username'],
                    'host' => $db['host'],
                    'port' => $db['port'],
                    'database' => $db['database'],
                ]
            ];
            // jasperstarter rejects an empty "-p", so only pass a password when there is one.
            if ($db['password'] !== '') {
                $options['db_connection']['password'] = $db['password'];
            }
            $this->jasper->process($this->inputJasper, $outputWithFileName, $options)->execute();
            return true;
        }    
    }
?>
