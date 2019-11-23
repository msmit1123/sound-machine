<?php
// (1) connect to db
$host = 'localhost';
$dbname = 'sunddpxk_sound_machine_app';
$user = 'sunddpxk_SM-selectInsert';
$password = 'TheKingCloudMonsterFish';
$charset = 'utf8';
$pdo = new PDO(
	"mysql:host=$host;dbname=$dbname;charset=$charset", $user, $password, [
		PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
		PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
		PDO::ATTR_EMULATE_PREPARES => false,
	]
);

// Make a request to see if an entry with this name and link already exist
$name = $_POST['name']; 
$link = $_POST['link']; 
$stmt = $pdo->prepare("SELECT * FROM `soundLinks` WHERE `name` = ? AND `link` = ? ");
$stmt->execute(array($name, $link));
while ($row = $stmt->fetch(PDO::FETCH_NAMED)) {
  $data = $row;
}

$responseMessage = [];

//if it is unique,
if(!$data){
  //get headers of the link to validate
  $headers = get_headers($link); 
  
  // check for string position of 200 indicating success therefore valid link
  if($headers && strpos( $headers[0], '200')) { 
    
    // while headers can easily be spoofed, we're not downloading the actual file or running
    // it on our server. we're just checking the url to files we don't control, so some precaution
    // is better than none. Confirm headers include 'audio'
    if (strpos($headers, 'audio') !== false) {
      
      //if they do, add entry to the database
      //$status = addNameLinkToDatabase($pdo, $name, $link);
      $responseMessage = addNameLinkToDatabase($pdo, $name, $link);

      //return success / fail message
      // echo $status;
    }  
  }     
}

echo json_encode($responseMessage);

//reset data variable
$data = null;

//close pdo connection
$pdo = null;






  function addNameLinkToDatabase($pdo, $name,$link){
    try{
      $stmt = $pdo->prepare("INSERT INTO `soundLinks` (`name`, `link`) VALUES (?, ?) ");
      $stmt->execute(array($name, $link));

      //on success return
      return ["Records inserted successfully."];
    } catch(PDOException $e){
      die("ERROR: Could not able to execute $stmt. " . $e->getMessage());
    }
  }

?>