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

echo '<?xml version="1.0" encoding="UTF-8"?>';
?>
<rss version="2.0"
xmlns:content="http://purl.org/rss/1.0/modules/content/"
xmlns:wfw="http://wellformedweb.org/CommentAPI/"
xmlns:dc="http://purl.org/dc/elements/1.1/"
xmlns:atom="http://www.w3.org/2005/Atom"
xmlns:sy="http://purl.org/rss/1.0/modules/syndication/"
xmlns:slash="http://purl.org/rss/1.0/modules/slash/"

xmlns:media="http://search.yahoo.com/mrss/"
>

<channel>
<title>Text</title>
<atom:link href="link" rel="self" type="application/rss+xml" />
<link>link</link>
<description>WordPress-Blog</description>
<lastBuildDate>Mon, 30 Aug 2010 09:22:00 +0000</lastBuildDate>
<language>en</language>
<sy:updatePeriod>hourly</sy:updatePeriod>
<sy:updateFrequency>1</sy:updateFrequency>
<generator>http://wordpress.org/?v=3.0</generator>
<item>
<title>Text</title>
<link>link</link>
<comments>link/#comments</comments>
<pubDate>Tue, 03 Aug 2010 08:18:29 +0000</pubDate>
<dc:creator>adminBC</dc:creator>
<category><![CDATA[Allgemein]]></category>
<guid isPermaLink="false">link</guid>
<description><![CDATA[Text <a href="link">Weiterlesen <span class="meta-nav">&#8594;</span></a>]]></description>­
<content:encoded><![CDATA[<p>Text.</p>
]]></content:encoded>
<wfw:commentRss>link</wfw:commentRss>
<slash:comments>0</slash:comments>

<media:thumbnail url="bild.jpg" />

<media:content url="bild.jpg" medium="image">

<media:title type="html"></media:title>

<media:thumbnail url="bild.jpg" />

</media:content>

</item>
</channel>
</rss>