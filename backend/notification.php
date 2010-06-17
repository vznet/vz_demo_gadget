<?php
//require the php OAuth library
require_once "../lib/oauth.php";

class MyOAuthSignatureMethod_RSA_SHA1 extends OAuthSignatureMethod_RSA_SHA1 {
	protected function fetch_public_cert(&$request) {
	    $s = curl_init();
		curl_setopt($s,CURLOPT_URL,$_GET['xoauth_signature_publickey']);
		curl_setopt($s, CURLOPT_RETURNTRANSFER, 1);
		$cert = curl_exec($s);
		curl_close($s);
		return $cert;
	}
	protected function fetch_private_cert(&$request) {
		return;
	}
}

$request = OAuthRequest::from_request();
$server = new MyOAuthSignatureMethod_RSA_SHA1();

$consumerToken  = '';
$consumerSecret = '';
$consumer = new OAuthConsumer($consumerToken, $consumerSecret);

$return = $server->check_signature($request, null, null, $_GET['oauth_signature']);

if (! $return) {
	die('invalid signature');
}

//the user to which you want to send the notification
$userId = $_GET['opensocial_viewer_id'];

//the rpc endpoint
$url = 'http://studivz.gadgets.apivz.net/social/rest/messages/@me';

$params = array('xoauth_requestor_id' => $userId);

//now create your requests, you can batch several requests into one http request
$msg = array(
        'title' => $_POST['message'],
        'type'  => 'notification',
);

//encode the requests and create oauth_body_hash
$encodedMsg = json_encode($msg);
$bodyHash = base64_encode(hash_hmac('sha1', $encodedMsg, $consumerSecret . '&', true));
$params['oauth_body_hash'] = $bodyHash;

//now create the oauth signature for the request
$outreq = OAuthRequest::from_consumer_and_token($consumer, null, 'POST', $url, $params);
$sig = new OAuthSignatureMethod_HMAC_SHA1();
$outreq->sign_request($sig, $consumer, null);

//create the url parameter string
$params =  $outreq->get_parameters();
$pairs = array();
foreach ($params as $key => $value) {
    $pairs[] = $key . '=' . urlencode($value);
}
$pstring = implode('&', $pairs);

//send the request with curl
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url . '?' . $pstring);
curl_setopt($ch, CURLOPT_POSTFIELDS, $encodedMsg);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'POST');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
curl_setopt($ch, CURLOPT_HEADER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
$response = curl_exec($ch);

print_r($response);