widget = {
  onData: function (el, data) {
    if (data.title) {
      $('h2', el).text(data.title);
    }

<<<<<<< HEAD
    $('.featured-image', el).attr("src", data.imageSrc + "&" + new Date().getTime());
=======
    $('.content', el).html(
        "<img class='featured-image' src='" + data.imageSrc + "'/>"
    );

>>>>>>> 7a431e26ec2896f7b5f19779788f0ac90303b88b
  }
};