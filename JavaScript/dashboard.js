let currentUser = JSON.parse(localStorage.getItem("loggedUser"));

document.querySelectorAll(".username").forEach(el => {
  el.textContent = currentUser.firstName + " " + currentUser.lastName;
});
document.querySelectorAll(".mail").forEach(el => {
  el.textContent = currentUser.email;
});
document.querySelectorAll(".profile-pic").forEach(img => {
  img.src = currentUser.prifilePicture || "default-profile.png";
});
document.querySelector(".Total").textContent = currentUser.tottalTickets;
document.querySelector(".Open").textContent = currentUser.openTickets;
document.querySelector(".Open").textContent = currentUser.closedTickets;
document.querySelector(".container-fluid h1").textContent = "Welcome back,"+" "+ currentUser.firstName;