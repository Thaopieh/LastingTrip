$(document).ready(() => {
  const containerData = {
    carousel_topPick: {
      containerId: "carousel_topPick",
      sortType: "desc_feedback",
    },
    carousel_budgetFriendly: {
      containerId: "carousel_budgetFriendly",
      sortType: "asc_price",
    },
    carousel_favorite: {
      containerId: "carousel_Trending",
      sortType: "desc_rating",
    },
  };

  // ham chuyen int thanh string
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  // Gọi API và hiển thị dữ liệu cho mỗi container
  Object.values(containerData).forEach((containerConfig) => {
    const { containerId, sortType } = containerConfig;
    const container = $("#" + containerId);

    $.ajax({
      url: `http://localhost:3030/api/v1/hotels`,
      method: "GET",
      data: { sortType: sortType },
      success: (data) => {
        data.forEach((item, index) => {
          let activeClass = index == 0 ? "active" : "";

          const formattedCost = numberWithCommas(item.cost);
          // var formattedCost = item.cost.toLocaleString();
          // var message = The cost is: ${formattedCost};
          if (sortType === "asc_price" && item.cost < 1000000) {
            const card = `<div class="carousel-item ${activeClass}" id=${item.id}">
              <a href="/hotel/${item.id}" target="_blank"  class="hotel-link" >
                <div class="card" >
                  <div class="img-wrapper">
                    <img src="" alt=${item.name}>
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
          }

          if (sortType === "desc_rating" && item.star > 4) {
            const card = `<div class="carousel-item ${activeClass}" id=${item.id}">
                <a href="/hotel/${item.id}" target="_blank"  class="hotel-link" >
                  <div class="card" >
                    <div class="img-wrapper">
                      <img src="" alt=${item.name}>
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
          }

          if (sortType === "desc_feedback" || 1) {
            const card = `<div class="carousel-item ${activeClass}" id=${item.id}">
                  <a href="/hotel/${item.id}" target="_blank"  class="hotel-link" >
                    <div class="card" >
                      <div class="img-wrapper">
                        <img src="" alt=${item.name}>
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
          }

          // console.log(message);
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
