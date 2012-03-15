var vzDemo = vzDemo || {};

vzDemo.advertising = {
    getAdTag : function() {
        var adCode = 112; // custom number provided by the vz-team for embedding your ad tags
        vz.advertising.getAdTag(adCode, function(adTag) {
            // use generated adTag now (dependent on the format)
            log.debug('got ad tag "' + adTag + '" for ad code "' + adCode + '"');
        });
    },
    
    getPaymentInterstitial : function() {
        vz.advertising.getPaymentInterstitial(function() {
            // do payment stuff here
            log.debug('User clicked ok');
        });
    }
    
    getPostBadge: function(){   
        vz.advertising.postBadge('http://s3.amazonaws.com/ragefaces/6844432fe20b9bedc9d3ba0736cb3945.png', 'Raging@Code', 'Your coding is awesome! Ragemachine!', 'http://www.ragefac.es', function(badgeId) {
            console.log(badgeId);//do something with the returned badgeId
        });
    }
};

vzDemo.advertising.controller = {
    bindAdvertising : function() {
        $('#adTag').unbind('click').bind('click', function() {
            vzDemo.advertising.getAdTag();
        });

        $('#paymentInterstitial').unbind('click').bind('click', function() {
            vzDemo.advertising.getPaymentInterstitial();
        });
        $('#postBadge').bind('click', function() {
            vzDemo.advertising.getPostBadge();
        });

    }
};