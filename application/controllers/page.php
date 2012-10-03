<?php 

class Page extends CI_Controller{
	public function index(){
		//$this->load->library('Cart');
		
		$data['cart'] = $this->get_cart();
		$this->load->view('layout/main', $data);
	}
	
	public function get_cart(){
		$this->load->model('cart_item');
		$user = 1;
		
		$res = $this->cart_item->get($user);
		$out = array();	
		foreach($res as $el){
			$temp = json_decode($el['album']);
			$temp->id =  $el['id'];
			$out[] = $temp;
		}
			
		return json_encode($out);
		
	}
}










?>