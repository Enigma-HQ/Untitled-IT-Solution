const passdiv = document.querySelector(".pass");
const password = document.getElementById("password");
const passIcon = document.getElementById("passIcon");
const username = document.getElementById("username");
const submbuttom = document.getElementById("submit-button");

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

submbuttom.onclick = function (e) {
  e.preventDefault();

  if (
    username.value === "" ||
    password.value === "" ||
    username.value !== "admin" ||
    password.value !== "admin"
  ) {
    username.style.border = "1px solid red";
    passdiv.style.border = "1px solid red";
    document.querySelectorAll(".error")[1].style.display = "block";
    document.querySelectorAll(".error")[0].style.display = "block";

    return;
  } else if (username.value === "admin" && password.value === "admin") {
    username.style.border = "1px solid green";
    passdiv.style.border = "1px solid green";
    document.querySelectorAll(".error")[1].style.display = "none";
    document.querySelectorAll(".error")[0].style.display = "none";
    window.location.href = "index.html";
  }
};
