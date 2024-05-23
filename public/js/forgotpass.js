$(document).ready(function () {
  $("#reset-password").click(function () {
    var email = $("#email").val();

    if (!email) {
      alert("Please enter your email address");
      return;
    }

    $.ajax({
      url: "http://localhost:3030/api/v1/authen/forgotpassword", // Replace with your server endpoint
      method: "POST",
      data: JSON.stringify({ email: email }),
      contentType: "application/json",
      success: function (response) {
        if (response) {
          window.location.href = `http://localhost:3030/resetpassword`;
          $("#responseMessage").text(
            "A password reset link has been sent to your email."
          );
          $("#responseMessage")
            .removeClass("error-message")
            .addClass("success-message");
        } else {
          $("#responseMessage").text("Email does not exist.");
          $("#responseMessage")
            .removeClass("success-message")
            .addClass("error-message");
        }
      },
      error: function (xhr, status, error) {
        $("#responseMessage").text("Email không tồn tại");
        $("#responseMessage")
          .removeClass("success-message")
          .addClass("error-message");
      },
    });
  });
});
