<?php
$username = $_GET['username'] ?? '';
$url = 'https://letterboxd.com/' . $username . "/";

if ($url) {
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    $response = curl_exec($ch);
    $curl_error = curl_error($ch);
    curl_close($ch);

    if ($curl_error) {
        echo "cURL Error: $curl_error";
    } else {
        echo $response;
    }
} else {
    echo 'Username is Required';
}
?>