import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/shopDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

// ===== Order Schema =====
const orderSchema = new mongoose.Schema({
  productName: String,
  productPrice: Number,
  type: String, // "cart" or "buy"
});
const Order = mongoose.model('Order', orderSchema);

// ===== User Schema =====
const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: String
});
const User = mongoose.model('User', userSchema);

// ===== Contact Schema =====
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  message: String,
  createdAt: { type: Date, default: Date.now }
});
const Contact = mongoose.model('Contact', contactSchema);

// ===== Express Setup =====
const app = express();
app.use(cors({
  origin: 'http://localhost:4200',
  methods: ['POST', 'GET'], // Added GET for contact retrieval
  allowedHeaders: ['Content-Type']
}));
app.use(bodyParser.json());

// ===== Existing Routes (unchanged) =====
app.post('/api/orders', async (req, res) => {
  try {
    const { productName, productPrice, type } = req.body;
    const order = new Order({ productName, productPrice, type });
    await order.save();
    res.status(201).json({ success: true, message: `${type} saved!` });
  } catch (error) {
    console.error('❌ Order saving error:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

app.post('/api/signup', async (req, res) => {
  const { username, password } = req.body;
  try {
    const existing = await User.findOne({ username });
    if (existing) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }
    const user = new User({ username, password });
    await user.save();
    res.status(201).json({ success: true, message: 'Signup successful' });
  } catch (err) {
    console.error('❌ Signup error:', err);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username, password });
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
    res.json({ success: true, message: 'Login successful', username: user.username });
  } catch (err) {
    console.error('❌ Login error:', err);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

// ===== New Contact Routes (added without modifying existing code) =====
// Add to your existing server routes
app.post('/api/contacts', async (req, res) => {
  try {
    // Basic validation
    if (!req.body.name || !req.body.email || !req.body.message) {
      return res.status(400).json({ 
        success: false, 
        message: 'Name, email, and message are required' 
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(req.body.email)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please provide a valid email address' 
      });
    }

    const contact = new Contact(req.body);
    await contact.save();
    res.status(201).json({ 
      success: true, 
      message: 'Contact form submitted successfully' 
    });
  } catch (error) {
    console.error('❌ Contact form submission error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal Server Error' 
    });
  }
});

app.get('/api/contacts', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json({ success: true, data: contacts });
  } catch (error) {
    console.error('❌ Contact retrieval error:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

// ===== Start Server (unchanged) =====
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});