<?php
namespace Config;

use Default\Handler\HomeHandler;
use Default\Handler\NotAllowedHandler;
use Default\Handler\NotFoundHandler;
use Solluzi\Application\Route;

$route = new Route();

$route->notFound(new NotFoundHandler());
$route->methodNotAllowed(new NotAllowedHandler());

/*
|----------------------------------------------------------------------------------------------------
| Base
|----------------------------------------------------------------------------------------------------
|
| Sets the API main base path
|
*/
$route->path('');

/*
|----------------------------------------------------------------------------------------------------
| Routes definition
|----------------------------------------------------------------------------------------------------
|
| Routes that can be accesses lonely without beeing in specific module
|
*/
$route->get('/', HomeHandler::class, 'index')->run();
