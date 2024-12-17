<?php

$locations = [];
foreach($page->locations()->toStructure() as $location) {
    $images = [];
    foreach($location->locationimages()->toFiles() as $singleFile){
        array_push($images, $singleFile->resize(800)->url());
    }
    array_push($locations, 
        [
            'headline' => $location->headline()->value(),
            'datefield' => $location->datefield()->value(),
            'images' => $images, 'id' => 'location-id-'.$location->id(),
            'description' => $location->description()->value(),
            'currentlocation' => $location->currentlocation()->toBoolean()->value()
        ]
    );
}

$data = [
  'title' => $page->title()->value(),
  'metaTitle' => $page->customTitle()->or($page->title() . ' – ' . $site->title())->value(),
  'locations' => $locations,
];

echo \Kirby\Data\Json::encode($data);
