<?php

$vars = filter_input_array(INPUT_POST);

if (count($vars) == 4 || count($vars) == 5) {
    $to = 'info@antonandigor.com';

    $headers = 'From: ' . $to . "\r\n" .
            'Reply-To: ' . $to . "\r\n" .
            'X-Mailer: PHP/' . phpversion();

    $content = 'Имя: ' . $vars['name'] . "\r\n" .
            'Email: ' . $vars['email'] . "\r\n" .
            'Телефон: ' . $vars['phone'] . "\r\n" .
            'Сообщение: ' . $vars['message'] . "\r\n";

    if (isset($vars['options'])) {
        $subject = 'Новый заказ с сайта A&I Web Projects';
        $content .= 'Выбранные опции: ' . $vars['options'] . "\r\n";
    } else {
        $subject = 'Новое сообщение с сайта A&I Web Projects';
    }

    $is_sent = mail($to, $subject, $content, $headers);

    echo $is_sent ? 'sent' : 'failed';
}

