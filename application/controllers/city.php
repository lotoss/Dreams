<?php 

class City extends CI_Controller{
	public function index($id = 0){
		switch($id) {
			case 1: 
				$data['cities'] = array(
					array(1,'Москва1', 1200),
					array(2,'Москва2', 1300),
					array(3,'Москва3', 1400)
				);
				break;
				
			case 2: 
				$data['cities'] = array(
					array(4,'Питер1', 11200),
					array(5,'Питер2', 11300),
					array(6,'Питер3', 11400)
				);
				break;
				
			case 3: 
				$data['cities'] = array(
					array(7,'Питер21', 21200),
					array(8,'Питер22', 21300),
					array(9,'Питер23', 21400)
				);
				break;
			
			default: 
				$data['error'] = 'Wrong ID';
		}
		
		$this->load->view('ajax/cities', $data);
	}
}