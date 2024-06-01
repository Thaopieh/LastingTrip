// $(document).on("click", ".hotel-link", function (event) {
//   event.preventDefault(); // Ngăn chặn hành vi mặc định của liên kết
//   var href = $(this).attr("href");
//   var hotelId = href.split("/").pop();
//   window.location.href = "/hotel/" + hotelId;
// });
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

document.addEventListener("DOMContentLoaded", function () {
  const priceRange1 = document.getElementById("price_range1");
  const valueElement1 = document.getElementById("value1");
  const priceRange2 = document.getElementById("price_range2");
  const valueElement2 = document.getElementById("value2");

  if (priceRange1 && valueElement1) {
    // Attach event listener for price_range1
    priceRange1.addEventListener("input", () => {
      updateValue("value1", "price_range1");
    });
  }

  if (priceRange2 && valueElement2) {
    // Attach event listener for price_range2
    priceRange2.addEventListener("input", () => {
      updateValue("value2", "price_range2");
    });
  }
});

function updateValue(valueId, rangeId) {
  const priceRange = document.getElementById(rangeId);
  const valueElement = document.getElementById(valueId);

  if (priceRange && valueElement) {
    const currentValue = priceRange.value;
    const formattedValue = numberWithCommas(currentValue) + " VND";
    valueElement.textContent = `Từ ${formattedValue}`;
  } else {
    console.error(
      `Không tìm thấy phần tử có id '${rangeId}' hoặc '${valueId}'.`
    );
  }
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

$(document).ready(() => {
  const token = localStorage.getItem("token");
  if (token) {
    $("#broadcast").show();
  }
  function ChangeToSlug(title) {
    var slug;
    slug = title.toLowerCase();
    slug = slug.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, "a");
    slug = slug.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, "e");
    slug = slug.replace(/i|í|ì|ỉ|ĩ|ị/gi, "i");
    slug = slug.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, "o");
    slug = slug.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, "u");
    slug = slug.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, "y");
    slug = slug.replace(/đ/gi, "d");
    slug = slug.replace(
      /\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi,
      ""
    );
    slug = slug.replace(/ /gi, "-");
    slug = slug.replace(/\-\-\-\-\-/gi, "-");
    slug = slug.replace(/\-\-\-\-/gi, "-");
    slug = slug.replace(/\-\-\-/gi, "-");
    slug = slug.replace(/\-\-/gi, "-");
    slug = "@" + slug + "@";
    slug = slug.replace(/\@\-|\-\@|\@/gi, "");
    slug = slug.trim();
    return slug;
  }

  $("#registerTime").on("click", function () {
    window.location.href = "/register";
  });

  $("#loginTime").on("click", function () {
    window.location.href = "/signin";
  });
  $(document).on("click", "#filter-header", function () {
    $(".popup-overlay").show();
  });
  $(".close-btn").click(function () {
    $(".popup-overlay").hide();
  });

  const loaddata = (data) => {
    const numberOfResultsElement = document.getElementById("numberOfResults");
    const count = data.filter((item) => item.hasOwnProperty("id")).length;

    numberOfResultsElement.textContent = count;

    const container = document.getElementById("hotelList");
    container.innerHTML = ""; // Clear old data

    data.forEach((item) => {
      const slug = ChangeToSlug(item.name);
      const formattedCost = numberWithCommas(item.cost);
      const imgFeature = item.UrlImageHotels.map((item1) => item1.url);
      const imgRender = imgFeature[0];
      const reviews = item.Reviews.map((review) => ({
        rating: review.rating,
        description: review.description,
      }));
      const description = reviews[0] ? reviews[0].description : "Tốt";

      const roomType = item.Rooms.map((room) => ({
        roomName: room.name,
        numPeople: room.quantity_people,
        price: room.price,
        status: room.status,
      }));

      let roomWithMaxPrice = roomType.reduce((prev, current) => {
        if (current.status) {
          return prev.price < current.price ? prev : current;
        } else {
          return prev;
        }
      }, roomType[0]);

      let statusRoom = roomWithMaxPrice.status
        ? "Còn phòng"
        : "Tạm hết loại phòng này";

      let peopleNum = `<i class="fa-solid fa-user"></i>`.repeat(
        roomWithMaxPrice.numPeople
      );

      const stars = `<i class="fas fa-star"></i>`.repeat(item.star);
      const card = `
        <div class="card mb-3">
          <div class="row img-adjust g-0">
            <a href="/hotel/${slug}/${item.id}" class="hotel-link wrap-img">
              <div class="col-md-4">
                <img src="${imgRender}" alt="...">
              </div>
            </a>
            <div class="col-md-8">
              <div class="card-body">
                <div class="head-title">
                  <h5 class="card-title">
                    <a href="/hotel//${slug}/${item.id}" class="hotel-link">${item.name}</a>
                    ${stars}
                  </h5>
                  <div class="card-describle">
                    <p>${description}</p>
                    <p>
                      <i class="fa-solid fa-location-dot"></i>${item.map}
                      <span><button class="btn" data-bs-toggle="modal" onclick="redirectToMap('${item.name}' )" style="color: blue">Xem bản đồ</button></span>
                    </p>
                  </div>
                </div>
                <div class="room-type-price">
                  <div class="room-type">
                    <p>${roomWithMaxPrice.roomName} ${peopleNum}<i class="fa-solid fa-bath"></i><i class="fa-solid fa-bed"></i></p>
                    <p class="card-text">
                      <small class="text-body-secondary">${statusRoom}</small>
                    </p>
                  </div>
                  <div class="room-price">
                    <p>VND ${formattedCost}</p>
                    <a href="/hotel/${slug}/${item.id}" class="btn btn-primary">Kiểm tra</a>
                  </div>
                </div>
                <div class="get-lower-price" id="broadcast">
                  <a href="/signin" ><span id="loginTime"><i class="fa-solid fa-key"></i>Đăng nhập</span> hoặc <span id="registerTime">đăng kí</span> để xem giá ưu đãi hơn</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
      container.insertAdjacentHTML("beforeend", card);
    });

    let thisPage = 1;
    let limit = 5;
    let list = document.querySelectorAll("#hotelList .card");

    function loadItem() {
      let beginGet = limit * (thisPage - 1);
      let endGet = limit * thisPage - 1;

      list.forEach((item, key) => {
        if (key >= beginGet && key <= endGet) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
      });
      listPage();
    }
    function listPage() {
      let count = Math.ceil(list.length / limit);
      let paginationElement = document.querySelector(".listPage");
      paginationElement.innerHTML = "";

      if (thisPage !== 1) {
        let prev = document.createElement("li");
        prev.innerText = "Prev";
        prev.classList.add("pagination-prev");
        prev.setAttribute("onclick", `changePage(${thisPage - 1})`);
        paginationElement.appendChild(prev);
      }

      if (count <= 1) {
        return;
      }

      const createPageItem = (pageNum) => {
        let page = document.createElement("li");
        page.innerText = pageNum;
        page.classList.add("pagination-page");
        if (pageNum === thisPage) {
          page.classList.add("active");
        }
        page.setAttribute("onclick", `changePage(${pageNum})`);
        return page;
      };

      paginationElement.appendChild(createPageItem(1));

      if (thisPage > 3) {
        let dots = document.createElement("li");
        dots.innerText = "...";
        dots.classList.add("pagination-dots");
        paginationElement.appendChild(dots);
      }

      let startPage = Math.max(2, thisPage - 1);
      let endPage = Math.min(count - 1, thisPage + 1);

      for (let i = startPage; i <= endPage; i++) {
        paginationElement.appendChild(createPageItem(i));
      }

      if (thisPage < count - 2) {
        let dots = document.createElement("li");
        dots.innerText = "...";
        dots.classList.add("pagination-dots");
        paginationElement.appendChild(dots);
      }

      if (count > 1) {
        paginationElement.appendChild(createPageItem(count));
      }

      if (thisPage !== count) {
        let next = document.createElement("li");
        next.innerText = "Next";
        next.classList.add("pagination-next");
        next.setAttribute("onclick", `changePage(${thisPage + 1})`);
        paginationElement.appendChild(next);
      }

      paginationElement.style.display = list.length > limit ? "block" : "none";
    }

    window.changePage = function (i) {
      thisPage = i;
      loadItem();
    };

    loadItem();
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
    $('.col-10 input[type="range"]').each(function (index) {
      let value = $(this).val();
      let inputId = $(this).attr("id");
      console.log("value", value);

      // Kiểm tra ID của input để xác định key tương ứng trong selectedFilters
      if (inputId === "price_range1") {
        if (value != 0) selectedFilters["price"] = value; // Đặt key là 'price1'
      } else if (inputId === "price_range2") {
        if (value != 0) selectedFilters["price"] = value; // Đặt key là 'price2'
      }
    });
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

    $.ajax({
      type: "GET",
      url: `http://localhost:3030/api/v1/hotels`,
      data: combinedData,
      success: function (response) {
        console.log(response);
        // Xử lý kết quả trả về từ máy chủ
        loaddata(response);
        localStorage.removeItem("location");

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
    // e.preventDefault(); // Prevent default form submission

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
      url: "http://localhost:3030/api/v1/hotelAmenities/hotel/amenities",
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
  const dropdownButton = document.getElementById("filter-dropdown");

  // Thay đổi nội dung của button dropdown
  dropdownButton.innerHTML = `<i class="fa-solid fa-sort"></i> Sắp xếp theo: ${sortType}`;

  // Đóng dropdown sau khi người dùng chọn
  const dropdownMenu = document.querySelector(".dropdown-menu");
  const bsDropdown = new bootstrap.Dropdown(dropdownButton); // Sử dụng Bootstrap để tạo dropdown
  bsDropdown.hide(); // Đóng dropdown
}
