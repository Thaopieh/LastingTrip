function setupCarousel(carouselId) {
  const multipleItemCarousel = document.querySelector(carouselId);

  if (multipleItemCarousel) { // Kiểm tra xem carousel có tồn tại không
    if (window.matchMedia("(min-width:576px)").matches) {
      const carousel = new bootstrap.Carousel(multipleItemCarousel, {
        interval: false
      });

      var carouselWidth = $(multipleItemCarousel).find(".carousel-inner").prop('scrollWidth');
      var cardWidth = $(multipleItemCarousel).find(".carousel-item").width();

      var scrollPosition = 0;

      $(multipleItemCarousel).find(".carousel-control-next").on("click", function () {
        if (scrollPosition < carouselWidth - cardWidth * 4) {
          scrollPosition = scrollPosition + 4*cardWidth;
          $(multipleItemCarousel).find(".carousel-inner").animate({ scrollLeft: scrollPosition }, 600);
        }
      });
      $(multipleItemCarousel).find(".carousel-control-prev").on("click", function () {
        if (scrollPosition > 0) {
          scrollPosition = scrollPosition - 4*cardWidth;
          $(multipleItemCarousel).find(".carousel-inner").animate({ scrollLeft: scrollPosition }, 600);
        }
      });
    } else {
      $(multipleItemCarousel).addClass("slide");
    }
  } else {
    console.error("Carousel with ID " + carouselId + " not found.");
  }
}

// Bắt sự kiện click trên nút prev và next của carousel và gọi hàm setupCarousel
$(".carousel-control-prev, .carousel-control-next").click(function() {
  // Lấy giá trị của thuộc tính data-bs-target
  var carouselId = $(this).attr("data-bs-target");
  // Lấy ID của carousel từ chuỗi
  setupCarousel(carouselId);
});
 // Function to toggle collapse and button styles

    function toggleCollapse(btnNumber) {
      const buttons = document.querySelectorAll('.btn-outline-info');
      buttons.forEach((button, index) => {
        if (index + 1 === btnNumber) {
          button.classList.add('active');
          button.style.color = '#fff'; // White text color
          button.style.backgroundColor = '#10294D'; // Blue background color
        } else {
          button.classList.remove('active');
          button.style.color = '#10294D'; // Blue text color
          button.style.backgroundColor = '#f0f2f5'; // White background color
        }
      });

      for (let i = 1; i <= 3; i++) {
        const collapseId = 'noi-dung-collapse' + i;
        const collapseElement = document.getElementById(collapseId);
        if (i === btnNumber) {
          collapseElement.classList.add('show');
        } else {
          collapseElement.classList.remove('show');
        }
      }
    }


    //Get the button
let mybutton = document.getElementById("btn-back-to-top");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (
    document.body.scrollTop > 20 ||
    document.documentElement.scrollTop > 20
  ) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}
// When the user clicks on the button, scroll to the top of the document
mybutton.addEventListener("click", backToTop);

function backToTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
var dropdownBtn = document.getElementById("dropbtn");
var dropdownContent = document.getElementById("myDropdown");

// Hiển thị/ẩn dropdown content
dropdownBtn.addEventListener("click", function() {
  dropdownContent.classList.toggle("show");
});

// Đóng dropdown khi click ra ngoài
window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
      if (dropdownContent.classList.contains("show")) {
        dropdownContent.classList.remove("show");
      }
    }
  }

// Xử lý sự kiện click vào các mục trong dropdown
var dropdownItems = document.querySelectorAll('.dropdown-item');

for (var i = 0; i < dropdownItems.length; i++) {
  var addButton = dropdownItems[i].querySelector('.add-btn');
  var itemCount = dropdownItems[i].querySelector('.item-count');
  var itemType = dropdownItems[i].getAttribute('data-type');

  // Tăng số lượng khi click nút "+"
  addButton.addEventListener("click", function(event) {
    event.stopPropagation(); // Prevent dropdown close
  
    // Get the item type of the clicked dropdown item
    var itemType = this.parentNode.getAttribute('data-type');
  
    var count = parseInt(this.parentNode.getAttribute('data-count')) + 1;
    this.parentNode.setAttribute('data-count', count);
  
    // Update count based on item type
    if (itemType === 'room') {
      document.getElementById("room-item-count").textContent = count;
    } else if (itemType === 'adults') {
      document.getElementById("adults-item-count").textContent = count;
    } else if (itemType === 'children') {
      document.getElementById("children-item-count").textContent = count;
    }
    updateDropdownButton(); // Update dropdown button
  });
}

// Cập nhật nội dung nút dropdown
function updateDropdownButton() {
  var roomCount = parseInt(document.getElementById("room-item-count").textContent);
  var adultsCount = parseInt(document.getElementById("adults-item-count").textContent);
  var childrenCount = parseInt(document.getElementById("children-item-count").textContent);
  dropdownBtn.innerHTML = roomCount +  " Room, "+  adultsCount +" Adults, "+ childrenCount + " Children ";
}
document.addEventListener('click', function(event) {
  var dropdown = document.getElementById("myDropdown");
  var dropdownBtn = document.getElementById("dropbtn");
  var target = event.target;
  var dropdownClicked = dropdown.contains(target);
  var dropdownBtnClicked = dropdownBtn.contains(target);
  if (!dropdownClicked && !dropdownBtnClicked) {
      dropdown.style.display = 'none';
  }
});

// Function to toggle the dropdown when clicking on the button
document.getElementById("dropbtn").addEventListener("click", function() {
var dropdown = document.getElementById("myDropdown");
if (dropdown.style.display === "none" || dropdown.style.display === "") {
  dropdown.style.display = "block";
} else {
  dropdown.style.display = "none";
}
});
const toggleBtn = document.querySelector('.toggle_btn');
const toggleBtnIcon = document.querySelector('.toggle_btn i');
const dropDownMenu = document.querySelector('.dropdown_menu');

toggleBtn.addEventListener('click', function () {
  // Kiểm tra trạng thái hiện tại của dropdown menu
  const isOpen = dropDownMenu.style.display === 'block';

  // Nếu dropdown menu đang ẩn, hiển thị nó và chuyển đổi biểu tượng
  if (!isOpen) {
    dropDownMenu.style.display = 'block';
    toggleBtnIcon.classList.add('fa-xmark');
    toggleBtnIcon.classList.remove('fa-bars');
  } else { // Nếu dropdown menu đang hiển thị, ẩn nó và chuyển đổi biểu tượng
    dropDownMenu.style.display = 'none';
    toggleBtnIcon.classList.remove('fa-xmark');
    toggleBtnIcon.classList.add('fa-bars');
  }
});

