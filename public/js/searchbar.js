document.addEventListener("DOMContentLoaded", function () {
  // Lặp qua tất cả các phần tử có class là "dropdown-item"
  console.log("Document is ready.");
  // Lấy ngày hiện tại
  var today = new Date();
  var todayString = today.toISOString().split("T")[0];

  // Tính toán ngày tiếp theo
  var nextDay = new Date(today);
  nextDay.setDate(today.getDate() + 1);
  var nextDayString = nextDay.toISOString().split("T")[0];

  function setDefaultLocalStorageData() {
    const defaultData = {
      location: "",
      checkInDate: todayString,
      checkOutDate: nextDayString,
      numberOfRooms: 1,
      numberOfAdults: 1,
      numberOfChildren: 0,
    };

    // Kiểm tra xem đã có dữ liệu trong localStorage chưa
    const existingData = localStorage.getItem("searchData");
    if (!existingData) {
      // Nếu không có, thiết lập dữ liệu mặc định
      localStorage.setItem("searchData", JSON.stringify(defaultData));
      console.log("Default search data set in localStorage.");
    }
  }

  // Gọi hàm setDefaultLocalStorageData khi tài liệu đã tải xong
  setDefaultLocalStorageData();

  // Đặt giá trị min và giá trị mặc định cho check-in là hôm nay
  var checkInInput = document.getElementById("checkIn");
  checkInInput.setAttribute("min", todayString);
  checkInInput.value = todayString;

  // Đặt giá trị min và giá trị mặc định cho check-out là ngày tiếp theo
  var checkOutInput = document.getElementById("checkOut");
  checkOutInput.setAttribute("min", nextDayString);
  checkOutInput.value = nextDayString;

  // Cập nhật giá trị min cho check-out khi thay đổi check-in
  checkInInput.addEventListener("change", function () {
    var checkInDate = new Date(this.value);
    var nextDay = new Date(checkInDate);
    nextDay.setDate(checkInDate.getDate() + 1);
    var nextDayString = nextDay.toISOString().split("T")[0];
    checkOutInput.setAttribute("min", nextDayString);
    if (checkOutInput.value < nextDayString) {
      checkOutInput.value = nextDayString;
    }
  });

  // Lấy dữ liệu từ localStorage
  const existingData = localStorage.getItem("searchData");

  if (existingData) {
    // Parse dữ liệu lưu trữ
    const savedSearchData = JSON.parse(existingData);

    // Cập nhật các trường nhập liệu với dữ liệu đã lưu
    document.getElementById("hotel-destination").value =
      savedSearchData.location;
    document.getElementById("checkIn").value = savedSearchData.checkInDate;
    document.getElementById("checkOut").value = savedSearchData.checkOutDate;
    document.getElementById("room-count").textContent =
      savedSearchData.numberOfRooms;
    document.getElementById("adults-count").textContent =
      savedSearchData.numberOfAdults;
    document.getElementById("children-count").textContent =
      savedSearchData.numberOfChildren;
    const dropdownItems = document.querySelectorAll(".dropdown-item");
    dropdownItems.forEach(function (item) {
      const dataType = item.getAttribute("data-type");
      if (dataType === "room") {
        item.setAttribute("data-count", savedSearchData.numberOfRooms);
        item.querySelector(".room-item-count").textContent =
          savedSearchData.numberOfRooms;
      } else if (dataType === "adults") {
        item.setAttribute("data-count", savedSearchData.numberOfAdults);
        item.querySelector(".adults-item-count").textContent =
          savedSearchData.numberOfAdults;
      } else if (dataType === "children") {
        item.setAttribute("data-count", savedSearchData.numberOfChildren);
        item.querySelector(".children-item-count").textContent =
          savedSearchData.numberOfChildren;
      }
    });

    console.log("Loaded existing search data from localStorage.");
    return; // Thoát khỏi hàm sau khi tải dữ liệu đã lưu
  }
});
function getItemCountByType(type) {
  const element = document.querySelector(`.dropdown-item[data-type="${type}"]`);
  if (element) {
    const itemCount = element.getAttribute("data-count");
    return itemCount;
  }
  return "0"; // Trả về "0" nếu không tìm thấy giá trị data-count
}
// Tìm đối tượng DOM tương ứng với nút "Search"
var searchHotelButton = document.getElementById("search-hotel");

// Thêm sự kiện click vào nút "Search" bằng cách sử dụng addEventListener
searchHotelButton.addEventListener("click", function () {
  console.log("Search button clicked");
  collectAndSendData();
});
// Define the collectAndSendData function to collect and process form data
const collectAndSendData = () => {
  console.log("Collecting and sending data...");

  // Retrieve values from DOM elements when the button is clicked
  const location = $("#hotel-destination").val();
  const checkInDate = $("#checkIn").val();
  const checkOutDate = $("#checkOut").val();
  const numberOfRooms = parseInt(getItemCountByType("room"), 10);
  const numberOfAdults = parseInt(getItemCountByType("adults"), 10);
  const numberOfChildren = parseInt(getItemCountByType("children"), 10);
  console.log("Location:", location);
  console.log("Check-In Date:", checkInDate);
  console.log("Check-Out Date:", checkOutDate);
  console.log("Number of Rooms:", numberOfRooms);
  console.log("Number of Adults:", numberOfAdults);
  console.log("Number of Children:", numberOfChildren);

  // Check if all form fields are empty or zero
  const allFieldsEmpty =
    !location &&
    !checkInDate &&
    !checkOutDate &&
    numberOfRooms === 1 &&
    numberOfAdults === 1 &&
    numberOfChildren === 0;

  if (allFieldsEmpty) {
    // Retrieve existing searchData from localStorage if all fields are empty or zero
    const existingData = localStorage.getItem("searchData");
    if (existingData) {
      // Update form fields with the existing searchData
      $("#hotel-destination").val("");
      $("#checkIn").val("");
      $("#checkOut").val("");
      $("#room-count").text("");
      $("#adults-count").text("");
      $("#children-count").text("");
      console.log("Loaded existing search data from localStorage.");
      return; // Exit function after loading existing data
    }
  }

  // Store new searchData in localStorage if any form field has valid input
  const searchData = {
    location: location,
    checkInDate: checkInDate,
    checkOutDate: checkOutDate,
    numberOfRooms: numberOfRooms,
    numberOfAdults: numberOfAdults,
    numberOfChildren: numberOfChildren,
  };
  console.log(searchData);
  localStorage.removeItem("searchData");
  // Convert searchData to JSON and store in localStorage
  localStorage.setItem("searchData", JSON.stringify(searchData));

  console.log("New search data saved to localStorage.");
};

var dropdownItems = document.querySelectorAll(".dropdown-item");

for (var i = 0; i < dropdownItems.length; i++) {
  var addButton = dropdownItems[i].querySelector(".add-btn");
  var subtractButton = dropdownItems[i].querySelector(".subtract-btn");
  var itemCount = dropdownItems[i].querySelector(".item-count");
  var itemType = dropdownItems[i].getAttribute("data-type");

  // Tăng số lượng khi click nút "+"
  addButton.addEventListener("click", function (event) {
    event.stopPropagation(); // Prevent dropdown close

    var itemType = this.parentNode.getAttribute("data-type");
    var count = parseInt(this.parentNode.getAttribute("data-count")) + 1;

    if (count <= 10 && count >= 1) {
      this.parentNode.setAttribute("data-count", count);

      if (itemType === "room") {
        document.getElementById("room-item-count").textContent = count;
        updateAdultCount(count);
      } else if (itemType === "adults") {
        document.getElementById("adults-item-count").textContent = count;
      } else if (itemType === "children") {
        document.getElementById("children-item-count").textContent = count;
      }
      updateDropdownButton();
      updateButtonStyles();
    }
  });

  subtractButton.addEventListener("click", function (event) {
    event.stopPropagation(); // Prevent dropdown close

    var itemType = this.parentNode.getAttribute("data-type");
    var count = parseInt(this.parentNode.getAttribute("data-count")) - 1;

    if (
      (itemType === "children" && count >= 0) ||
      (itemType === "room" && count >= 1) ||
      (itemType === "adults" && count >= getRoomCount())
    ) {
      this.parentNode.setAttribute("data-count", count);

      if (itemType === "room") {
        document.getElementById("room-item-count").textContent = count;
        updateAdultCount(count);
      } else if (itemType === "adults") {
        document.getElementById("adults-item-count").textContent = count;
      } else if (itemType === "children") {
        document.getElementById("children-item-count").textContent = count;
      }
      updateDropdownButton();
      updateButtonStyles();
    }
  });
}

function getRoomCount() {
  return parseInt(document.getElementById("room-item-count").textContent);
}

function updateAdultCount(roomCount) {
  var adultsCount = parseInt(
    document.getElementById("adults-item-count").textContent
  );
  if (adultsCount < roomCount) {
    document.getElementById("adults-item-count").textContent = roomCount;
    document
      .querySelector('.dropdown-item[data-type="adults"]')
      .setAttribute("data-count", roomCount);
  }
}

function updateButtonStyles() {
  dropdownItems.forEach(function (item) {
    var itemType = item.getAttribute("data-type");
    var count = parseInt(item.getAttribute("data-count"));
    var addButton = item.querySelector(".add-btn");
    var subtractButton = item.querySelector(".subtract-btn");

    if (count >= 10) {
      addButton.style.backgroundColor = "#ccc";
      addButton.disabled = true;
    } else {
      addButton.style.backgroundColor = "";
      addButton.disabled = false;
    }

    if (
      (itemType === "children" && count <= 0) ||
      (itemType !== "children" && count <= 1) ||
      (itemType === "adults" && count <= getRoomCount())
    ) {
      subtractButton.style.backgroundColor = "#ccc";
      subtractButton.disabled = true;
    } else {
      subtractButton.style.backgroundColor = "";
      subtractButton.disabled = false;
    }
  });
}

function updateDropdownButton() {
  var roomCount = parseInt(
    document.getElementById("room-item-count").textContent
  );
  var adultsCount = parseInt(
    document.getElementById("adults-item-count").textContent
  );
  var childrenCount = parseInt(
    document.getElementById("children-item-count").textContent
  );
  dropdownBtn.innerHTML =
    roomCount +
    " Room, " +
    adultsCount +
    " Adults, " +
    childrenCount +
    " Children ";
}

var dropdown = document.getElementById("myDropdown");
var dropdownBtn = document.getElementById("drop-all");

document.addEventListener("click", function (event) {
  var target = event.target;
  var dropdownClicked = dropdown.contains(target);
  var dropdownBtnClicked = dropdownBtn.contains(target);
  if (!dropdownClicked && !dropdownBtnClicked) {
    dropdown.style.display = "none";
  }
});

// Function to toggle the dropdown when clicking on the button
dropdownBtn.addEventListener("click", function () {
  console.log("da click");
  var dropdown = document.getElementById("myDropdown");
  if (dropdown.style.display === "none" || dropdown.style.display === "") {
    dropdown.style.display = "block";
  } else {
    dropdown.style.display = "none";
  }
});

// Call updateButtonStyles initially to set the correct styles
updateButtonStyles();

const input = document.getElementById("hotel-destination");
const autocomplete = document.getElementById("autocomplete");

input.addEventListener("input", async function () {
  const inputValue = this.value.toLowerCase();
  autocomplete.innerHTML = "";

  if (inputValue.length > 0) {
    try {
      const response = await fetch(
        "http://localhost:3030/api/v1/hotels/getAllMap"
      ); // URL của endpoint trên server
      if (!response.ok) throw new Error("Network response was not ok");
      const cities = await response.json();

      const matches = cities.filter((city) =>
        city.toLowerCase().includes(inputValue)
      );

      matches.forEach((match) => {
        const suggestion = document.createElement("div");
        suggestion.innerText = match;
        suggestion.addEventListener("click", function () {
          input.value = match;
          autocomplete.innerHTML = "";
        });
        autocomplete.appendChild(suggestion);
      });
    } catch (error) {
      console.error("Error fetching districts:", error);
    }
  }
});

// Xử lý sự kiện khi ô nhập mất focus (blur)
document.addEventListener("click", function (event) {
  if (event.target !== input) {
    autocomplete.innerHTML = "";
  }
});
