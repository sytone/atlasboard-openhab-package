widget = {
  //runs when we receive data from the job
  onData: function (el, data) {

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
        var widgetBody = sprintf(data.itemBody, data.state)
    } else {
        var widgetBody = data.state;
    }
    
    console.log("Item Type: "+data.itemType)
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
            break;
        default:
            widgetHeader = "Unknown Item..."
    } 
    
    //The parameters our job passed through are in the data object
    //el is our widget element, so our actions should all be relative to that
    if (data.displayLabel) {
      $('h2', el).text(widgetHeader);
    } else {
      $('h2', el).hide();
    }

    $('.content', el).html(widgetBody);
  }
};