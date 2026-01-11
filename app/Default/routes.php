<?php

declare(strict_types=1);

use Default\Handler\HomeHandler;

$app->get('/', HomeHandler::class, 'home:index');
