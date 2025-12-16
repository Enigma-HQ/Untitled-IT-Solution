const http = require("http");
const db = require("./db");
const { randomUUID, randomInt } = require("crypto");

// Server

const server = http.createServer((req, res) => {
    
    // Allow requests from all origins [SCARY !!11!!!!1]
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
            const clientData = JSON.parse(body);
            
            const serverData = {
                // ID Generation
                id: `${clientData.category} - ${randomInt(10, 10000)}`,
                title: clientData.title,
                status: 'open',
                statusLabel: 'Open',
                badgeClass: 'badge-open',
                category: clientData.category,
                lastUpdated: new Date().toISOString(),
                body: clientData.body
            };
            
            // Send to DB
            db.run("INSERT INTO tickets (id, title, status, statusLabel, badgeClass, category, description) VALUES (?, ?, ?, ?, ?, ?, ?)", [serverData.id, serverData.title, serverData.status, serverData.statusLabel, serverData.badgeClass, serverData.category, serverData.body],
                function(err) {
                    if (err) {
                        console.error(err);
                        res.writeHead(500, { "content-type": "application/json" });
                        return res.end(JSON.stringify({error: "DB Error"}));
                    } else {
                        console.log("Ticket Inserted Successfully");
                    };

                    console.log("JSON Data Recevied: ", body);

                    const response = { message: `Hello, The title of the ticket is: ${clientData.title}` }
                    res.writeHead(200, {"content-type": "application/json"});
                    res.end(JSON.stringify(response));
                }
            );
        })
    }

    else if (req.method == "GET" && req.url == "/myticket") {
        db.all("SELECT * FROM tickets", [], (err, rows) => {
            if (err){
                res.setHeader("Content-Type", "application/json");
                res.statusCode = 500;
                res.end(JSON.stringify({error: "DB Error"}));
            } else {
                res.setHeader("Content-Type", "application/json");
                res.statusCode = 200;
                res.end(JSON.stringify(rows));
            }
        });
        
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
