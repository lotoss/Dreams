<?php 
	$covers = array(
	
		//Photo
		array(
			'cover_id' => 1, // И так далее +1
			'format' 	=> 	'big_square',	
			'type'		=> 	'photo',	
			'stamping'	=> 	false,
			'basePrice'	=> 	4700,
			'pages' => array(
				'simple' => array(
					'minPage' 	=> 	50,
					'maxPage' 	=> 	120,
					'pagePrice' => 	48
				),
				'layflat' => array(
					'minPage' 	=> 	30,
					'maxPage' 	=> 	80,
					'pagePrice' => 	60
				),
			),
			'labels' => array(
				'format' => array('Большой квадрат', '29х29см'),
				'type' => 'Фотообложка',
			),
			'discPerAlbum' => 300
		),
		
		array(
			'cover_id' => 2, // И так далее +1
			'format' 	=> 	'small_square',	
			'type'		=> 	'photo',	
			'stamping'	=> 	false,
			'basePrice'	=> 	3300,
			'pages' => array(
				'simple' => array(
					'minPage' 	=> 	50,
					'maxPage' 	=> 	120,
					'pagePrice' => 	33
				),
				'layflat' => array(
					'minPage' 	=> 	30,
					'maxPage' 	=> 	80,
					'pagePrice' => 	40
				),
			),
			'labels' => array(
				'format' => array('Малый квадрат', '19х19см'),
				'type' => 'Фотообложка',
			),
			'discPerAlbum' => 300
		),
		
		array(
			'cover_id' => 3,
			'format' 	=> 	'big_rect',	
			'type'		=> 	'photo',	
			'stamping'	=> 	false,
			'basePrice'	=> 	4700,
			'pages' => array(
				'simple' => array(
					'minPage' 	=> 	50,
					'maxPage' 	=> 	120,
					'pagePrice' => 	48
				),
				'layflat' => array(
					'minPage' 	=> 	30,
					'maxPage' 	=> 	80,
					'pagePrice' => 	60
				),
			),
			'labels' => array(
				'format' => array('Большой альбом', '34х28,5см'),
				'type' => 'Фотообложка',
			),
			'discPerAlbum' => 300
		),
		
		array(
			'cover_id' => 4,
			'format' 	=> 	'small_rect',	
			'type'		=> 	'photo',	
			'stamping'	=> 	false,
			'basePrice'	=> 	3300,
			'pages' => array(
				'simple' => array(
					'minPage' 	=> 	50,
					'maxPage' 	=> 	120,
					'pagePrice' => 	33
				),
				'layflat' => array(
					'minPage' 	=> 	30,
					'maxPage' 	=> 	80,
					'pagePrice' => 	40
				),
			),
			'labels' => array(
				'format' => array('Малый альбом', '24,5х21см'),
				'type' => 'Фотообложка'
			),
			'discPerAlbum' => 300
		),
		
		//Cloth
		array(
			'cover_id' => 5,
			'format' 	=> 	'big_square',	
			'type'		=> 	'cloth',	
			'stamping'	=> 	true,
			'basePrice'	=> 	6500,
			'pages' => array(
				'simple' => array(
					'minPage' 	=> 	50,
					'maxPage' 	=> 	120,
					'pagePrice' => 	48
				),
				'layflat' => array(
					'minPage' 	=> 	30,
					'maxPage' 	=> 	80,
					'pagePrice' => 	60
				),
			),
			'labels' => array(
				'format' => array('Большой квадрат', '29х29см'),
				'type' => 'Ткань',
			),
			'discPerAlbum' => 500
		),
		
		array(
			'cover_id' => 6,
			'format' 	=> 	'small_square',	
			'type'		=> 	'cloth',	
			'stamping'	=> 	true,
			'basePrice'	=> 	4800,
			'pages' => array(
				'simple' => array(
					'minPage' 	=> 	50,
					'maxPage' 	=> 	120,
					'pagePrice' => 	33
				),
				'layflat' => array(
					'minPage' 	=> 	30,
					'maxPage' 	=> 	80,
					'pagePrice' => 	40
				),
			),
			'labels' => array(
				'format' => array('Малый квадрат', '19х19см'),
				'type' => 'Ткань',
			),
			'discPerAlbum' => 500
		),
		
		array(
			'cover_id' => 7,
			'format' 	=> 	'big_rect',	
			'type'		=> 	'cloth',	
			'stamping'	=> 	true,
			'basePrice'	=> 	6500,
			'pages' => array(
				'simple' => array(
					'minPage' 	=> 	50,
					'maxPage' 	=> 	120,
					'pagePrice' => 	48
				),
				'layflat' => array(
					'minPage' 	=> 	30,
					'maxPage' 	=> 	80,
					'pagePrice' => 	60
				),
			),
			'labels' => array(
				'format' => array('Большой альбом', '34х28,5см'),
				'type' => 'Ткань',
			),
			'discPerAlbum' => 500
		),
		
		array(
			'cover_id' => 8,
			'format' 	=> 	'small_rect',	
			'type'		=> 	'cloth',	
			'stamping'	=> 	true,
			'basePrice'	=> 	4800,
			'pages' => array(
				'simple' => array(
					'minPage' 	=> 	50,
					'maxPage' 	=> 	120,
					'pagePrice' => 	33
				),
				'layflat' => array(
					'minPage' 	=> 	30,
					'maxPage' 	=> 	80,
					'pagePrice' => 	40
				),
			),
			'labels' => array(
				'format' => array('Малый альбом', '24,5х21см'),
				'type' => 'Ткань',
			),
			'discPerAlbum' => 500
		),
		
		//Leather
		array(
			'cover_id' => 9,
			'format' 	=> 	'big_square',	
			'type'		=> 	'leather',	
			'stamping'	=> 	true,
			'basePrice'	=> 	9500,
			'pages' => array(
				'simple' => array(
					'minPage' 	=> 	50,
					'maxPage' 	=> 	120,
					'pagePrice' => 	48
				),
				'layflat' => array(
					'minPage' 	=> 	30,
					'maxPage' 	=> 	80,
					'pagePrice' => 	60
				),
			),
			'labels' => array(
				'format' => array('Большой квадрат', '29х29см'),
				'type' => 'Натуральная кожа',
			),
			'discPerAlbum' => 500
		),
		
		array(
			'cover_id' => 10,
			'format' 	=> 	'small_square',	
			'type'		=> 	'leather',	
			'stamping'	=> 	true,
			'basePrice'	=> 	7500,
			'pages' => array(
				'simple' => array(
					'minPage' 	=> 	50,
					'maxPage' 	=> 	120,
					'pagePrice' => 	33
				),
				'layflat' => array(
					'minPage' 	=> 	30,
					'maxPage' 	=> 	80,
					'pagePrice' => 	40
				),
			),
			'labels' => array(
				'format' => array('Малый квадрат', '19х19см'),
				'type' => 'Натуральная кожа',
			),
			'discPerAlbum' => 500
		),
		
		array(
			'cover_id' => 11,
			'format' 	=> 	'big_rect',	
			'type'		=> 	'leather',	
			'stamping'	=> 	true,
			'basePrice'	=> 	9500,
			'pages' => array(
				'simple' => array(
					'minPage' 	=> 	50,
					'maxPage' 	=> 	120,
					'pagePrice' => 	48
				),
				'layflat' => array(
					'minPage' 	=> 	30,
					'maxPage' 	=> 	80,
					'pagePrice' => 	60
				),
			),
			'labels' => array(
				'format' => array('Большой альбом', '34х28,5см'),
				'type' => 'Натуральная кожа',
			),
			'discPerAlbum' => 500
		),
		
		array(
			'cover_id' => 12,
			'format' 	=> 	'small_rect',	
			'type'		=> 	'leather',	
			'stamping'	=> 	true,
			'basePrice'	=> 	7500,
			'pages' => array(
				'simple' => array(
					'minPage' 	=> 	50,
					'maxPage' 	=> 	120,
					'pagePrice' => 	33
				),
				'layflat' => array(
					'minPage' 	=> 	30,
					'maxPage' 	=> 	80,
					'pagePrice' => 	40
				),
			),
			'labels' => array(
				'format' => array('Малый альбом', '24,5х21см'),
				'type' => 'Натуральная кожа',
			),
			'discPerAlbum' => 500
		)
		
	);
	
	//echo json_encode($covers);
?>