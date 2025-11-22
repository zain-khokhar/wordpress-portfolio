# 🏗️ System Architecture Overview

## 📊 Complete System Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER INTERFACE                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Guest Access              Registered Users          Admin      │
│  ┌──────────┐            ┌──────────────┐        ┌──────────┐ │
│  │ View     │            │ Profile      │        │Dashboard │ │
│  │ Browse   │            │ Download     │        │Manage    │ │
│  │ Search   │            │ Request      │        │Approve   │ │
│  └──────────┘            │ Feedback     │        │Monitor   │ │
│                          └──────────────┘        └──────────┘ │
└─────────────────────────────────────────────────────────────────┘
                                   │
                                   ▼
┌─────────────────────────────────────────────────────────────────┐
│                      EXPRESS.JS SERVER                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Authentication Middleware    │    Admin Middleware             │
│  ─────────────────────────   │    ──────────────────          │
│  JWT Verification            │    Role Verification            │
│  User Blocking Check         │    Permission Check             │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                         API ROUTES                              │
│                                                                 │
│  /api/auth          │  /api/repo              │  /api/feedback │
│  /api/products      │  /api/premium-requests  │  /api/logs     │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
                                   │
                                   ▼
┌─────────────────────────────────────────────────────────────────┐
│                        CONTROLLERS                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  authController            repositoryController                │
│  ────────────              ─────────────────                  │
│  • login                   • create                            │
│  • getProfile              • update                            │
│  • blockUser               • delete                            │
│                                                                 │
│  premiumRequestController  feedbackController                  │
│  ───────────────────────   ────────────────                   │
│  • submitRequest           • submitFeedback                    │
│  • approveRequest          • replyToFeedback                   │
│  • rejectRequest           • updateStatus                      │
│                                                                 │
│  activityLogController                                         │
│  ────────────────────                                          │
│  • getAllLogs                                                  │
│  • getStats                                                    │
│  • filterLogs                                                  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
                                   │
                    ┌──────────────┴──────────────┐
                    ▼                             ▼
┌────────────────────────────────┐  ┌────────────────────────────┐
│      MONGODB DATABASE          │  │    EMAIL SERVICE           │
├────────────────────────────────┤  ├────────────────────────────┤
│                                │  │                            │
│  Collections:                  │  │  Nodemailer + Gmail        │
│  ───────────                   │  │  ──────────────────        │
│  • users                       │  │                            │
│  • repositories                │  │  Templates:                │
│  • products                    │  │  • Request submitted       │
│  • feedback                    │  │  • Request confirmed       │
│  • premiumRequests   ⭐NEW     │  │  • Access approved         │
│  • activityLogs      ⭐NEW     │  │  • Access rejected         │
│  • comments                    │  │  • Feedback reply          │
│  • contacts                    │  │                            │
│  • publications                │  │  HTML Formatted            │
│  • solutions                   │  │  Responsive Design         │
│                                │  │                            │
└────────────────────────────────┘  └────────────────────────────┘
```

---

## 🔄 Premium Access Workflow

```
┌──────────────────────────────────────────────────────────────────┐
│                  PREMIUM ACCESS REQUEST FLOW                     │
└──────────────────────────────────────────────────────────────────┘

1. USER REQUESTS
   ┌─────────────┐
   │ User clicks │
   │ "Request    │──────► Check Authentication
   │  Premium"   │
   └─────────────┘
                           │
                           ▼
                  ┌────────────────┐
                  │ Create Request │
                  │ in Database    │
                  └────────────────┘
                           │
                ┌──────────┴──────────┐
                ▼                     ▼
         ┌──────────┐          ┌──────────┐
         │Email to  │          │Email to  │
         │Admin     │          │User      │
         └──────────┘          └──────────┘


2. ADMIN REVIEWS
   ┌─────────────────┐
   │ Admin logs into │
   │ Dashboard       │
   └─────────────────┘
            │
            ▼
   ┌─────────────────┐
   │ Views Pending   │
   │ Requests        │
   └─────────────────┘
            │
       ┌────┴────┐
       ▼         ▼
   ┌──────┐  ┌──────┐
   │APPROVE│  │REJECT│
   └───┬──┘  └───┬──┘
       │         │
       ▼         ▼


3. USER RECEIVES RESULT
   
   IF APPROVED:                    IF REJECTED:
   ┌──────────────────┐           ┌──────────────────┐
   │• Access granted  │           │• Request denied  │
   │• Email with link │           │• Email with      │
   │• Shows in profile│           │  reason          │
   │• Download enabled│           │• Can re-request  │
   └──────────────────┘           └──────────────────┘
```

---

## 📧 Email Notification Flow

```
┌─────────────────────────────────────────────────────┐
│              EMAIL NOTIFICATION SYSTEM              │
└─────────────────────────────────────────────────────┘

Trigger Events:
─────────────────

1. Premium Request Submitted
   └─► Send to: Admin + User
       ├─► Admin: "New request from user@email.com"
       └─► User: "Request received, under review"

2. Premium Request Approved
   └─► Send to: User
       └─► "Access granted! Download now"
           └─► Includes: Repository link, title, details

3. Premium Request Rejected
   └─► Send to: User
       └─► "Request reviewed, see admin message"
           └─► Includes: Reason, can request again

4. Feedback Submitted
   └─► Stored in database
       └─► Admin sees in dashboard

5. Feedback Reply
   └─► Send to: User
       └─► "Admin response to your inquiry"
           └─► Includes: Full conversation thread


Email Service Configuration:
────────────────────────────
Gmail SMTP
├─► Service: gmail
├─► Port: 587 (TLS)
├─► Auth: App Password
└─► Templates: HTML with inline CSS
```

---

## 🛡️ Security Layers

```
┌──────────────────────────────────────────────────────┐
│                 SECURITY ARCHITECTURE                │
└──────────────────────────────────────────────────────┘

Layer 1: Authentication
─────────────────────
Request
  │
  ▼
[JWT Token Check]
  │
  ├─► Valid? ──────► Continue
  │
  └─► Invalid? ────► 401 Unauthorized


Layer 2: Authorization
──────────────────────
Valid Token
  │
  ▼
[Role Verification]
  │
  ├─► Admin Route? ──► Check Role
  │                     │
  │                     ├─► Admin? ──► Allow
  │                     └─► User? ───► 403 Forbidden
  │
  └─► User Route? ───► Allow


Layer 3: User Status
────────────────────
Authorized User
  │
  ▼
[Block Check]
  │
  ├─► Blocked? ────► 403 Account Blocked
  │
  └─► Active? ─────► Process Request


Layer 4: Input Validation
─────────────────────────
All Input
  │
  ▼
[Mongoose Schema]
  │
  ├─► Valid? ──────► Save to DB
  │
  └─► Invalid? ───► 400 Bad Request


Layer 5: Activity Logging
─────────────────────────
Every Action
  │
  ▼
[Activity Log]
  │
  └─► Record:
      ├─► User
      ├─► Action
      ├─► Timestamp
      ├─► Details
      └─► IP Address
```

---

## 📊 Database Schema Relationships

```
┌─────────────────────────────────────────────────────┐
│              DATABASE RELATIONSHIPS                 │
└─────────────────────────────────────────────────────┘

User
├─► premiumAccess[] ──────┐
│   └─► repositoryId       │
│                          │
├─► PremiumRequest[]       │
│   ├─► repositoryId ──────┤
│   └─► status             │
│                          │
└─► ActivityLog[]          │
    ├─► action             │
    └─► targetId           │
                           │
                           │
Repository ◄───────────────┘
├─► title
├─► isPremium
├─► githubLink
├─► license
└─► version


Feedback
├─► userEmail
├─► status (pending/in-progress/resolved)
├─► adminReply
├─► repliedBy ───► User (Admin)
└─► repliedAt


ActivityLog
├─► userId ────► User
├─► action
├─► targetType
├─► targetId
├─► details
└─► createdAt


PremiumRequest
├─► userId ────────► User
├─► repositoryId ──► Repository
├─► status (pending/approved/rejected)
├─► adminResponse
└─► respondedAt
```

---

## 🎯 API Request Flow

```
┌──────────────────────────────────────────────────┐
│           TYPICAL API REQUEST FLOW               │
└──────────────────────────────────────────────────┘

Example: Approve Premium Request

1. Admin Dashboard
   └─► Click "Approve" button
       └─► JavaScript: fetch()

2. HTTP Request
   PUT /api/premium-requests/admin/approve/:id
   Headers: {
     Authorization: Bearer <token>
     Content-Type: application/json
   }
   Body: {
     adminResponse: "Access granted for your project"
   }

3. Express Middleware Chain
   │
   ├─► authenticateToken
   │   └─► Verify JWT
   │       └─► Attach user to req.user
   │
   ├─► isAdmin
   │   └─► Check req.user.role === 'admin'
   │       └─► Continue or 403
   │
   └─► premiumRequestController.approvePremiumRequest

4. Controller Logic
   │
   ├─► Find request by ID
   ├─► Update status to 'approved'
   ├─► Grant user access
   │   └─► Update User.premiumAccess[]
   ├─► Log activity
   │   └─► Create ActivityLog entry
   ├─► Send email
   │   └─► emailService.sendApprovalEmail()
   └─► Return response

5. Response to Client
   {
     message: "Access granted",
     request: {...}
   }

6. Frontend Updates
   │
   ├─► Show success message
   ├─► Refresh requests list
   └─► Update statistics
```

---

## 🎨 Frontend Architecture

```
┌────────────────────────────────────────────────┐
│          FRONTEND PAGE STRUCTURE               │
└────────────────────────────────────────────────┘

Pages:
──────

signup.html
├─► User registration form
├─► Login form
├─► JWT token storage
└─► Redirect to dashboard/profile

profile.html ⭐NEW
├─► Tabs:
│   ├─► Account Info
│   ├─► Premium Access
│   ├─► Request History
│   └─► Settings
├─► API: GET /api/auth/profile
└─► Display user data

repo.html
├─► Repository grid
├─► Free repo: GitHub link
├─► Premium repo: Request button
│   └─► onClick: requestPremiumAccess()
│       └─► POST /api/premium-requests/submit
└─► Search & filter

dashboard.html
├─► Navigation sidebar
│   ├─► Dashboard
│   ├─► Products
│   ├─► Users
│   ├─► Repositories
│   ├─► Premium Requests ⭐NEW
│   ├─► Feedback
│   └─► Activity Logs ⭐NEW
│
├─► Main content area
│   └─► Dynamic sections
│
└─► Modals
    ├─► Edit Repository
    ├─► Reply to Feedback ⭐NEW
    └─► Approve/Reject Request ⭐NEW

contact.html
├─► Feedback form
├─► Submit: POST /api/feedback
└─► Email confirmation

product.html
├─► Product showcase
├─► Search & filter
└─► Pagination
```

---

## 🔄 State Management

```
┌────────────────────────────────────────────┐
│         APPLICATION STATE FLOW             │
└────────────────────────────────────────────┘

Authentication State:
────────────────────
localStorage/sessionStorage
└─► user_token (JWT)
    └─► Used in all API calls
        └─► Header: Authorization: Bearer <token>

Session State:
─────────────
Frontend Variables
├─► products[]
├─► repos[]
├─► users[]
├─► premiumRequests[] ⭐NEW
├─► activityLogs[] ⭐NEW
└─► currentPage

Database State (Source of Truth):
─────────────────────────────────
MongoDB Collections
└─► All persistent data
    └─► Queried via API
        └─► Displayed in UI

Real-time Updates:
──────────────────
After actions:
├─► Create/Update/Delete
│   └─► Call fetch functions
│       └─► Re-render UI
│           └─► Update statistics
│
└─► Activity logged
    └─► Visible in logs
```

---

## 📈 Scaling Considerations

```
Current Architecture:
────────────────────
Single Server
├─► Express.js
├─► MongoDB
└─► Nodemailer

Can Scale To:
────────────
Load Balancer
├─► Server 1
├─► Server 2
└─► Server N

Database Cluster
├─► Primary
└─► Replicas

Message Queue
└─► Email jobs

CDN
└─► Static files

Cache Layer
└─► Redis
```

---

This architecture provides:
✅ Separation of concerns
✅ Scalability
✅ Security
✅ Maintainability
✅ Testability
✅ Monitoring capabilities

**Status: Production Ready**
