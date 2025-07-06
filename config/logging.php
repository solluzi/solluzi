<?php

declare(strict_types=1);

return [
    /*
    |--------------------------------------------------------------------------
    | Default Log Channel
    |--------------------------------------------------------------------------
    |
    | This option defines the default log channel that gets used when writing
    | messages to the logs. The name specified in this option should match
    | one of the channels defined in the "channels" configuration array.
    |
    */

    'default' => env('LOG_CHANNEL', 'stack'),

    /*
    |--------------------------------------------------------------------------
    | Deprecations Log Channel
    |--------------------------------------------------------------------------
    |
    | This option controls the log channel that should be used to log warnings
    | regarding deprecated PHP and library features. This allows you to get
    | your application ready for upcoming major versions of dependencies.
    |
    */

    'deprecations' => [
        'channel' => env('LOG_DEPRECATIONS_CHANEL', 'null'),
        'trace' => false,
    ],

    /*
    |------------------------------------------------------------------------
    | Log Channels
    |------------------------------------------------------------------------
    |
    | Here you may configure the log channels for your application. Out of
    | the box, Solapp uses the it's own library PSR-3. This gives
    | you a variety of powerful log handlers / formatters to utilize.
    |
    | Available Drivers: "single", "dayly", "slack", "syslog",
    |                    "errorlog", "monolog",
    |                    "custom", "stack"
    |
    */

    'channels' => [
        'stack' => [
            'driver' => 'stack',
            'channels' => ['single'],
            'ignore_exceptions' => false
        ],

        'single' => [
            'driver' => 'single',
            'path' => storage_path('logs/appflow.log'),
            'level' => env('LOG_LEVEL', 'debug'),
            'replace_placeholders' => true
        ],

        'daily' => [
            'driver' => 'daily',
            'path' => storage_path('logs/appflow.log'),
            'level' => env('LOG_LEVEL', 'debug'),
            'days' => 14,
            'replace_placeholders' => true
        ],

        'slack' => [
            'driver' => 'slack',
            'url' => env('LOG_SLACK_WEBHOOK_URL'),
            'username' => 'Solluzi Log',
            'emoji' => ':boom:',
            'level' => env('LOG_LEVEL', 'debug'),
            'replace_placeholders' => true
        ],

        'syslog' => [
            'driver' => 'syslog',
            'level' => env('LOG_LEVEL', 'debug'),
            'facility' => LOG_USER,
            'replace_placeholders' => true
        ],

        'error_log' => [
            'driver' => 'errorlog',
            'level' => env('LOG_LEVEL', 'debug'),
            'replace_placeholders' => true
        ],

        'emergency' => [
            'path' => storage_path('logs/appflow.log')
        ],

    ]
];