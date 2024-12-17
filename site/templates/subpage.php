<?php

$blocks = [];
foreach($page->editor()->toBlocks() as $block) {
    array_push($blocks, $block->toHtml());
}

$data = [
  'title' => $page->title()->value(),
  'metaTitle' => $page->customTitle()->or($page->title() . ' – ' . $site->title())->value(),
  'text' => $blocks
];

echo \Kirby\Data\Json::encode($data);
