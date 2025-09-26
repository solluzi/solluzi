<?php

declare(strict_types=1);

use Solluzi\CommandCall;

return function ($app) {
    return [
        "help" => [
            "description" => _("Displays a list of available commands (eg. php craft help OR php craft)."),
            "callback" => function (CommandCall $call) use ($app) {
                $app->printSignature();
            },
        ],
        "cache:clear" => [
            "description" => _("Clear the application' cache (eg. php craft cache:clear)."),
            "callback" => function () {
                array_map('unlink', glob('storage/cache/*'));
                echo "Cache cleared.\n";
            },
        ],
    ];
};
