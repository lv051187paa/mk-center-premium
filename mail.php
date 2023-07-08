<?php
// Multiple recipients
$to = 'mkcenter.premium@gmail.com'; // note the comma
// Subject
$subject = 'Notification';
$user_name = $_POST["name"];
$user_phone_number = $_POST["phone"];
$user_comments = $_POST["comments"];
$massage_duration = isset($_POST["time"]) && $_POST["time"];

if(!$massage_duration) {
    $message = "
        <html>
            <head>
              <title>Передзвоніть мені</title>
            </head>
            <body>
              <p>Маю питання, передзвоніть будь ласка за номером $user_phone_number</p>
              <p>Мене звуть $user_name</p>
              <br>
              $user_comments
            </body>
        </html>
    ";
} else {
    $message = "
        <html>
            <head>
              <title>Нова заявка на масаж</title>
            </head>
            <body>
              <p>Запишіть мене на масаж</p>
              <p>Мій номер $user_phone_number</p>
              <p>Мене звуть $user_name</p>
              <p>Тривалість масажу $massage_duration</p>
              <br>
              $user_comments
            </body>
        </html>
    ";
}


// To send HTML mail, the Content-type header must be set
//$headers[] = 'MIME-Version: 1.0';
$headers[] = 'Content-type: text/html; charset=iso-8859-1';

// Additional headers
//$headers[] = 'To: Mary <mary@example.com>, Kelly <kelly@example.com>';
//$headers[] = 'From: Birthday Reminder <birthday@example.com>';
//$headers[] = 'Cc: birthdayarchive@example.com';
//$headers[] = 'Bcc: birthdaycheck@example.com';

// Mail it
$result = mail($to, $subject, $message, implode("\r\n", $headers));

echo boolval($result) ? "success" : "failed";