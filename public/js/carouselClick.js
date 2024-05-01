function setupCarousel(carouselId) {
  const multipleItemCarousel = document.querySelector(carouselId);

  if (multipleItemCarousel) {
    // Kiểm tra xem carousel có tồn tại không
    if (window.matchMedia("(min-width:576px)").matches) {
      // Kiểm tra xem có instance của Carousel chưa
      if (!multipleItemCarousel.hasInstance) {
        multipleItemCarousel.hasInstance = true; // Đánh dấu rằng đã có instance của Carousel
        const carousel = new bootstrap.Carousel(multipleItemCarousel, {
          interval: false,
        });

        var carouselWidth = $(multipleItemCarousel)
          .find(".carousel-inner")
          .prop("scrollWidth");
        var cardWidth = $(multipleItemCarousel).find(".carousel-item").width();

        var scrollPosition = 0;

        $(multipleItemCarousel)
          .find(".carousel-control-next")
          .on("click", function () {
            if (scrollPosition < carouselWidth - cardWidth * 4) {
              scrollPosition = scrollPosition + 4 * cardWidth;
              $(multipleItemCarousel)
                .find(".carousel-inner")
                .animate({ scrollLeft: scrollPosition }, 600);
            }
          });
        $(multipleItemCarousel)
          .find(".carousel-control-prev")
          .on("click", function () {
            if (scrollPosition > 0) {
              scrollPosition = scrollPosition - 4 * cardWidth;
              $(multipleItemCarousel)
                .find(".carousel-inner")
                .animate({ scrollLeft: scrollPosition }, 600);
            }
          });
      }
    } else {
      $(multipleItemCarousel).addClass("slide");
    }
  } else {
    console.error("Carousel with ID " + carouselId + " not found.");
  }
}

// Bắt sự kiện click trên nút prev và next của carousel và gọi hàm setupCarousel
$(".carousel-control-prev, .carousel-control-next").click(function () {
  // Lấy giá trị của thuộc tính data-bs-target
  var carouselId = $(this).attr("data-bs-target");
  // Lấy ID của carousel từ chuỗi
  setupCarousel(carouselId);
});
// Funct
