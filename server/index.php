<?php
require_once dirname(__DIR__) . '/server/methods.php';

$url = $_SERVER["REQUEST_URI"];
$parsedUrl = parse_url($_SERVER["REQUEST_URI"], PHP_URL_PATH);
$method = $_SERVER["REQUEST_METHOD"];

switch ($method) {
    case "GET": {
        CORS();

        if ($parsedUrl === "/") {
            header('Content-Type: text/html');
            readfile(dirname(__DIR__) . '/index.html');
            exit;
        }
        
        if ($parsedUrl === "/majors") {
            $major = $_GET["major"] ?? null;
            $data = json_decode(file_get_contents(dirname(__DIR__) . "/db/majors.json"), true);

            if ($major) {
                $exists = array_find($data, fn($x) => $x["code"] === $major);
                if (!$exists) sendJSON(["error" => "Major not found"], 404);

                sendJSON($exists, 200);
            }

            sendJSON($data, 200);
        }

        if ($parsedUrl === "/picks") {
            $major = $_GET["major"] ?? null;
            $data = json_decode(file_get_contents(dirname(__DIR__) . "/db/picks.json"), true);

            if ($major) {
                $exists = array_find($data, fn($x) => $x["major"] === $major);
                if (!$exists) sendJSON(["error" => "Major not found"], 404);

                sendJSON($exists, 200);
            }

            sendJSON($data, 200);
        }
        
        $splitUrl = explode("/", $url);
        if ($splitUrl[1] === "scripts") {
            header('Content-Type: application/javascript');
            readfile(dirname(__DIR__) . '/scripts/' . $splitUrl[2]);
            exit;
        }

        if ($splitUrl[1] === "styles") {
            header('Content-Type: text/css');
            readfile(dirname(__DIR__) . '/styles/' . $splitUrl[2]);
            exit;
        }
    }
}

?>