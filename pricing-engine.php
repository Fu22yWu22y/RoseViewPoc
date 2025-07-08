<?php
function sanitize($value) {
    return htmlspecialchars(trim($value), ENT_QUOTES, 'UTF-8');
}

function get_prices() {
    return [
        'models' => [
            'lily'   => 349900,
            'ivy'    => 369900,
            'iris'   => 409900,
            'orchid' => 459900
        ],
        'addons' => [
            'garage'   => 35000,
            'basement' => 45000,
            'deck'     => 15000
        ]
    ];
}

function calculate_price($data) {
    $prices = get_prices();
    $model = $data['model'] ?? 'lily';
    $addons = $data['addons'] ?? [];
    $total = $prices['models'][$model] ?? 0;
    foreach ($addons as $addon) {
        if (isset($prices['addons'][$addon])) {
            $total += $prices['addons'][$addon];
        }
    }
    return $total;
}
?>
