<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Order extends CI_Controller{

	public function index(){
		$data['status'] = 'ok';
		$data['order_id'] = '1212313';
		echo json_encode($data);
	}
	
}