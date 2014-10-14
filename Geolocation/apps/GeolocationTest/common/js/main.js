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
	    var timeout =( $("#timeout").val() != "" ? $("#timeout").val() : 5 );
	    
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
	
	$("#device").bind("pagebeforeshow", displayDeviceInfo);
	$("#reloadDeviceInfo").bind("click", displayDeviceInfo);
}

function displayDeviceInfo(){
	$("#device-info").remove(".result");
	var props = ["name", "cordova", "platform", "uuid", "version", "model"];
	var device = window.device;
	for( var i = 0 ; i < props.length ; i ++ ){
		var obj = props[i];
		$("#device-info").append(
				$("<li>").addClass("result")
					.text("Device " + obj + " : " + device[obj])
			);
	}
	$("#device-info").listview("refresh");
}