const http = require('http');
const mongoose = require("mongoose");

const dbUrl = "mongodb://localhost:27017/project";
// Define Mongoose Schema
const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String
});
const User = mongoose.model('User', userSchema);

// Database Connection
mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    family: 4
}).then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log("DB Connection Error:", err));

// Create HTTP Server
const server = http.createServer(async (req, res) => {
    if (req.method === 'GET' && req.url.startsWith('/signup')) {
        const urlParts = new URL(req.url, `http://${req.headers.host}`);
        const username = urlParts.searchParams.get("username");
        const email = urlParts.searchParams.get("email");
        const password = urlParts.searchParams.get("password");

        res.writeHead(200, { 'Content-Type': 'text/html' });

        if (username && email && password) {
            const existingUser = await User.findOne({ username });

            if (existingUser) {
                res.end(`<script>alert("Signup Failed! Username already exists."); history.back();</script>`);
            } else {
                await new User({ username, email, password }).save();
                res.end(`<script>alert("Signup Successful! Please go to the login page."); history.back();</script>`);
            }
        } else {
            res.end(`<script>alert("Missing Credentials! Provide username, email, and password."); history.back();</script>`);
        }
    } 
    else if (req.method === 'POST' && req.url === '/login') {
        let body = '';
        req.on('data', chunk => { body += chunk.toString(); });
        req.on('end', async () => {
            const postData = new URLSearchParams(body);
            const email = postData.get("email");
            const password = postData.get("password");
            res.writeHead(200, { 'Content-Type': 'text/html' });
            const user = await User.findOne({ email, password });

            if (user) {
                res.end(`<script>alert("Login Successful! Welcome to your main page. "); history.back();</script>`);
            } else {
                res.end(`<script>alert("Invalid Email or Password! Please try again."); history.back();</script>`);
            }
        });
    } 
    
    else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end(`<script>alert("404 Not Found"); history.back();</script>`);
    }
});

// Start Server
server.listen(4001, () => console.log('Server running on port 4001'));
