<?php

$children = [];
$pubCount = 0;
foreach($page->children()->listed() as $child) {
    if($child->publication()->toBool()) {
        $pubCount++;
        if($pubCount %4 == 0) {
            $pubClass = 'zero';
        }
        if($pubCount %4 == 1) {
            $pubClass = 'one';
        }
        if($pubCount %4 == 2) {
            $pubClass = 'two';
        }
        if($pubCount %4 == 3) {
            $pubClass = 'three';
        }
        array_push($children, [
            'pubcount' => $pubClass,
            'uri' => $child->uri(),
            'title' => $child->title()->value(),
            'date' => $child->date()->toDate('d F Y'),
            'category' => $child->category()->value(),
            'isPublication' => $child->publication()->value(),
            'cover' => ($image = $child->gallery()->toFile()) ? [
              'url' => $image->resize(800)->url(),
              'urlHome' => $image->resize(800)->url(),
              'alt' => $image->alt()->value()
            ] : null
            ]);
    } else {
        array_push($children, [
            'uri' => $child->uri(),
            'title' => $child->title()->value(),
            'date' => $child->date()->toDate('d F Y'),
            'category' => $child->category()->value(),
            'isPublication' => $child->publication()->value(),
            'cover' => ($image = $child->gallery()->toFile()) ? [
              'url' => $image->resize(800)->url(),
              'urlHome' => $image->resize(800)->url(),
              'alt' => $image->alt()->value()
            ] : null
            ]);
    }
}

$data = [
  'title' => $page->title()->value(),
  'metaTitle' => $page->customTitle()->or($page->title() . ' – ' . $site->title())->value(),
  'children' => $children,
  'categories' => $page->categories()->toStructure()->map(fn ($note) => $note->category())
];

echo \Kirby\Data\Json::encode($data);
