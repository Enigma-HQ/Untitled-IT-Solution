document.addEventListener("DOMContentLoaded", () => {
    
    const form = document.querySelector("form");

    form.addEventListener("submit", function (e) {
        e.preventDefault(); // Prevent reload

        // Collect form values
        const category = document.getElementById("category-select").value;
        const title = form.querySelector("input[type='text']").value.trim();
        const description = form.querySelector("textarea").value.trim();

        // Make JSON object
        const ticketData = {
            category: category,
            title: title,
            description: description
        };

        console.log("Sending JSON:", ticketData);

        // Send to backend
        fetch("http://localhost:8080/api/create-ticket", {      
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(ticketData)
        })
        .then(response => response.json())
        .then(data => {
            console.log("Response from backend:", data);
            alert("Ticket submitted successfully!");
            form.reset();
        })
        .catch(error => {
            console.error("Error:", error);
            alert("Failed to submit ticket.");
        });

    });
});
 