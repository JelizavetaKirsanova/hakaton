

---

# Lead Management CRM

This project is a **CRM system for managing leads and managers**.
It allows you to:

* Add and store leads and managers
* Assign leads to managers
* View coordinator dashboards and statistics
* Built with **Next.js 16**, **PostgreSQL**, **Prisma**, **React/TailwindCSS**

---

## 📁 Project Structure

```
project/
├─ app/                  # Frontend (Next.js pages)
│  ├─ leads/             # Leads page
│  │  └─ page.tsx
│  ├─ managers/          # Managers page
│  │  └─ page.tsx
│  ├─ coordinator/       # Coordinator dashboard
│  │  └─ page.tsx
│  ├─ components/        # React components
│  │  ├─ LeadCard.tsx
│  │  └─ ManagerCard.tsx
│  └─ layout.tsx         # Main layout of the project
├─ prisma/               # Prisma ORM
│  ├─ prisma.ts          # PrismaClient instance
│  └─ schema.prisma      # Database schema
├─ .env                  # Environment variables
├─ package.json
├─ tsconfig.json
└─ tailwind.config.js
```

---

## ⚙️ Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd project
```

2. Install dependencies:

```bash
npm install
```

3. Set up PostgreSQL:

Create a database and configure `.env`:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/dbname?schema=public"
```

4. Apply Prisma migrations:

```bash
npx prisma db push
```

5. Start the development server:

```bash
npm run dev
```

* The server will be available at `http://localhost:3000`

---

## 🗂 Database Models

### **Manager**

| Field          | Type     | Description              |
| -------------- | -------- | ------------------------ |
| id             | String   | UUID, PK                 |
| name           | String   | Manager's name           |
| email          | String?  | Email (optional)         |
| phone          | String?  | Phone number (optional)  |
| region         | String?  | Working region           |
| specialization | String?  | Specialization           |
| currentLoad    | Int      | Number of assigned leads |
| active         | Boolean  | Is the manager active    |
| createdAt      | DateTime | Creation timestamp       |
| updatedAt      | DateTime | Last update timestamp    |

---

### **Lead**

| Field     | Type     | Description                           |
| --------- | -------- | ------------------------------------- |
| id        | String   | UUID, PK                              |
| name      | String   | Lead's name                           |
| email     | String?  | Lead's email                          |
| phone     | String   | Lead's phone                          |
| region    | String?  | Lead's region                         |
| product   | String?  | Product / service                     |
| status    | Enum     | NEW, ASSIGNED, IN_PROGRESS, COMPLETED |
| managerId | String?  | Foreign key to manager                |
| manager   | Manager? | Relation to manager                   |
| createdAt | DateTime | Creation timestamp                    |
| updatedAt | DateTime | Last update timestamp                 |

---

## 🖥 Pages

### `/leads` – Leads

* View a list of leads
* Add a new lead
* Lead statuses: NEW → ASSIGNED → IN_PROGRESS → COMPLETED

### `/managers` – Managers

* View a list of managers
* Add a new manager
* Shows current workload (`currentLoad`)

### `/coordinator` – Coordinator Dashboard

* Statistics for leads and managers
* Number of new leads, average manager load

---

## 🛠 Technologies Used

* **Frontend:** Next.js, React, TailwindCSS
* **Backend:** Next.js API Routes, Node.js
* **Database:** PostgreSQL + Prisma
* **Notifications:** Optional (SendGrid, Nodemailer, Telegram API)
* **Extras:** Cron jobs or queues for periodic lead checks

---

## 🧩 How to Use

1. **Add a manager:**

```bash
POST /api/managers
body: { name: "John Doe", email: "john@example.com" }
```

2. **Add a lead:**

```bash
POST /api/leads
body: { name: "Jane Smith", phone: "+123456789", email: "jane@example.com" }
```

3. **Fetch data:**

```bash
GET /api/leads       # All leads
GET /api/managers    # All managers
```

---

## 🚀 Next Steps

* Automatic lead assignment to managers by region and specialization
* Notifications for managers on new leads
* Filtering leads by status and manager
* Lead status change history

---

If you want, I can also create **ready-to-use API and pages with automatic lead assignment**, so the system works immediately.

Do you want me to do that?
