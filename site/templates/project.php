<?php

$data = [
  'title' => $page->title()->value(),
  'slug' => $page->slug(),
  'metaTitle' => $page->customTitle()->or($page->title() . ' – ' . $site->title())->value(),
  'longtitle' => $page->longtitle()->kt()->value(),
  'categories' => $page->categories()->toStructure()->map(fn ($category) => ['name' => $category->name()->value(), 'color' => $category->color()->value(), 'invertOnHover' => $category->invertOnHover()->toBool()])->values(),
  'children' => $page
    ->children()
    ->listed()
    ->sortBy('title', 'asc')
    ->map(fn ($note) => [
      'uri' => $note->uri(),
      'title' => $note->displaytitle()->value() != '' ? $note->displaytitle()->kt()->value() : '<p>'.$note->title()->value().'</p>',
      'category' => $note->category()->value(),
    ])
    ->values(),
];

echo \Kirby\Data\Json::encode($data);
