<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Collect data
    $inputJSON = file_get_contents('php://input');
    $input = json_decode($inputJSON, TRUE);

    $date = date('Y-m-d H:i:s');
    $name = $input['name'] ?? '';
    $email = $input['email'] ?? '';
    $company = $input['company'] ?? '';
    $phone = $input['phone'] ?? '';
    $needs = $input['needs'] ?? '';
    $message = str_replace(["\r", "\n"], ' ', $input['message'] ?? '');

    // File path
    $file = '../data/contacts.csv';
    $directory = '../data';

    // Create directory if not exists
    if (!is_dir($directory)) {
        mkdir($directory, 0755, true);
    }

    // Header if file is new
    $isNew = !file_exists($file);
    $handle = fopen($file, 'a');

    if ($isNew) {
        fputcsv($handle, ['Date', 'Nom', 'Email', 'Entreprise', 'Telephone', 'Besoin', 'Message']);
    }

    // Add data row
    fputcsv($handle, [$date, $name, $email, $company, $phone, $needs, $message]);
    fclose($handle);

    echo json_encode(['status' => 'success', 'message' => 'Données enregistrées en CSV']);
} else {
    header('HTTP/1.1 405 Method Not Allowed');
    echo json_encode(['status' => 'error', 'message' => 'Méthode non autorisée']);
}
?>
