document.addEventListener("DOMContentLoaded", () => {
  const chatbotToggler = document.querySelector(".chatbot-toggler");
  const closeBtn = document.querySelector(".close-btn");
  const chatbox = document.querySelector(".chatbox");
  const sendChatBtn = document.getElementById("send-btn");
  const fileInput = document.querySelector(' .chat-input input[type="file"]');
  const sendBtn = document.getElementById("send-btn");
  const token = localStorage.getItem("token");
  $("#send-btn").click(function () {
    const fileInput = document.querySelector('.chat-input input[type="file"]');

    // Kiểm tra nếu có file được chọn
    if (fileInput.files.length > 0) {
      const file = fileInput.files[0];
      const formData = new FormData();
      formData.append("ModelAlImage", file);

      // Thực hiện yêu cầu AJAX bằng jQuery
      $.ajax({
        url: "http://localhost:3030/api/v1/chatbotAl/findlocation",
        method: "POST",
        data: formData,
        headers: { token: token },
        processData: false, // Không xử lý dữ liệu trước khi gửi
        contentType: false, // Không đặt header 'Content-Type' tự động
        success: function (response) {
          console.log("API response:", response);
          // Xử lý phản hồi từ API ở đây
          const selectedLocation = response.find((item) => item.score > 0.5);
          if (selectedLocation) {
            const locationName = selectedLocation.class;
            const encodedLocation = encodeURIComponent(locationName);
            localStorage.setItem("location", locationName);
            // Thêm phản hồi vào khung chat
            const message = `Địa điểm bạn cần tìm là ${locationName}, đây là một số gợi ý về khách sạn của chúng tôi.`;

            chatbox.appendChild(createChatLi(message, "incoming"));
            chatbox.scrollTop = chatbox.scrollHeight; // Cuộn xuống dòng cuối cùng
            const diaDiemToTinhThanh = {
              "Bà Nà Hill": "Đà Nẵng",
              "Phố Cổ Hội An": "Đà Nẵng",
              "Phong Nha Kẻ Bàng": "Quảng Bình",
              "Nha Trang": "Nha Trang",
              "Vịnh Hạ Long": "Quảng Ninh",
              "Phú Quốc": "Phú Quốc",
              Huế: "Huế",
              "Đà Lạt": "Đà Lạt",
            };

            function layTinhThanh(tenDiaDiem) {
              return diaDiemToTinhThanh[tenDiaDiem] || tenDiaDiem;
            }

            var des = $("#hotel-destination");
            des.val(layTinhThanh(locationName));

            const search = $("#search-hotel");
            setTimeout(function () {
              search.trigger("click");
            }, 500);
            setTimeout(function () {
              window.location.reload(true);
            }, 2000); //
          } else {
            console.log("Không có địa điểm nào có score > 0.5.");
          }
        },
        error: function (error) {
          console.error("Error sending file:", error);
          if (error.status === 401) {
            const message = "Vui lòng đăng nhập để tìm kiếm.";
            chatbox.appendChild(createChatLi(message, "incoming"));
            chatbox.scrollTop = chatbox.scrollHeight;
          } else {
            // Xử lý các lỗi khác theo nhu cầu
            const errorMessage = "Có lỗi xảy ra. Vui lòng thử lại sau.";
            chatbox.appendChild(createChatLi(errorMessage, "incoming"));
            chatbox.scrollTop = chatbox.scrollHeight;
          }
        },
      });
    } else {
      console.error("No file selected.");
    }
  });

  // Thêm sự kiện 'change' cho input file
  fileInput.addEventListener("change", () => {
    // Kiểm tra nếu có file được chọn
    if (fileInput.files.length > 0) {
      sendBtn.style.display = "inline-block";
    }
  });

  const createChatLi = (message, className) => {
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", className);

    let chatContent;
    if (className === "outgoing") {
      // Tin nhắn đi là hình ảnh xem trước
      chatContent = `
                <span class="material-symbols-outlined">smart_toy</span>
                <img src="${message}" style="max-width: 200px;">`;
    } else {
      // Tin nhắn đến là của con bot
      chatContent = `
                <span class="material-symbols-outlined">smart_toy</span>
                <p>${message}</p>
            `;
    }

    // Thêm nội dung vào thẻ <li>
    chatLi.innerHTML = chatContent;
    return chatLi;
  };

  const handleChat = () => {
    const file = fileInput.files[0];
    if (!file) {
      console.error("No file selected.");
      return;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
      const imageUrl = e.target.result;

      // Thêm hình ảnh xem trước vào khung chat bên phải
      chatbox.appendChild(createChatLi(imageUrl, "outgoing"));
      chatbox.scrollTop = chatbox.scrollHeight;
    };

    // Đọc file như Data URL
    reader.readAsDataURL(file);
  };

  // Sự kiện click để gửi tin nhắn chat
  sendChatBtn.addEventListener("click", handleChat);

  // Sự kiện click để đóng chatbot
  closeBtn.addEventListener("click", () => {
    document.body.classList.remove("show-chatbot");
  });
  // Sự kiện click để hiển thị/ẩn chatbot
  chatbotToggler.addEventListener("click", () => {
    document.body.classList.toggle("show-chatbot");
  });
});
