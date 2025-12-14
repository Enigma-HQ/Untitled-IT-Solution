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

submbuttom.addEventListener("click", function (e) {
  e.preventDefault();

  let myRequest = new XMLHttpRequest();
  myRequest.open("GET", "http://localhost:5500/JavaScript/users.json", true);
  myRequest.send();

  myRequest.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      let jsData = JSON.parse(this.responseText);
      let users = jsData.users;
      let FullData = null;

      for (let i = 0; i < users.length; i++) {
        if (
          users[i].username.toLowerCase() ===
            username.value.trim().toLowerCase() &&
          users[i].password === password.value.trim()
        ) {
          FullData = users[i];
          break;
        }
      }

      if (!FullData) {
        console.log("Invalid login");
        username.style.border = "1px solid red";
        password.style.border = "1px solid red";
      } else {
        console.log("Login successful", FullData);

        localStorage.setItem("loggedUser", JSON.stringify(FullData));

        window.location.href = "index.html";
      }
    }
  };
});
