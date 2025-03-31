<?php
// Get the URL from the query parameter
$url = $_GET['url'] ?? '';

if ($url) {
    // Initialize cURL session
    $ch = curl_init();

    // Set cURL options
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    // Execute the cURL command
    $response = curl_exec($ch);

    // Close cURL session
    curl_close($ch);

    // Return the response
    echo "<html>testing testing </html>//$response;
} else {
    echo 'URL parameter is missing.';
}
?>
