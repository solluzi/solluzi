<?php
declare (strict_types=1);

use Solluzi\Diactoros\Response\SapiEmitter;
use Solluzi\Diactoros\ServerRequestFactory;
use Solluzi\Router\AltoRouter;
use Solluzi\Router\Container\Container;
use Solluzi\Router\Middleware\CorsMiddleware;
use Solluzi\Router\Middleware\DispatchMiddleware;
use Solluzi\Router\Middleware\MethodNotAllowedMiddleware;
use Solluzi\Router\Middleware\NotFoundHandler;
use Solluzi\Router\Middleware\UrlHelperMiddleware;
use Solluzi\Router\Router;

require dirname(__DIR__, 1) . '/bootstrap.php';

// Carrega as variaveis de ambiente do arquivo .env

$container = new Container();
$app = new Router($container);

$container->set(AltoRouter::class, function () use ($app) {
    return $app->getRouter();
});

$alllowOrigins = $_ENV['CORS_ALLOWED_ORIGINS'] ?? '*';

$allowedOriginsArray = array_map('trim', explode(';', $alllowOrigins));

$app->pipe(new CorsMiddleware($allowedOriginsArray));
$app->pipe(UrlHelperMiddleware::class);
$app->pipe(new DispatchMiddleware($app->getRouter(), $container));
$app->pipe(MethodNotAllowedMiddleware::class);
$app->pipe(NotFoundHandler::class);

$app->loadRoutes();

$request = ServerRequestFactory::fromGlobals();

$response = $app->run($request);

$emitter = new SapiEmitter();
$emitter->emit($response);