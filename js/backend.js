var vzDemo = vzDemo || {};

vzDemo.backend = {
    sendNotificationRequest: function() {
        var params = [];
        params[gadgets.io.RequestParameters.AUTHORIZATION] = gadgets.io.AuthorizationType.SIGNED;
        params[gadgets.io.RequestParameters.METHOD] = gadgets.io.MethodType.POST;
        params[gadgets.io.RequestParameters.POST_DATA] = gadgets.io.encodeValues({
            message: 'this is the notification'
        });

        gadgets.io.makeRequest(backend + '/notification.php', function(response) {
            log.debug(response);
        }, params);
    }
};

vzDemo.backend.controller = {
    bindBackend: function() {
        $('#sendBackendNotification').unbind('click').bind('click', function() {
            vzDemo.backend.sendNotificationRequest();
        });

        
        $('#preloadRequest').bind('click', function() {
            var params = {};
            params[gadgets.io.RequestParameters.AUTHORIZATION]=gadgets.io.AuthorizationType.SIGNED;

            gadgets.io.makeRequest(backend + '/preload.php', function(response) {
                log.debug(response);
            }, params );
        });

        $('#getRequest').bind('click', function() {
            var params = {};
            params[gadgets.io.RequestParameters.AUTHORIZATION]=gadgets.io.AuthorizationType.SIGNED;
            params[gadgets.io.RequestParameters.METHOD]=gadgets.io.MethodType.GET;
            params[gadgets.io.RequestParameters.REFRESH_INTERVAL]=60;
            params[gadgets.io.RequestParameters.HEADERS] = {
                "x-my-appid" : "header1",
                "Authorization" : "header2 auth"
            };

            gadgets.io.makeRequest(backend + '/getRequest.php', function(response) {
                log.debug(response);
            }, params );
        });

        $('#domRequest').bind('click', function() {
            var params = {};
            params[gadgets.io.RequestParameters.AUTHORIZATION]=gadgets.io.AuthorizationType.SIGNED;
            params[gadgets.io.RequestParameters.METHOD]=gadgets.io.MethodType.GET;
            params[gadgets.io.RequestParameters.REFRESH_INTERVAL]=60;
            params[gadgets.io.RequestParameters.CONTENT_TYPE] = gadgets.io.ContentType.DOM;


            gadgets.io.makeRequest(backend + '/domRequest.php', function(response) {
                log.debug(response);
            }, params );
        });

        $('#feedRequest').bind('click', function() {
            var params = {};
            params[gadgets.io.RequestParameters.CONTENT_TYPE] = gadgets.io.ContentType.FEED;


            gadgets.io.makeRequest(backend + '/feed.xml', function(response) {
                log.debug(response);
                var r = gadgets.json.stringify(response);
                log.debug(r);
            }, params );
        });

        $('#atomRequest').bind('click', function() {
            var params = {};
            params[gadgets.io.RequestParameters.CONTENT_TYPE] = gadgets.io.ContentType.FEED;


            gadgets.io.makeRequest(backend + '/atom.xml', function(response) {
                log.debug(response);
            }, params );
        });

        $('#jsonRequest').bind('click', function() {
            var params = {};
            params[gadgets.io.RequestParameters.CONTENT_TYPE] = gadgets.io.ContentType.JSON;


            gadgets.io.makeRequest(backend + '/externalFriends.json', function(response) {
                log.debug(response);
            }, params );
        });

        $('#getRequestUnsigned').bind('click', function() {
            gadgets.io.makeRequest(backend + '/getRequest.php', function(response) {
                log.debug(gadgets.json.stringify(response));
            });
        });

        $('#postRequest').bind('click', function() {
            var params = {};
            params[gadgets.io.RequestParameters.AUTHORIZATION]=gadgets.io.AuthorizationType.SIGNED;
            params[gadgets.io.RequestParameters.METHOD]=gadgets.io.MethodType.POST;
            params[gadgets.io.RequestParameters.POST_DATA]=gadgets.io.encodeValues({
                a: 'blub',
                b: 'abc'
            });
            params[gadgets.io.RequestParameters.HEADERS] = {
                "x-my-appid" : "header1",
                "Authorization" : "header2 auth"
            };

            gadgets.io.makeRequest(backend + '/postRequest.php', function(response) {
                log.debug(response);
            }, params );
        });

        $('#oauthRequest').bind('click', function() {
            var fetchData = function() {
                var params = {};
                params[gadgets.io.RequestParameters.AUTHORIZATION]=gadgets.io.AuthorizationType.OAUTH;
                params[gadgets.io.RequestParameters.OAUTH_SERVICE_NAME]='MyTwitter';
                gadgets.io.makeRequest('http://api.twitter.com/1/statuses/home_timeline.json', function(response) {

                    log.debug(gadgets.json.stringify(response));
                    if (response.oauthApprovalUrl) {
                        log.debug('open popup with ' + response.oauthApprovalUrl);
                        var popup = new gadgets.oauth.Popup(
                            response.oauthApprovalUrl,
                            'width=400&height=400',
                            function() { },
                            function() {
                                fetchData();
                            }
                            );

                        popup.onClick_();
                    }
                }, params );
            }

            fetchData();

        });
        $('#getRequestOsapi').bind('click', function() {
            osapi.http.get({
                'href' : backend + '/getRequest.php',
                'format' : 'json',
                'authz' : 'signed'
            }).execute(function(response) {
                log.debug(response);
            });
        });

        $('#postRequestOsapi').bind('click', function() {
            osapi.http.post({
                'href' : backend + '/postRequest.php',
                'format' : 'json',
                'authz' : 'signed',
                'body' : gadgets.io.encodeValues({
                    a: 'blub',
                    b: 'abc'
                })
            }).execute(function(response) {
                log.debug(response);
            });
        });
    }
};