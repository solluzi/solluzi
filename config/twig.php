<?php

declare(strict_types=1);

return [
    'default' => [
        'templates' => [
            path('templates'),             // raiz
            'site'  => path('app/Website/View'),   // @Site
        ],
        'cache' => path('storage/twig'),
    ],
    'extensions' => [
        'global' => [],
        'filters' => [],
        'functions' => [],
        'tokenParsers' => [],
        'operators' => [
            'unary'  => [], // ex: ['not' => ['precedence'=>50, 'class'=>MyNotTokenParser::class]]
            'binary' => [], // ex: ['and' => ['precedence'=>20, 'class'=>MyAndNode::class, 'associativity'=>'left']]
        ],
        'tests' => []
    ]
];
