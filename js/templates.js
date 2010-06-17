var vzDemo = vzDemo || {};

vzDemo.templates = {

};

vzDemo.templates.controller = {
    bindTemplates: function() {
        $('#updateViewerTemplate').bind('click', function() {
            log.debug('setting viewer display name to "New User"');
            log.debug('setting fruit to "Pineapple"');
            var newUser = {
                displayName: 'New User'
            };
            opensocial.data.DataContext.putDataSet("Viewer", newUser);
            opensocial.data.DataContext.putDataSet( "fruit", "Pineapple" );
        });
    }
};

