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

    require_once('../../config/auth.php');
    require_login();
    

    class Order
    {
        private $quere;
        public function __construct() { $this->quere = new Quere(); }

        public function Insert_Order($Reference, $UserID, $date, $branchID, $branchName, $clientName, $clientNumber, $isWidding, $guestNumber, $submition_date, $employeeName){
            return $this->quere->InsertInto('order_master', [
                'Reference' => $Reference, 'UserID' => $UserID, 'date' => $date,
                'branchID' => $branchID, 'branchName' => $branchName,
                'client_name' => $clientName, 'client_number' => $clientNumber,
                'is_widding' => $isWidding, 'guest_number' => $guestNumber,
                'status' => 'جديد', 'submition_date' => $submition_date, 'employeeName' => $employeeName,
            ]);
        }

        public function Update_Order($ID, $Reference, $UserID, $date, $branchID, $branchName, $clientName, $clientNumber, $isWidding, $guestNumber, $status, $submition_date, $employeeName){
            return $this->quere->Update('order_master', ['Reference' => $Reference, 'status' => $status], ['ID' => $ID]);
        }

        public function Get_Barnch_Orders($branchID){
            return $this->quere->SelectWhere('order_master', '*', ['branchID' => $branchID]);
        }

        public function Get_Orders_Data(){
            return $this->quere->SelectAll('order_master');
        }

        public function Get_Last_Order(){
            return $this->quere->SelectWhere('order_master', '*', [], 'ORDER BY ID DESC LIMIT 1');
        }

        public function Insert_Item($MasterID, $Quantity, $productID){
            echo $this->quere->InsertInto('order1', ['Quantity' => $Quantity, 'MasterID' => $MasterID, 'productID' => $productID]);
        }

        public function Update_Item($pID, $Quantity){
            return $this->quere->Update('order1', ['Quantity' => $Quantity], ['ID' => $pID]);
        }

        public function Delete_Item($ID){
            return $this->quere->Delete('order1', ['ID' => $ID]);
        }

        public function Download($ID){
            return $this->quere->SelectWhere('order1', '`file_name`', ['ID' => $ID]);
        }

        public function Get_Items_By_Master($MasterID){
            return $this->quere->SelectWhere('order1', '`ID`, `Quantity`, `ProductID`', ['MasterID' => $MasterID]);
        }

        public function Get_Stuffing(){
            return $this->quere->SelectAll('stuffing');
        }

        public function Get_Stuffs_By_Item($MasterID, $ItemID){
            return $this->quere->SelectWhere('order2', '`stuff_one`, `stuff_two`, `stuff_three`, `stuff_four`, `stuff_five`', ['orderID' => $MasterID, 'productID' => $ItemID]);
        }

        public function Insert_Item_Stuffing($oID, $pID, $stuff_one, $stuff_two, $stuff_three, $stuff_four, $stuff_five){
            return $this->quere->InsertInto('order2', [
                'orderID' => $oID, 'productID' => $pID, 'stuff_one' => $stuff_one, 'stuff_two' => $stuff_two,
                'stuff_three' => $stuff_three, 'stuff_four' => $stuff_four, 'stuff_five' => $stuff_five,
            ]);
        }

        public function Delet_Item_Stuffs($oID){
            return $this->quere->Delete('order2', ['orderID' => $oID]);
        }

        public function Update_Item_Stuffing($oID, $pID, $stuff_one, $stuff_two, $stuff_three, $stuff_four, $stuff_five){
            return $this->quere->Update('order2', [
                'stuff_one' => $stuff_one, 'stuff_two' => $stuff_two, 'stuff_three' => $stuff_three,
                'stuff_four' => $stuff_four, 'stuff_five' => $stuff_five,
            ], ['orderID' => $oID, 'productID' => $pID]);
        }

        public function Insert_Cake_Properities($oID, $pID, $width, $height, $length, $layer, $stuff, $phrase){
            return $this->quere->InsertInto('order3', [
                'orderID' => $oID, 'productID' => $pID, 'width' => $width, 'height' => $height,
                'length' => $length, 'layer' => $layer, 'stuff' => $stuff, 'phrase' => $phrase,
            ]);
        }

        public function Update_Item_Cake($pID, $shape, $levels){
            return $this->quere->Update('order1', ['shape' => $shape, 'levels' => $levels, 'Quantity' => 1], ['ID' => $pID]);
        }

        public function Delet_Cake_Properity($oID, $pID){
            return $this->quere->Delete('order3', ['orderID' => $oID, 'productID' => $pID]);
        }

        public function Delet_Cake_Properities($oID){
            return $this->quere->Delete('order3', ['orderID' => $oID]);
        }

        public function Is_Cake_Exists($oID, $pID){
            $rows = $this->quere->SelectWhere('order3', 'COUNT(*) AS `n`', ['orderID' => $oID, 'productID' => $pID]);
            return ((int) $rows[0]['n']) > 0 ? 1 : 0;
        }

        public function Get_Cakes_Properities($MasterID, $ItemID){
            $sql = 'SELECT order3.width, order3.height, order3.length, order3.layer, order3.phrase, order3.stuff, order1.shape, order1.levels
                    FROM order3 JOIN order1 ON order1.ID = ?
                    WHERE order3.orderID = ? AND order3.productID = ?';
            return $this->quere->run($sql, [$ItemID, $MasterID, $ItemID])->fetchAll(PDO::FETCH_ASSOC);
        }

        public function Uploadfile($ID, $filename){
            return $this->quere->Update('order1', ['file_name' => $filename], ['ID' => $ID]);
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
                $filename = basename((string) ($filename[0]['file_name'] ?? ''));
                if ($filename === '' || !is_file('../controller/uploads/' . $filename)) { http_response_code(404); exit; }
                $fileUrl = '../controller/uploads/' . $filename;
                $fileName = $filename;

                // Read the file contents into a variable
                $fileContents = file_get_contents($fileUrl);

                // Set appropriate headers
                $fileExtension = strtolower(pathinfo($filename, PATHINFO_EXTENSION));

                $types = ['pdf' => 'application/pdf', 'jpg' => 'image/jpeg', 'jpeg' => 'image/jpeg', 'png' => 'image/png', 'gif' => 'image/gif', 'webp' => 'image/webp'];
                $contentType = $types[$fileExtension] ?? 'application/octet-stream';
                header('Content-Type: '. $contentType);
                header('Content-Disposition: attachment; filename="' . $fileName . '"');
                header('Content-Length: ' . filesize($fileUrl));

                // Output the file contents
                echo $fileContents;
            }
        }
        else{
            if(isset($_FILES['file'], $_POST['ID'])) {
                $uploadDir = '../controller/uploads/';
                // Only documents and images, never scripts.
                $allowed = ['pdf', 'jpg', 'jpeg', 'png', 'gif', 'webp'];
                $fileExtension = strtolower(pathinfo($_FILES['file']['name'], PATHINFO_EXTENSION));
                if (!in_array($fileExtension, $allowed, true)) {
                    http_response_code(400);
                    echo json_encode(['error' => 'File type not allowed']);
                    exit;
                }
                $fileName = 'item' . (int) $_POST['ID'] . '.' . $fileExtension;
                $uploadFile = $uploadDir . $fileName;
                // Move the uploaded file to the uploads directory with the new name
                if (move_uploaded_file($_FILES['file']['tmp_name'], $uploadFile)) {
                    $Order->Uploadfile((int) $_POST['ID'], $fileName);
                } else {
                    http_response_code(500);
                    echo json_encode(['error' => 'Failed to move uploaded file']);
                }
            }
        }   
}
?>