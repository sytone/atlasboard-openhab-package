//var sprintf = require("sprintf-js").sprintf;

widget = {
  //runs when we receive data from the job
  onData: function (el, data) {
    //console.log("Function Called");
    //console.log(data);
    var debugOutput = false;
    // Expected Data Items.
    // data.state
    //   The data coming from the open hab state change for display use. 
    // data.itemType
    //   The Item type in openhabd we need to display. 
    // data.itemName 
    //   The name of the item in openhab for state tracking and management.
    // data.itemLabel
    //   The label to display in the header. 
    // data.displayImageBase
    //   The base image name for display. 
    // data.displayLabel
    //   If faulse the header is hidden/removed. 
    // data.itemBody
    //   The content to place in the body of the widget. Formatter???
    
    var widgetHeader = data.itemLabel;
    if(data.itemBody) {
        var widgetBody = sprintf(data.itemBody, data.state);
    } else {
        var widgetBody = data.state;
    }
    
    var stateChangeOption = 'unknown';
    
    //console.log("Item Type: "+data.itemType);
    switch(data.itemType) {
        case "Call":
            break;
        case "Color":
            break;
        case "Contact":
            break;
        case "DateTime":
            break;
        case "Dimmer":
            break;
        case "Group":
            break;
        case "Location":
            break;
        case "Number":
        
            break;
        case "Rollershutter":
            break;
        case "String":
            break;
        case "Switch":
            if(data.state == 'ON') {
                $('.switch-light > input', el).prop('checked', true);
            } else {
                $('.switch-light > input', el).prop('checked', false);
            }
            if (data.displayLabel) {
              $('h2', el).text(widgetHeader);
            } else {
                $('h2', el).hide();
            }
            
            $('.content', el).hide();
            $('.switch-light > input', el).unbind( 'change' );
            $('.switch-light > input', el).on('change', function() {
                if ($(this).is(':checked')) {
                    stateChangeOption = 'ON'; 
                } else {
                    stateChangeOption = 'OFF';  
                }
                console.log('actionlink clicked');
                var postData = {}; 
                postData.auth = data.openhabSimpleAuth; 
                postData.state = stateChangeOption; 
                url = '/jobs/openhabbridge/' + data.itemName + '/internal';
                $.ajax({ 
                    type: 'POST', 
                    data: JSON.stringify(postData), 
                    contentType: 'application/json', 
                    url: url,						 
                    success: function(data) { 
                        console.log('success'); 
                        console.log(JSON.stringify(data)); 
                    }
                });                 
            });
          
            break;
        default:
            widgetHeader = "Unknown Item...";
    } 
    
    //The parameters our job passed through are in the data object
    //el is our widget element, so our actions should all be relative to that


    $('.content', el).html(widgetBody);
    
    if(debugOutput) {
        $('.debugContent', el).html(JSON.stringify(data));
    }
  }
};