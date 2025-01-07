<?php


return [
    'children' => site()->children()->listed()->map(fn ($child) => [
        'uri' => $child->uri(),
        'title' => $child->title()->value(),
        'isListed' => $child->isListed(),
        'template' => $child->intendedTemplate()->name(),
        'childTemplate' => $child->hasChildren() ? $child->children()->first()->intendedTemplate()->name() : null,
    ])
    ->values(),
    'information' => [
        'color' => page('information')->infocolor()->value(),
        'children' => page('information')->children()->listed()
        ->map(fn ($child) => [
            'uri' => $child->uri(),
            'title' => $child->title()->value(),
            'isListed' => $child->isListed(),
            'template' => $child->intendedTemplate()->name(),
            'childTemplate' => $child->hasChildren() ? $child->children()->first()->intendedTemplate()->name() : null,
            'categories' => $child->categories() ? $child->categories()->toStructure()->map(fn ($note) => $note->category())->values() : null
        ])
        ->values()
    ],
    'works' => [
        'color' => page('arbeiten')->workcolor()->value(),
        'children' =>  page('arbeiten')->children()->published()
            ->map(fn ($child) => [
            'uri' => $child->uri(),
            'title' => $child->title()->value(),
            'isListed' => $child->isListed(),
            'template' => $child->intendedTemplate()->name(),
            'childTemplate' => $child->hasChildren() ? $child->children()->first()->intendedTemplate()->name() : null,
            'categories' => $child->categories() ? $child->categories()->toStructure()->map(fn ($note) => $note->category())->values() : null
        ])
        ->values(),
    ],
    'languages' => kirby()
        ->languages()
        ->toArray(),
    'title' => site()->title()->value(),
];
