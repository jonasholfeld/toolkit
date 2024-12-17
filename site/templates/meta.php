<?php

$data = [
  'title' => $page->title()->value(),
  'slug' => $page->slug(),
  'metaTitle' => $page->customTitle()->or($page->title() . ' – ' . $site->title())->value(),
  'children' => $page
    ->children()
    ->listed()
    ->sortBy('date', 'desc')
    ->map(fn ($note) => [
      'uri' => $note->uri(),
      'title' => $note->title()->value(),
      'date' => $note->date()->toDate('d.m.y'),
      'category' => $note->category()->value(),
      'author' => $note->author()->value(),
      'zeitraum' => $note->zeitraum()->value(),
      'cover' => ($image = $note->gallery()->toFile()) ? [
        'url' => $image->resize(800)->url(),
        'urlHome' => $image->resize(800)->url(),
        'alt' => $image->alt()->value()
      ] : null
    ])
    ->values(),
  'categories' => $page->categories()->toStructure()->map(fn ($note) => $note->category())
];

echo \Kirby\Data\Json::encode($data);
