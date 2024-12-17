<?php

$data = [
  'title' => $page->title()->value(),
  'metaTitle' => $page->customTitle()->or($page->title() . ' – ' . $site->title())->value(),
  'children' => $page->children()->published()
  ->map(fn ($child) => [
      'uri' => $child->uri(),
      'title' => $child->title()->value(),
      'isListed' => $child->isListed(),
      'template' => $child->intendedTemplate()->name(),
      'additionalraster' => $child->additionalraster()->toBoolean()->value(),
  ])
  ->values()

];

echo \Kirby\Data\Json::encode($data);