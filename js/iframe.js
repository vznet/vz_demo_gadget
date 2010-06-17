var vzDemo = vzDemo || {};
var rpcToken = gadgets.util.getUrlParameters()['rpctoken'];
var log = log4javascript.getLogger("main");

vzDemo.iframe = {
    fillIframe: function() {        
        log.debug('load iframe with rpc token ' + rpcToken);
        var url = 'http://local.svz-pcn-107:8062/vz_demo_gadget/backend/iframe.html?rpctoken=' + rpcToken;
        url += '&env=' + encodeURIComponent(location.host);
        log.debug('parent http://' + location.host);
        url += '&parent=' + encodeURIComponent('http://' + location.host);
        var iframe = document.getElementById('myiframe');
        iframe.src = url;
        gadgets.rpc.setAuthToken('myiframe', rpcToken);
        gadgets.rpc.setRelayUrl('myiframe', 'http://local.svz-pcn-107:8062/vz_demo_gadget/backend/rpc_relay.html');
    },

    callback: function(args) {
        log.debug('received callback from iframe');

        log.debug('call function blub in myiframe');
        gadgets.rpc.call('myiframe', "blub", null, null);
        
        $('#iframe_response').html(args);

        log.debug('return callback to myiframe');
        this.callback('cb value');
    }
};

vzDemo.iframe.controller = {
    bindIframe: function() {
        $('#fillIframe').unbind('click').bind('click', function() {
            vzDemo.iframe.fillIframe();
        });
    }
};

log.debug('register myiframe with rpctoken ' + rpcToken);

gadgets.rpc.register('frameCallback', vzDemo.iframe.callback);
gadgets.rpc.register('log', function(arg) {
    log.debug(arg);
});


