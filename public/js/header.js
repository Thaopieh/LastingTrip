document.addEventListener("DOMContentLoaded", () => {
  // Kiểm tra giá trị của token
  const token = getToken(); // Thay 'getToken()' bằng hàm lấy giá trị token của bạn
  const userName = localStorage.getItem("userName");

  if (token) {
    // Nếu token có giá trị khác null, thay đổi HTML của phần tử li
    const signInSignUpLi = document.querySelector("#nav-login"); // Chọn phần tử li cần thay đổi
    var href_val;
    if (
      localStorage.getItem("type") == "client" ||
      localStorage.getItem("type") == "admin"
    ) {
      var href_val = "/userInfor";
    } else if (localStorage.getItem("type") == "owner") {
      var href_val = "/agentInfo";
    }

    if (
      localStorage.getItem("type") == "admin" ||
      localStorage.getItem("type") == "owner"
    )
      document.getElementById("supplierTime").style.display = "none";

    const signIn = document.querySelector("#account");
    signIn.innerHTML = `         <a href="/userInfor" class="btn-group1">  <i class="fa-regular fa-user"></i>
  ${userName}</a>

</button>`;
    // HTML mới cho phần tử li nếu có token
    signInSignUpLi.innerHTML = `
            <div class="btn-group1">
                <button class="btn btn-secondary btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown"
                    data-bs-auto-close="false" aria-expanded="false" id="filte-dropdown">
                    <i class="fa-regular fa-user"></i>
                    ${userName}
                </button>
                <ul class="dropdown-menu" id="dropdownshown">
                    <li><a class="dropdown-item2" href="${href_val}">Thông tin cá nhân</a></li>
                    <li><hr class="dropdown-divider"></li>
                    <li id="logout"><a class="dropdown-item" href="/">Đăng xuất</a></li>
                </ul>
            </div>
        `;

    document.getElementById("logout").addEventListener("click", function () {
      // Xóa token khỏi local storage
      localStorage.removeItem("token");
      localStorage.removeItem("id");
      localStorage.removeItem("userName");

      // Thực hiện chuyển hướng về trang đăng nhập
      window.location.href = "http://localhost:3030/signin";
    });
  }
});

// Hàm để lấy giá trị token, bạn cần thay đổi hàm này để phù hợp với cách lấy token của bạn
function getToken() {
  // Đoạn mã để lấy token từ localStorage hoặc sessionStorage hoặc bất kỳ cách lưu trữ nào
  return localStorage.getItem("token"); // Thay 'token' bằng key lưu trữ token của bạn
}

function toggleCollapse(btnNumber) {
  const buttons = document.querySelectorAll(".btn-outline-info");
  buttons.forEach((button, index) => {
    if (index + 1 === btnNumber) {
      button.classList.add("active");
      button.style.color = "#fff"; // White text color
      button.style.backgroundColor = "#10294D"; // Blue background color
    } else {
      button.classList.remove("active");
      button.style.color = "#10294D"; // Blue text color
      button.style.backgroundColor = "#f0f2f5"; // White background color
    }
  });

  for (let i = 1; i <= 3; i++) {
    const collapseId = "noi-dung-collapse" + i;
    const collapseElement = document.getElementById(collapseId);
    if (i === btnNumber) {
      collapseElement.classList.add("show");
    } else {
      collapseElement.classList.remove("show");
    }
  }
}

const toggleBtn = document.querySelector(".toggle_btn");
const toggleBtnIcon = document.querySelector(".toggle_btn i");
const dropDownMenu = document.querySelector(".dropdown_menu");

toggleBtn.addEventListener("click", function () {
  // Kiểm tra trạng thái hiện tại của dropdown menu
  const isOpen = dropDownMenu.style.display === "block";

  // Nếu dropdown menu đang ẩn, hiển thị nó và chuyển đổi biểu tượng
  if (!isOpen) {
    dropDownMenu.style.display = "block";
    toggleBtnIcon.classList.add("fa-xmark");
    toggleBtnIcon.classList.remove("fa-bars");
  } else {
    // Nếu dropdown menu đang hiển thị, ẩn nó và chuyển đổi biểu tượng
    dropDownMenu.style.display = "none";
    toggleBtnIcon.classList.remove("fa-xmark");
    toggleBtnIcon.classList.add("fa-bars");
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const token = getToken(); // Lấy token

  // Sự kiện click vào class toUserInfo
  document.querySelector(".toUserInfo").addEventListener("click", function () {
    // Kiểm tra nếu có token
    if (token) {
      if (
        localStorage.getItem("type") == "client" ||
        localStorage.getItem("type") == "admin"
      ) {
        // Di chuyển đến trang userInfor
        window.location.href = "/userInfor";
      } else if (localStorage.getItem("type") == "owner") {
        // Di chuyển đến trang userInfor
        window.location.href = "/agentInfo";
      } else {
        // Hiển thị thông báo yêu cầu đăng nhập
        alert("Vui lòng đăng nhập để xem thông tin cá nhân.");
        // Chuyển hướng đến trang login
        window.location.href = "/signin";
      }
    }
  });
  document.querySelector(".toUserInf").addEventListener("click", function () {
    // Kiểm tra nếu có token
    if (token) {
      if (
        localStorage.getItem("type") == "client" ||
        localStorage.getItem("type") == "admin"
      ) {
        // Di chuyển đến trang userInfor
        window.location.href = "/userInfor";
      } else if (localStorage.getItem("type") == "owner") {
        // Di chuyển đến trang userInfor
        window.location.href = "/agentInfo";
      } else {
        // Hiển thị thông báo yêu cầu đăng nhập
        alert("Vui lòng đăng nhập để xem thông tin cá nhân.");
        // Chuyển hướng đến trang login
        window.location.href = "/signin";
      }
    }
  });
});

// Các hàm khác như getToken và toggleCollapse vẫn giữ nguyên
