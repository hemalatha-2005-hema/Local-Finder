const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

let messages = [];

app.post("/send-message", (req, res) => {
    const message = req.body.message;
    console.log("Message received:", message);  // check in terminal
    messages.push(message);
    res.json({ success: true });
});

app.get("/get-messages", (req, res) => {
    res.json(messages);
});

// Temporary memory storage (for demo only)
let users = [];

// Register API
app.post("/register", (req, res) => {
    const { email, password } = req.body;

    const userExists = users.find(user => user.email === email);
    if (userExists) {
        return res.json({ message: "User already exists" });
    }

    users.push({ email, password });
    res.json({ message: "Registration successful" });
});

// Login API
app.post("/login", (req, res) => {
    const { email, password } = req.body;

    const user = users.find(
        user => user.email === email && user.password === password
    );

    if (!user) {
        return res.json({ message: "Invalid email or password" });
    }

    res.json({ message: "Login successful" });
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});