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
      'thumbnail' => $child->gallery()->toFile()?->resize(1000)->url(),
      'size' => $child->size()->isEmpty() ? 'small' : $child->size()->value(),
      'ratio' => $child->gallery()->toFile()?->ratio(),
  ])
  ->values(),
  'additionalraster' => $page->additionalraster()->toBoolean()->value(),
];

echo \Kirby\Data\Json::encode($data);