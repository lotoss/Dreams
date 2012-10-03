<?php 


class Cart_item extends CI_Model{
	
	 function __construct()
    {
        // Call the Model constructor
        parent::__construct();
    }
	
	protected $_name = 'cart_items';
	
	public function get($id = NULL){
		$this->db->from($this->_name)->order_by('id');
		$out = $this->db->get();
		return $out->result_array();
	}
	
	public function add ($user, $data) {
		$out = array(
			'album' => $data,
			'user' => $user
		);
		
		$this->db->insert($this->_name, $out);
		return $this->db->insert_id();
	}
	
	public function delete ($id) {
		$this->db->where('id', $id);
		$this->db->delete($this->_name); 	
	}
	
	public function update($id, $data){
		$this->db->where('id', $id)->update( $this->_name, array('album' => $data) );
	}
}




















?>