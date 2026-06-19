# 🏢 Employee Portal

> An internal self-service portal for employees to log attendance, track daily progress, and manage leave requests — built with React, Vite, and Tailwind CSS. No backend required.

![React](https://img.shields.io/badge/React-18.2-61DAFB?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/Vite-4.3-646CFF?style=flat-square&logo=vite)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3.3-38BDF8?style=flat-square&logo=tailwindcss)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

---

## ✨ Features

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

### 📊 Dashboard
- At-a-glance stat cards for today's status, tasks, and pending leaves
- Recent progress and leave request previews
- Live clock in the header

---

## 🗂️ Project Structure

```
employee-portal/
├── public/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Sidebar.jsx
│   │   │   └── Header.jsx
│   │   ├── dashboard/
│   │   │   └── Dashboard.jsx
│   │   ├── attendance/
│   │   │   ├── AttendanceLogger.jsx
│   │   │   └── AttendanceHistory.jsx
│   │   ├── progress/
│   │   │   ├── ProgressForm.jsx
│   │   │   └── ProgressList.jsx
│   │   └── leaves/
│   │       ├── LeaveForm.jsx
│   │       └── LeaveHistory.jsx
│   ├── context/
│   │   └── AppContext.jsx       # Global state via React Context
│   ├── hooks/
│   │   └── useLocalStorage.js   # Persistent state hook
│   ├── utils/
│   │   └── dateUtils.js         # Date formatting and helpers
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

## 💾 Data Storage

All data is stored in the browser's **localStorage** under these keys:

| Key | Data |
|---|---|
| `ep_attendance` | Clock in/out records |
| `ep_progress` | Daily task entries |
| `ep_leaves` | Leave request history |

No database, no backend, no setup — it just works.

---

## 📦 Build for Production

```bash
npm run build
```

Output goes to the `dist/` folder. Deploy anywhere — Vercel, Netlify, GitHub Pages.

---

## 🔮 Planned Features

- [ ] Admin panel to approve / reject leave requests
- [ ] Export attendance and progress as CSV
- [ ] Weekly progress summary (Gemini AI integration)
- [ ] Authentication with Supabase
- [ ] Push notifications for leave status updates

---

## 👨‍💻 Built By

**Niranjan R** · AI HR Automation Engineer Intern @ [Hechaar](https://hechaar.com)

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=flat-square&logo=linkedin)](https://linkedin.com/in/niranjan-ratnagopi)
[![GitHub](https://img.shields.io/badge/GitHub-Follow-181717?style=flat-square&logo=github)](https://github.com/NIRANJAN-R062007)
