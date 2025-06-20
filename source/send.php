<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPMailer.php';
require 'phpmailer/src/SMTP.php';

// Получаем данные
$name = trim($_POST['name'] ?? '');
$phone = trim($_POST['phone'] ?? '');
$privacy = $_POST['privacy'] ?? '';

if (!$name || !$phone || !$privacy) {
    http_response_code(400);
    echo "Некорректные данные";
    exit;
}

// Настройки Gmail
$smtpHost = 'smtp.gmail.com';
$smtpUsername = 'libertyorto@gmail.com';   // ваш Gmail
$smtpPassword = 'ВАШ_ПАРОЛЬ_ИЛИ_ПАРОЛЬ_ПРИЛОЖЕНИЯ'; // пароль или app password (см. ниже)
$smtpPort = 587;  // TLS порт

$mail = new PHPMailer(true);

try {
    // Сервер и аутентификация
    $mail->isSMTP();
    $mail->Host = $smtpHost;
    $mail->SMTPAuth = true;
    $mail->Username = $smtpUsername;
    $mail->Password = $smtpPassword;
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = $smtpPort;

    // От кого
    $mail->setFrom($smtpUsername, 'Сайт Liberty Orto');
    // Кому
    $mail->addAddress('libertyorto@gmail.com');

    // Тема и тело письма
    $mail->Subject = 'Новая заявка на звонок с сайта';
    $mail->Body = "Имя: $name\nТелефон: $phone\nСогласие с политикой: да";

    $mail->send();

    echo "success";
} catch (Exception $e) {
    http_response_code(500);
    echo "Ошибка при отправке: {$mail->ErrorInfo}";
}
?>
