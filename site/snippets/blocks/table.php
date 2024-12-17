<?php 
$rows = $block->rows()->toStructure();
if($rows->isNotEmpty()):
?>
<table class="block-table">
  <?php foreach( $rows as $row): ?>
    <tr>
      <td class="timespan"><?= $row->timespan()->html() ?></td>
      <td class="description"><?= $row->description()->kt() ?></td>
    </tr>
  <?php endforeach ?>
</table>
<?php endif; ?>