<?php
// Multiple recipients
$to = 'mkcenter.premium@gmail.com'; // note the comma

// Subject
$subject = 'Notification';
$user_name = $_POST["name"];
$user_phone_number = $_POST["phone"];
$user_comments = $_POST["comments"];
$massage_duration = $_POST["time"];

if($massage_duration !== "") {
    $message = "
        <html>
            <head>
              <title>Передзвоніть мені</title>
            </head>
            <body>
              <p>Маю питання, передзвоніть будь ласка за номером <?php echo $user_phone_number ?></p>
              <p>Мене звуть <?php echo $user_name ?></p>
              <br>
              <?php echo $user_comments ?>
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
              <p>Мій номер <?php echo $user_phone_number ?></p>
              <p>Мене звуть <?php echo $user_name ?></p>
              <p>Тривалість масажу <?php echo $massage_duration ?></p>
              <br>
              <?php echo $user_comments ?>
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
mail($to, $subject, $message, implode("\r\n", $headers));