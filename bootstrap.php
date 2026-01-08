<?php
use Dotenv\Dotenv;
use Solluzi\Router\Container\Container;
use Solluzi\Router\Router;
use Solluzi\View\TemplateRenderer;

$language = 'en_US.utf8';
if(isset($_COOKIE['locale'])){
    $language = $_COOKIE['locale'];
}

//Global constants
define('APP_NAME'       , 'solluzi');
define('APP_DIR'        ,  __DIR__);
define('APP_LOCALE'     , APP_DIR . '/locales');
define('APP_DOMAIN'     , 'messages');
define('APP_STORAGE'    , APP_DIR . '/storage');
define('APP_RESOURCE'   , APP_DIR . '/resources');
define('APP_CONFIGS'    , APP_DIR . '/config');
define('APP_LANG'       , $language);
define('APP_CONSOLE'    , APP_DIR . '/console');
define('TENANT'         , getenv('TENANT'));

putenv("LANG=" . APP_LANG);
putenv("LANGUAGE=". APP_LANG);

// Set the desired locale
setlocale(LC_ALL, APP_LANG);
		
bindtextdomain(APP_DOMAIN, APP_LOCALE);
textdomain(APP_DOMAIN);
bind_textdomain_codeset(APP_DOMAIN, 'UTF-8');

// MODULES

require_once "status_code_const.php";

require APP_DIR . '/vendor/autoload.php';

/**
*--------------------------------------------------------------------------
*                       CARREGAMENTO DO DOTENV
*--------------------------------------------------------------------------
*
* This part of the code works to load every environment variables that
* is setled on the .env file. Every configuration of the code must be
* on it so the framework can work properly.
*
*/
$dotenv = Dotenv::createUnsafeImmutable(APP_DIR);
$dotenv->load();


define('APP_ENVIRONMENT', env('ENVIRONMENT'));

$container = new Container();
$app = new Router($container);


// registra o TemplateRenderer só se existir
if (class_exists(TemplateRenderer::class)) {
    $container->set(TemplateRenderer::class, static function (Container $c) {
        try {
            return new TemplateRenderer(); // sua versão que lê config_path('twig.php')
        } catch (\Throwable $e) {
            // dá um erro decente só quando alguém tentar usar
            throw new \RuntimeException(
                'Falha ao inicializar o TemplateRenderer/Twig. Verifique config twig.php, paths e cache.',
                0,
                $e
            );
        }
    });
}

$container->set(AltoRouter::class, function () use ($app) {
    return $app->getRouter();
});


