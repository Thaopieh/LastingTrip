$(document).ready(function() {
    // Event handler cho việc click vào các mục menu
    $('.menu ul li').click(function(event) {
        event.preventDefault();

        var menuItemId = $(this).attr('id');
        var partialName = mapMenuItemToPartial(menuItemId);

        // Kiểm tra xem partial có tồn tại không trước khi render
        if (partialName) {
            // Load nội dung của partial từ file .hbs
            loadPartialContent(partialName);
        } else {
            console.error('Partial not found for ' + menuItemId);
        }
    });

    // Hàm ánh xạ ID của mục menu tới tên partial tương ứng
    function mapMenuItemToPartial(menuItemId) {
        switch (menuItemId) {
            case 'button1':
                return 'createClient'; // Tên partial cho 'KHÁCH HÀNG'
            case 'button2':
                return 'createHotelOwner'; // Tên partial cho 'CHỦ KHÁCH SẠN'
            case 'button3':
                return 'createHotel'; // Tên partial cho 'KHÁCH SẠN'
            case 'button4':
                return 'createOrder'; // Tên partial cho 'ĐƠN ĐẶT HÀNG'
            case 'button5':
                return 'createDiscount'; // Tên partial cho 'PHIẾU GIẢM GIÁ'
            case 'button6':
                return 'logout'; // Tên partial cho 'Log out'
            default:
                return ''; // Trả về rỗng nếu không có partial tương ứng
        }
    }

    // Hàm load nội dung của partial từ file .hbs và render
    function loadPartialContent(partialName) {
        // Sử dụng AJAX để tải nội dung của partial từ file .hbs
        $.ajax({
            url: 'views/Admin/partials/' + partialName + '.hbs', // Đường dẫn tới file .hbs
            success: function(data) {
                // Biên dịch template Handlebars từ dữ liệu tải về
                var template = Handlebars.compile(data);
                var renderedPartial = template();

                // Hiển thị partial trong phần tử có class là "content"
                $('.content').html(renderedPartial);
            },
            error: function(xhr, status, error) {
                console.error('Failed to load partial:', error);
            }
        });
    }
});
