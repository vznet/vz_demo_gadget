var vzDemo = vzDemo || {};

vzDemo.messaging = {
    
    sendPrivateMessage : function(text) {
        var params = [];
        params[opensocial.Message.Field.TITLE] = 'VZ-Demo private message title!';
        params[opensocial.Message.Field.TYPE] = opensocial.Message.Type.PRIVATE_MESSAGE;

        var message = opensocial.newMessage(text, params);
        var recipient = "VIEWER";
        opensocial.requestSendMessage(recipient, message, function(response) {
            log.debug('private message response');
            log.debug(response);
        });
    },
    
    postToWall : function(text) {
        var param = {"msg":"This message should be displayed inside the embed view"};
        vz.embed.getStaticContentUrl('key_resource_rich', function(staticUrl) {
            log.debug('static content url: ' + staticUrl);
            vz.embed.getEmbedUrl(param, function(url) {
                log.debug('embed url: ' + url);
                var params = [];
                params[opensocial.Message.Field.TYPE] = opensocial.Message.Type.PUBLIC_MESSAGE;
                log.debug(staticUrl);
                var message = opensocial.newMessage(text + ' Embed view: ' + url + ' an embedded IFrame ' + staticUrl, params);
                var recipient = ["OWNER"];
                opensocial.requestSendMessage(recipient, message, function(response) {
                    log.debug('post to wall response');
                    log.debug(response);
                });
            });
        }, {"q" : "vz netzwerke"});
        
    },
    
    sendNotification : function(text) {
        var params = [];
        params[opensocial.Message.Field.TITLE] = 'VZ-Demo notification! ' + text;
        params[opensocial.Message.Field.TYPE] = opensocial.Message.Type.NOTIFICATION;
        params[opensocial.Message.Field.OPT_PARAMS] = {param1: 'abc', param2: 'def'};

        var message = opensocial.newMessage('', params);
        var recipient = "OWNER";
        opensocial.requestSendMessage(recipient, message, function(response) {
            log.debug('send notification response');
            log.debug(response);
        });
    },
    
    sendStatusUpdate : function(text) {
        var param = {"msg":"This message should be displayed inside the embed view"};
        vz.embed.getEmbedUrl(param, function(url) {
            log.debug('embed url: ' + url);
            
            var params = [];
            params[opensocial.Activity.Field.BODY ] = text;
            params[opensocial.Activity.Field.URL ] = url;

            var activity = opensocial.newActivity(params);

            opensocial.requestCreateActivity(activity, null, function(response) {
                log.debug('send activity response');
                log.debug(response);
            })
        });
    }
};

vzDemo.messaging.controller = {
    bindMessaging : function() {
        $('#privMessage').unbind('click').bind('click', function() {
            var text = $('#message').val();
            vzDemo.messaging.sendPrivateMessage(text);
        });

        $('#wallpost').unbind('click').bind('click', function() {
            var text = $('#message').val();
            vzDemo.messaging.postToWall(text);
        });
  
        $('#notification').unbind('click').bind('click', function() {
            var text = $('#message').val();
            vzDemo.messaging.sendNotification(text);
        });

        $('#statusUpdate').unbind('click').bind('click', function() {
            var text = $('#message').val();
            vzDemo.messaging.sendStatusUpdate(text);
        });
    }
};