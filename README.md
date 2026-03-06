# QR Attendance System

This project is a static front-end that now includes a Node/Express backend connected to NeonDB (PostgreSQL) for storing attendance records.

## Supabase Setup

This version no longer requires a backend server; all data is stored directly in Supabase.

1. **Create a Supabase project** at [app.supabase.com](https://app.supabase.com) and note the project URL and anon key.
2. **Create a table** named `attendance` with at least the following columns:
   - `id` (serial primary key)
   - `student_id` (text)
   - `name` (text)
   - `status` (text)
   - `timestamp` (timestamptz, default `now()`)
3. Copy your **project URL** and **anon key** into the placeholder values at the top of `QR.html` and `abc.html`:
   ```js
   const SUPABASE_URL = '<YOUR_SUPABASE_URL>';
   const SUPABASE_ANON_KEY = '<YOUR_SUPABASE_ANON_KEY>';
   ```

## Front-end changes

- Attendance form and scanner now communicate with Supabase using the JavaScript client.
- Records are fetched from Supabase on page load and displayed in the dashboard table.
- CSV download continues to work based on DOM content.
- QR generator produces codes for student IDs as before.
- Scanning a QR code automatically inserts a new row into the Supabase table.

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