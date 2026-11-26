<?php
    require_once('../../config/database_quereies.php');
    // Allow requests from all origins
    header('Access-Control-Allow-Origin: *');

    // Allow the following methods from any origin
    header('Access-Control-Allow-Methods: GET, POST');

    // Allow the following headers from any origin
    header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token, Authorization');

    // Allow cookies to be sent from the front-end to the back-end
    header('Access-Control-Allow-Credentials: true');

    // Set the content type for JSON
    header('Content-Type: application/json');
    

    class Order
    {
        private $quere;
        public function __construct()
        {
            $this->quere = new Quere();
        }
        public function Insert_Order($Reference, $UserID, $date, $branchID, $branchName, $clientName, $clientNumber, $isWidding, $guestNumber, $submition_date, $employeeName){
            $tableOrder = 'order_master';
            $columns = '(`Reference`, `UserID`, `date`, `branchID`, `branchName`,  `client_name`, `client_number`, `is_widding`, `guest_number`, `status`, `submition_date`, `employeeName`)';
            $data = "('$Reference', $UserID,'$date', $branchID, '$branchName', '$clientName', $clientNumber, $isWidding, '$guestNumber','جديد', '$submition_date', '$employeeName')";
            $status = $this->quere->InsertInto($tableOrder, $columns, $data);
            return $status; 
        }
        
        public function Update_Order($ID, $Reference, $UserID, $date, $branchID, $branchName, $clientName, $clientNumber, $isWidding, $guestNumber, $status, $submition_date, $employeeName){
            $tableOrder = 'order_master';
            $columnsANDdata = "`Reference` = '$Reference', `status` = '$status'";
            $condition = "WHERE ID = $ID";
            $status = $this->quere->Update($tableOrder, $columnsANDdata, $condition);
            return $status;
        }

        public function Get_Barnch_Orders($branchID)
        {
            $tableOrder = 'order_master';
            $columns = '*';
            $condition = "WHERE `branchID` = '$branchID'";
            $rows = $this->quere->SelectFromTableByCondition($tableOrder, $columns, $condition);
            return $rows; 
        }

        public function Get_Orders_Data()
        {
            $tableOrder = 'order_master';
            $rows = $this->quere->SelectAll($tableOrder);
            return $rows; 
        }

        public function Get_Last_Order(){
            $tableOrder = 'order_master';
            $columns = '*';
            $condition = 'ORDER BY ID DESC LIMIT 1';
            $rows = $this->quere->SelectFromTableByCondition($tableOrder, $columns, $condition);
            return $rows; 
        }
        
        public function Insert_Item($MasterID, $Quantity, $productID){
            $tableItems = 'order1';
            $columns = '(`Quantity`, `MasterID`, `productID`)';
            $data = "($Quantity, $MasterID, $productID)";
            $status = $this->quere->InsertInto($tableItems, $columns, $data);
            echo $status;
        }

        public function Update_Item($pID, $Quantity){
            $tableItems = 'order1';
            $columnsANDdataTableItems = "`Quantity` = '$Quantity'";
            $condition = "WHERE ID = $pID";
            $status = $this->quere->Update($tableItems, $columnsANDdataTableItems, $condition);
            return $status;
        }

        public function Delete_Item($ID){
            $tableItems = 'order1';
            $condition = "WHERE `ID` = $ID";
            $status = $this->quere->Delete($tableItems, $condition);
            return $status;
        }

        public function Download($ID){
            $tableItems = 'order1';
            $columns = 'file_name';
            $condition = "WHERE `ID` = $ID";
            $status = $this->quere->SelectFromTableByCondition($tableItems, $columns, $condition);
            return $status;
        }

        public function Get_Items_By_Master($MasterID){
            $tableItems = 'order1';
            $columns = 'order1.ID, order1.Quantity, order1.ProductID';
            $condition = "WHERE `MasterID` = '$MasterID'";
            $rows = $this->quere->SelectFromTableByCondition($tableItems, $columns, $condition);
            return $rows; 
        }

        public function Get_Stuffing(){
            $tableProduct = 'stuffing';
            $rows = $this->quere->SelectAll($tableProduct);
            return $rows;
        }
        
        public function Get_Stuffs_By_Item($MasterID, $ItemID){
            $tableStuffs = 'order2';
            $columns = 'order2.stuff_one, order2.stuff_two, order2.stuff_three, order2.stuff_four, order2.stuff_five';
            $condition = "WHERE `orderID` = '$MasterID' AND `productID` = '$ItemID'";
            $rows = $this->quere->SelectFromTableByCondition($tableStuffs, $columns, $condition);
            return $rows; 
        }

        public function Insert_Item_Stuffing($oID, $pID, $stuff_one, $stuff_two, $stuff_three, $stuff_four, $stuff_five){
            $tableStuffing = 'order2';
            $columns = "(`orderID`, `productID`, `stuff_one`, `stuff_two`, `stuff_three`, `stuff_four`, `stuff_five`)";
            $data = "($oID, $pID, '$stuff_one', '$stuff_two',  '$stuff_three',  '$stuff_four',  '$stuff_five')";
            $rows = $this->quere->InsertInto($tableStuffing, $columns, $data);
            return $rows;

        }
        public function Delet_Item_Stuffs($oID){
            $tableCakes = 'order2';
            $condition = "WHERE `orderID` = '$oID'";
            $status = $this->quere->Delete($tableCakes, $condition);
            return $status;
        }

        public function Update_Item_Stuffing($oID, $pID, $stuff_one, $stuff_two, $stuff_three, $stuff_four, $stuff_five){
            $tableStuffing = 'order2';
            $columnsANDdataTableStuffing = "`stuff_one` = '$stuff_one', `stuff_two` = '$stuff_two', `stuff_three` = '$stuff_three', `stuff_four` = '$stuff_four', `stuff_five` = '$stuff_five'";
            $condition = "WHERE `orderID` = '$oID' AND `productID` = '$pID'";
            $status = $this->quere->Update($tableStuffing, $columnsANDdataTableStuffing, $condition);
            return $status;
        }
        public function Insert_Cake_Properities($oID, $pID, $width, $height, $length, $layer, $stuff, $phrase){
            $tableCakes = 'order3';
            $columns = "(`orderID`, `productID`, `width`, `height`, `length`, `layer`, `stuff`, `phrase`)";
            $data = "($oID, $pID, '$width', '$height',  '$length',  '$layer', '$stuff', '$phrase')";
            $rows = $this->quere->InsertInto($tableCakes, $columns, $data);
            return $rows;

        }

        public function Update_Item_Cake($pID, $shape, $levels){
            $tableItems = 'order1';
            $columnsANDdataTableItems = "`shape` = '$shape', `levels` = $levels , `Quantity` = 1";
            $condition = "WHERE ID = $pID";
            $status = $this->quere->Update($tableItems, $columnsANDdataTableItems, $condition);
            return $status;
        }
        
        public function Delet_Cake_Properity($oID, $pID){
            $tableCakes = 'order3';
            $condition = "WHERE `orderID` = '$oID' AND `productID` = '$pID'";
            $status = $this->quere->Delete($tableCakes, $condition);
            return $status;
        }
        public function Delet_Cake_Properities($oID){
            $tableCakes = 'order3';
            $condition = "WHERE `orderID` = '$oID'";
            $status = $this->quere->Delete($tableCakes, $condition);
            return $status;
        }
        public function Is_Cake_Exists($oID, $pID){
            $tableCakes = 'order3';
            $columns = 'true';
            $condition = "WHERE `orderID` = '$oID' AND `productID` = '$pID'";
            $state = $this->quere->SelectFromTableByCondition($tableCakes, $columns, $condition);
            return $state[0]['true'];
        }

        public function Get_Cakes_Properities($MasterID, $ItemID){
            $tableCakes = 'order3';
            $columns = 'order3.width, order3.height, order3.length, order3.layer, order3.phrase, order3.stuff, order1.shape, order1.levels ';
            $condition = "order3 JOIN order1 ON order3.orderID = $MasterID AND order3.productID = $ItemID AND order1.ID = $ItemID;";
            $rows = $this->quere->SelectFromTableByCondition($tableCakes, $columns, $condition);
            return $rows; 
        }
        
        public function Uploadfile($ID, $filename){
            $tableItems = 'order1';
            $columnsANDdata = "`file_name` = '$filename' ";
            $condition = "WHERE ID = $ID";
            $status = $this->quere->Update($tableItems, $columnsANDdata, $condition);
            return $status;
        }
    }
    $Order = new Order();
    if ($_SERVER["REQUEST_METHOD"] === "POST") {
        $data = json_decode(file_get_contents("php://input"), true);
        if(isset($data['flag'])){
            if($data['flag'] == 'insert'){
                if (isset($data['productID']) && isset($data['quantity']) && isset($data['masterID'])) {
                    echo $Order->Insert_Item($data['masterID'], $data['quantity'], $data['productID']);
                }
                if(isset($data['oID']) && isset($data['iID']) && (isset($data['stuff_one']) || isset($data['stuff_two']) || isset($data['stuff_three'])|| isset($data['stuff_four'])|| isset($data['stuff_five']))){
                    echo $Order->Insert_Item_Stuffing($data['oID'], $data['iID'], $data['stuff_one'], $data['stuff_two'], $data['stuff_three'], $data['stuff_four'], $data['stuff_five']);
                }
                if($data['type'] == 'stuff'){
                    echo $Order->Update_Item($data['iID'], $data['quantity']);
                }

            }
            // elseif ($data['flag'] == 'update'){
            //     if($data['productID'] !== '' && ($data['quantity'] !== '' || $data['stuff_one'] !== '' || $data['stuff_two'] !== '' || $data['stuff_three'] !== '' || $data['stuff_four'] !== '' || $data['stuff_five'] !== ''))
            //     {
            //         print_r($data);
            //         echo $Order->Update_Item('', $data['productID'], $data['quantity'], $data['stuff_one'], $data['stuff_two'], $data['stuff_three'], $data['stuff_four'], $data['stuff_five']);
            //     }
            // }

            if($data['flag'] == 'cake'){
                if($Order->Is_Cake_Exists($data['oID'], $data['iID']) == 1){
                    $Order->Delet_Cake_Properity($data['oID'], $data['iID']);
                    for($i = 1; $i<=$data['levels']; $i++){
                        $Order->Insert_Cake_Properities($data['oID'], $data['iID'], $data['width' . $i], $data['height' . $i ], $data['length' . $i], $i, $data['stuff' . $i], $data['phrase' . $i]);
                    }

                }
                else{
                    for($i = 1; $i<=$data['levels']; $i++){
                        $Order->Insert_Cake_Properities($data['oID'], $data['iID'], $data['width' . $i], $data['height' . $i ], $data['length' . $i], $i, $data['stuff' . $i], $data['phrase' . $i]);
                    }
                }
                $Order->Update_Item_Cake($data['iID'], $data['shape'], $data['levels']);
            }
            elseif ($data['flag'] == 'update') {
                if (isset($data['oID']) && isset($data['iID']) && (isset($data['stuff_one']) || isset($data['stuff_two']) || isset($data['stuff_three']) || isset($data['stuff_four']) || isset($data['stuff_five']))) {
                    echo $Order->Update_Item_Stuffing($data['oID'], $data['iID'], $data['stuff_one'], $data['stuff_two'], $data['stuff_three'], $data['stuff_four'], $data['stuff_five']);
                }
                if ($data['productID'] !== '' && isset($data['quantity'])) {
                    echo $Order->Update_Item($data['iID'], $data['quantity']);
                }
            }
            elseif ($data['flag'] == 'get'){
                if ( isset($data['oID']) && isset($data['iID'])) {
                    $cakeProperties = $Order->Get_Cakes_Properities($data['oID'], $data['iID']);
                    $properties = [];

                    for ($i = 0; $i < count($cakeProperties); $i++) {
                        $keyWidth = 'width' . ($i + 1);
                        $keyHeight = 'height' . ($i + 1);
                        $keyLength = 'length' . ($i + 1);
                        $keyPhrase = 'phrase' . ($i + 1);
                        $keyStuff = 'stuff' . ($i + 1);

                        // Accessing values from the cakeProperties array
                        $valueWidth = $cakeProperties[$i]['width'];
                        $valueHeight = $cakeProperties[$i]['height'];
                        $valueLength = $cakeProperties[$i]['length'];
                        $valuePhrase = $cakeProperties[$i]['phrase'];
                        $valueStuff = $cakeProperties[$i]['stuff'];
                        $valueLayer= $cakeProperties[$i]['layer'];

                        // Assigning values to the properties array with corresponding keys
                        $properties[$keyWidth] = $valueWidth;
                        $properties[$keyHeight] = $valueHeight;
                        $properties[$keyLength] = $valueLength;
                        $properties[$keyPhrase] = $valuePhrase;
                        $properties[$keyStuff] = $valueStuff;
                    }
                    $properties['levels'] = $cakeProperties[0]['levels'];
                    $properties['shape'] = $cakeProperties[0]['shape'];
                    $json_response = json_encode($properties);
                    print_r($json_response);
                }
                elseif (isset($data['masterID']) && isset($data['itemID'])){
                    $stuffsByItems= $Order->Get_Stuffs_By_Item($data['masterID'], $data['itemID']);
                    $json_response = json_encode($stuffsByItems);
                    print_r($json_response);
                }
                
            }
            elseif ($data['flag'] == 'delete item'){
                $ItemsByMaster = $Order->Delete_Item($data['iID']);
                if($data['type'] == 'cake'){
                    $Order->Delet_Cake_Properities($data['oID']);
                }
                elseif($data['type'] == 'stuff'){
                    $Order->Delet_Item_Stuffs($data['oID']);
                }
                echo $ItemsByMaster;
                
            }
            elseif ($data['flag'] == 'download'){
                $filename = $Order->Download($data['ID']);
                $filename = $filename[0]['file_name'];
                $fileUrl = '../controller/uploads/' . $filename;
                $fileName = $filename;

                // Read the file contents into a variable
                $fileContents = file_get_contents($fileUrl);

                // Set appropriate headers
                $fileExtension = strtolower(pathinfo($filename, PATHINFO_EXTENSION));

                if ($fileExtension === 'pdf') {
                    $contentType = 'application/pdf';
                } elseif (in_array($fileExtension, ['jpg', 'jpeg', 'png', 'gif'])) {
                    $contentType = 'image/jpeg'; // Update this based on the actual image types you support
                }
                header('Content-Type: '. $contentType);
                header('Content-Disposition: attachment; filename="' . $fileName . '"');
                header('Content-Length: ' . filesize($fileUrl));

                // Output the file contents
                echo $fileContents;
            }
        }
        else{
            if(isset($_FILES)) {
                $uploadDir = '../controller/uploads/';
                $filename = "item" . $_POST['ID'];
                $fileExtension = strtolower(pathinfo($_FILES['file']['name'], PATHINFO_EXTENSION));
                $fileName = $filename . '.'. $fileExtension;
                $uploadFile = $uploadDir . $fileName;
                // $isExist = $uploadDir . $filename;
                // // Check if the file already exists
                // if (file_exists($isExist)) {
                //     unlink($isExist); // Delete the existing file
                // }
            
                // Move the uploaded file to the uploads directory with the new name
                if (move_uploaded_file($_FILES['file']['tmp_name'], $uploadFile)) {
                    $Order->Uploadfile($_POST['ID'], $fileName);
                } else {
                    http_response_code(500);
                    echo json_encode(['error' => 'Failed to move uploaded file']);
                }
            }
        }   
}
?>