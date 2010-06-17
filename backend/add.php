<?php

error_log('called add.php');

error_log(print_r($_GET,1));
error_log(print_r($_POST,1));
$body = file_get_contents('php://input');
error_log($body);
error_log(print_r(json_decode($body, true), 1));
//require the php OAuth library
require_once "../lib/oauth.php";

 $request = OAuthRequest::from_request();
 $server = new OAuthSignatureMethod_HMAC_SHA1();
 $consumer = new OAuthConsumer('', '');
 $return = $server->check_signature($request, $consumer, null, $_GET['oauth_signature']);

 if (! $return) {
  die('invalid signature');
 }
 error_log('add.php request valid');

