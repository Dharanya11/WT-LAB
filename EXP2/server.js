const http = require('http');
const mongoose = require("mongoose");

const dbUrl = "mongodb://localhost:27017/project";
const userSchema = new mongoose.Schema({
    username: String,
    password: String
});
const User = mongoose.model('User', userSchema);

// **Connect to MongoDB**
const db = async () => {
    console.log("Connecting to MongoDB...");
    mongoose.connect(dbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        family: 4
    }).then(() => {
        console.log("Connected to MongoDB");
    }).catch((err) => {
        console.log("DB Connection Error:", err);
    });
};
db();

// **Create HTTP Server**
const server = http.createServer(async (req, res) => {
    if (req.method === 'GET' && req.url.startsWith('/signup')) {
        const urlParts = new URL(req.url, `http://${req.headers.host}`);
        const username = urlParts.searchParams.get("username");
        const password = urlParts.searchParams.get("password");

        res.writeHead(200, { 'Content-Type': 'text/html' });

        if (username && password) {
            const existingUser = await User.findOne({ username });
            if (existingUser) {
                res.end(`<script>alert("Signup Failed! Username already exists."); window.location.href="signup.html";</script>`);
                return;
            } else {
                const newUser = new User({ username, password });
                const savedUser = await newUser.save();
                
                if (savedUser) {
                    res.end(`<script>alert("Signup Successful!"); window.location.href="login.html";</script>`);
                    return;
                } else {
                    res.end(`<script>alert("Error during signup!"); window.location.href="signup.html";</script>`);
                    return;
                }
            }
        }
    } 
    
    else if (req.method === 'POST' && req.url === '/login') {
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', async () => {
            const postData = new URLSearchParams(body);
            const username = postData.get("username");
            const password = postData.get("password");

            res.writeHead(200, { 'Content-Type': 'text/html' });

            if (username && password) {
                console.log("Checking login for:", username);
                const user = await User.findOne({ username, password });

                if (user) {
                    res.end(`<script>alert("Login Successful!"); window.location.href="dashboard.html";</script>`);
                    return;
                } else {
                    res.end(`<script>alert("Invalid Username or Password!"); window.location.href="login.html";</script>`);
                    return;
                }
            } else {
                res.end(`<script>alert("Login Failed! Provide username and password."); window.location.href="login.html";</script>`);
                return;
            }
        });
    } 
});
server.listen(4001, () => {
    console.log('Server running on port 4001');
});