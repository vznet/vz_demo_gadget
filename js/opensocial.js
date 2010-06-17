var vzDemo = vzDemo || {};

vzDemo.opensocial = {
    useOsapi: false,

    sendOsapiRequest: function(user, group, callback) {
        if (user.indexOf(':') > 0) {
            osapi.people.get({userId: user, groupId: '@' + group.toLowerCase(), fields: '@all'}).execute(function(data) {
              callback(data);
            });
        } else {
            osapi.people.get({userId: '@' + user.toLowerCase(), groupId: '@' + group.toLowerCase(), fields: '@all'}).execute(function(data) {
              callback(data);
            });
        }

    },

    osapiAppdata: function() {
        vzDemo.opensocial.osAppdata();
        osapi.newBatch().
          //  add("create", osapi.appdata.update({userId: '@viewer', data: {gifts: 'a crazed monkey'}})).
            add('get', osapi.appdata.get({ userId : '@viewer', groupId : '@self', keys: ['gifts']})).
        execute(function(result) {
          log.debug(result);
        });

    },

    osAppdata: function() {
      var req = opensocial.newDataRequest();
      req.add(req.newUpdatePersonAppDataRequest("VIEWER", 'gifts2', 'blub'));
      req.send();
      var viewer = opensocial.newIdSpec({ "userId" : "VIEWER" });
      req.add(req.newFetchPersonAppDataRequest(viewer, 'gifts', {}), 'data');
      req.send(function(r) {
          log.debug(r);
      });

    },

    sendRequest: function(user, group, callback) {

        if (vzDemo.opensocial.useOsapi) {
            vzDemo.opensocial.sendOsapiRequest(user, group, callback);
            return;
        }

        var req = opensocial.newDataRequest();
        var idSpec = opensocial.newIdSpec({"userId" : user, "groupId" : group});
        var opt_params = {};
        opt_params[opensocial.DataRequest.PeopleRequestFields.PROFILE_DETAILS ] = ['birthday', 'gender', 'thumbnailUrl', 'photos', 'addresses', 'emails', 'phoneNumbers'];
        req.add(req.newFetchPeopleRequest(idSpec, opt_params), 'requestId');

        req.send(function(data) {
            callback(data.get('requestId').getData());
        });
    }
};

vzDemo.opensocial.controller = {

    showUser: function(user) {
        log.debug(gadgets.json.stringify(user));
    },

    bindOpenSocial: function() {
        $('#statetab-toogle-osapi').bind('click', function() {
            vzDemo.opensocial.useOsapi = !vzDemo.opensocial.useOsapi;
            if (vzDemo.opensocial.useOsapi) {
                $(this).html('new osapi');
            } else {
                $(this).html('old api');
            }
        });

        $('#statetab-appdata-button').bind('click', function() {
            vzDemo.opensocial.osapiAppdata();
        });

        $('#statetab-fetchviewer-button').bind('click', function() {
            vzDemo.opensocial.sendRequest('VIEWER', 'SELF', vzDemo.opensocial.controller.showUser);
        });
        $('#statetab-fetchowner-button').bind('click', function() {
            vzDemo.opensocial.sendRequest('OWNER', 'SELF', vzDemo.opensocial.controller.showUser);
        });
        $('#statetab-fetchviewerfriends-button').bind('click', function() {
            vzDemo.opensocial.sendRequest('VIEWER', 'FRIENDS', vzDemo.opensocial.controller.showUser);
        });
        $('#statetab-fetchownerfriends-button').bind('click', function() {
            vzDemo.opensocial.sendRequest('OWNER', 'FRIENDS', vzDemo.opensocial.controller.showUser);
        });
        $('#statetab-fetchbyid-button').bind('click', function() {
            vzDemo.opensocial.sendRequest($('#statetab-fetchbyid-input').val(), 'SELF', vzDemo.opensocial.controller.showUser);
        });
        $('#statetab-fetchfriendsbyid-button').bind('click', function() {
            vzDemo.opensocial.sendRequest($('#statetab-fetchbyid-input').val(), 'FRIENDS', vzDemo.opensocial.controller.showUser);
        });
        $('#statetab-manyusers-button').bind('click', function() {
            vzDemo.opensocial.osManyUsers();
        });
        $('#statetab-osManyFields-button').bind('click', function() {
            vzDemo.opensocial.osManyFields();
        });
    }
};