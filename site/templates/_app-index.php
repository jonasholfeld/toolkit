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

  <meta name="theme-color" content="#d9d9d9">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="default">
  <meta name="apple-mobile-web-app-title" content="<?= $site->title()->escape() ?>">

  <link rel="manifest" href="/manifest.json">

  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">

  <link rel="apple-touch-icon" sizes="57x57" href="/light_apple-icon-57x57.png" media="(prefers-color-scheme: light)">
  <link rel="apple-touch-icon" sizes="60x60" href="/light_apple-icon-60x60.png" media="(prefers-color-scheme: light)">
  <link rel="apple-touch-icon" sizes="72x72" href="/light_apple-icon-72x72.png" media="(prefers-color-scheme: light)">
  <link rel="apple-touch-icon" sizes="76x76" href="/light_apple-icon-76x76.png" media="(prefers-color-scheme: light)">
  <link rel="apple-touch-icon" sizes="114x114" href="/light_apple-icon-114x114.png" media="(prefers-color-scheme: light)">
  <link rel="apple-touch-icon" sizes="120x120" href="/light_apple-icon-120x120.png" media="(prefers-color-scheme: light)">
  <link rel="apple-touch-icon" sizes="144x144" href="/light_apple-icon-144x144.png" media="(prefers-color-scheme: light)">
  <link rel="apple-touch-icon" sizes="152x152" href="/light_apple-icon-152x152.png" media="(prefers-color-scheme: light)">
  <link rel="apple-touch-icon" sizes="180x180" href="/light_apple-icon-180x180.png" media="(prefers-color-scheme: light)">
  <link rel="icon" type="image/png" sizes="192x192"  href="/light_android-icon-192x192.png" media="(prefers-color-scheme: light)">
  <link rel="icon" type="image/png" sizes="32x32" href="/light_favicon-32x32.png" media="(prefers-color-scheme: light)">
  <link rel="icon" type="image/png" sizes="96x96" href="/light_favicon-96x96.png" media="(prefers-color-scheme: light)">
  <link rel="icon" type="image/png" sizes="16x16" href="/light_favicon-16x16.png" media="(prefers-color-scheme: light)">

  <link rel="apple-touch-icon" sizes="57x57" href="/dark_apple-icon-57x57.png" media="(prefers-color-scheme: dark)">
  <link rel="apple-touch-icon" sizes="60x60" href="/dark_apple-icon-60x60.png" media="(prefers-color-scheme: dark)">
  <link rel="apple-touch-icon" sizes="72x72" href="/dark_apple-icon-72x72.png" media="(prefers-color-scheme: dark)">
  <link rel="apple-touch-icon" sizes="76x76" href="/dark_apple-icon-76x76.png" media="(prefers-color-scheme: dark)">
  <link rel="apple-touch-icon" sizes="114x114" href="/dark_apple-icon-114x114.png" media="(prefers-color-scheme: dark)">
  <link rel="apple-touch-icon" sizes="120x120" href="/dark_apple-icon-120x120.png" media="(prefers-color-scheme: dark)">
  <link rel="apple-touch-icon" sizes="144x144" href="/dark_apple-icon-144x144.png" media="(prefers-color-scheme: dark)">
  <link rel="apple-touch-icon" sizes="152x152" href="/dark_apple-icon-152x152.png" media="(prefers-color-scheme: dark)">
  <link rel="apple-touch-icon" sizes="180x180" href="/dark_apple-icon-180x180.png" media="(prefers-color-scheme: dark)">
  <link rel="icon" type="image/png" sizes="192x192"  href="/dark_android-icon-192x192.png" media="(prefers-color-scheme: dark)">
  <link rel="icon" type="image/png" sizes="32x32" href="/dark_favicon-32x32.png" media="(prefers-color-scheme: dark)">
  <link rel="icon" type="image/png" sizes="96x96" href="/dark_favicon-96x96.png" media="(prefers-color-scheme: dark)">
  <link rel="icon" type="image/png" sizes="16x16" href="/dark_favicon-16x16.png" media="(prefers-color-scheme: dark)">

  <link rel="manifest" href="/manifest.json">

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
