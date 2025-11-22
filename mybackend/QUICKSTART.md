# ⚡ Quick Start Guide - IT Solutions Platform

## 🎯 Get Started in 5 Minutes

### Step 1: Install Dependencies (1 min)
```bash
cd "d:\phase III\phase III\mybackend"
npm install
```

### Step 2: Setup Environment Variables (2 min)
Create a `.env` file in the project root with these essential settings:

```env
MONGO_URI=mongodb://localhost:27017/it_solutions_db
JWT_SECRET=my_super_secret_key_123456789
ADMIN_MAIL=admin@example.com
ADMIN_PASSWORD=admin123

# Email Setup (Optional for testing without email)
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-gmail-app-password
ADMIN_EMAIL=admin@example.com

PORT=3000
```

⚠️ **Note**: Email notifications require Gmail App Password. Skip email setup for initial testing.

### Step 3: Start MongoDB (if not running)
```bash
# Windows
mongod

# Or use MongoDB Atlas cloud database
```

### Step 4: Start the Server (1 min)
```bash
npm start
```

✅ Server running at `http://localhost:3000`

---

## 🧪 Quick Test Guide

### Test 1: Admin Login
1. Open: `http://localhost:3000/dashboard.html`
2. Login with:
   - Email: `admin@example.com`
   - Password: `admin123`
3. You should see the admin dashboard

### Test 2: Create Repository
1. In Admin Dashboard → Repositories
2. Fill the form:
   - Title: "Test Repo"
   - Description: "Test repository"
   - GitHub Link: "https://github.com/test/repo"
   - Type: Free or Premium
3. Click "Upload Repo"

### Test 3: User Registration
1. Open: `http://localhost:3000/signup.html`
2. Create account with:
   - Email: test@example.com
   - Password: test123
   - Role: User
3. Login with created credentials

### Test 4: Request Premium Access
1. As logged-in user, go to: `http://localhost:3000/repo.html`
2. Find a Premium repository
3. Click "Request Premium Access"
4. Confirm the request

### Test 5: Approve Request (Admin)
1. Login to admin dashboard
2. Navigate to "Premium Requests"
3. Click "Review" on pending request
4. Click "Approve" or "Reject"
5. User will see status in their profile

### Test 6: Submit Feedback
1. Open: `http://localhost:3000/contact.html`
2. Fill contact form
3. Submit feedback
4. Admin can view in dashboard → Feedback

### Test 7: View User Profile
1. As logged-in user: `http://localhost:3000/profile.html`
2. View:
   - Account info
   - Premium access
   - Request history

---

## 📋 Common Commands

```bash
# Start server
npm start

# Development mode (auto-reload)
npm run dev

# Seed database (if seeders exist)
npm run seed

# Clear database
npm run seed:clear
```

---

## 🎨 Page URLs

- **Home/Landing**: `index.html` (create if needed)
- **Signup/Login**: `http://localhost:3000/signup.html`
- **User Profile**: `http://localhost:3000/profile.html`
- **Repositories**: `http://localhost:3000/repo.html`
- **Products**: `http://localhost:3000/product.html`
- **Contact**: `http://localhost:3000/contact.html`
- **Admin Dashboard**: `http://localhost:3000/dashboard.html`

---

## 🔧 Without Email Setup

If you skip email configuration, the system will still work but:
- Premium request emails won't be sent
- Feedback replies won't be sent
- Console will show email errors (safe to ignore for testing)

**To enable emails later:**
1. Go to Google Account → Security → 2-Step Verification
2. Generate App Password for "Mail"
3. Update .env with EMAIL_USER and EMAIL_PASSWORD
4. Restart server

---

## ✅ Verification Checklist

- [ ] MongoDB is running
- [ ] .env file created with correct values
- [ ] Server starts without errors
- [ ] Can access dashboard.html
- [ ] Can login as admin
- [ ] Can create user account
- [ ] Can create repository
- [ ] Can submit premium request
- [ ] Can view activity logs

---

## 🚨 Quick Fixes

**Error: Cannot connect to MongoDB**
```bash
# Start MongoDB service
mongod
# OR use MongoDB Atlas connection string
```

**Error: JWT_SECRET not defined**
```bash
# Add to .env:
JWT_SECRET=any_random_string_here_123
```

**Error: EADDRINUSE (Port already in use)**
```bash
# Kill process on port 3000
# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Or change PORT in .env:
PORT=3001
```

**Admin Login Not Working**
- Check ADMIN_MAIL and ADMIN_PASSWORD in .env match login credentials
- Clear browser cache/storage
- Try incognito mode

---

## 📱 Mobile Testing

All pages are responsive. Test on:
- Chrome DevTools (F12) → Device Toolbar
- Actual mobile device (use local network IP)

---

## 🎓 Next Steps

After basic testing:
1. Explore all admin features
2. Test activity logs
3. Configure email notifications
4. Customize styling
5. Add your own repositories/products
6. Deploy to production (Heroku, Vercel, etc.)

---

## 💡 Pro Tips

- Keep admin dashboard open in one tab, user pages in another
- Use incognito for testing different user roles
- Check browser console for detailed error messages
- Activity logs show everything - use them for debugging

---

**Need Help?** Check README.md for detailed documentation!

**Status**: ✅ Ready to Use
**Setup Time**: ~5 minutes
**Complexity**: Beginner Friendly
