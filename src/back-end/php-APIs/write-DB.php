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


    // if(check_file_is_audio($link)){
    //   echo '"success4"';
    // } else {
    //   echo '"failed"';
    // }

    // $finfo = finfo_open(FILEINFO_MIME_TYPE);
    // $type = finfo_file($finfo, $link);
    // echo "a" . $type . "b";
    // finfo_close($finfo);
    // echo "aaaaaa";

    $headers = get_headers($link);
    var_dump($headers);

    
  }     

    //add a new entry to the database of the name and link

}


$pdo = null;






function check_file_is_audio( $tmp ){
  $allowed = array(
      'audio/mpeg', 'audio/x-mpeg', 'audio/mpeg3', 'audio/x-mpeg-3', 'audio/aiff', 
      'audio/mid', 'audio/x-aiff', 'audio/x-mpequrl','audio/midi', 'audio/x-mid', 
      'audio/x-midi','audio/wav','audio/x-wav','audio/xm','audio/x-aac','audio/basic',
      'audio/flac','audio/mp4','audio/x-matroska','audio/ogg','audio/s3m','audio/x-ms-wax',
      'audio/xm'
  );
  
  // check REAL MIME type
  $finfo = finfo_open(FILEINFO_MIME_TYPE);
  $type = finfo_file($finfo, $tmp );
  finfo_close($finfo);
  
  // check to see if REAL MIME type is inside $allowed array
  if( in_array($type, $allowed) ) {
      return true;
  } else {
      return false;
  }
}
?>