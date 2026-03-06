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
- QR codes are generated for student IDs (not session links).
- Scanning a QR code (via the "Start Scanning" button) automatically marks attendance for the scanned student ID.

## NeonDB Integration

- `backend/db.js` creates a `pg.Pool` using the `NEON_DATABASE_URL` environment variable.
- The `attendance` table stores `student_id`, `name`, `status`, and a timestamp.

## Usage

1. Open `http://localhost:3000/QR.html` after starting the server.
2. Generate QR codes for student IDs.
3. Students show their QR codes; use "Start Scanning" to scan and mark attendance automatically.
4. Alternatively, use the form for manual entry or visit `abc.html` for online marking.
5. Records are persisted in NeonDB and reloaded when the page refreshes.

---

Feel free to expand the API, add authentication, or deploy both front and backend to a hosting platform that supports Node.js and PostgreSQL.