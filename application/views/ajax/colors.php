<?php 
	$colors = array(
		//Cloth
		array(
			'color_id' => 1, // И так далее +1
			'name' => 'brown',
			'type' => 'cloth',
			'src' => 'lightbraun.jpg',
			'title' => 'Коричневая',
			'stamp' => array('gold', 'silver', 'black', 'blint'),
			'cofr' => array('brown', 'flex'),
			'labels' => array('коричневой ткани')
		),
		
		array(
			'color_id' => 2, // И так далее +1
			'name' => 'skyblue',
			'type' => 'cloth',
			'src' => 'lightblue.jpg',
			'title' => 'Голубая',
			'stamp' => array('silver', 'blint'),
			'cofr' => array('skyblue', 'flex'),
			'labels' => array('голубой ткани')
		),
		
		array(
			'color_id' => 3,
			'name' => 'flex',
			'type' => 'cloth',
			'src' => 'white.jpg',
			'title' => 'Лён',
			'stamp' => array('gold', 'black', 'blint'),
			'cofr' => array('brown', 'flex'),
			'labels' => array('льняной ткани')
		),
		
		array(
			'color_id' => 4,
			'name' => 'orange',
			'type' => 'cloth',
			'src' => 'orange.jpg',
			'title' => 'Оранжевая',
			'stamp' => array('gold', 'silver', 'black', 'blint'),
			'cofr' => array('orange', 'flex'),
			'labels' => array('оранжевой ткани')
		),
		
		array(
			'color_id' => 5,
			'name' => 'liloc',
			'type' => 'cloth',
			'src' => 'violet.jpg',
			'title' => 'Сиреневая',
			'stamp' => array('silver', 'black', 'blint'),
			'cofr' => array('liloc', 'flex'),
			'labels' => array('сиреневой ткани')
		),
		
		array(
			'color_id' => 6,
			'name' => 'choco',
			'type' => 'cloth',
			'src' => 'brawn.jpg',
			'title' => 'Шоколадная',
			'stamp' => array('gold', 'silver', 'blint'),
			'cofr' => array('choco', 'flex'),
			'labels' => array('шоколадной ткани')
		),
		
		array(
			'color_id' => 7,
			'name' => 'red',
			'type' => 'cloth',
			'src' => 'red.jpg',
			'title' => 'Красная',
			'stamp' => array('gold', 'silver', 'blint'),
			'cofr' => array('red', 'flex'),
			'labels' => array('красной ткани')
		),
		
		array(
			'color_id' => 8,
			'name' => 'blue',
			'type' => 'cloth',
			'src' => 'blue.jpg',
			'title' => 'Синяя',
			'stamp' => array('gold', 'silver', 'black', 'blint'),
			'cofr' => array('blue', 'flex'),
			'labels' => array('синей ткани')
		),
		
		//Leather
		array(
			'color_id' => 9,
			'name' => 'brownl',
			'type' => 'leather',
			'src' => 'red-skin.jpg',
			'title' => 'Коричневая',
			'stamp' => array('gold', 'silver', 'blint'),
			'cofr' => array('brown', 'flex'),
			'labels' => array('коричневой коже')
		),
		
		array(
			'color_id' => 10,
			'name' => 'white',
			'type' => 'leather',
			'src' => 'white-skin.jpg',
			'title' => 'Белая',
			'stamp' => array('gold', 'silver', 'blint'),
			'cofr' => array('choco', 'red'),
			'labels' => array('белой коже')
		),
		
		array(
			'color_id' => 11,
			'name' => 'cream',
			'type' => 'leather',
			'src' => 'beige-skin.jpg',
			'title' => 'Кремовая',
			'stamp' => array('gold', 'silver', 'blint'),
			'cofr' => array('brown', 'flex'),
			'labels' => array('кремовой коже')
		),
		
		array(
			'color_id' => 12,
			'name' => 'grey',
			'type' => 'leather',
			'src' => 'grey-skin.jpg',
			'title' => 'Серая',
			'stamp' => array('gold', 'silver', 'blint'),
			'cofr' => array('flex', 'red'),
			'labels' => array('серой коже')
		),
		// До сюда!
		//Photo
		array(
			'name' => 'photo',
			'type' => 'photo',
			'src' => 'photo.jpg',
			'labels' => array('фотообложке')
		),
		// Тут из другой таблицы
		//Stamp Colors
		array(
			'stamp_color_id' => 1, // И так далее +1
			'name' => 'blint',
			'type' => 'stamp',
			'src' => 'stamp_colors.png',
			'position' => array(0, 0),
			'middle' => 147,
			'title' => 'Блинт'
		),
		
		array(
			'stamp_color_id' => 2, // И так далее +1
			'name' => 'gold',
			'type' => 'stamp',
			'src' => 'stamp_colors.png',
			'position' => array(40, 40),
			'middle' => 997,
			'title' => 'Золотой'
		),
		
		array(
			'stamp_color_id' => 3,
			'name' => 'silver',
			'type' => 'stamp',
			'src' => 'stamp_colors.png',
			'position' => array(0, 40),
			'middle' => 727,
			'title' => 'Серебряный'
		),
		
		array(
			'stamp_color_id' => 4,
			'name' => 'black',
			'type' => 'stamp',
			'src' => 'stamp_colors.png',
			'position' => array(40, 0),
			'middle' => 437,
			'title' => 'Черный'
		)
		
	);

	//echo json_encode($colors);

?>