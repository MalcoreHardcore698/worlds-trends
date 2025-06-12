<?php
  header('Content-Type: application/json');
  header('Access-Control-Allow-Origin: *');
  header('Cache-Control: no-cache, no-store, must-revalidate');
  header('Pragma: no-cache');
  header('Expires: 0');

  function getNewsById($id) {
    $news = [
      1 => [
          'id' => 1,
          'title' => 'Matt Gaetz quits House after he is picked by Trump for attorney general role',
          'image' => 'https://picsum.photos/800/600?random=1',
          'category' => 'US & Canada',
          'timeAgo' => '1 hr ago',
          'author' => 'John Smith',
          'content' => '
              <p>Former Rep. Matt Gaetz has announced his resignation from the House of Representatives following his selection by President-elect Donald Trump for the role of attorney general.</p>
              
              <p>The controversial Florida Republican submitted his resignation letter to House Speaker Mike Johnson on Wednesday, just hours after Trump announced his intention to nominate Gaetz for the nation\'s top law enforcement position.</p>
              
              <h3>Background and Controversy</h3>
              
              <p>Gaetz has been one of Trump\'s most vocal supporters in Congress and has faced ongoing scrutiny from the House Ethics Committee regarding allegations of sexual misconduct and drug use, which he has consistently denied.</p>
              
              <p>The timing of his resignation effectively ends the House Ethics Committee\'s investigation into his conduct, as the panel only has jurisdiction over current members of Congress.</p>
              
              <h3>Political Implications</h3>
              
              <p>His departure from the House comes at a critical time for Republicans, who are expected to hold a narrow majority in the upcoming Congress. The resignation further reduces their already slim margin in the chamber.</p>
              
              <blockquote>
                  <p>"I am honored to have been chosen by President Trump to serve as Attorney General," Gaetz said in a statement. "I look forward to the confirmation process and the opportunity to serve the American people."</p>
              </blockquote>
              
              <p>The nomination is expected to face significant opposition from Democrats and potentially some Republicans in the Senate, where Gaetz would need to be confirmed to assume the role.</p>
              
              <h3>What\'s Next</h3>
              
              <p>The Senate confirmation process is likely to be contentious, with many senators from both parties expressing concerns about Gaetz\'s qualifications and the ongoing investigations into his conduct.</p>
              
              <p>Legal experts have noted that the position of Attorney General requires Senate confirmation and oversight of federal law enforcement agencies, including the FBI and various U.S. Attorney offices across the country.</p>
          ',
          'tags' => ['Politics', 'Trump', 'Attorney General', 'House of Representatives']
      ],
      2 => [
          'id' => 2,
          'title' => 'World\'s largest coral found in Pacific Ocean',
          'image' => 'https://picsum.photos/800/600?random=10',
          'category' => 'Climate',
          'timeAgo' => '2 hrs ago',
          'author' => 'Marine Scientist',
          'content' => '
              <p>Scientists have discovered what they believe to be the world\'s largest coral in the Pacific Ocean, measuring over 100 feet in circumference and estimated to be over 500 years old.</p>
              
              <p>The massive coral, found near the Solomon Islands, is larger than a blue whale and contains millions of tiny coral polyps that work together as a single organism.</p>
              
              <h3>The Discovery</h3>
              
              <p>The coral was discovered by marine biologists during a recent expedition to study ocean health in the region. Initial measurements suggest it could be the largest single coral structure ever recorded.</p>
              
              <p>Unlike coral reefs, which are made up of many individual coral colonies, this is a single, continuous coral organism that has been growing for centuries.</p>
              
              <h3>Scientific Significance</h3>
              
              <p>The discovery provides valuable insights into coral resilience and longevity. The fact that this coral has survived for half a millennium suggests it has endured various climate changes and environmental challenges.</p>
              
              <blockquote>
                  <p>"This coral is like a living library of ocean history," said Dr. Sarah Johnson, lead marine biologist on the expedition. "Its rings and growth patterns tell the story of ocean conditions over the past 500 years."</p>
              </blockquote>
              
              <h3>Conservation Implications</h3>
              
              <p>The finding highlights the importance of marine conservation efforts, particularly in light of current threats to coral ecosystems from climate change, ocean acidification, and human activities.</p>
              
              <p>Researchers hope that studying this ancient coral will help them better understand how coral systems can adapt to changing environmental conditions.</p>
          ',
          'tags' => ['Marine Biology', 'Conservation', 'Pacific Ocean', 'Climate Change']
      ],
      3 => [
          'id' => 3,
          'title' => 'Inside the secret summit that tried to stop deadly rap wars',
          'image' => 'https://picsum.photos/800/600?random=11',
          'category' => 'Culture',
          'timeAgo' => '1 day ago',
          'author' => 'Music Journalist',
          'content' => '
              <p>In 1995, before Tupac Shakur\'s murder, legendary producer Quincy Jones organized a secret summit bringing together hip-hop\'s biggest stars in an attempt to broker peace and end the deadly rap wars that were consuming the industry.</p>
              
              <p>The meeting, held at Jones\' Bel Air mansion, included some of the most prominent figures in hip-hop, all united by a common concern about the escalating violence that was claiming lives and dividing the community.</p>
              
              <h3>The Gathering</h3>
              
              <p>According to sources who were present, the summit included artists, producers, and industry executives who recognized that the East Coast-West Coast rivalry had spiraled out of control.</p>
              
              <p>The meeting was kept secret to avoid media attention and allow for honest, open discussions about the underlying issues driving the conflicts.</p>
              
              <h3>Quincy Jones\' Role</h3>
              
              <p>As a respected figure who had worked across musical genres and generations, Jones was uniquely positioned to bring together artists who might not otherwise sit in the same room.</p>
              
              <blockquote>
                  <p>"Quincy understood that hip-hop was more than just music – it was a cultural movement that needed protecting," said one attendee who spoke on condition of anonymity.</p>
              </blockquote>
              
              <h3>The Aftermath</h3>
              
              <p>Despite the best intentions of those involved, the summit was unable to prevent the tragedies that followed. Tupac was killed in September 1996, and Biggie Smalls was murdered six months later.</p>
              
              <p>The failure of the peace efforts highlights the complex nature of the conflicts, which involved not just artistic rivalry but also business disputes, personal grudges, and broader social tensions.</p>
              
              <h3>Lessons for Today</h3>
              
              <p>The story of the secret summit offers valuable lessons for contemporary hip-hop culture about the importance of unity and the dangers of allowing conflicts to escalate unchecked.</p>
              
              <p>Many in the hip-hop community today reference this period as a cautionary tale about the need for dialogue and conflict resolution within the culture.</p>
          ',
                      'tags' => ['Hip-Hop', 'Music History', 'Tupac', 'Quincy Jones', 'Culture']
      ],
      4 => [
          'id' => 4,
          'title' => 'Menopause awareness in India: Breaking taboos',
          'image' => 'https://picsum.photos/800/600?random=12',
          'category' => 'Asia',
          'timeAgo' => '4 hrs ago',
          'author' => 'Dr. Priya Sharma',
          'content' => '
              <p>In India, where conversations about menstruation remain largely taboo, discussions about menopause are even further behind, leaving millions of women without adequate support or information during this critical life transition.</p>
              
              <h3>The Silent Struggle</h3>
              
              <p>Research shows that over 130 million Indian women are currently experiencing perimenopause or menopause, yet the topic remains shrouded in silence and misconception.</p>
              
              <p>Cultural stigmas and lack of awareness mean that many women suffer in silence, without understanding the physical and emotional changes they are experiencing.</p>
              
              <blockquote>
                  <p>"Women often mistake menopause symptoms for other illnesses, leading to delayed or inappropriate treatment," explains Dr. Rekha Daver, a gynecologist specializing in menopause care.</p>
              </blockquote>
              
              <h3>Breaking the Silence</h3>
              
              <p>Recent initiatives by healthcare organizations and women\'s rights groups are working to change this narrative, promoting open conversations about menopause and its impact on women\'s lives.</p>
              
              <p>Educational campaigns are focusing on both women and their families, helping to normalize discussions about this natural biological process.</p>
          ',
          'tags' => ['Women\'s Health', 'India', 'Healthcare', 'Social Issues']
      ],
      5 => [
          'id' => 5,
          'title' => 'Canada\'s uranium mining potential in nuclear energy future',
          'image' => 'https://picsum.photos/800/600?random=13',
          'category' => 'US & Canada',
          'timeAgo' => '1 hr ago',
          'author' => 'Energy Analyst',
          'content' => '
              <p>With its vast uranium reserves and mining expertise, Canada is positioned to play a crucial role in the global transition to nuclear energy as countries seek clean alternatives to fossil fuels.</p>
              
              <h3>Global Energy Transition</h3>
              
              <p>As nations worldwide commit to carbon neutrality goals, nuclear energy is experiencing renewed interest as a reliable, carbon-free power source that can complement renewable energy systems.</p>
              
              <p>Canada, which produces about 13% of the world\'s uranium, is seeing increased investment in mining operations and exploration projects.</p>
              
              <h3>Economic Opportunities</h3>
              
              <p>The uranium mining industry could create thousands of jobs and generate billions in economic activity across Canada, particularly benefiting northern and indigenous communities.</p>
              
              <blockquote>
                  <p>"Canada has the resources, technology, and regulatory framework to become a leader in the global nuclear fuel supply chain," said Minister of Natural Resources.</p>
              </blockquote>
                        ',
            'tags' => ['Nuclear Energy', 'Mining', 'Canada', 'Clean Energy', 'Economy']
        ],
        7 => [
            'id' => 7,
            'title' => 'Unemployment rises as pay growth slows again',
            'image' => 'https://picsum.photos/800/600?random=14',
            'category' => 'Economics',
            'timeAgo' => '13 hrs ago',
            'author' => 'Economic Reporter',
            'content' => '
                <p>The UK\'s unemployment rate has risen to 4.3% in the latest quarter, while wage growth continues to decelerate, raising concerns about the health of the labor market.</p>
                
                <h3>Labor Market Challenges</h3>
                
                <p>Official figures from the Office for National Statistics show that unemployment increased by 0.1 percentage point, with 1.48 million people now out of work.</p>
                
                <p>Meanwhile, average earnings growth slowed to 4.8% annually, down from 5.2% in the previous quarter, though it remains above the rate of inflation.</p>
                
                <blockquote>
                    <p>"These figures suggest the labor market is cooling, which may influence the Bank of England\'s decision-making on interest rates," said chief economist Sarah Williams.</p>
                </blockquote>
            ',
            'tags' => ['Economics', 'Employment', 'UK', 'Labor Market']
        ],
        8 => [
            'id' => 8,
            'title' => 'When horror hits China, the first instinct is shut it down',
            'image' => 'https://picsum.photos/800/600?random=15',
            'category' => 'Asia',
            'timeAgo' => '1 day ago',
            'author' => 'Beijing Correspondent',
            'content' => '
                <p>Chinese society is reeling from a series of deadly attacks that have shaken public confidence, as authorities respond with increased censorship and information control.</p>
                
                <h3>Information Control</h3>
                
                <p>Following recent violent incidents, Chinese officials have moved quickly to limit discussion and media coverage, a pattern that has become increasingly common.</p>
                
                <p>Social media posts about the incidents are being deleted, and news coverage is being strictly controlled by state media outlets.</p>
                
                <h3>Public Response</h3>
                
                <p>Despite official efforts to control the narrative, Chinese citizens are finding ways to express their concerns and share information through coded language and private channels.</p>
            ',
            'tags' => ['China', 'Censorship', 'Social Issues', 'Government']
        ],
        9 => [
            'id' => 9,
            'title' => 'Zendaya: Working with Tom Holland is \'second nature\'',
            'image' => 'https://picsum.photos/800/600?random=16',
            'category' => 'Entertainment',
            'timeAgo' => '12 hrs ago',
            'author' => 'Entertainment Writer',
            'content' => '
                <p>In a candid interview with Vanity Fair, Zendaya opens up about her professional and personal relationship with Tom Holland, describing their on-screen chemistry as effortless.</p>
                
                <h3>Professional Partnership</h3>
                
                <p>The Spider-Man co-stars have worked together on multiple films, developing what Zendaya describes as an intuitive understanding of each other\'s acting styles.</p>
                
                <blockquote>
                    <p>"When you\'re working with someone you care about, there\'s a level of comfort and trust that translates on screen," Zendaya explained.</p>
                </blockquote>
                
                <h3>Future Projects</h3>
                
                <p>While the couple remains private about their relationship, they continue to support each other\'s individual career endeavors and upcoming projects.</p>
            ',
                          'tags' => ['Entertainment', 'Spider-Man', 'Hollywood', 'Relationships']
        ],
        10 => [
            'id' => 10,
            'title' => 'Cheap fix floated for plane vapour\'s climate damage',
            'image' => 'https://picsum.photos/800/600?random=17',
            'category' => 'Climate',
            'timeAgo' => '1 day ago',
            'author' => 'Climate Reporter',
            'content' => '
                <p>Scientists are discussing cost-effective solutions to reduce the warming impact of aircraft condensation trails at ongoing climate talks.</p>
                
                <h3>Aviation\'s Climate Impact</h3>
                
                <p>Contrails, the white streaks left by aircraft, contribute significantly to global warming beyond just CO2 emissions from fuel combustion.</p>
                
                <p>Research suggests that simple operational changes could reduce contrail formation by up to 80% with minimal cost increases.</p>
                
                <blockquote>
                    <p>"Small adjustments to flight paths and altitudes could have a massive impact on aviation\'s climate footprint," said Dr. Mark Thompson from the International Aviation Research Institute.</p>
                </blockquote>
            ',
            'tags' => ['Climate Change', 'Aviation', 'Environment', 'Technology']
        ],
        11 => [
            'id' => 11,
            'title' => 'Does Kane\'s criticism expose England cracks?',
            'image' => 'https://picsum.photos/800/600?random=18',
            'category' => 'Sport',
            'timeAgo' => '8 hrs ago',
            'author' => 'Sports Correspondent',
            'content' => '
                <p>Harry Kane\'s unusual public criticism of England teammates who withdrew from international duty has highlighted underlying tensions within the national team setup.</p>
                
                <h3>Captain\'s Concerns</h3>
                
                <p>The England captain expressed frustration with players choosing club priorities over international duty, a rare public critique from the typically diplomatic striker.</p>
                
                <p>His comments come amid growing concerns about player welfare and the increasingly congested football calendar.</p>
                
                <h3>Team Unity Questions</h3>
                
                <p>Former England players have expressed mixed reactions to Kane\'s leadership approach, with some supporting his stance while others question the timing.</p>
            ',
            'tags' => ['Football', 'England', 'Harry Kane', 'International Football']
        ],
        12 => [
            'id' => 12,
            'title' => 'Some players \'lucky enough\' to face Ireland test',
            'image' => 'https://picsum.photos/800/600?random=19',
            'category' => 'Sport',
            'timeAgo' => '13 hrs ago',
            'author' => 'Rugby Correspondent',
            'content' => '
                <p>Andy Farrell welcomes the pressure following Ireland\'s loss to the All Blacks, viewing the upcoming challenges as opportunities for squad development.</p>
                
                <h3>Learning From Defeat</h3>
                
                <p>The Ireland head coach emphasized that setbacks provide valuable learning experiences for his relatively young squad.</p>
                
                <p>Farrell highlighted the importance of maintaining perspective and using criticism as motivation for improvement.</p>
                
                <blockquote>
                    <p>"Every player who gets the chance to wear the green jersey should consider themselves fortunate. These are the moments that define careers," Farrell stated.</p>
                </blockquote>
            ',
            'tags' => ['Rugby', 'Ireland', 'Andy Farrell', 'International Rugby']
        ]
      ];

    return $news[$id] ?? null;
  }

  $newsId = $_GET['id'] ?? null;

  if (!$newsId || !is_numeric($newsId)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid news ID']);
    exit;
  }

  $news = getNewsById((int)$newsId);

  if (!$news) {
    http_response_code(404);
    echo json_encode(['error' => 'News article not found']);
    exit;
  }

  // Add related articles (excluding current article)
  $allIds = [1, 2, 3, 4, 5, 7, 8, 9, 10, 11, 12, 13];
  $relatedIds = array_filter($allIds, function($id) use ($newsId) {
      return $id != $newsId;
  });
  $relatedIds = array_slice(array_values($relatedIds), 0, 3); // Get first 3 different articles

  $relatedArticles = [];

  foreach ($relatedIds as $id) {
    $related = getNewsById($id);
    if ($related) {
      // Only include basic info for related articles
      $relatedArticles[] = [
        'id' => $related['id'],
        'title' => $related['title'],
        'image' => $related['image'],
        'category' => $related['category'],
        'timeAgo' => $related['timeAgo'],
        'content' => substr(strip_tags($related['content']), 0, 150) . '...' // Short description
      ];
    }
  }

  $news['relatedArticles'] = $relatedArticles;

  echo json_encode($news);
?>