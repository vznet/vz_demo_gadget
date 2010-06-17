var vzDemo = vzDemo || {};

vzDemo.views = {
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

vzDemo.views.controller = {
    bindViews: function() {
        $('#requestNavigateTo').bind('click', function() {
            var canvas = gadgets.views.getSupportedViews()["canvas"];
            gadgets.views.requestNavigateTo(canvas, {"name" : "tim", "age" : 23, "crazystuff" : "Äöüß€ @ §&/()/%∑€®†Ω"});
        });

        $('#requestNavigateToIntegration').bind('click', function() {
            gadgets.views.requestNavigateTo('integration',  {bla: 'blub'});
        });

        $('#openPopup').bind('click', function() {
            gadgets.views.requestNavigateTo('popup', null, null, {width: 800, height: 800});
        });

        $('#getViewParams').bind('click', function() {
           log.debug(gadgets.views.getParams());
        });

        $('#getCurrentView').bind('click', function() {
           log.debug(gadgets.views.getCurrentView());
        });

        $('#getSupportedViews').bind('click', function() {
           log.debug(gadgets.views.getSupportedViews());
        });

    }
};
