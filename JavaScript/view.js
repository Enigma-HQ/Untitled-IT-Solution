var selectedTicket = JSON.parse(localStorage.getItem('selectedTicket'));
console.log(selectedTicket);
document.getElementById("ticketSubtitle").textContent = "Details for ticket of id: "+selectedTicket.id;
document.getElementById("ticketIdDisplay").textContent = "Details for ticket of id: " +selectedTicket.id;
document.getElementById("ticketTitle").textContent = selectedTicket.title;


let sta = document.getElementById("ticketStatus");
sta.className=""
sta.classList.add("badge-status",selectedTicket.badgeClass);
sta.textContent=selectedTicket.statusLabel;

let stapro = document.getElementById("ticketPriority");
stapro.className=""
stapro.classList.add("badge-status","badge-open");
stapro.textContent="None";

document.getElementById("ticketCategory").textContent = selectedTicket.category;

document.getElementById("ticketCreationDate").textContent = selectedTicket.created_at;