<?php

declare(strict_types=1);

return [
    'main' => [
        'type'    => env('MAIN_DB_TYPE'),
        'host'    => env('MAIN_DB_HOST'),
        'user'    => env('MAIN_DB_USER'),
        'pass'    => env('MAIN_DB_PASS'),
        'port'    => env('MAIN_DB_PORT'),
        'name'    => env('MAIN_DB_NAME'),
        'charset' => env('MAIN_DB_CHAR'),
    ],
    'log'     => [
        'type'    => env('LOG_DB_TYPE'),
        'host'    => env('LOG_DB_HOST'),
        'user'    => env('LOG_DB_USER'),
        'pass'    => env('LOG_DB_PASS'),
        'port'    => env('LOG_DB_PORT'),
        'name'    => env('LOG_DB_NAME'),
        'charset' => env('LOG_DB_CHAR')
    ],
    'blog'     => [
        'type'    => env('BLOG_DB_TYPE'),
        'host'    => env('BLOG_DB_HOST'),
        'user'    => env('BLOG_DB_USER'),
        'pass'    => env('BLOG_DB_PASS'),
        'port'    => env('BLOG_DB_PORT'),
        'name'    => env('BLOG_DB_NAME'),
        'charset' => env('BLOG_DB_CHAR')
    ],
    'service'     => [
        'type'    => env('SERVICE_DB_TYPE'),
        'host'    => env('SERVICE_DB_HOST'),
        'user'    => env('SERVICE_DB_USER'),
        'pass'    => env('SERVICE_DB_PASS'),
        'port'    => env('SERVICE_DB_PORT'),
        'name'    => env('SERVICE_DB_NAME'),
        'charset' => env('SERVICE_DB_CHAR')
    ],
    'finance'     => [
        'type'    => env('FINANCE_DB_TYPE'),
        'host'    => env('FINANCE_DB_HOST'),
        'user'    => env('FINANCE_DB_USER'),
        'pass'    => env('FINANCE_DB_PASS'),
        'port'    => env('FINANCE_DB_PORT'),
        'name'    => env('FINANCE_DB_NAME'),
        'charset' => env('FINANCE_DB_CHAR')
    ]
];