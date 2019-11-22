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

//if it is unique,
if($data){
  //validate the link is valid using the get_headers() function 
  $headers = @get_headers($link); 
  // check for string position of 200 indicating success therefore valid link
  if($headers && strpos( $headers[0], '200')) { 
    
    echo '"success2"';
    
  }     
  
  //if($link points to valid file){
    //add a new entry to the database of the name and link
  //}
}


$pdo = null;
?>