$(document).ready(function () {
  // Hàm ánh xạ ID của mục menu tới tên partial tương ứng
  const type = localStorage.getItem("type");
  console.log(type);
  if (type != "admin") {
    $(".template").hide();
    window.location.href = "/";
  }
  /* script.js */
  // Lắng nghe sự kiện nhấp vào nút tương ứng
  document.getElementById("button1").addEventListener("click", function () {
    // Hiển thị phần tử content1
    document.getElementById("content1").style.display = "block";
    document.getElementById("content2").style.display = "none";
    document.getElementById("contentManageRoom").style.display = "none";
    document.getElementById("contentAddHotel").style.display = "none";
    document.getElementById("chart").style.display = "none";
    document.getElementById("contentBooking").style.display = "none";
    document.getElementById("manageCoupon").style.display = "none";
  });

  document.getElementById("button2").addEventListener("click", function () {
    // Hiển thị phần tử content2
    document.getElementById("content2").style.display = "block";
    document.getElementById("content1").style.display = "none";
    document.getElementById("contentBooking").style.display = "none";
    document.getElementById("contentAddHotel").style.display = "none";
    document.getElementById("chart").style.display = "none";
    document.getElementById("contentBooking").style.display = "none";
    document.getElementById("manageCoupon").style.display = "none";
  });

  document.getElementById("button3").addEventListener("click", function () {
    // Hiển thị phần tử contentBooking
    document.getElementById("content2").style.display = "none";
    document.getElementById("content1").style.display = "none";
    document.getElementById("contentBooking").style.display = "block";
    document.getElementById("contentAddHotel").style.display = "none";
    document.getElementById("chart").style.display = "none";
    document.getElementById("manageCoupon").style.display = "none";
  });

  document.getElementById("button4").addEventListener("click", () => {
    document.getElementById("content2").style.display = "none";
    document.getElementById("content1").style.display = "none";
    document.getElementById("chart").style.display = "block";
    document.getElementById("contentAddHotel").style.display = "none";
    document.getElementById("contentBooking").style.display = "none";
    document.getElementById("manageCoupon").style.display = "none";
  });

  document.getElementById("button5").addEventListener("click", () => {
    document.getElementById("content2").style.display = "none";
    document.getElementById("content1").style.display = "none";
    document.getElementById("chart").style.display = "none";
    document.getElementById("contentAddHotel").style.display = "none";
    document.getElementById("contentBooking").style.display = "none";
    document.getElementById("manageCoupon").style.display = "block";
  });

  document.getElementById("button6").addEventListener("click", () => {
    localStorage.clear();
    window.location.href = "/signin";
  });

  var header = document.getElementById("menu-content");
  var btns = header.getElementsByClassName("btn");
  for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function () {
      var current = document.getElementsByClassName("active");
      current[0].className = current[0].className.replace(" active", "");
      this.className += " active";
    });
  }
  const bodyLeft = document.querySelector(".body-left");
  const btnShow = bodyLeft.querySelector(".fa-bars");
  const btnHidden = bodyLeft.querySelector(".fa-xmark");
  btnShow.addEventListener("click", () => {
    bodyLeft.classList.add("show-menu");
  });
  btnHidden.addEventListener("click", () => {
    bodyLeft.classList.remove("show-menu");
  });
});
