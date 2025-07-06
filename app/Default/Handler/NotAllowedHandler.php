<?php
declare(strict_types=1);

namespace Default\Handler;

use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\RequestHandlerInterface;
use Solluzi\Application\HttpStatusCode;

class NotAllowedHandler implements RequestHandlerInterface
{
    public function handle(ServerRequestInterface $request) : ResponseInterface
    {
        return response()->empty(HttpStatusCode::METHOD_NOT_ALLOWED);
    }
}
