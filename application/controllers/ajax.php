<?php 

class Ajax extends CI_Controller{
	public function index($type = 'not_set'){
		$this->load->view('ajax/'.$type);
	}
}


?>