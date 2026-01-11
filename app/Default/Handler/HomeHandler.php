<?php

declare(strict_types=1);

namespace Default\Handler;

use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\RequestHandlerInterface;
use Solluzi\Diactoros\Response\RedirectResponse;
use Solluzi\View\TemplateRenderer;

class HomeHandler implements RequestHandlerInterface
{
    private TemplateRenderer $templateRenderer;

    public function __construct(TemplateRenderer $templateRenderer)
    {
        $this->templateRenderer = $templateRenderer;
    }

    public function handle(ServerRequestInterface $request): ResponseInterface
    {
        try {
            $params = ['welcome' => 'Welcome to', 'framework' => 'Kamba Framework!'];
            return $this->templateRenderer->render('@framework/home.html.twig', $params);
        } catch (\Throwable $th) {
            $targetUri = '/500';
            return new RedirectResponse($targetUri, 302);
        }
    }
}
