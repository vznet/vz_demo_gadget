var vzDemo = vzDemo || {};

vzDemo.invite = {
    inviteFriends : function() {
        vz.invite.getUniqueToken(function(token) {
            vz.invite.create(token, 'I invite you to install the gadget', 'http://static.pe.studivz.net/20110127-0/Img/logo.png');
        });
    },
    
    suggest : function() {
        vz.invite.suggest('Have a look at this gadget');
    },

    vcard : function() {
        vz.vcard.update(function(response) {
            log.debug('vcard update response');
            log.debug(response);
        }, ['phoneNumbers', 'thumbnailUrl']);
    }
};

vzDemo.invite.controller = {
    bindInvite : function() {
        $('#inviteFriends').unbind('click').bind('click', function() {
            vzDemo.invite.inviteFriends();
        });
        
        $('#suggest').unbind('click').bind('click', function() {
            vzDemo.invite.suggest();
        });

        $('#vcard').unbind('click').bind('click', function() {
            vzDemo.invite.vcard();
        });
    }
};