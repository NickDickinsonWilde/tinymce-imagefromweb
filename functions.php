<?php
function save_file($dest,$src) {
    //Save remote file specified by $src to $dest.
    $ch = curl_init($src);
    $fh = fopen("../../../../{$dest}", 'wb');  //TODO: properly set the dest path (ie not hardcoded)!
    curl_setopt($ch, CURLOPT_FILE, $fh);
    curl_setopt($ch, CURLOPT_HEADER, 0);
    curl_exec($ch);
    curl_close($ch);
    fclose($fh);
    return $dest;
    }
    
if ((isset($_GET["task"])) && ($_GET["task"] == "save_file")) {
    echo save_file($_GET["dest"],$_GET["src"]);
    }
?>