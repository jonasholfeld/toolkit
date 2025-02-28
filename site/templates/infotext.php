<?php

$blocks = '';
$wrapBlocks = 0;
$endBlocks = 0;
foreach($page->editor()->toBlocks() as $block) {
    // array_push($blocks, $block->toHtml()->collectFootnotes());
    if($block->type() == "readmore"):
        $wrapBlocks++;
    endif;
    if($block->type() == "readmoreend"):
        $endBlocks++;
    endif;
}
$blocks = $page->editor()->toBlocks()->collectFootnotes();
if($wrapBlocks > $endBlocks):
    foreach (range(0, $wrapBlocks - $endBlocks) as $i):
        $blocks = $blocks.'</div>';
    endforeach;
endif;
$footnotes = Footnotes::footnotes();

if($page->category()->value() == 'Glossar') {
    $blocks = '';
    $glossarBlocks = '';
    foreach($page->parent()->children()->filterBy('category', 'Glossar') as $glossarpage) {
        $subPageblocks = '<div class="glossar-wrapper"><h2 id="'.$glossarpage->slug().'">'.$glossarpage->title().'</h2><div class="overflow-wrapper"><div class="inner-wrapper">';
        $subPagewrapBlocks = 0;
        $subPageendBlocks = 0;
        foreach($glossarpage->editor()->toBlocks() as $block) {
            // array_push($blocks, $block->toHtml()->collectFootnotes());
            if($block->type() == "readmore"):
                $subPagewrapBlocks++;
            endif;
            if($block->type() == "readmoreend"):
                $subPageendBlocks++;
            endif;
        }
        $subPageblocks = $subPageblocks.$glossarpage->editor()->toBlocks()->collectFootnotes();
        if($subPagewrapBlocks > $subPageendBlocks):
            foreach (range(0, $subPagewrapBlocks - $subPageendBlocks) as $i):
                $subPageblocks = $subPageblocks.'</div>';
            endforeach;
        endif;
        $related = '<div class="relateds-wrapper">';
        foreach($glossarpage->related()->split() as $slug) {
            $relatedPageObejct = page($slug);
            $title = $relatedPageObejct->displaytitle()->value() != '' ? $relatedPageObejct->displaytitle()->kt()->value() : $relatedPageObejct->title()->value();
            $related = $related.'<a href='.$relatedPageObejct->url().'>'.$title.'</a>';
        }
        
        $glossarBlocks = $glossarBlocks.$subPageblocks.$related.'</div></div></div></div>';
        $footnotes = $footnotes.Footnotes::footnotes();
    }
    $blocks = $blocks.$glossarBlocks;
}

$data = [
  'title' => $page->displaytitle()->value() != '' ? $page->displaytitle()->kt()->value() : '<p>'.$page->title()->value().'</p>',
  'metaTitle' => $page->customTitle()->or($page->title() . ' – ' . $site->title())->value(),
  'text' => $blocks,
  'footnotes' => $footnotes,
  'slug' => $page->slug(),
];

echo \Kirby\Data\Json::encode($data);
