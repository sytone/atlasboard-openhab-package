widget = {
  onData: function (el, data) {
    if (data.title) {
      $('h2', el).text(data.title);
    }

    if(data.useBase64Stream) {
      $('.featured-image', el).attr("src", data.imageSrc);
    } else {
      $('.featured-image', el).attr("src", data.imageSrc + "&" + new Date().getTime());
    }
  }
};