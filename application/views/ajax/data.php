<?php 
	require_once('boxes.php');
	require_once('colors.php');
	require_once('covers.php');
	require_once('forzatz.php');
	require_once('popups.php');
	require_once('stamps.php');
	$out = array(
		'boxes' 	=> 	$boxes,
		'colors' 	=> 	$colors,
		'covers' 	=>	$covers,
		'forzatz' 	=>	$forzatz,
		'popups' 	=>	$popups,
		'stamps' 	=>	$stamps
	);
	echo json_encode($out);
?>