const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const commentRoutes = require('./routes/commentRoutes');
const repositoryRoutes = require('./routes/repositoryRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');
const premiumRequestRoutes = require('./routes/premiumRequestRoutes');
const activityLogRoutes = require('./routes/activityLogRoutes');
// const adminRoutes = require('./routes/adminRoutes');
const blockuser = require('./middleware/blockuser');
dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes , blockuser);
app.use('/api/products', productRoutes , blockuser);
app.use('/api/comments', commentRoutes , blockuser);
app.use('/api/repo', repositoryRoutes , blockuser);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/premium-requests', premiumRequestRoutes);
app.use('/api/activity-logs', activityLogRoutes);
// admin middleware
// app.use('/api', adminRoutes);

app.get('/', (req, res) => res.send('API running'));

app.listen(3000, () => {
  console.log(`Server running on port 3000`);
});
