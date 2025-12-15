const http = require("http");
const db = require("./db");

// Server

const server = http.createServer((req, res) => {
    
    // Allow requests from all origins [ZERO CORS PROTECTION !!11!!!!1]
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    // Handle Preflight Requests

    if (req.method == "OPTIONS") {
        res.writeHead(200);
        return res.end();
    }

    else if (req.method == "POST" && req.url == "/api/create-ticket") {
        let body = "";
        
        req.on("data", chunk => body += chunk);
        req.on("end", () => {
            const data = JSON.parse(body);

            // Send to DB
            db.run("INSERT INTO tickets (category, title, description) VALUES (?, ?, ?)", [data.category, data.title, data.description],
                function(err) {
                    if (err) {
                        console.error(err);
                        res.writeHead(500, { "content-type": "application/json" });
                        return res.end(JSON.stringify({error: "DB Error"}));
                    } else {
                        console.log("Ticket Inserted Successfully");
                    };

                    console.log("JSON Data Recevied: ", body);

                    const response = { message: `Hello, The title of the ticket is: ${data.title}` }
                    res.writeHead(200, {"content-type": "application/json"});
                    res.end(JSON.stringify(response));
                }
            );
        })
    }

    else if (req.method == "GET" && req.url == "/") {
        const fs = require("fs");

        fs.readFile("index.html", (err, data) => {
            if (err) {
                res.writeHead(500);
                res.end("Error loading file");
            } else {
                res.writeHead(200, {"content-type": "text/html"});
                res.end(data);
            }
        });
    }

    else {  
        res.writeHead(400, { "Content-Type": "text/plain"});
        res.end("Not Found");
    }
});

server.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});
