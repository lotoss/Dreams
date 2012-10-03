<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
if( !function_exists('apache_request_headers') ) {
///
	function apache_request_headers() {
	  $arh = array();
	  $rx_http = '/\AHTTP_/';
	  foreach($_SERVER as $key => $val) {
	    if( preg_match($rx_http, $key) ) {
	      $arh_key = preg_replace($rx_http, '', $key);
	      $rx_matches = array();
	      // do some nasty string manipulations to restore the original letter case
	      // this should work in most cases
	      $rx_matches = explode('_', $arh_key);
	      if( count($rx_matches) > 0 and strlen($arh_key) > 2 ) {
	        foreach($rx_matches as $ak_key => $ak_val) $rx_matches[$ak_key] = ucfirst($ak_val);
	        $arh_key = implode('-', $rx_matches);
	      }
	      $arh[$arh_key] = $val;
	    }
	  }
	  return( $arh );
	}
///
}

class Cart extends CI_Controller {
	
	
	
	public function index ($index = -1) {
		$request_body = file_get_contents('php://input');
		
		$this->load->model('cart_item');
		$user = 1;
		$headers = apache_request_headers();
		
		
		if( isset( $headers['X-HTTP-METHOD-OVERRIDE'] ) )
			$headers['X-HTTP-Method-Override'] = $headers['X-HTTP-METHOD-OVERRIDE'];
			
		if(!isset($headers['X-HTTP-Method-Override'])){
			
			//Insert
			$data = array();
			$data['id'] = $this->cart_item->add($user, $request_body);
				
			echo json_encode($data);
		} else {
			
			switch($headers['X-HTTP-Method-Override']){
				
				//Upload
				case 'PUT':
					$new = json_decode($request_body);
					
					$this->cart_item->update($new->id, $request_body);
					
					break;
					
				//Select	
				case 'GET':
					$res = $this->cart_item->get($user);
					
					foreach($res as $el){
						$temp = json_decode($el['album']);
						$temp->id =  $el['id'];
						$out[] = $temp;
					}
					
					echo json_encode($out);
					
					break;
					
				//Delete
				case 'DELETE':
					if($index != -1)
						$this->cart_item->delete($index);
					
					break;
					
			}
		
		}//END ELSE 
			
		
	}
	
	
}
