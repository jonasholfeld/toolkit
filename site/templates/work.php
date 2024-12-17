<?php

$data = [
  'title' => $page->title()->value(),
  'metaTitle' => $page->customTitle()->or($page->title() . ' – ' . $site->title())->value(),
  'children' => $page->children()->published(),
  'color' => !$page->color()->isEmpty() ? $page->color()->value() : 'white',
  'coverimage' => $page->gallery()->toFile()->resize(2000)->url(),
  'coverimageRatio' => $page->gallery()->toFile()->ratio(),
  'infofield' => $page->infofield()->kt()->value(),
  'ratio' => $page->ratio()->kt()->value(),
  'year' => $page->year()->kt()->value(),
  'image-ratio' => $page->gallery()->toFile()->ratio(),
];

echo \Kirby\Data\Json::encode($data);