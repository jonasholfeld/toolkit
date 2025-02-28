<?php

/** @var \Kirby\Cms\Block $block */
$alt     = $block->alt();
$caption = $block->caption();
$crop    = $block->crop()->isTrue();
$link    = $block->link();
$src     = null;
$width   = $block->imageWidth() == "1/1" ? 'full-width' : 'half-width';

if ($block->location() == 'web') {
    $src = $block->src()->esc();
} elseif ($image = $block->image()->toFile()) {
    $alt = $alt->or($image->alt());
    $src = $image->resize(1300)->url();
    $ratio   = $image->ratio() > 1 ? 'landscape' : 'portrait';

}

?>
<?php if ($src): ?>
<figure<?= Html::attr(['data-ratio' => $ratio, 'data-crop' => $crop], null, ' ') ?> class="<?= $ratio ?>">
<div class="img-caption-wrapper">
  <?php if ($link->isNotEmpty()): ?>
  <a href="<?= Str::esc($link->toUrl()) ?>">
    <img src="<?= $src ?>" data-uncropped="<?= $image->url() ?>" alt="<?= $alt->esc() ?>" class="image-block <?= $width ?>">
  </a>
  <?php else: ?>
  <img src="<?= $src ?>" data-uncropped="<?= $image->url() ?>" alt="<?= $alt->esc() ?>" class="image-block <?= $width ?>">
  <?php endif ?>

  <?php if ($caption->isNotEmpty()): ?>
  <figcaption>
    <?= $caption ?>
  </figcaption>
  <?php endif ?>
  </div>
</figure>
<?php endif ?>