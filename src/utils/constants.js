export const USERS = [
  {
    id: 1,
    name: 'Niranjan R',
    email: 'niranjan@hechaar.com',
    password: 'ninja123',
    role: 'employee',
    dept: 'AI & Engineering',
    phone: '+91 98765 43210',
    joined: '2025-01-15',
  },
  {
    id: 2,
    name: 'Priya S',
    email: 'priya@hechaar.com',
    password: 'priya123',
    role: 'employee',
    dept: 'Product Design',
    phone: '+91 98765 43211',
    joined: '2025-03-01',
  },
  {
    id: 3,
    name: 'HR Admin',
    email: 'admin@hechaar.com',
    password: 'admin123',
    role: 'admin',
    dept: 'Human Resources',
    phone: '+91 98765 43200',
    joined: '2024-01-01',
  },
];

export const STATUS_COLOR = {
  Present: '#166534', Late: '#92400e', Absent: '#991b1b',
  Completed: '#166534', 'In Progress': '#92400e',
  Pending: '#92400e', Approved: '#166534', Rejected: '#991b1b',
  Cancelled: '#475569', employee: '#1e40af', admin: '#5b21b6',
};

export const STATUS_BG = {
  Present: '#dcfce7', Late: '#fef3c7', Absent: '#fee2e2',
  Completed: '#dcfce7', 'In Progress': '#fef3c7',
  Pending: '#fef3c7', Approved: '#dcfce7', Rejected: '#fee2e2',
  Cancelled: '#f1f5f9', employee: '#eff6ff', admin: '#f5f3ff',
};
