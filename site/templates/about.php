<?php

$gallery = [];
foreach($page->gallery()->toFiles() as $file) {
    array_push($gallery, [
        'url' => $file->resize(800)->url(), 
        'alt' => $file->alt()->value(), 
        'photographer' => $file->photographer()->value(),
        'caption' => $file->caption()->value()
    ]);
}

$children = [];
$pubCount = 0;
foreach($page->children()->listed()->sortBy('year', 'desc') as $child) {
    array_push($children, [
        'uri' => $child->uri(),
        'title' => $child->title()->value(),
        'category' => $child->category()->value(),
        'template' => $child->template(),
        'linkto' => page($child->entity()?->value())->id(),
        'year' => $child->year()->value(),
        'furtherinfo' => $child->furtherinfo()?->kt()->value()
    ]);
}

$data = [
  't' => $page->intendedTemplate(),
  'children' => $children,
  'welcometext' => $page->welcometext()->value(),
  'slug' => $page->slug(),
  'title' => $page->title()->value(),
  'metaTitle' => $page->customTitle()->or($page->title() . ' – ' . $site->title())->value(),
  'date' => $page->date()->toDate('d F Y'),
  'text' => $page->text()->kt()->value(),
  'infotext' => $page->infotext()->kt()->value(),
  'zeitraum' => $page->zeitraum()->value(),
  'author' => $page->author()->value(),
  'gallery' => $gallery
];

echo \Kirby\Data\Json::encode($data);
