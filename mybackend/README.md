# IT Solutions Platform - Full Stack Project

A comprehensive IT solutions platform with user authentication, premium repository access management, feedback system, and admin panel with activity logging.

## 🚀 Features Implemented

### User Roles & Authentication
- **Guest Users** (Not Logged In)
  - View home page, products, solutions, repositories, and publications
  - Access global search with filters
  - Cannot download premium content or submit feedback

- **Registered Users** (Logged In)
  - All guest features
  - Download free repositories
  - Submit ratings and comments
  - Submit feedback via contact form
  - Request premium access to repositories
  - View personal profile with premium access history
  - Track premium request status

- **Admin Users**
  - Full system control via admin dashboard
  - Manage users (block/unblock, delete)
  - Manage products and repositories
  - Approve/reject premium access requests
  - Respond to feedback via email
  - Monitor activity logs and audit trail

### Premium Access System
- Users can request premium access to repositories
- Email notifications sent to:
  - Admin when request is submitted
  - User for confirmation of request
  - User when request is approved/rejected
- Admin can approve or reject with custom message
- Premium access is tracked in user profiles

### Feedback Management
- Users submit feedback via contact form
- Feedback tracked with status (pending/in-progress/resolved)
- Admin can reply to feedback via email
- Full audit trail of feedback responses

### Activity Logging
- Comprehensive activity tracking system
- Logs all user actions:
  - Login/logout
  - Premium requests
  - Access granted/rejected
  - User blocked/unblocked
  - Feedback submitted/replied
  - Repository/product CRUD operations
- Filter logs by action type
- View last 7 days statistics

## 📁 Project Structure

```
mybackend/
├── models/
│   ├── User.js                  # User schema with premium access
│   ├── Repository.js            # Repository schema
│   ├── Product.js               # Product schema
│   ├── Feedback.js              # Feedback with status/reply
│   ├── PremiumRequest.js        # Premium access requests
│   ├── ActivityLog.js           # Activity audit trail
│   └── Comment.js               # Comment system
├── controllers/
│   ├── authController.js        # Authentication & user management
│   ├── repositoryController.js  # Repository CRUD + update
│   ├── productController.js     # Product management
│   ├── feedbackController.js    # Feedback + reply system
│   ├── premiumRequestController.js  # Premium request handling
│   └── activityLogController.js     # Activity log queries
├── routes/
│   ├── authRoutes.js
│   ├── repositoryRoutes.js
│   ├── productRoutes.js
│   ├── feedbackRoutes.js
│   ├── premiumRequestRoutes.js
│   └── activityLogRoutes.js
├── middleware/
│   ├── auth.js                  # JWT authentication
│   ├── adminmiddleware.js       # Admin role check
│   └── blockuser.js             # Blocked user check
├── config/
│   ├── db.js                    # MongoDB connection
│   └── emailService.js          # Nodemailer email templates
├── Frontend HTML Pages:
│   ├── dashboard.html           # Admin panel (enhanced)
│   ├── profile.html             # User profile page (NEW)
│   ├── repo.html                # Repository listing
│   ├── product.html             # Product listing
│   ├── contact.html             # Contact/feedback form
│   └── signup.html              # User registration
├── app.js                       # Express server
├── package.json
└── .env.example                 # Environment variables template
```

## 🛠️ Installation & Setup

### 1. Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- Gmail account (for email notifications)

### 2. Install Dependencies
```bash
cd mybackend
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the root directory:

```env
# Database
MONGO_URI=mongodb://localhost:27017/it_solutions_db

# JWT Secret
JWT_SECRET=your_super_secret_jwt_key_here

# Admin Credentials
ADMIN_MAIL=admin@example.com
ADMIN_PASSWORD=admin123

# Email Configuration (Gmail)
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-specific-password
ADMIN_EMAIL=admin@example.com

# Frontend URLs
ADMIN_DASHBOARD_URL=http://localhost:3000/dashboard.html
FRONTEND_URL=http://localhost:3000

# Server
PORT=3000
```

### 4. Gmail App Password Setup
To enable email notifications:
1. Go to your Google Account settings
2. Enable 2-Step Verification
3. Generate an App Password (Select "Mail" and "Other")
4. Use this app password in EMAIL_PASSWORD (not your regular Gmail password)

### 5. Start the Server
```bash
npm start
# or for development with auto-reload:
npm run dev
```

Server will run on `http://localhost:3000`

## 📧 Email Notifications

The system sends automated emails for:

1. **Premium Access Request Submitted**
   - To Admin: New request notification
   - To User: Confirmation of request

2. **Premium Access Approved**
   - To User: Access granted with download link

3. **Premium Access Rejected**
   - To User: Request rejected with reason

4. **Feedback Reply**
   - To User: Admin's response to feedback

## 🎯 API Endpoints

### Authentication
- `POST /api/auth/login` - User/Admin login
- `GET /api/auth/profile` - Get user profile (protected)
- `GET /api/auth/admin` - Get all users (admin)
- `PUT /api/auth/users/:id/block` - Block/unblock user (admin)
- `DELETE /api/auth/admin/:id` - Delete user (admin)

### Repositories
- `GET /api/repo/admin` - Get all repositories
- `POST /api/repo/admin` - Create repository (admin)
- `PUT /api/repo/admin/:id` - Update repository (admin)
- `DELETE /api/repo/admin/:id` - Delete repository (admin)

### Premium Requests
- `POST /api/premium-requests/submit` - Submit request (protected)
- `GET /api/premium-requests/user` - Get user's requests (protected)
- `GET /api/premium-requests/admin/all` - Get all requests (admin)
- `PUT /api/premium-requests/admin/approve/:id` - Approve request (admin)
- `PUT /api/premium-requests/admin/reject/:id` - Reject request (admin)

### Feedback
- `POST /api/feedback` - Submit feedback
- `GET /api/feedback` - Get all feedback (admin)
- `PUT /api/feedback/:id/reply` - Reply to feedback (admin)
- `PUT /api/feedback/:id/status` - Update status (admin)
- `DELETE /api/feedback/:id` - Delete feedback (admin)

### Activity Logs
- `GET /api/activity-logs/all` - Get all logs with filters (admin)
- `GET /api/activity-logs/stats` - Get activity statistics (admin)
- `GET /api/activity-logs/user/:userId` - Get user-specific logs (admin)

## 🎨 Frontend Pages

### User Pages
- **signup.html** - User registration and login
- **profile.html** - User profile with:
  - Account information
  - Premium repositories access
  - Premium request history
  - Settings and logout
- **repo.html** - Repository listing with:
  - Free repositories (direct GitHub download)
  - Premium repositories (request access button)
  - Search and filtering
- **product.html** - Product showcase
- **contact.html** - Contact/feedback form

### Admin Pages
- **dashboard.html** - Comprehensive admin panel with:
  - Statistics dashboard
  - Product management
  - User management (block/unblock)
  - Repository management (CRUD + premium settings)
  - Premium request approval system
  - Feedback management with reply feature
  - Activity logs with filtering

## 🔐 Security Features

- JWT token-based authentication
- Password hashing with bcryptjs
- Protected routes with middleware
- Admin role verification
- Blocked user prevention
- CORS enabled
- Input validation

## 📱 Responsive Design

All pages are fully responsive and work on:
- Desktop (1920px+)
- Laptop (1366px - 1920px)
- Tablet (768px - 1366px)
- Mobile (320px - 768px)

## 🚦 Testing the Application

### 1. Create Admin Account
First login with admin credentials (from .env):
- Email: admin@example.com
- Password: admin123

### 2. Create User Account
Register a new user via signup.html

### 3. Test Premium Request Flow
1. As user: Browse repositories and click "Request Premium Access"
2. Check email for confirmation
3. As admin: Go to dashboard → Premium Requests
4. Approve or reject the request
5. User receives email notification
6. User can see access in profile.html

### 4. Test Feedback System
1. Submit feedback via contact.html
2. As admin: View feedback in dashboard
3. Click "Reply" to send email response
4. Check user email for reply

## 🐛 Troubleshooting

### Email Not Sending
- Verify Gmail App Password is correct
- Check EMAIL_USER and EMAIL_PASSWORD in .env
- Ensure 2-Step Verification is enabled on Gmail
- Check spam folder for emails

### Database Connection Issues
- Ensure MongoDB is running
- Verify MONGO_URI in .env
- Check MongoDB connection string format

### Authentication Issues
- Clear browser localStorage/sessionStorage
- Verify JWT_SECRET is set in .env
- Check token expiration (default 1 hour)

## 📝 Admin Responsibilities

As admin, you can:
1. **Monitor Activity**: Track all user actions via Activity Logs
2. **Manage Premium Access**: Review and approve/reject requests
3. **Handle Feedback**: Reply to user inquiries via email
4. **User Management**: Block problematic users, manage accounts
5. **Content Management**: Add/edit/delete products and repositories
6. **Security**: Monitor login attempts and suspicious activity

## 🎓 Future Enhancements (Optional)

- Payment integration for premium subscriptions
- Real-time notifications with WebSockets
- Advanced analytics dashboard
- User ratings and reviews system
- Multi-language support
- File upload for repositories
- Advanced search with AI
- Mobile app version

## 📄 License

This project is for educational purposes.

## 👨‍💻 Developer Notes

- All passwords are hashed using bcryptjs
- JWT tokens expire after 1 hour
- Activity logs are retained indefinitely (can add cleanup job)
- Email templates are customizable in config/emailService.js
- All API responses follow consistent format

## 🤝 Support

For issues or questions:
1. Check the troubleshooting section
2. Review the console logs
3. Verify all environment variables are set correctly
4. Ensure all dependencies are installed

---

**Project Status**: ✅ Production Ready

**Last Updated**: $(date)

**Version**: 1.0.0
