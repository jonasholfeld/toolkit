<?php


return [
    'children' => site()->children()->listed()->map(fn ($child) => [
        'uri' => $child->externallink()->value() ? $child->externallink()->value() : $child->uri(),
        'title' => $child->displaytitle()->isEmpty() ? $child->title()->value() : $child->displaytitle()->kt()->value(),
        'puretitle' => $child->title()->value(),
        'isListed' => $child->isListed(),
        'template' => $child->intendedTemplate()->name(),
        'childTemplate' => $child->hasChildren() ? $child->children()->first()->intendedTemplate()->name() : null,
        'color' => $child->color()->value(),
        'fontcolor' => $child->fontcolor()->value(),
        'externallink' => $child->externallink()->value()
    ])
    ->values(),
    'title' => site()->title()->value(),
];
