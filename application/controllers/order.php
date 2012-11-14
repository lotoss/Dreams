<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Order extends CI_Controller{

	public function index(){
		$data['status'] = 'ok';
		$data['redirect'] = 'http://www.mywed.ru/account/selection/amount_to_pay/2000/';
		echo json_encode($data);
	}
	
}