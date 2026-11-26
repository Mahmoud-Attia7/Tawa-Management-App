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
            $this->inputJRXML = __DIR__ . '/vendor/geekcom/phpjasper/jasper reports/OrderDetails.jrxml';
            $this->inputJasper = __DIR__ . '/vendor/geekcom/phpjasper/jasper reports/OrderDetails.jasper';  
            $this->output = __DIR__ . '/vendor/geekcom/phpjasper/jasper reports';    
        }

        public function Compile_Report(){
            $this->jasper->compile($this->inputJRXML)->execute();
        }

        public function Execute_Report($userID, $masterID, $Reference, $department){
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
                    'password' => $db['password'],
                    'host' => $db['host'],
                    'port' => $db['port'],
                    'database' => $db['database'],
                ]
            ];
            $this->jasper->process($this->inputJasper, $outputWithFileName, $options)->execute();
            return true;
        }    
    }
?>
