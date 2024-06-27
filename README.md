<a name="readme-top"></a>

<h1 align="center"><strong>LastingTrip.com</strong></h1>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Mục lục</summary>
  <ol>
    <li>
      <a href="#giới-thiệu-nhóm">Giới thiệu nhóm</a>
    </li>
    <li>
      <a href="#giới-thiệu-đồ-án">Giới thiệu đồ án</a>
      <ul>
        <li><a href="#lý-do-chọn-đề-tài">Lý do chọn đề tài</a></li>
        <li><a href="#các-chức-năng-cơ-bản">Các chức năng cơ bản</a></li>
        <ul>
          <li><a href="#admin">Admin</a></li>
          <li><a href="#client-user">Client User</a></li>
          <li><a href="#owner-user">Owner User</a></li>
        </ul>
        <li><a href="#ngôn-ngữ-công-nghệ-ứng-dụng">Ngôn ngữ, công nghệ ứng dụng</a></li>
        <li><a href="#hướng-dẫn-cài-đặt">Hướng dẫn cài đặt</a></li>
        <li><a href="#một-số-tính-năng-nổi-bật">Một số tính năng nổi bật</a></li>
        <ul>
          <li><a href="#thanh-toán-bằng-vnpay">Thanh toán bằng VNPay</a></li>
          <li><a href="#chatbot-chăm-sóc-khách-hàng">Chatbot chăm sóc khách hàng</a></li>
          <li><a href="#chatbot-tìm-kiếm-hình-ảnh">Chatbot tìm kiếm hình ảnh</a></li>

        </ul>
      </ul>
    </li>

  </ol>
</details>

<!-- Giới thiệu đồ án -->

# Giới thiệu nhóm

Xin chào mọi người! Chúng em là **Nhóm 11** đến từ lớp **NT208.O22.ANTT**.
Nhóm chúng em gồm 5 thành viên:

- **22521376** - Trịnh Thị Bích Thảo (Nhóm trưởng)
- **22521541** - Thái Ngọc Diễm Trinh
- **22521444** - Huỳnh Trung Thuận
- **22521446** - Lê Hiệp Thuận
- **22521202** - Nguyễn Đình Quang

# Giới thiệu đồ án

Link deploy web: https://lastingtrip-674584f294be.herokuapp.com/

## Lý do chọn đề tài

Ngành du lịch và khách sạn đang phát triển mạnh mẽ. Mọi người ngày càng tìm kiếm thông tin và đặt phòng qua internet. Một trang website đặt phòng khách sạn sẽ đáp ứng nhu cầu này. Trang web này có thể giúp người dùng dễ dàng tìm kiếm và so sánh các khách sạn, xem thông tin chi tiết về phòng, giá cả, và đặt phòng trực tuyến. Điều này giúp tiết kiệm thời gian và tạo thuận lợi cho khách hàng.
Bên cạnh đó, xây dựng một trang web đặt phòng khách sạn sẽ giúp phát triển kỹ năng lập trình, thiết kế giao diện, và quản lý cơ sở dữ liệu... Đồ án này đòi hỏi phải tư duy logic, xây dựng hệ thống, và tương tác với cơ sở dữ liệu. Điều này sẽ giúp rèn luyện khả năng giải quyết vấn đề và phát triển sự sáng tạo...

## Các chức năng cơ bản

![tongQuan](https://github.com/Thaopieh/Crying-/assets/136552635/e27332ec-05a8-4772-9c3b-06cb47259a24)

<p align="center">Hình. Thiết kế tổng quan của hệ thống</p>
  
### Admin
* Quản lý người dùng
* Quản lý khách sạn, phòng khách sạn
* Quản lý đơn đặt hàng
* Thống kê doanh thu

### Client User

- Quản lý khách sạn
  - Tìm kiếm khách sạn (filter, lân cận,...)
  - Đánh giá khách sạn
- Quản lý giao dịch
  - Quản lý giỏ hàng
  - Quản lý thanh toán
  - Xem lịch sử giao dịch
  - Quản lý voucher
- Quản lý tài khoản
  - Quản lý thông tin cá nhân
  - Đăng kí
  - Đăng nhập
  - Đăng ký

### Owner User

- Quản lý khách sạn
  - Quản lý khách sạn (thêm, xóa, sửa)
  - Quản lý phòng
  - Danh sách đặt phòng

## Một số tính năng nổi bật

### Thanh toán bằng VNPay

![VNPAY](https://github.com/thaitrinh12100/howto-README/assets/136552635/85d6911e-fe31-41c8-a709-f433c7eeb985)

### Chatbot chăm sóc khách hàng

![chatbot1](https://github.com/thaitrinh12100/howto-README/assets/136552635/bd1e2bb0-ade5-4381-b41a-b7e0bed5d74e)

### Chatbot tìm kiếm hình ảnh

![chatbot2](https://github.com/thaitrinh12100/howto-README/assets/136552635/1ee43992-4479-4e14-882f-1dd647940c08)

## Hướng dẫn cài đặt

- **Bước 1:** Clone repo từ Github về máy, có thể sử dụng lệnh  
  `git clone https://github.com/Thaopieh/LastingTrip.git`
- **Bước 2:** Mở thư mục vừa tải về trong Visual Studio Code
- **Bước 3:** Mở terminal và cài đặt một số công cụ cần thiết bằng các lệnh sau:
  `yarn add sequelize mysql2 express`
  `yarn add nodemon --dev`
  `yarn add sequelize-cli --dev`
- **Bước 4:** Mở MySQL Workbench và tạo một cơ sở dữ liệu mới
- **Bước 5:** Vào file config.json trong thư mục config, thay đổi các giá trị sau:
  - “username”: Tên đăng nhập MySQL của bạn
  - “password”: Mật khẩu MySQL của bạn
  - “database”: Tên cơ sở dữ liệu vừa tạo
- **Bước 6:** Thực hiện migrate cơ sở dữ liệu bằng lệnh sau:
  `npx sequelize db:migrate`
- **Bước 7:** Đổ dữ liệu có sẵn vào cơ sở dữ liệu bằng lệnh:
  `npx sequelize db:seed:all`
- **Bước 8:** Chạy server bằng lệnh:
  `yarn dev`
  Khi server đã chạy, mở trình duyệt và truy cập đến địa chỉ `http://localhost:3030/` để xem trang web.

## Ngôn ngữ, công nghệ ứng dụng

### Front-end

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![Bootstrap](https://img.shields.io/badge/bootstrap-%238511FA.svg?style=for-the-badge&logo=bootstrap&logoColor=white)

### Back-end

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![MySQL](https://img.shields.io/badge/mysql-4479A1.svg?style=for-the-badge&logo=mysql&logoColor=white)

### ORM

![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white)

### Chat bot

![TensorFlow](https://img.shields.io/badge/TensorFlow-%23FF6F00.svg?style=for-the-badge&logo=TensorFlow&logoColor=white)

### Other

![Yarn](https://img.shields.io/badge/yarn-%232C8EBB.svg?style=for-the-badge&logo=yarn&logoColor=white)
![Nodemon](https://img.shields.io/badge/NODEMON-%23323330.svg?style=for-the-badge&logo=nodemon&logoColor=%BBDEAD)
### Sử dụng jQuery trong dự án

#### 1. Sử dụng và tích hợp các plugin vào dự án thực tế

Để tích hợp các plugin jQuery vào dự án của bạn, bạn có thể làm những bước sau:

- **Chọn plugin phù hợp:** Tìm plugin phù hợp với yêu cầu của dự án trên các thư viện như npm, jQuery plugins, hoặc GitHub.
- **Cài đặt plugin:** Sử dụng npm, yarn để cài đặt hoặc tải trực tiếp file plugin và thêm vào dự án của bạn.
- **Gọi plugin:** Thêm file JavaScript của plugin vào dự án và gọi nó trong mã nguồn của bạn. Đối với các plugin jQuery, bạn có thể gọi plugin sau khi tài liệu đã sẵn sàng với `$(document).ready()`.
- **Cấu hình plugin:** Đọc tài liệu của plugin để biết cách cấu hình và tùy chỉnh plugin cho phù hợp với nhu cầu của dự án.
- **Kiểm tra và sửa lỗi:** Chạy dự án và kiểm tra xem plugin hoạt động đúng không. Sửa lỗi nếu cần thiết.

#### 2. Bubbling và Capturing trong sự kiện

- **Bubbling:** Khi một sự kiện xảy ra, nó sẽ "bùng lên" từ phần tử nhỏ nhất lên phần tử cha của nó và tiếp tục lên các phần tử cha khác cho đến khi đạt đến phần tử cao nhất trong cây DOM. Để ngăn chặn sự kiện "bùng lên", bạn có thể sử dụng phương thức `event.stopPropagation()` hoặc `event.preventDefault()`.
- **Capturing:** Ngược lại với "bubbling", sự kiện sẽ "bắt đầu" từ phần tử cha và "chạy" xuống các phần tử con. Để bắt đầu sự kiện từ phần tử cha, bạn có thể sử dụng tham số true trong phương thức `on()` hoặc `bind()`.

#### 3. Sự khác biệt giữa $(document).ready() và $(window).load()

- **$(document).ready():** Hàm này được gọi khi DOM (Document Object Model) đã sẵn sàng, tức là khi HTML đã được tải và xử lý xong, nhưng các tài nguyên như hình ảnh, video có thể chưa được tải xong.
- **$(window).load():** Hàm này được gọi khi tất cả tài nguyên của trang, bao gồm cả hình ảnh và video, đã được tải xong.

#### 4. Xử lý sự kiện trong jQuery

Trong jQuery, bạn có thể xử lý sự kiện bằng cách sử dụng các phương thức như `.on()`, `.off()`, `.trigger()` và các phương thức shorthand như `.click()`, `.hover()`. Ví dụ:

```javascript
$('#element').on('click', function() {
    alert('Element clicked');
});

$('#button').click(function() {
    alert('Button clicked');
});
```
#### 5.jQuery và ReactJS có cách tiếp cận khác nhau trong việc quản lý và thao tác DOM:
- **jQuery:** Thao tác DOM trực tiếp, dẫn đến cập nhật trực tiếp trên trang web và có thể ảnh hưởng đến hiệu suất.
- **ReactJS:** Sử dụng Virtual DOM. React cập nhật trạng thái và props trên Virtual DOM trước, sau đó so sánh với DOM thật để chỉ cập nhật những phần thay đổi. Điều này giúp tối ưu hiệu suất và trải nghiệm người dùng.
