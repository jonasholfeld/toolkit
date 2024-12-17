<?php
/** @var \Kirby\Cms\App $kirby */
/** @var \Kirby\Cms\Page $page */
?>
<!DOCTYPE html>
<html lang="en">
<head>

  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <title><?= $page->customTitle()->or($page->title() . ' – ' . $site->title()) ?></title>

  <?php /* See https://github.com/johannschopplich/kirby-extended/blob/main/docs/meta.md */ ?>
  <?php $meta = $page->meta() ?>
  <?= $meta->robots() ?>
  <?= $meta->jsonld() ?>
  <?= $meta->social() ?>

  <meta name="theme-color" content="#e0f1f0">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="default">
  <meta name="apple-mobile-web-app-title" content="<?= $site->title()->escape() ?>">

  <link rel="manifest" href="/manifest.json">
  <link rel="shortcut icon" type="image/png" href="/img/favicon.png"/>
  <link rel="icon" href="/img/favicon.png" type="image/svg+xml">

  <?= vueKit()->preloadJson($page->uri()) ?>
  <?= vueKit()->preloadModule($page->intendedTemplate()->name()) ?>

  <?= vueKit()->js() ?>
  <?= vueKit()->css() ?>
  <?php snippet('scss'); ?>
</head>
<body>

  <div id="app"></div>
  <script id="site-data" type="application/json"><?= \Kirby\Data\Json::encode(vueKit()->getSite()) ?></script>

</body>
</html>
