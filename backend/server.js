const express = require('express');
const mongoose = require('mongoose');
const chatRoutes = require('./routes/chatRoute'); // ✅ Use correct file name
const cors = require('cors');
const dotenv = require('dotenv').config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.DB_URL)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ MongoDB Error:', err));

// Mount routes
app.use('/api/chats', chatRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
