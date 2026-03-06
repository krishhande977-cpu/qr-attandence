let records = [];

function toggleMenu() {
  document.getElementById("navLinks").classList.toggle("show");
}

document.getElementById("attendanceForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const studentId = document.getElementById("studentId").value.trim();
  const Name = document.getElementById("Name").value.trim();
  const status = document.getElementById("status").value;
  const time = new Date().toLocaleString();

  if (studentId === "") return;

  // Add record
  records.push({ studentId, status, time });

  // Update table
  const table = document.getElementById("attendanceTable");
  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${studentId}</td>
    <td>${document.getElementById("Name").value.trim()}</td>
    <td>${status}</td>
    <td>${time}</td>
  `;
  table.appendChild(row);

  // Update dashboard
  updateDashboard();

  // Show success message
  const msg = document.getElementById("successMsg");
  msg.style.display = "block";
  setTimeout(() => (msg.style.display = "none"), 1500);

  // Reset form
  document.getElementById("attendanceForm").reset();
});

function updateDashboard() {
  const total = new Set(records.map(r => r.studentId)).size;
  const present = records.filter(r => r.status === "Present").length;
  const absent = records.filter(r => r.status === "Absent").length;

  document.getElementById("totalStudents").innerText = total;
  document.getElementById("presentToday").innerText = present;
  document.getElementById("absentToday").innerText = absent;
}
// QR GENERATOR
function generateQR() {
  const text = document.getElementById("sessionInput").value.trim();
  const qrDiv = document.getElementById("qrcode");
  qrDiv.innerHTML = "";

  if (text === "") {
    alert("Enter Session or Class ID");
    return;
  }

  new QRCode(qrDiv, {
    text: text,
    width: 200,
    height: 200
  });
}

// QR SCANNER
const html5QrCode = new Html5Qrcode("reader");

Html5Qrcode.getCameras().then(devices => {
  if (devices && devices.length) {
    html5QrCode.start(
      devices[0].id,
      { fps: 10, qrbox: 250 },
      qrCodeMessage => {
        document.getElementById("scanResult").innerText =
          "✅ Attendance Marked for: " + qrCodeMessage;

        html5QrCode.stop();
      }
    );
  }
}).catch(err => {
  console.error(err);
});
/* ===============================
   SCROLL ANIMATION
================================*/
const sections = document.querySelectorAll(".section");

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  { threshold: 0.15 }
);

sections.forEach(section => observer.observe(section));

/* ===============================
   SUCCESS MESSAGE ANIMATION
================================*/
const form = document.getElementById("attendanceForm");
const successMsg = document.getElementById("successMsg");

form.addEventListener("submit", e => {
  e.preventDefault();

  successMsg.style.display = "block";
  successMsg.style.animation = "fadeIn 0.5s ease";

  setTimeout(() => {
    successMsg.style.display = "none";
  }, 2500);

  form.reset();

});
/* ===============================
   HERO CARD MOUSE TILT
================================*/
const heroCard = document.querySelector(".hero-card");

if (heroCard) {
  heroCard.addEventListener("mousemove", e => {
    const rect = heroCard.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = -(y - centerY) / 15;
    const rotateY = (x - centerX) / 15;

    heroCard.style.transform =
      `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  heroCard.addEventListener("mouseleave", () => {
    heroCard.style.transform = "rotateX(0) rotateY(0)";
  });
}