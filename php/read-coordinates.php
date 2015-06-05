<?php

	function get_string_between($string, $start, $end){
		$string = " ".$string;
		$ini = strpos($string,$start);
		if ($ini == 0) return "";
		$ini += strlen($start);
		$len = strpos($string,$end,$ini) - $ini;
		return substr($string,$ini,$len);
	}
	
	$path_to_folder = '../metadata';
	$image_path = '../image/';
	$dir = new RecursiveDirectoryIterator($path_to_folder);
	$coordinates_json_format = array(); //$top_left = array(); $top_right = array(); $bottom_right = array(); $bottom_left = array();
	
	foreach (new RecursiveIteratorIterator($dir) as $filename => $file) {		
		$squase = array();
		
		if (is_file($filename)){
			$file_extension = pathinfo($filename, PATHINFO_EXTENSION);
			
			if ($file_extension === 'TIL'){
				$line_object = file($filename);		
				
				foreach($line_object as $line_num => $line_content){
					$function_call = get_string_between($line_content, '=', ';');
					
					if (strpos($line_content, 'ULLon')){
						$ULLon = floatval(trim($function_call));
					} elseif (strpos($line_content, 'ULLat')){
						$ULLat = floatval(trim($function_call));
					} elseif (strpos($line_content, 'URLon')){
						$URLon = floatval(trim($function_call));
					} elseif (strpos($line_content, 'URLat')){
						$URLat = floatval(trim($function_call));
					} elseif (strpos($line_content, 'LRLon')){
						$LRLon = floatval(trim($function_call));
					} elseif (strpos($line_content, 'LRLat')) {
						$LRLat = floatval(trim($function_call));
					} elseif (strpos($line_content, 'LLLon')) {
						$LLLon = floatval(trim($function_call));
					} elseif (strpos($line_content, 'LLLat')) {
						$LLLat = floatval(trim($function_call));
					} else {}
					
				} //end of second for each
				
				$top_left = array("TopLeft" => array($ULLat, $ULLon));
				$top_right = array("TopRight" => array($URLat, $URLon));
				$bottom_right = array("BottomRight" => array($LRLat, $LRLon));
				$bottom_left = array("BottomLeft" => array($LLLat, $LLLon));
				$squase = array($top_left, $top_right, $bottom_right, $bottom_left);	
				array_push($coordinates_json_format, $squase);
			} //end of elseif			
		} //end of first if		
		
	} //end of first foreach
	echo(json_encode($coordinates_json_format));
?>
