# QR Attendance System

This project is a static front-end that now includes a Node/Express backend connected to NeonDB (PostgreSQL) for storing attendance records.

## Backend Setup

1. **Install dependencies**
   ```bash
   cd backend
   npm install
   ```

2. **Configure environment**
   - Copy `.env.example` to `.env`
   - Fill in your Neon connection URL (`NEON_DATABASE_URL`).

3. **Start the server**
   ```bash
   npm run start   # or npm run dev if you install nodemon globally
   ```
   The server listens on port `3000` by default and serves the static HTML/JS from the project root.

4. **Table creation**
   - On startup the server will create the `attendance` table if it does not exist. No manual migration needed.

## Front-end changes

- The attendance form now sends a `POST` request to `/attendance` instead of manipulating local state.
- Existing attendance entries are fetched (`GET /attendance`) on page load and displayed in the dashboard table.
- CSV download still works from DOM data.

## NeonDB Integration

- `backend/db.js` creates a `pg.Pool` using the `NEON_DATABASE_URL` environment variable.
- The `attendance` table stores `student_id`, `name`, `status`, and a timestamp.

## Usage

1. Open `http://localhost:3000/QR.html` after starting the server.
2. Mark attendance using the form or by scanning QR codes.
3. Records are persisted in NeonDB and reloaded when the page refreshes.

---

Feel free to expand the API, add authentication, or deploy both front and backend to a hosting platform that supports Node.js and PostgreSQL.