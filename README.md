# 🏢 Employee Portal

> An internal self-service portal for employees to log attendance, track daily progress, and manage leave requests — with role-based login and an admin panel for HR. Built with React, Vite, and Tailwind CSS. No backend required.

![React](https://img.shields.io/badge/React-18.2-61DAFB?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/Vite-4.3-646CFF?style=flat-square&logo=vite)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3.3-38BDF8?style=flat-square&logo=tailwindcss)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

---

## ✨ Features

### 🔐 Login
- Role-based authentication (Employee / Admin)
- One-click demo account quick-fill for testing
- Clean split-screen login UI with branding panel

### 👤 Profile
- View and edit personal details (name, phone, department)
- Personal stats — attendance rate, tasks completed, leaves approved, days logged
- Role and employee ID badge

### 📋 Attendance Logging
- One-click **Clock In / Clock Out**
- Auto-detects **Late** status if clocked in after 9:30 AM
- Filterable history table with **duration calculation**

### ✅ Daily Progress Logging
- Log tasks with title, description, and status
- **Inline edit and delete** support
- Entries grouped by date for easy tracking

### 🏖️ Leave Requests
- Apply for **Sick, Casual, or Earned** leave
- Auto-calculates **duration in days**
- Status tracking — Pending, Approved, Rejected, Cancelled
- Cancel pending requests anytime

### 🛡️ Admin Panel *(Admin role only)*
- **Leave approvals** — approve or reject pending requests with toast feedback
- **All attendance** — view every employee's attendance records in one table
- **All progress** — view every employee's logged tasks
- Live stats — total employees, pending leaves, present today, late today

### 📊 Dashboard
- Personalized greeting based on time of day
- At-a-glance stat cards for today's status, tasks, and pending leaves
- Recent progress and leave request previews
- Live clock in the header

---

## 🗂️ Project Structure

```
employee-portal/
├── public/
├── src/
│   ├── pages/
│   │   └── LoginPage.jsx
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Badge.jsx
│   │   │   ├── Avatar.jsx
│   │   │   ├── Card.jsx
│   │   │   ├── Btn.jsx
│   │   │   ├── Toast.jsx
│   │   │   ├── EmptyState.jsx
│   │   │   └── FilterPills.jsx
│   │   ├── layout/
│   │   │   ├── Sidebar.jsx
│   │   │   └── Header.jsx
│   │   ├── dashboard/
│   │   │   └── Dashboard.jsx
│   │   ├── attendance/
│   │   │   └── AttendancePage.jsx
│   │   ├── progress/
│   │   │   └── ProgressPage.jsx
│   │   ├── leaves/
│   │   │   └── LeavePage.jsx
│   │   ├── profile/
│   │   │   └── ProfilePage.jsx
│   │   └── admin/
│   │       └── AdminPanel.jsx
│   ├── context/
│   │   └── AppContext.jsx       # Global state — auth, attendance, progress, leaves, admin actions
│   ├── hooks/
│   │   └── useLocalStorage.js   # Persistent state hook
│   ├── utils/
│   │   ├── dateUtils.js         # Date formatting and helpers
│   │   └── constants.js         # Demo users, status color maps
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── vite.config.js
├── tailwind.config.js
└── package.json
```

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React 18 | UI framework |
| Vite 4 | Build tool and dev server |
| Tailwind CSS 3 | Styling |
| Tabler Icons | Icon set |
| React Context API | Global state management |
| localStorage | Client-side data persistence |

---

## 🚀 Getting Started

### Prerequisites
- Node.js ≥ 16
- npm or yarn

### Installation

```bash
# Clone the repo
git clone https://github.com/NIRANJAN-R062007/Employee-portal.git

# Navigate to the project
cd Employee-portal

# Install dependencies
npm install

# Start the dev server
npm run dev
```

App runs at `http://localhost:5173`

---

## 🔑 Demo Accounts

| Role | Email | Password |
|---|---|---|
| Employee | `niranjan@demo.com` | `ninja123` |
| Employee | `priya@demo.com` | `priya123` |
| Admin | `admin@demo.com` | `admin123` |

Click any demo account card on the login screen to auto-fill credentials.

---

## 💾 Data Storage

All transactional data is stored in the browser's **localStorage** under these keys:

| Key | Data |
|---|---|
| `ep_attendance` | Clock in/out records (all employees) |
| `ep_progress` | Daily task entries (all employees) |
| `ep_leaves` | Leave request history (all employees) |

User accounts are currently defined in `src/utils/constants.js` for demo purposes — no database required.

---

## 📦 Build for Production

```bash
npm run build
```

Output goes to the `dist/` folder. Deploy anywhere — Vercel, Netlify, GitHub Pages.

---

## 🔮 Planned Features

- [ ] Authentication with Supabase (replace hardcoded demo users)
- [ ] Export attendance and progress as CSV
- [ ] Weekly progress summary (Gemini AI integration)
- [ ] Push notifications for leave status updates
- [ ] Forgot password flow

---

## 👨‍💻 Built By

**Niranjan R** · AI HR Automation Engineer Intern @ [Hechaar](https://hechaar.com)

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=flat-square&logo=linkedin)](https://linkedin.com/in/niranjan-ratnagopi)
[![GitHub](https://img.shields.io/badge/GitHub-Follow-181717?style=flat-square&logo=github)](https://github.com/NIRANJAN-R062007)
