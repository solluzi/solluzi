<?php
declare(strict_types=1);

namespace Default\Handler;

use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\RequestHandlerInterface;

class HomeHandler implements RequestHandlerInterface
{
    public function handle(ServerRequestInterface $request) : ResponseInterface
    {
        //return response()->json(['teste' => 'ola']);
        return view('default.home', ['variable' => 'Hello World']);
    }
}
