<?php
  header('Content-Type: application/json');
  header('Access-Control-Allow-Origin: *');
  header('Cache-Control: no-cache, no-store, must-revalidate');
  header('Pragma: no-cache');
  header('Expires: 0');

  // Get request parameters
  $month = isset($_GET['month']) ? (int)$_GET['month'] : null;
  $year = isset($_GET['year']) ? (int)$_GET['year'] : 2024;
  $view = isset($_GET['view']) ? $_GET['view'] : 'months'; // 'months' or 'days'

  function getMonthName($monthNum) {
    $months = [
      1 => 'Jan', 2 => 'Feb', 3 => 'Mar', 4 => 'Apr', 5 => 'May', 6 => 'Jun',
      7 => 'Jul', 8 => 'Aug', 9 => 'Sep', 10 => 'Oct', 11 => 'Nov', 12 => 'Dec'
    ];

    return $months[$monthNum] ?? 'Jan';
  }

  function getDaysInMonth($month, $year) {
    return cal_days_in_month(CAL_GREGORIAN, $month, $year);
  }

  function generateMonthlyData($year) {
    $monthlyData = [];

    // Generate consistent data with seasonal trends
    for ($m = 1; $m <= 12; $m++) {
      // Seasonal patterns: higher usage in winter, lower in summer
      $baseChart1 = 0.6 + 0.3 * cos(($m - 1) * 2 * M_PI / 12);
      $baseChart2 = 0.4 + 0.2 * sin(($m - 3) * 2 * M_PI / 12);

      // Add some randomness
      $chart1Value = $baseChart1 + (rand(-10, 10) / 100);
      $chart2Value = $baseChart2 + (rand(-10, 10) / 100);

      // Keep in bounds
      $chart1Value = max(0.2, min(0.9, $chart1Value));
      $chart2Value = max(0.1, min(0.8, $chart2Value));

      $monthlyData[] = [
        'month' => $m,
        'year' => $year,
        'monthName' => getMonthName($m),
        'label' => getMonthName($m) . ' ' . substr($year, 2),
        'chart1' => round($chart1Value, 3),
        'chart2' => round($chart2Value, 3),
        'chart1Total' => round($chart1Value * 1000 + rand(50, 150), 0),
        'chart2Total' => round($chart2Value * 1000 + rand(30, 100), 0)
      ];
    }

    return $monthlyData;
  }

  function generateDailyData($month, $year) {
    $daysInMonth = getDaysInMonth($month, $year);
    $dailyData = [];

    // Get monthly baseline from consistent data
    $monthlyData = generateMonthlyData($year);
    $monthData = $monthlyData[$month - 1];

    $chart1Base = $monthData['chart1'];
    $chart2Base = $monthData['chart2'];

    // Generate daily fluctuations around monthly average
    for ($day = 1; $day <= $daysInMonth; $day++) {
      // Create intra-month trends
      $dayProgress = $day / $daysInMonth;

      // Slight trend throughout the month
      $chart1Trend = 0.1 * sin($dayProgress * 2 * M_PI);
      $chart2Trend = 0.05 * cos($dayProgress * 3 * M_PI);

      // Daily variations
      $chart1Daily = $chart1Base + $chart1Trend + (rand(-30, 30) / 1000);
      $chart2Daily = $chart2Base + $chart2Trend + (rand(-20, 20) / 1000);

      // Keep in bounds
      $chart1Daily = max(0.1, min(1.0, $chart1Daily));
      $chart2Daily = max(0.05, min(0.9, $chart2Daily));

      $dailyData[] = [
        'day' => $day,
        'month' => $month,
        'year' => $year,
        'date' => sprintf('%04d-%02d-%02d', $year, $month, $day),
        'label' => $day . ' ' . getMonthName($month),
        'chart1' => round($chart1Daily, 3),
        'chart2' => round($chart2Daily, 3)
      ];
    }

    return $dailyData;
  }

  // Generate response based on view type
  if ($view === 'days' && $month) {
    // Daily data for specific month
    $dailyData = generateDailyData($month, $year);

    $response = [
      'view' => 'days',
      'month' => $month,
      'year' => $year,
      'monthName' => getMonthName($month),
      'data' => $dailyData,
      'chart1' => [
        'color' => '#C01C1F', // Red from design system
        'name' => 'Network Usage',
        'unit' => 'GB'
      ],
      'chart2' => [
        'color' => '#143E95', // Blue from design system  
        'name' => 'Storage Usage',
        'unit' => 'GB'
      ]
    ];
  } else {
    // Monthly overview data
    $monthlyData = generateMonthlyData($year);

    $response = [
      'view' => 'months',
      'year' => $year,
      'data' => $monthlyData,
      'chart1' => [
        'color' => '#C01C1F',
        'name' => 'Network Usage',
        'unit' => 'GB'
      ],
      'chart2' => [
        'color' => '#143E95',
        'name' => 'Storage Usage',
        'unit' => 'GB'
      ]
    ];
  }

  echo json_encode($response);
?>