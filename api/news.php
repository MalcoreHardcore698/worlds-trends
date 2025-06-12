<?php
  header('Content-Type: application/json');
  header('Access-Control-Allow-Origin: *');
  header('Cache-Control: no-cache, no-store, must-revalidate');
  header('Pragma: no-cache');
  header('Expires: 0');

  // Generate test news data
  function generateNewsData() {
      $categories = ['Climate', 'Asia', 'US & Canada', 'Sport', 'Culture', 'London'];
      $timeAgo = ['2 hrs ago', '4 hrs ago', '1 day ago', '8 hrs ago', '13 hrs ago', '2 days ago'];

      $featuredNews = [
          'id' => 1,
          'title' => 'Matt Gaetz quits House after he is picked by Trump for attorney general role',
          'image' => 'https://picsum.photos/800/600?random=1',
          'category' => 'US & Canada',
          'timeAgo' => '1 hr ago'
      ];

      $trendingNews = [
          [
              'id' => 2,
              'title' => "World's largest coral found...",
              'description' => 'The coral could be 500 years old and is bigger than a blue whale, scientists say',
              'timeAgo' => '2 hrs ago',
              'category' => 'Climate'
          ],
          [
              'id' => 4,
              'title' => 'Menopause, the other mens...',
              'description' => 'In India, where conversation on menstruation is still taboo, menopause awareness is far behind',
              'timeAgo' => '4 hrs ago',
              'category' => 'Asia'
          ],
          [
              'id' => 5,
              'title' => 'Why Canada could become...',
              'description' => 'With its rich resources, uranium mining companies want Canada to play a key role in nuclear energy',
              'timeAgo' => '1 hr ago',
              'category' => 'US & Canada'
          ],
          [
              'id' => 6,
              'title' => "Why does Pharrell's biopic s...",
              'description' => 'The musician was fined $5m in a plagiarism lawsuit, but a film about his life doesn\'t touch on it',
              'timeAgo' => '2 hrs ago',
              'category' => 'Climate'
          ]
      ];

      $latestNews = [
          [
              'id' => 3,
              'title' => 'Inside the secret summit that tried to stop deadly rap wars',
              'description' => 'Before Tupac\'s murder, producer Quincy Jones brought stars together to try to broker peace in hip-hop',
              'image' => 'https://picsum.photos/400/300?random=2',
              'timeAgo' => '1 day ago',
              'category' => 'Culture'
          ],
          [
              'id' => 7,
              'title' => 'Unemployment rises as pay growth slows again',
              'description' => 'The UK\'s unemployment rate has risen, official figures suggest, while pay growth slows',
              'image' => 'https://picsum.photos/400/300?random=3',
              'timeAgo' => '13 hrs ago',
              'category' => 'London'
          ],
          [
              'id' => 8,
              'title' => 'When horror hits China, the first instinct is shut it down',
              'description' => 'Chinese society is reeling from a series of deadly attacks. The reaction from authorities is often silence',
              'image' => 'https://picsum.photos/400/300?random=4',
              'timeAgo' => '1 day ago',
              'category' => 'Asia'
          ],
          [
              'id' => 9,
              'title' => 'Zendaya: Working with Tom Holland is \'second nature\'',
              'description' => 'The actress tells Vanity Fair that working with her boyfriend is "strangely comfortable"',
              'image' => 'https://picsum.photos/400/300?random=5',
              'timeAgo' => '12 hrs ago',
              'category' => 'Culture'
          ],
          [
              'id' => 10,
              'title' => 'Cheap fix floated for plane vapour\'s climate damage',
              'description' => 'The warming impact of the vapour trails that emerge from airplanes is being discussed at climate talks',
              'image' => 'https://picsum.photos/400/300?random=6',
              'timeAgo' => '1 day ago',
              'category' => 'Climate'
          ],
          [
              'id' => 11,
              'title' => 'Does Kane\'s criticism expose England cracks?',
              'description' => 'Harry Kane\'s thinly-veiled criticism of England absentees increases current sense of drift',
              'image' => 'https://picsum.photos/400/300?random=7',
              'timeAgo' => '8 hrs ago',
              'category' => 'Sport'
          ],
          [
              'id' => 12,
              'title' => 'Some players \'lucky enough\' to face \'Farrell\'',
              'description' => 'Andy Farrell welcomes the pressure this week\'s All Blacks loss has put on Ireland',
              'image' => 'https://picsum.photos/400/300?random=8',
              'timeAgo' => '13 hrs ago',
              'category' => 'Sport'
          ],
          [
              'id' => 13,
              'title' => 'How Japan\'s youngest CEO transformed Hello Kitty',
              'description' => 'As the cute character celebrates her 50th anniversary, the firm behind it is now a trillion yen company',
              'image' => 'https://picsum.photos/400/300?random=9',
              'timeAgo' => '2 days ago',
              'category' => 'Asia'
          ]
      ];

      return [
          'featured' => $featuredNews,
          'trending' => $trendingNews,
          'latest' => $latestNews
      ];
  }

  echo json_encode(generateNewsData());
?>