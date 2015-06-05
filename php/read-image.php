<?php 
	$path_to_folder = '../metadata';
	$image_path = '../image/';
	$dir = new RecursiveDirectoryIterator($path_to_folder);
	$image_json_format = array();
	
	foreach (new RecursiveIteratorIterator($dir) as $filename => $file) {		
		$image_name = array();
		
		if (is_file($filename)){
			$file_extension = pathinfo($filename, PATHINFO_EXTENSION);
			
			if ($file_extension == 'jpg') {
				//copy($filename, $image_path.$filename);
				$image_name = array("ImageName" => $filename);
				array_push($image_json_format, $image_name);
			}
		}
	}
	echo(json_encode($image_json_format));
?>