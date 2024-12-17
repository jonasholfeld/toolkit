<?php

$gallery = [];
foreach($page->gallery()->toFiles() as $file) {
    array_push($gallery, [
        'url' => $file->resize(800)->url(),
        'bigurl' => $file->resize(1000)->url(),
        'alt' => $file->alt()->value(), 
        'photographer' => $file->photographer()->value(),
        'caption' => $file->caption()->kt()->value()
    ]);
}

$data = [
  'buylink' => $page->buylink()->value(),
  'endnotes' => $page->endnotes()->kt()->value(),
  'slug' => $page->slug(),
  'title' => $page->title()->value(),
  'metaTitle' => $page->customTitle()->or($page->title() . ' – ' . $site->title())->value(),
  'date' => $page->date()->toDate('d F Y'),
  'text' => $page->text()->kt()->value(),
  'infotext' => $page->infotext()->kt()->value(),
  'zeitraum' => $page->zeitraum()->value(),
  'author' => $page->author()->value(),
  'gallery' => $gallery,
  'category' => $page->category()->value()
];

echo \Kirby\Data\Json::encode($data);
