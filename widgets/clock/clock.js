

widget = {
    //runs when we receive data from the job
    onData: function (el, data) {
        //The parameters our job passed through are in the data object
        //el is our widget element, so our actions should all be relative to that
        if (data.title) {
            $('h2', el).text(data.title);
        }

        if(data.hideTitle) {
            $('h2', el).hide();
        }

        var serverDate = new Date(data.date);

        var date = serverDate.format(data.dateFormat);
        var time = serverDate.format(data.timeFormat);
        $('.date', el).html(date);
        $('.time', el).html(time);

        $('.clocktest', el).click(function () {
            $.get('/jobs/clock', function (js) {
                $('.clocktestout', el).html(js);

            });
  
        });
    }


};