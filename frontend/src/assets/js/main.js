$(function () {
  //start styler
  $("select").styler();
  //end styler

  //start rateYo
  $(".card__info-rate,.gallery__tabs-box-rate,.products__featured-rate,.product-info__information-rate,.product-review__inner-rate").rateYo({
    rating: 5,
    starWidth: "15px",
    readOnly: true,
    ratedFill: "#d58e32",
  });
  //end rateYo

  //start Fancybox
  $('[data-fancybox="images"]').fancybox({
    afterLoad: function (instance, current) {
      var pixelRatio = window.devicePixelRatio || 1;
      if (pixelRatio > 1.5) {
        current.width = current.width / pixelRatio;
        current.height = current.height / pixelRatio;
      }
    },
  });
  //end Fancybox
});
