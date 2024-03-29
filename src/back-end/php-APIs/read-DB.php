<?php
/**
 * API NOTES for 'read-DB.php'
 * available options this api will accept:
 * term: \\the search term
 * limit: \\max number of results to return
 * type: \\can be any of the following
 *      name      \\ returns [['response1','id1'],['response2','id2'],etc]
 *      link      \\ returns ['url1','url2',etc]
 *      id-all    \\ returns an object of the complete row 
*/

// (1) connect to db
$host = 'localhost';
$dbname = 'sunddpxk_sound_machine_app';
$user = 'sunddpxk_SM-readOnly';
$password = 'SM-readOnly';
$charset = 'utf8';
$pdo = new PDO(
	"mysql:host=$host;dbname=$dbname;charset=$charset", $user, $password, [
		PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
		PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
		PDO::ATTR_EMULATE_PREPARES => false,
	]
);

// (2) Establish API request variables and/or defaults
$resultLimit = 5; //maximum number of results to return
if ($_POST['limit']){
  $resultLimit = $_POST['limit'];
}

// (3) establish search parameters of API
switch ($_POST['type']) {
  // (3A) default/ invalid search type
  default :
    break;

  // (3B) search by sound sound name - return sound name + row ID only
  case "name":
  $stmt = $pdo->prepare("SELECT * FROM `soundLinks` WHERE `name` LIKE ? LIMIT {$resultLimit}");
    $stmt->execute(["%" . $_POST['term'] . "%"]);
    while ($row = $stmt->fetch(PDO::FETCH_NAMED)) {
      $data[] = [$row['name'], $row['id']];
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

  // (3D) Search by unique id - return entire row
  case "id-all":
    $stmt = $pdo->prepare("SELECT * FROM `soundLinks` WHERE `id` LIKE ? LIMIT 1");
    $stmt->execute(["%" . $_POST['term'] . "%"]);
    while ($row = $stmt->fetch(PDO::FETCH_NAMED)) {
      $data = $row;
    }
    break;
}


// (4) RETURN RESULT
$pdo = null;
echo json_encode($data);
?>