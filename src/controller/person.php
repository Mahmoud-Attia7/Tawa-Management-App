<?php

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

    // Every request except sign-in needs a valid login token.
    require_once('../../config/auth.php');
    require_login();
    
    
    require_once('../model/user.php');
    require_once('../model/role.php');
    require_once('../model/order.php');
    require_once('../model/category.php');
    require_once('../model/product.php');
    require_once('../model/stuff.php');
    require_once('../model/user_role.php');
    require_once('../model/area.php');
    require_once('../model/branch.php');
    require_once('../model/product_stuffing.php');
    require_once('../model/user_branch.php');
    require_once('../model/user_area.php');
    require_once('../model/order details report.php');

    class Person
    {
        private $User;
        private $Role;
        private $Order;
        private $Product;
        private $Category;
        private $user_role;
        private $Stuff;
        private $Area;
        private $Branch;
        private $Product_Stuffing;
        private $user_branch;
        private $user_area;
        private $order_details_report;

        public function __construct(){
            $this->User = new User();
            $this->Role = new Role();
            $this->Order = new Order();
            $this->Product = new Product();
            $this->Category = new Category();
            $this->user_role = new User_Role();
            $this->Stuff = new Stuff();
            $this->Area = new Area();
            $this->Branch = new Branch();
            $this->Product_Stuffing = new Product_Stuffing();
            $this->user_branch = new User_Branch();
            $this->user_area = new User_Area();
            $this->order_details_report = new Order_Details_Report();

        }

        public function Sign_In($email, $password){
            $userData = $this->User->Login($email, $password);
            if ($userData === null) {
                return null;
            }
            $userData['token'] = issue_token($userData['userID']);
            $userRoles = $this->user_role->Get_User_Roles_By_ID($userData['userID']);
            return [$userRoles, $userData];
        }

        public function Save_User($name, $password, $phone_number, $email, $role, $department){
            $userData = $this->User->Insert_User($name, $password, $phone_number, $email, $role, $department); 
            $userData = $this->User->Select_User($email);
            $roles = $this->Role->Get_Roles();
            for($i=0; $i<sizeof($roles); $i++):
                $this->user_role->Insert_User_Role($userData['userID'], $roles[$i]['ID'], 0, $roles[$i]['roleName']);
            endfor;
            return $userData; 
        }

        public function Get_Users(){
            $userData = $this->User->Get_Users(); 
            return $userData; 
        }

        public function Remove_User($email){
            $userData = $this->User->Select_User($email);
            if ($userData === null) {
                return 'user not found';
            }
            $this->user_role->Delete_User_Roles($userData['userID']);
            $userData = $this->User->Delete_User($email); 
            return $userData; 
        }

        public function Update_User($userID, $name, $password, $phone_number, $email, $role, $department){
            $userData = $this->User->Update_User_Data($userID, $name, $password, $phone_number, $email, $role, $department); 
            return $userData; 
        }

        public function getUserRoles($userID){
            $userRoles = $this->user_role->Get_User_Roles_By_ID($userID); 
            return $userRoles; 
        }

        public function updateUserRole($userID, $roleID, $isAvailable){
            $userRoles = $this->user_role->Update_User_Role($userID, $roleID, $isAvailable); 
            return $userRoles; 
        }

        public function Get_Orders(){
            $orders = $this->Order->Get_Orders_Data();
            return $orders;
        }

        public function Insert_Order($Reference, $UserID, $date, $branchID, $branchName, $clientName, $clientNumber, $isWidding, $guestNumber, $submition_date, $employeeName){
            return $this->Order->Insert_Order($Reference, $UserID, $date, $branchID, $branchName, $clientName, $clientNumber, $isWidding, $guestNumber, $submition_date, $employeeName);
        }

        public function Modify_Order($ID, $Reference, $UserID, $date, $branchID, $branchName, $clientName, $clientNumber, $isWidding, $guestNumber, $status, $submition_date, $employeeName){
            return $this->Order->Update_Order($ID, $Reference, $UserID, $date, $branchID, $branchName, $clientName, $clientNumber, $isWidding, $guestNumber, $status, $submition_date, $employeeName);
        }

        public function Fetch_Last_Order(){
            return $this->Order->Get_Last_Order();
        }

        public function Fetch_Order_Items($masterID){
            return $this->Order->Get_Items_By_Master($masterID);
        }

        public function Fetch_Products(){
            return  $this->Product->Get_Products();
        }

        public function Add_Product($name, $reference, $measure_unit, $categoryID, $type, $department){
            return $this->Product->Insert_Product($name, $reference, $measure_unit, $categoryID, $type, $department);
        }

        public function Modify_Product($ID, $name, $reference, $measure_unit, $categoryID, $type, $department){
            return $this->Product->Update_Product_Data($ID, $name, $reference, $measure_unit, $categoryID, $type, $department);
        }

        public function Remove_Product($ID){
            return $this->Product->Delete_Products($ID);
        }

        public function Fetch_Categories(){
            return $this->Category->Get_Category();
        }

        public function Add_Category($name){
            return $this->Category->Insert_Category($name);
        }

        public function Modify_Category($name, $ID){
            return $this->Category->Update_Category_Data($name, $ID);
        }

        public function Remove_Category($ID){
            return $this->Category->Delete_Category($ID);
        }

        public function Fetch_Stuffs(){
            return $this->Order->Get_Stuffing();
        }

        public function Add_Stuff($name){
            return $this->Stuff->Insert_Stuff($name);
        }

        public function Remove_Stuff($ID){
            return $this->Stuff->Delete_Stuff($ID);
        }

        public function Modify_Stuff($name, $ID){
            return $this->Stuff->Update_Stuff_Data($name, $ID);
        }

        public function Fetch_Product_Stuffing($productID){
            return $this->Product_Stuffing->Get_Product_Stuffing_By_ID($productID);
        }

        public function Fetch_Product_Stuffs(){
            return $this->Product_Stuffing->Get_Product_Stuffing();
        }

        public function Add_Product_Stuffing($productID, $stuffID, $name){
            return $this->Product_Stuffing->Insert_Product_Stuffing($productID, $stuffID, $name);
        }

        public function Remove_Product_Stuffing($productID, $stuffID){
            return $this->Product_Stuffing->Delete_Product_Stuffing($productID, $stuffID);
        }

        public function Fetch_Branchs(){
            return $this->Branch->Get_Branchs();
        }

        public function Add_Branch($areaID, $name, $areaName){
            return $this->Branch->Insert_Branch($areaID, $name, $areaName);
        }

        public function Remove_Branch($branchID){
            return $this->Branch->Delete_Branch($branchID);
        }

        public function Modify_Branch($name, $branchID, $areaID, $areaName){
            return $this->Branch->Update_Branch_Data($name, $branchID, $areaID, $areaName);
        }

        public function Fetch_User_Branches($userID){
            return $this->user_branch->Get_User_Branch_By_ID($userID);
        }

        public function Add_User_Branch($userID, $branchID, $name){
            return $this->user_branch-> Insert_User_Branch($userID, $branchID,  $name);
        }

        public function Remove_User_Branch($userID, $branchID){
            return $this->user_branch->Delete_User_Branch($userID, $branchID);
        }

        public function Fetch_Areas(){
            return $this->Area->Get_Areas();
        }

        public function Add_Area($name){
            return $this->Area->Insert_Area($name);
        }
        
        public function Remove_Area($areaID){
            return $this->Area->Delete_Area($areaID);
        }

        public function Modify_Area($name, $areaID){
            return $this->Area->Update_Area_Data($name, $areaID);
        }

        public function Fetch_User_Areas($userID){
            return $this->user_area-> Get_User_Area_By_ID($userID);
        }

        public function Add_User_Area($userID, $areaID, $name){
            return $this->user_area->Insert_User_Area($userID, $areaID,  $name);
        }

        public function Remove_User_Area($userID, $areaID){
            return $this->user_area->Delete_User_Area($userID, $areaID);
        }

        public function Get_Order_Details_Report($userID, $masterID, $Reference, $department){
            $this->order_details_report->Execute_Report($userID, $masterID, $Reference, $department);
            return true;
        }
    }

    
    $person = new Person();
    if ($_SERVER["REQUEST_METHOD"] === "POST") {
        $data = json_decode(file_get_contents("php://input"), true);
        if($data['flag'] == 'insert'){
                $insertUser = $person->Save_User($data['employeeName'], $data['password'], $data['phoneNumber'], $data['email'], 2, 4);
                $json_response = json_encode($insertUser);
                echo($json_response);  
        }
        elseif ($data['flag'] == 'delete'){
                $deleteUser = $person->Remove_User($data['email']);
                $json_response = json_encode($deleteUser);
                print_r($json_response);
        }
        elseif($data['flag'] == 'update'){
                $updateUser = $person->Update_User($data['userID'], $data['employeeName'], $data['userPassword'], $data['phoneNumber'], $data['email'], 2, 4);
                $json_response = json_encode($updateUser);
                print_r($json_response);
        }
        elseif($data['flag'] == 'sign in'){
                $UserLogin = $person->Sign_In($data['email'] ?? '', $data['password'] ?? '');
                // A plain string response tells the login page the credentials were wrong.
                echo json_encode($UserLogin === null ? 'Login failed' : $UserLogin);
        }
        elseif($data['flag'] == 'getUserRoles'){
            $UserRoles = $person->getUserRoles($data['userID']);
            $json_response = json_encode($UserRoles);
            print_r($json_response);
        }
        elseif($data['flag'] == 'updateUserRoles'){
            $updateUserRoles = $person->updateUserRole($data['userID'], $data['roleID'], $data['isAvailable']);
            $json_response = json_encode($updateUserRoles);
            print_r($json_response);
        }
        elseif ($data['flag'] == 'insert order'){
            if(isset($data['reference']) && isset($data['branchID'])) {
                $currentDateTime = date("Y-m-d");
                if ($data['isWidding'] == false){
                    $isWidding = 0;
                }
                else{
                    $isWidding = 1;
                }
                echo $person->Insert_Order($data['reference'], $data['userID'], $currentDateTime, $data['branchID'], $data['branchName'], $data['clientName'], $data['clientNumber'], $isWidding, $data['guestNumber'], $data['selectedDate'], $data['employeeName']);
            }
        }
        elseif ($data['flag'] == 'update order'){
                echo $person->Modify_Order($data['ID'], $data['Reference'], $data['userID'], $data['date'], $data['branchID'], $data['branchName'], $data['client_name'], $data['client_number'], $data['is_widding'], $data['guest_number'], $data['status'], $data['submition_date'], $data['employeeName']);
        }
        elseif ($data['flag'] == 'Submited'){
            echo $person->Modify_Order($data['ID'], $data['Reference'], $data['userID'], $data['date'], $data['branchID'], $data['branchName'], $data['client_name'], $data['client_number'], $data['is_widding'], $data['guest_number'], $data['status'], $data['submition_date'], $data['employeeName']);
        }
        elseif ($data['flag'] == 'Canceled'){
            echo $person->Modify_Order($data['ID'], $data['Reference'], $data['userID'], $data['date'], $data['branchID'], $data['branchName'], $data['client_name'], $data['client_number'], $data['is_widding'], $data['guest_number'], $data['status'], $data['submition_date'], $data['employeeName']);
        }
        elseif($data['flag'] == 'insert product'){
            echo $person->Add_Product($data['name'], $data['reference'], $data['measure unit'], $data['category'], $data['type'], $data['department']);
        }
        elseif($data['flag'] == 'update product'){
            echo $person->Modify_Product($data['ID'], $data['name'], $data['reference'], $data['measure_unit'], $data['categoryID'], $data['type'], $data['department']);
        }
        elseif($data['flag'] == 'delete product'){
            echo $person->Remove_Product($data['ID']);
        }
        elseif ($data['flag'] == 'get items') {
            $itemsByMaster = $person->Fetch_Order_Items($data['masterID']);
            $json_response = json_encode($itemsByMaster);
            print_r($json_response);
        }
        elseif ($data['flag'] == 'insert category') {
            echo $person->Add_Category($data['name']);
        }
        elseif($data['flag'] == 'update category'){
            echo $person->Modify_Category($data['name'], $data['ID']);
        }
        elseif($data['flag'] == 'delete category'){
            echo $person->Remove_Category($data['ID']);
        }
        elseif($data['flag'] == 'insert stuff'){
            echo $person->Add_Stuff($data['name']);
        }
        elseif($data['flag'] == 'delete stuff'){
            echo $person->Remove_Stuff($data['stuffID']);
        }
        elseif($data['flag'] == 'update stuff'){
            echo $person->Modify_Stuff($data['name'], $data['ID']);
        }
        elseif($data['flag'] == 'get product stuffing'){
            $productStuffing = $person->Fetch_Product_Stuffing($data['productID']);
            $json_response = json_encode($productStuffing);
            print_r($json_response);
        }
        elseif($data['flag'] == 'update Product Stufing'){
            if($data['isAvailable'] == 1){
                echo $person->Add_Product_Stuffing($data['productID'], $data['sutffID'] , $data['name']);
            }
            elseif($data['isAvailable'] == 0){
                echo $person->Remove_Product_Stuffing($data['productID'], $data['sutffID']);
            }
        }
        elseif($data['flag'] == 'insert branch'){
            echo $person->Add_Branch( $data['areaID'], $data['name'], $data['areaName']);
        }
        elseif($data['flag'] == 'update branch'){
            $updateBranch = $person->Modify_Branch($data['name'], $data['branchID'], $data['areaID'], $data['areaName']);
            echo $updateBranch;  
        }
        elseif($data['flag'] == 'delete branch'){
            echo $person->Remove_Branch($data['branchID']);
        }
        elseif($data['flag'] == 'get user branches'){
            $userBranches = $person->Fetch_User_Branches($data['userID']);
            $json_response = json_encode($userBranches);
            print_r($json_response);
        }
        elseif($data['flag'] == 'update user branch'){
            if($data['isAvailable'] == 1){
                echo $person->Add_User_Branch($data['userID'], $data['ID'] , $data['name']);
            }
            elseif($data['isAvailable'] == 0){
                echo $person->Remove_User_Branch($data['userID'], $data['ID']);
            }
        }
        elseif($data['flag'] == 'get user areas'){
            $userBranches = $person->Fetch_User_Areas($data['userID']);
            $json_response = json_encode($userBranches);
            print_r($json_response);
        }
        elseif($data['flag'] == 'update user area'){
            if($data['isAvailable'] == 1){
                echo $person->Add_User_Area($data['userID'], $data['ID'] , $data['name']);
            }
            elseif($data['isAvailable'] == 0){
                echo $person->Remove_User_Area($data['userID'], $data['ID']);
            }
        }
        elseif($data['flag'] == 'insert area'){
            $insertArea = $person->Add_Area($data['name']);
            $json_response = json_encode($insertArea);
            echo($json_response);  
        }
        elseif($data['flag'] == 'update area'){
            $updateArea = $person->Modify_Area($data['name'], $data['areaID']);
            $json_response = json_encode($updateArea);
            echo($json_response);  
        }
        elseif($data['flag'] == 'delete area'){
            $deleteArea = $person->Remove_Area($data['areaID']);
            $json_response = json_encode($deleteArea);
            echo($json_response);  
        }
        elseif ($data['flag'] == 'get orderDetails report') {
            $data['userID'] = (int) $data['userID'];
            if ($person->Get_Order_Details_Report($data['userID'], $data['masterID'], $data['Reference'], $data['department'])) {
                $filePath = __DIR__ . "/../model/vendor/geekcom/phpjasper/jasper reports/";
                $fileName = "OrderDetailsReport" . $data['userID'] . ".html";
                $fileURL = $filePath . $fileName;
        
                // Check if the file exists before trying to get its contents
                if (!file_exists($fileURL)) {
                    die("Error: File does not exist.");
                }
        
                $fileContents = file_get_contents($fileURL);
                $contentType = 'text/html';
        
                header('Content-Type: ' . $contentType);
                header('Content-Disposition: attachment; filename="' . $fileName . '"');
                header('Content-Length: ' . filesize($fileURL));
        
                // Output the file contents
                echo $fileContents;
            }
        }
        
    }

    if ($_SERVER["REQUEST_METHOD"] === "GET") {
        $json_response = json_encode([$person->Get_Users(), $person->Get_Orders(), $person->Fetch_Last_Order(), $person->Fetch_Products(), $person->Fetch_Stuffs(), $person->Fetch_Categories(), $person->Fetch_Product_Stuffs(), $person->Fetch_Branchs(), $person->Fetch_Areas()]);
        print_r($json_response);
    }
?>