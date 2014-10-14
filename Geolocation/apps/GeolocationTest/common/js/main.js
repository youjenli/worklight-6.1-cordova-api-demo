function wlCommonInit(){

	var mapping = {
    		"coarse":false,
    		"fine":true
    };
	
	$('#positioning').bind('click', function(){
	    WL.Logger.debug("Start to position.");
		$.mobile.loading('show', {
	         text: "Positioning",
	         theme: "a",
	         textonly: false,
	         textVisible: true
	    });
	    
	    var type = mapping[$("input[name='positioning-type']:checked").val()];
	    var timeout = ( $("#timeout").val() == "" ? $("#timeout").val() : 5000 );
	    
	    navigator.geolocation.getCurrentPosition(
	    		function(position){
	    			$("#resultSet").append(
	    		         $('<li>').addClass('result')
	    		            	.text("Position latitude : " + position.coords.latitude
	    		                  + " , langitude : " + position.coords.longitude 
	    		                  + " , altitude : " + position.coords.altitude
	    		                  + " , time out : " + timeout 
	    		                  + " sec.")
	    		    ).listview('refresh');
	    		    $.mobile.loading('hide');
	    	},  function(err){
	    			$("#resultSet").append(
	    				$('<li>').addClass('result')
	    					.text("Position error ,code : " + err.code
	    						+ " , error message : " + err.message
	    						+ " , time out : " + timeout)
	    			).listview('refresh');
	    			$.mobile.loading('hide');
	    }, 
	    		{
	    			enableHighAccuracy:type,
	    			timeout:timeout * 1000
	    });
	});
}
