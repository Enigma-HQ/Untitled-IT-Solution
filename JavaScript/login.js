const passdiv = document.querySelector(".pass");
const password = document.getElementById("password");
const passIcon = document.getElementById("passIcon");

// focus on password field
password.onfocus = function () {
  passdiv.classList.add("active");
};
password.onblur = function () {
  passdiv.classList.remove("active");
};

// toggle password visibility
passIcon.onclick = function () {
  if (passIcon.classList.contains("fa-eye-slash")) {
    passIcon.classList.replace("fa-eye-slash", "fa-eye");
    password.type = "text";
  } else {
    passIcon.classList.replace("fa-eye", "fa-eye-slash");
    password.type = "password";
  }
};
