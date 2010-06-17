var vzDemo = vzDemo || {};

vzDemo.various = {
    getRandom: function( min, max ) {
	if( min > max ) {
		return( -1 );
	}
	if( min == max ) {
		return( min );
	}
        return( min + parseInt( Math.random() * ( max-min+1 ) ) );
    }
};

vzDemo.various.controller = {
    bindLocal: function() {
        var prefs = new gadgets.Prefs();
        $('#prefsCountry').html('country ' + prefs.getCountry());
        $('#prefsLang').html('lang ' + prefs.getLang());
    },
    bindVarious: function() {
        $('#getAndSetPrefs').bind('click', function() {
            var prefs = new gadgets.Prefs();
            var name = prefs.getString("name");
            log.debug('preferences name, got value: ' + name);
            var newName = 'new name' + vzDemo.various.getRandom(1, 99);
            prefs.set('name', newName);
            log.debug('references name, set to: ' + newName);
        });

        var staticMsg;
        var msg = new gadgets.MiniMessage();

        $('#createStaticMessage').bind('click', function() {
            staticMsg = msg.createStaticMessage('this is a static message');
        });

        $('#dismissMessage').bind('click', function() {
            if (staticMsg) {
                msg.dismissMessage(staticMsg);
            }
        });

        $('#createTimerMessage').bind('click', function() {
            var timerMsg = msg.createTimerMessage('this is a timable message', 3, function() {
                log.debug('timer message callback called');
                msg.dismissMessage(timerMsg);
            });
        });

        $('#createDismissibleMessage').bind('click', function() {
            var dismissableMsg = msg.createDismissibleMessage('this is a dismissalbe message', function() {
                log.debug('dismissable message callback called');
                msg.dismissMessage(dismissableMsg);
            });
        });

        $('#adjustHeight').bind('click', function() {
           gadgets.window.adjustHeight(800);
        });

        $('#setTitle').bind('click', function() {
            gadgets.window.setTitle('new title ' + vzDemo.various.getRandom(1, 99));
        });

        $('#encodeValues').bind('click', function() {
            log.debug(gadgets.io.encodeValues({a: 'blub', b: 'abc'}));
        });

        $('#getProxyUrl').bind('click', function() {
            log.debug(gadgets.io.getProxyUrl('http://www.google.de', {a: 'blub', b: 'abc'}));
        });
        
        $('#getPermissions').bind('click', function() {
           vz.vcard.getPermissions('VIEWER', function(response) {
               log.debug('removed permission settings for VIEWER')
               log.debug(response);
           });
        });
    }
};
