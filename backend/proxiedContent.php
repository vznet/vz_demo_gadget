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


$return = $server->check_signature($request, null, null, $_GET['oauth_signature']);

if (! $return) {
	die('invalid signature');
}

echo 'Hello from PHP';

$postBody = json_decode(file_get_contents('php://input'), true);
?>

<h1>Hello from HTML</h1>

<h2>This is proxied content</h2>

<p>
    This is coming through Data Pipelining:
    <?= $postBody[0]['result']['displayName'] ?>
</p>

<script xmlns:os="http://ns.opensocial.org/2008/markup" type="text/os-data">
    <os:PeopleRequest key="ViewerFriends" userId="@viewer" groupId="@friends" count="20"/>
    <os:HttpRequest key="httpFriends" href="http://localhost:8062/backend/externalFriends.json"/>
</script>


<script type="text/os-template">
    <ul>
      <li><b>Viewer Friends:</b></li>
      <li repeat="${ViewerFriends}">
        <span>Name: ${Cur.displayName} Gender: ${Cur.gender}</span>
      </li>
      <li><b>Http Friends:</b></li>
    </ul>
</script>

<a href="javascript:gadgets.window.adjustHeight(1500);">adjustHeight</a>