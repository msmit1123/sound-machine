<?php
// YOU MIGHT WANT TO ADD SOME SECURITY ON THIS PAGE
// E.G. CHECK IF VALID USER LOGIN
// if (isset($_SESSION['admin'])) { ... DO SEARCH AS BELOW ... }

// (1) CONNECT TO DATABASE
$host = 'localhost';
$dbname = 'sunddpxk_test1';
$user = 'sunddpxk_testUser';
$password = 'testPassword';
$charset = 'utf8';
$pdo = new PDO(
	"mysql:host=$host;dbname=$dbname;charset=$charset", $user, $password, [
		PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
		PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
		PDO::ATTR_EMULATE_PREPARES => false,
	]
);

// (2) SEARCHING FOR?
switch ($_POST['type']) {
  // (2A) INVALID SEARCH TYPE
  default :
    break;

  // (2B) SEARCH FOR USER
  case "user":
    // You might want to limit number of results on massive databases
    // SELECT * FROM XYZ WHERE `FIELD` LIKE ? LIMIT 20
    $stmt = $pdo->prepare("SELECT * FROM `users` WHERE `name` LIKE ? LIMIT 5");
    $stmt->execute(["%" . $_POST['term'] . "%"]);
    while ($row = $stmt->fetch(PDO::FETCH_NAMED)) {
      $data[] = $row['name'];
    }
    break;

  // (2C) SEARCH FOR EMAIL
  case "email":
    $stmt = $pdo->prepare("SELECT * FROM `users` WHERE `email` LIKE ?");
    $stmt->execute(["%" . $_POST['term'] . "%"]);
    while ($row = $stmt->fetch(PDO::FETCH_NAMED)) {
      $data[] = $row['email'];
    }
    break;

  // (X) SEARCH FOR USER WITH ALL INFORMATION
  // JQUERY VERSION
  case "user-all":
    // Data yoga
    $data = [
      "display" => [],
      "details" => []
    ];
    
    $stmt = $pdo->prepare("SELECT * FROM `users` WHERE `name` LIKE ?");
    $stmt->execute(["%" . $_POST['term'] . "%"]);
    while ($row = $stmt->fetch(PDO::FETCH_NAMED)) {
      $data["display"][] = [
        "label" => $row['name'],
        "value" => $row['id']
      ];
      $data["details"][$row['id']] = [
        "email" => $row['email'],
        "phone" => $row['phone']
      ];
    }
    break;

  // (X) SEARCH FOR USER WITH ALL INFORMATION
  // VANILLA VERSION
  case "user-a":
    $stmt = $pdo->prepare("SELECT * FROM `users` WHERE `name` LIKE ?");
    $stmt->execute(["%" . $_POST['term'] . "%"]);
    while ($row = $stmt->fetch(PDO::FETCH_NAMED)) {
      $data[$row["id"]] = $row;
    }
    break;
}


// (3) RETURN RESULT
$pdo = null;
echo json_encode($data);
?>