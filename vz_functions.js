var tabContainer = document.getElementById('tabcontainer');
var tabs = new gadgets.TabSet(gadgetId, 'Messaging', tabContainer);
var vzDemo = vzDemo || {};
var viewer;
var friends;
var friendsIds = new Array();
var log = log4javascript.getLogger("main");

vzDemo.controller = {
    init : function() {
        vzDemo.controller.initTabs();
        $('#content').show();

		var appender = new log4javascript.InPageAppender();
        appender.setShowCommandLine(false);
        log.addAppender(appender);
        log.debug('Viewparams');
        log.debug(gadgets.views.getParams());
    },
    
    initTabs : function() {
        tabs.addTab('Views', {
            contentContainer: document.getElementById('views'),
            callback : vzDemo.views.controller.bindViews
        });
        tabs.addTab('Messaging', {
            contentContainer: document.getElementById('messaging'),
            callback : vzDemo.messaging.controller.bindMessaging
        });
        tabs.addTab('Embedding', {
            contentContainer: document.getElementById('embedding'),
            callback : vzDemo.embedding.controller.bindEmbedding
        });
        tabs.addTab('Invite', {
            contentContainer: document.getElementById('invite'),
            callback : vzDemo.invite.controller.bindInvite
        });
        tabs.addTab('Advertising', {
            contentContainer: document.getElementById('advertising'),
            callback : vzDemo.advertising.controller.bindAdvertising
        });
        tabs.addTab('Iframe', {
            contentContainer: document.getElementById('iframe'),
            callback : vzDemo.iframe.controller.bindIframe
        });
        tabs.addTab('Backend', {
            contentContainer: document.getElementById('backend'),
            callback: vzDemo.backend.controller.bindBackend()
        });
        tabs.addTab('Various', {
            contentContainer: document.getElementById('various'),
            callback : vzDemo.various.controller.bindVarious
        });    
        tabs.addTab('Substitutions', {
            contentContainer: document.getElementById('substitutions'),
            callback : vzDemo.various.controller.bindLocal
        });
        tabs.addTab('OS Templates', {
            contentContainer: document.getElementById('os-template'),
            callback: vzDemo.templates.controller.bindTemplates
        });
        tabs.addTab("Data Viewer",{
            contentContainer:document.getElementById("statetab"),
            callback: vzDemo.opensocial.controller.bindOpenSocial,
            tooltip:"State viewer"
        });
    }
    
};





