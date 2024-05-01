$(document).on("click", ".hotel-link", function (event) {
  event.preventDefault(); // Ngăn chặn hành vi mặc định của liên kết
  var href = $(this).attr("href");
  var hotelId = href.split("/").pop();
  window.location.href = "/hotel/" + hotelId;
});
function clearSelection() {
  var radios = document.getElementsByName("option");
  radios.forEach(function (radio) {
    radio.checked = false;
  });
}
// Function to update the displayed price value

// Function to format currency for display
function formatCurrency(amount) {
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Event listener to call updateValue() when input changes
document.addEventListener("DOMContentLoaded", function () {
  const priceRange = document.getElementById("price_range");
  const valueElement = document.getElementById("value");

  if (priceRange && valueElement) {
    // Nếu các phần tử được tìm thấy, gắn sự kiện lắng nghe và cập nhật giá trị
    priceRange.addEventListener("input", updateValue);
    updateValue(); // Gọi hàm updateValue() ban đầu
  } else {
    console.error("Không tìm thấy phần tử có id 'price_range' hoặc 'value'.");
  }
});

function updateValue() {
  const priceRange = document.getElementById("price_range");
  const valueElement = document.getElementById("value");

  if (priceRange && valueElement) {
    const currentValue = priceRange.value;
    const formattedValue = numberWithCommas(currentValue) + " VND";
    valueElement.textContent = `Từ ${formattedValue}`;
  } else {
    console.error("Không tìm thấy phần tử có id 'price_range' hoặc 'value'.");
  }
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

$(document).ready(() => {
  const loaddata = (data) => {
    const numberOfResultsElement = $("#numberOfResults");
    const count = data.filter((item) => item.hasOwnProperty("id")).length;

    // Cập nhật nội dung của phần tử HTML
    numberOfResultsElement.text(count);
    function numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const container = $("#hotelList");
    container.empty(); // Xóa dữ liệu cũ trước khi render dữ liệu mới
    let i = 1;
    let j = 1;
    let q = 1;
    data.forEach((item, index) => {
      let imageSrc;
      const formattedCost = numberWithCommas(item.cost);
      if (item.type == 2) {
        imageSrc = `/image/BudgetFriendly/Hotel_${i}.webp`;
        i++;
      } else if (item.type == 3) {
        imageSrc = `/image/TrendingGuestHouse/Hotel_${j}.webp`;
        j++;
      } else if (item.type == 1) {
        imageSrc = `/image/TopPicks/Hotel_${q}.webp`;
        q++;
      }
      const reviews = item.Reviews.map((review) => ({
        rating: review.rating,
        description: review.description,
      }));
      const description = reviews[0] ? reviews[0].description : "Tốt";

      const stars = `<i class="fas fa-star"></i>`.repeat(item.rate);
      const card = `
        <div class="card mb-3">
          <div class="row g-0">
            <a href="/hotel/${item.id}" class="hotel-link wrap-img">
              <div class="col-md-4">
                <img src="${imageSrc}" alt="...">
              </div>
            </a>
            <div class="col-md-8">
              <div class="card-body">
                <div class="head-title">
                  <h5 class="card-title">
                    <a href="/hotel/${item.id}" class="hotel-link">${item.name}</a>
                    ${stars}
                  </h5>
                  <div class="card-describle">
                    <p>${description}</p>
                    <p>
                      <i class="fa-solid fa-location-dot"></i>${item.map}
                      <span><button class="btn" data-bs-toggle="modal" onclick="redirectToMap('${item.name}')" style="color: blue">Xem bản đồ</button></span>
                    </p>
                  </div>
                </div>
                <div class="room-type-price">
                  <div class="room-type">
                    <p>${item.roomType} <i class="fa-solid fa-user"></i><i class="fa-solid fa-user"></i><i class="fa-solid fa-bath"></i><i class="fa-solid fa-bed"></i></p>
                    <p class="card-text">
                      <small class="text-body-secondary">${item.status}</small>
                    </p>
                  </div>
                  <div class="room-price">
                    <p>VND ${formattedCost}</p>
                    <a href="#" class="btn btn-primary">Kiểm tra</a>
                  </div>
                </div>
                <div class="get-lower-price">
                  <a href="#"><span><i class="fa-solid fa-key"></i>Đăng nhập</span> hoặc <span>đăng kí</span> để xem giá ưu đãi hơn</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
      container.append(card);
    });
  };

  // Xử lý sự kiện khi thay đổi các filter
  $(
    '.col-10 input[type="range"], .col-10 input[type="checkbox"], .col-10 input[type="radio"], .dropdown-item'
  ).change(function () {
    sendFilterRequest();
  });
  let sortType = "";
  $(".dropdown-menu a.dropdown-item").click(function (event) {
    event.preventDefault(); // Ngăn chặn hành động mặc định của thẻ a khi được click

    // Lấy giá trị của thuộc tính data-value từ dropdown-item được click
    sortType = $(this).data("value");
    console.log(sortType);
    sendFilterRequest();
  });
  // Hàm gửi yêu cầu lọc tới máy chủ
  function sendFilterRequest() {
    console.log("Hello");

    selectedFilters = {};
    // Thu thập giá trị của input range có class là 'price-range'
    selectedFilters["price"] = $('.col-10 input[type="range"]').val();

    // Thu thập các giá trị từ các checkbox được chọn trong cùng một cột
    $('.col-10 input[type="checkbox"]:checked').each(function () {
      const parentClass = $(this).closest(".col-10").attr("class"); // Lấy class của cột cha
      const filterValue = $(this).val();
      const classArray = parentClass.split(" ");

      // Loại bỏ lớp '.col-10' khỏi mảng các lớp
      const filteredClasses = classArray.filter(
        (className) => className !== "col-10"
      );

      // Gộp các lớp lại thành chuỗi mới (không chứa 'col-10')
      const updatedParentClass = filteredClasses.join(" ");

      // Kiểm tra nếu chưa có mảng bộ lọc cho lớp cha này, khởi tạo mảng mới
      if (!selectedFilters[updatedParentClass]) {
        selectedFilters[updatedParentClass] = [];
      }

      // Thêm filterValue vào mảng bộ lọc của lớp cha
      selectedFilters[updatedParentClass].push(filterValue);
    });
    $('.col-10 input[type="radio"]:checked').each(function () {
      const filterType = $(this).attr("name");
      const filterValue = $(this).val();
      selectedFilters[filterType] = filterValue;
    });
    const nameToIdMap = {
      "bath sun": 1,
      spa: 2,
      "free parking": 3,
      "airport check": 4,
      internet: 5,
      "pool overview": 6,
      "Khu vực ăn uống": 7,
      Bar: 8,
      Cafes: 9,
      "Giữ hành lý": 10,
      "Báo thức": 11,
      "Phòng họp": 12,
      "view city": 13,
      "smoking area": 14,
      "Phòng tắm riêng tư": 15,
      "Máy lạnh": 16,
      "Lễ tân 24/7": 17,
    };
    const nameServiceRoomToIdMap = {
      "air conditioning": 18,
      "washing machine": 19,
      TV: 20,
      bathtub: 21,
      fridge: 22,
      balcony: 23,
    };

    // Hàm ánh xạ tên dịch vụ sang các ID tương ứng
    function mapServiceNamesToIds(serviceNames) {
      const mappedIds = [];

      // Lặp qua các tên dịch vụ trong mảng serviceNames
      serviceNames.forEach((serviceName) => {
        // Kiểm tra xem tên dịch vụ có trong nameToIdMap không
        if (nameToIdMap.hasOwnProperty(serviceName)) {
          // Nếu có, lấy id tương ứng và thêm vào mảng mappedIds
          mappedIds.push(nameToIdMap[serviceName]);
        }
      });

      return mappedIds;
    }
    function mapServiceRoomNamesToIds(serviceNames) {
      const mappedIds = [];

      // Lặp qua các tên dịch vụ trong mảng serviceNames
      serviceNames.forEach((serviceName) => {
        // Kiểm tra xem tên dịch vụ có trong nameToIdMap không
        if (nameServiceRoomToIdMap.hasOwnProperty(serviceName)) {
          // Nếu có, lấy id tương ứng và thêm vào mảng mappedIds
          mappedIds.push(nameServiceRoomToIdMap[serviceName]);
        }
      });

      return mappedIds;
    }

    // Xử lý và ánh xạ selectedFilters["services_hotel"] từ tên sang id
    if (
      selectedFilters.hasOwnProperty("services_hotel") &&
      Array.isArray(selectedFilters["services_hotel"])
    ) {
      // Lấy mảng các tên dịch vụ từ selectedFilters
      const serviceNames = selectedFilters["services_hotel"];
      console.log(serviceNames);
      // Ánh xạ các tên dịch vụ sang các id tương ứng
      const mappedServiceIds = mapServiceNamesToIds(serviceNames);
      console.log("mappedServiceIds", mappedServiceIds);

      // Gán lại mảng id đã ánh xạ vào selectedFilters["services_hotel"]
      selectedFilters["services_hotel"] = mappedServiceIds;
    }
    if (
      selectedFilters.hasOwnProperty("services_room") &&
      Array.isArray(selectedFilters["services_room"])
    ) {
      // Lấy mảng các tên dịch vụ từ selectedFilters
      const serviceNames = selectedFilters["services_room"];
      console.log(serviceNames);
      // Ánh xạ các tên dịch vụ sang các id tương ứng
      const mappedServiceIds = mapServiceRoomNamesToIds(serviceNames);
      console.log("mappedServiceIds", mappedServiceIds);

      // Gán lại mảng id đã ánh xạ vào selectedFilters["services_hotel"]
      selectedFilters["services_room"] = mappedServiceIds;
    }

    // Thu thập giá trị từ các radio button được chọn trong cùng một cột
    function updateUrlParam(paramKey, paramValue) {
      const urlParams = new URLSearchParams(window.location.search);
      urlParams.set(paramKey, paramValue);

      const newUrl = `${window.location.pathname}?${urlParams.toString()}`;
      window.history.pushState({ path: newUrl }, "", newUrl);
    }
    console.log(selectedFilters);
    const searchData = JSON.parse(localStorage.getItem("searchData") || "{}");
    const filter = {
      map: searchData.location,
      checkInDate: searchData.checkInDate,
      checkOutDate: searchData.checkOutDate,
      numberOfRooms: searchData.numberOfRooms,
      numberOfAdults: searchData.numberOfAdults,
      numberOfChildren: searchData.numberOfChildren,
    };
    const combinedData = Object.assign({}, filter, selectedFilters, {
      sortType: sortType,
    });
    console.log(combinedData);
    // Gửi yêu cầu AJAX tới máy chủ
    $.ajax({
      type: "GET",
      url: `http://localhost:3000/api/v1/hotels`,
      data: combinedData,
      success: function (response) {
        console.log(response);
        // Xử lý kết quả trả về từ máy chủ
        loaddata(response);

        // Cập nhật các tham số trên URL
        updateUrlParams(
          searchData.location,
          searchData.checkInDate,
          searchData.checkOutDate,
          searchData.numberOfRooms,
          searchData.numberOfAdults,
          searchData.numberOfChildren
        );
      },
      error: function (error) {
        console.error("Error:", error);
      },
    });

    // Hàm để cập nhật các tham số trên URL
    function updateUrlParams(
      location,
      checkInDate,
      checkOutDate,
      numberOfRooms,
      numberOfAdults,
      numberOfChildren
    ) {
      const url = new URL(window.location.href);

      // Cập nhật tham số 'map'
      url.searchParams.set("map", location);

      // Cập nhật tham số 'checkInDate'
      url.searchParams.set("checkInDate", checkInDate);

      // Cập nhật tham số 'checkOutDate'
      url.searchParams.set("checkOutDate", checkOutDate);

      // Cập nhật tham số 'numberOfRooms'
      url.searchParams.set("numberOfRooms", numberOfRooms);

      // Cập nhật tham số 'numberOfAdults'
      url.searchParams.set("numberOfAdults", numberOfAdults);

      // Cập nhật tham số 'numberOfChildren'
      url.searchParams.set("numberOfChildren", numberOfChildren);

      // Thay đổi URL trên thanh địa chỉ
      window.history.replaceState({}, "", url);
    }
  }

  // Event listener for search button click
  $("#search-hotel").on("click", function (e) {
    e.preventDefault(); // Prevent default form submission

    // Call sendFilterRequest() to perform search
    sendFilterRequest();
  });
  $("#hotel-list").on("click", function () {
    sendFilterRequest();
  });
  sendFilterRequest();
  function getSelectedFacilities() {
    var selectedFacilities = [];

    // Lặp qua tất cả các checkbox
    $("input[type='checkbox']").each(function () {
      // Kiểm tra xem checkbox đã được chọn hay chưa
      if (this.checked) {
        // Lấy giá trị ID của checkbox đã chọn và thêm vào mảng selectedFacilities
        selectedFacilities.push(this.id);
      }
    });

    return selectedFacilities;
  }

  // Sử dụng hàm getSelectedFacilities để lấy các giá trị checkbox đã chọn
  function sendSelectedFacilities() {
    var selectedValues = getSelectedFacilities();

    // Tạo một đối tượng dữ liệu để gửi qua Ajax
    var data = {
      selectedFacilities: selectedValues,
    };
    console.log(data);

    // Gửi yêu cầu Ajax
    $.ajax({
      url: "http://localhost:3000/api/v1/hotelAmenities/hotel/amenities",
      type: "POST", // Hoặc "GET" tùy thuộc vào API của bạn
      data: data,
      success: function (response) {
        // Xử lý kết quả thành công từ API ở đây
        console.log(response);
        loaddata(response);
      },
      error: function (xhr, status, error) {
        // Xử lý lỗi từ API ở đây
        console.log(error);
      },
    });
  }
  // Hàm hiển thị kết quả lọc
});
// Nút show more
function showMoreFunc(elementID) {
  var dots = document.getElementById(elementID + "-dots");
  var moreText = document.getElementById(elementID + "-moreContent");
  var btnText = document.getElementById(elementID);

  if (dots.style.display === "none") {
    dots.style.display = "inline";
    btnText.innerHTML = "Xem thêm";
    moreText.style.display = "none";
  } else {
    dots.style.display = "none";
    btnText.innerHTML = "Thu gọn";
    moreText.style.display = "inline";
  }
}

// Gọi hàm sendSelectedFacilities khi muốn gửi các giá trị đã chọn qua API

// Gọi hàm findhotel() khi trang được tải
window.addEventListener("beforeunload", function (event) {
  if (localStorage.getItem("hotelData")) {
    localStorage.removeItem("hotelData");
  }
});
function changeSort(sortType) {
  // Lấy phần tử button dropdown để thay đổi nội dung
  const dropdownButton = document.getElementById("filte-dropdown");

  // Thay đổi nội dung của button dropdown
  dropdownButton.innerHTML = `<i class="fa-solid fa-sort"></i> Sắp xếp theo: ${sortType}`;

  // Đóng dropdown sau khi người dùng chọn
  const dropdownMenu = document.querySelector(".dropdown-menu");
  const bsDropdown = new bootstrap.Dropdown(dropdownButton); // Sử dụng Bootstrap để tạo dropdown
  bsDropdown.hide(); // Đóng dropdown
}
