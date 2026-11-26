<?php
    // Database settings.
    // Local XAMPP values by default. On the live server, put the hosting
    // database details in config/db_production.php (that file is not in git).
    $settings = [
        'host'     => 'localhost',
        'port'     => '3306',
        'database' => 'tawa_management_application',
        'username' => 'root',
        'password' => '',
    ];

    $production = __DIR__ . '/db_production.php';
    if (file_exists($production)) {
        $settings = array_merge($settings, require $production);
    }

    return $settings;
?>
