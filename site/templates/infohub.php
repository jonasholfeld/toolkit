<?php

$data = [
  'title' => $page->title()->value(),
  'metaTitle' => $page->customTitle()->or($page->title() . ' – ' . $site->title())->value(),
  'children' => $page->children()->listed()->map(fn ($child) => [
    'uri' => $child->uri(),
    'title' => $child->title()->value(),
    'slug' => $child->slug(),
    'blocks' => $child->blockseditor()->toBlocks()->map(fn ($block) => $block->toHtml())->values() ])->values(),
];

echo \Kirby\Data\Json::encode($data);