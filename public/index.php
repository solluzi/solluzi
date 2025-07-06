<?php

declare(strict_types=1);


use Solluzi\Application\Cors;
use Solluzi\Application\ErrorDisplay;

/**
 * @author Mauro Joaquim Miranda <mauro.miranda@solluzi.com.br>
 * @license MIT
 * @package public
 * @copyright 2018 Solluzi Tecnologia da Informação LTDA
 */

/**
*--------------------------------------------------------------------------
*                       REGISTRA O AUTOLOADER
*--------------------------------------------------------------------------
*
* O Composer fornece um carregador de classes gerado automaticamente e 
* conveniente para esta aplicação. precisamos utilizá-lo! Vamos 
* simplesmente chamá-lo automaticamente, desta feita não precisamos 
* carregar manualmente nossas classes.
*
*/
require dirname(__DIR__, 1) . '/bootstrap.php';



/**
*--------------------------------------------------------------------------
*                               CORS
*--------------------------------------------------------------------------
*
* It's necessary, for api to accept outside connections, to set all cors
* directives, and this part of the code will interpret it.
* preset option for allowed origins for our API server
*
*/

$allowedOrigins   = explode(';', env('ALLOWED_DOMAINS'));
$allowedMethods   = explode('|', env('ALLOWED_METHODS'));
$allowedHeaders   = ["Content-Type", "Authorization"];
$exposeHeaders    = explode('|', env('EXPOSE_HEADERS'));
$allowCredentials = env('ALLOWED_CREDENTIALS');

$cors = new Cors($allowedOrigins, $allowedMethods, $allowedHeaders, $allowCredentials, $exposeHeaders);
$cors->handle();

/**
 *--------------------------------------------------------------------------
 *                          ERROR REPORTING
 *--------------------------------------------------------------------------
 *
 * Different environments will require different levels of error reporting.
 * By default development will show errors but testing and live will hide them.
 *
 */
new ErrorDisplay(APP_ENVIRONMENT);

/**
 *--------------------------------------------------------------------------
 *                           ROUTES TREATMENT
 *--------------------------------------------------------------------------
 *
 * This section treats all routes and make navigation possible
 *
 */
require_once APP_CONFIGS . '/routes.php';


