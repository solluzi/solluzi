<?php
use Dotenv\Dotenv;

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
define('APP_LANG'       , ". $language .");
define('APP_CONSOLE'    , APP_DIR . '/console');

putenv("LANG=" . APP_LANG);
putenv("LANGUAGE=". APP_LANG);

// Set the desired locale
setlocale(LC_ALL, APP_LANG);
		
bindtextdomain(APP_DOMAIN, APP_LOCALE);
textdomain(APP_DOMAIN);
bind_textdomain_codeset(APP_DOMAIN, 'UTF-8');

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