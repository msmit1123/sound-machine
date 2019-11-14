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

//mikie dev notes for future feature here:
//this api should be called on submit button press in app
//get post attributes,
//validate name
//validate link points to mp3,wav,or ogg file
//insert a new row to DB with the name and link

// (3) establish search parameters of API
switch ($_POST['type']) {
  // (3A) default/ invalid search type
  default :
    break;

  // (3B) search by sound sound name - return sound name only
  case "name":
  $stmt = $pdo->prepare("SELECT * FROM `soundLinks` WHERE `name` LIKE ? LIMIT {$resultLimit}");
    $stmt->execute(["%" . $_POST['term'] . "%"]);
    while ($row = $stmt->fetch(PDO::FETCH_NAMED)) {
      $data[] = $row['name'];
    }
    break;

  // (3C) search by link - return link only
  case "link":
    $stmt = $pdo->prepare("SELECT * FROM `soundLinks` WHERE `link` LIKE ? LIMIT {$resultLimit}");
    $stmt->execute(["%" . $_POST['term'] . "%"]);
    while ($row = $stmt->fetch(PDO::FETCH_NAMED)) {
      $data[] = $row['link'];
    }
    break;

  // (3D) Search by sound name - return entire row
  case "name-all":
    $stmt = $pdo->prepare("SELECT * FROM `soundLinks` WHERE `name` LIKE ? LIMIT {$resultLimit}");
    $stmt->execute(["%" . $_POST['term'] . "%"]);
    while ($row = $stmt->fetch(PDO::FETCH_NAMED)) {
      $data[$row["id"]] = $row;
    }
    break;
}


// (4) RETURN RESULT
$pdo = null;
echo json_encode($data);
?>