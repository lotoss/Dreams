<?php 
	if(isset($error)) {
		echo json_encode($error);
	} else {
		echo json_encode($cities);
	}
	
?>