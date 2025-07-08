<?php
require_once 'pricing-engine.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: index.html');
    exit;
}

$clean = [
    'model'  => sanitize($_POST['model'] ?? ''),
    'lot'    => sanitize($_POST['lot'] ?? ''),
    'addons' => array_map('sanitize', $_POST['addons'] ?? [])
];

$total = calculate_price($clean);
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Your Roseview Quote</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="bg-light">
<div class="container py-5">
  <div class="card shadow-sm p-4">
    <h1 class="mb-4">Preliminary Quote</h1>
    <p class="mb-2"><strong>Model:</strong> <?= ucfirst($clean['model']) ?></p>
    <p class="mb-2"><strong>Requested Lot #:</strong> <?= $clean['lot'] ?: 'TBD' ?></p>
    <p class="mb-2"><strong>Add‑ons:</strong> <?= $clean['addons'] ? implode(', ', $clean['addons']) : 'None' ?></p>
    <hr>
    <p class="lead">Estimated base price (before HST): <strong>$<?= number_format($total, 2) ?></strong></p>
    <div class="alert alert-info small">
      <em>This is an unofficial estimate generated on <?= date('F j, Y') ?> and may vary based on final specifications and lot availability. A Roseview representative will contact you to confirm details.</em>
    </div>
    <a href="index.html" class="btn btn-secondary">Start Over</a>
  </div>
</div>
</body>
</html>
