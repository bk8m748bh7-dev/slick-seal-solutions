<?php
require_once 'config.php';

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'message' => 'Method not allowed'
    ]);
    exit();
}

// Get JSON input
$input = json_decode(file_get_contents('php://input'), true);

// Validate required fields
$required_fields = ['name', 'email', 'phone', 'message'];
foreach ($required_fields as $field) {
    if (empty($input[$field])) {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'message' => "Missing required field: $field"
        ]);
        exit();
    }
}

// Sanitize inputs
$name = htmlspecialchars(trim($input['name']));
$email = filter_var(trim($input['email']), FILTER_SANITIZE_EMAIL);
$phone = htmlspecialchars(trim($input['phone']));
$message = htmlspecialchars(trim($input['message']));

// Validate email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'Invalid email address'
    ]);
    exit();
}

try {
    $conn = getDatabaseConnection();
    
    // Insert contact submission
    $sql = "INSERT INTO contact_submissions (name, email, phone, message, created_at) 
            VALUES (:name, :email, :phone, :message, NOW())";
    
    $stmt = $conn->prepare($sql);
    $stmt->execute([
        ':name' => $name,
        ':email' => $email,
        ':phone' => $phone,
        ':message' => $message
    ]);
    
    // Optional: Send email notification
    $to = "info@nusealwaterproofing.co.za";
    $subject = "New Contact Form Submission from $name";
    $email_message = "Name: $name\nEmail: $email\nPhone: $phone\n\nMessage:\n$message";
    $headers = "From: noreply@nusealwaterproofing.co.za\r\n";
    $headers .= "Reply-To: $email\r\n";
    
    @mail($to, $subject, $email_message, $headers);
    
    http_response_code(200);
    echo json_encode([
        'success' => true,
        'message' => 'Thank you! We will contact you within 24 hours.'
    ]);
    
} catch(PDOException $e) {
    error_log("Database error: " . $e->getMessage());
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Failed to submit form. Please try again.'
    ]);
}
?>
