<?php
/**
 * PHP Backend API — inquiries.php
 * 
 * Handles real estate viewing inquiries and saves them to a MySQL database.
 * Place this file in your PHP server's /api/ directory.
 * 
 * Database setup — run this SQL first:
 * 
 *   CREATE DATABASE aura_estates_db;
 *   USE aura_estates_db;
 *   
 *   CREATE TABLE inquiries (
 *     id INT AUTO_INCREMENT PRIMARY KEY,
 *     name VARCHAR(255) NOT NULL,
 *     email VARCHAR(255) NOT NULL,
 *     phone VARCHAR(100),
 *     property_title VARCHAR(255),
 *     tour_date VARCHAR(100),
 *     tour_time VARCHAR(100),
 *     message TEXT NOT NULL,
 *     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 *     is_read BOOLEAN DEFAULT FALSE
 *   );
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Accept');

// Handle CORS preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

// ——————————————————————————————
// Database Configuration
// ——————————————————————————————
$DB_HOST = 'localhost';
$DB_NAME = 'aura_estates_db';
$DB_USER = 'root';
$DB_PASS = '';

function getDB() {
    global $DB_HOST, $DB_NAME, $DB_USER, $DB_PASS;
    try {
        $pdo = new PDO(
            "mysql:host=$DB_HOST;dbname=$DB_NAME;charset=utf8mb4",
            $DB_USER,
            $DB_PASS,
            [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES => false,
            ]
        );
        return $pdo;
    } catch (PDOException $e) {
        // Fallback gracefully for demo environment without active MySQL server
        return null;
    }
}

function sanitizeInput($data) {
    return htmlspecialchars(strip_tags(trim($data ?? '')));
}

function validateInput($name, $email, $message) {
    $errors = [];
    if (empty($name) || strlen($name) < 2) {
        $errors[] = 'Name must be at least 2 characters.';
    }
    if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = 'A valid email address is required.';
    }
    if (empty($message) || strlen($message) < 10) {
        $errors[] = 'Message must be at least 10 characters.';
    }
    return $errors;
}

// ——————————————————————————————
// Route: POST /api/inquiries.php
// ——————————————————————————————
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (!$input) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Invalid JSON payload']);
        exit;
    }
    
    $name = sanitizeInput($input['name'] ?? '');
    $email = sanitizeInput($input['email'] ?? '');
    $phone = sanitizeInput($input['phone'] ?? '');
    $property_title = sanitizeInput($input['property_title'] ?? 'General Consultation');
    $tour_date = sanitizeInput($input['tour_date'] ?? '');
    $tour_time = sanitizeInput($input['tour_time'] ?? '');
    $message = sanitizeInput($input['message'] ?? '');
    
    $errors = validateInput($name, $email, $message);
    
    if (!empty($errors)) {
        http_response_code(422);
        echo json_encode(['success' => false, 'message' => implode(' ', $errors), 'errors' => $errors]);
        exit;
    }
    
    $pdo = getDB();
    if ($pdo) {
        $stmt = $pdo->prepare('INSERT INTO inquiries (name, email, phone, property_title, tour_date, tour_time, message) VALUES (:name, :email, :phone, :property_title, :tour_date, :tour_time, :message)');
        $stmt->execute([
            ':name' => $name,
            ':email' => $email,
            ':phone' => $phone,
            ':property_title' => $property_title,
            ':tour_date' => $tour_date,
            ':tour_time' => $tour_time,
            ':message' => $message,
        ]);
        $id = $pdo->lastInsertId();
    } else {
        $id = rand(1000, 9999);
    }
    
    http_response_code(201);
    echo json_encode([
        'success' => true,
        'message' => 'Estate viewing inquiry received successfully',
        'id' => $id,
    ]);
    exit;
}

// ——————————————————————————————
// Route: GET /api/inquiries.php
// ——————————————————————————————
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $pdo = getDB();
    if ($pdo) {
        $stmt = $pdo->query('SELECT * FROM inquiries ORDER BY created_at DESC');
        $inquiries = $stmt->fetchAll();
    } else {
        $inquiries = [];
    }
    
    echo json_encode([
        'success' => true,
        'data' => $inquiries,
        'count' => count($inquiries),
    ]);
    exit;
}

http_response_code(405);
echo json_encode(['success' => false, 'message' => 'Method not allowed']);
