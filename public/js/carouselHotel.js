$(document).ready(() => {
  const containerData = {
    carousel_topPick: {
      containerId: "carousel_topPick",
      imagePath: "/image/TopPicks/",
      apiEndpoint: "http://localhost:3000/api/v1/hotels?type=1",
    },
    carousel_budgetFriendly: {
      containerId: "carousel_budgetFriendly",
      imagePath: "/image/BudgetFriendly/",
      apiEndpoint: "http://localhost:3000/api/v1/hotels?type=2",
    },
    carousel_favorite: {
      containerId: "carousel_Trending",
      imagePath: "/image/TrendingGuestHouse/",
      apiEndpoint: "http://localhost:3000/api/v1/hotels?type=3",
    },
  };

  // ham chuyen int thanh string
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  // Gọi API và hiển thị dữ liệu cho mỗi container
  Object.values(containerData).forEach((containerConfig) => {
    const { containerId, imagePath, apiEndpoint } = containerConfig;
    const container = $("#" + containerId);

    $.ajax({
      url: apiEndpoint,
      method: "GET",
      success: (data) => {
        data.forEach((item, index) => {
          let activeClass = index == 0 ? "active" : "";
          const imageIndex = index + 1;
          const imageSrc = imagePath + `Hotel_${imageIndex}.webp`;
          const formattedCost = numberWithCommas(item.cost);
          // var formattedCost = item.cost.toLocaleString();
          // var message = `The cost is: ${formattedCost}`;

          // console.log(message);
          const card = `<div class="carousel-item ${activeClass}" id=${item.id}">
              <a href="/hotel/${item.id}" target="_blank"  class="hotel-link" >
                <div class="card" >
                  <div class="img-wrapper">
                    <img src=${imageSrc} alt=${item.name}>
                  </div>
                  <div class="card-body">
                    <a class="click-item" href="/hotel/${item.id}" target="_blank">
                      <h5 class="card-title">${item.name}</h5>
                    </a>
                    <p class="card-text">${item.map}</p>
                    <a href="#" class="btn btn-primary"><span class="from">From</span> VND
                      ${formattedCost}</a>
                  </div>
                </div>
              </a>
            </div>`;

          container.append(card);
        });
      },
    });
  });
});

$(document).ready(function () {
  // Xử lý sự kiện khi người dùng nhấp vào một liên kết khách sạn
  $(".hotel-link").click(function (event) {
    event.preventDefault(); // Ngăn chặn hành vi mặc định của liên kết

    // Lấy href của liên kết
    var href = $(this).attr("href");

    // Lấy id khách sạn từ href
    var hotelId = href.split("/").pop();

    // Chuyển hướng đến trang khách sạn và truyền id khách sạn qua URL
    window.location.href = "/hotel/" + hotelId;
  });
});
