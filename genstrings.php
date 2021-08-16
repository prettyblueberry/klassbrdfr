
<?php



$options = "l:f:";
$opts = getopt ($options);

if(!($func = $opts["f"])){
	die("Function required\n");
}

if(!($lang = $opts["l"])){
	die("Language required\n");
 }


if($func == "pull"){
	fetch($lang);
}else{
	die("Function doesn't exist\n");
}


 function genstring() {

 	$dir = dirname(__FILE__) ;

    $base = "$dir/src/i18n/translations/en.js";

    $di = new RecursiveDirectoryIterator('./src');
    $files = array();
    foreach (new RecursiveIteratorIterator($di) as $filename => $file) {
        if(stripos($filename,".js")){
            $files[] = $filename;
        }
    }

     $newDic = array();

       foreach($files as $file){

            $f = file_get_contents("$file");



            $matches = array();
            $subject = "abcdef";
            $pattern = "/[$]t\\(([\"'])(?:(?=(\\\\?))\\2.)*?\\1/";

            preg_match_all($pattern, $f, $matches);

            foreach($matches[0] as $match){

            	 $l = explode('$t(',$match);

                if(count($l) == 2){
                    $left = substr(trim($l[1]),1,strlen(trim($l[1]))-2);
                    if($left){
                    	$newDic[$left] = $left;
                    }
                }
            }
        }


        uksort($newDic, "strnatcasecmp");

 		return $newDic;

 }

  function initLang($lang){
   	$dir = dirname(__FILE__) ;

 	$folder = "$dir/src/i18n/translations";
  	if(!file_exists($folder)){
	 	mkdir($folder, 0777, true);
  	}




   	$to = "$folder/{$lang}.js";
   	if(!file_exists($to)){
		$f = fopen($to, "w");
		ftruncate($f, 0);
		fclose($f);
  	}

  return $to;

 }

 function fetch($lang){

 	$sourceDic  = genstring();

 	$newDic = array();


  	$to =initLang($lang);
   	$toDic = array();


 try{
       $baseContent = file_get_contents("$to");

       $json = str_ireplace(array("export default  ","};","\\n"),array("","}","\\\\n"), $baseContent);


       $jsonArr = json_decode(trim($json),true);




        $toDic = array();
        if($jsonArr){
        	foreach( $jsonArr as $key => $val){
           	 $left = str_ireplace('"','\"',$key);
           	 $right = str_ireplace('"','\"',$val);
           	 $toDic[$left] = $right;

        	}
        }

        uksort($toDic, "strnatcasecmp");

		foreach($sourceDic as $key => $val){
        	if($key){
            	if(!$toDic[$key]){
                	$newDic[$key] = $val;
            	}
            }
        }


        uksort($newDic, "strnatcasecmp");

        print_r($newDic);

	if($lang != "en"){
		$f = @fopen($to, "r+");
        if ($f !== false) {
            ftruncate($f, 0);
             $txt = "export default {\n";
             fwrite($f, $txt);
             $c = 0;

             $total = count($sourceDic);

        	foreach($sourceDic as $key => $val){
             	//if($key){
                	if($toDic[$key]){
                		$txt = "\t\"$key\" : \"{$toDic[$key]}\",\n";
                		$c++;

                		if($c == $total){
                			$txt = substr( $txt,0,strlen($txt)-2)."\n";
                		}
                		fwrite($f, $txt);
                	}

                //}

            }
            if(count($newDic)){
            	foreach($newDic as $key => $val){
             		$txt = "\t\"$key\" : \"\",\n";
                	$c++;
                	if($c == $total){
                		$txt = substr( $txt,0,strlen($txt)-2)."\n";
                	}
                	fwrite($f, $txt);
                }
            }

            $txt = "};\n";
            fwrite($f, $txt);
            fclose($f);
        }
    }else{

        $f = @fopen($to, "r+");
        if ($f !== false) {
            ftruncate($f, 0);
             $txt = "export default {\n";
             fwrite($f, $txt);
             $c = 0;
            foreach($sourceDic as $key => $val){
                   $txt = "\t\"$key\" : \"$val\",\n";

                $c++;
                if($c == count($sourceDic)){
                	$txt = substr( $txt,0,strlen($txt)-2)."\n";
                }

                fwrite($f, $txt);
            }

            $txt = "};\n";
            fwrite($f, $txt);
            fclose($f);
        }

    }


 }catch(Exception $e){
        echo $e;
    }


    }

?>
