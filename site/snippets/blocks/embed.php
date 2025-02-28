<?php /** @var \Kirby\Cms\Block $block */ ?>
<div class="embed">
<?php if($embed = $block->embed()->toEmbed()) {
    echo $embed->code();
} ?>
</div>