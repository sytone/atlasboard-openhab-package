widget = {
  onData: function (el, data) {
    if (data.title) {
      $('h2', el).text(data.title);
    }

    $('.featured-image', el).attr("src", data.imageSrc + "&" + new Date().getTime());
  }
};