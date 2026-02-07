firebase.auth().onAuthStateChanged(user => {
  if (!user) {
    // Already logging out ayithe admin page nundi redirect avvakunda
    if (!window.location.pathname.includes("login.html")) {
      window.location.href = "login.html";
    }
  }



  db.collection("admins").doc(user.uid).get().then(doc => {
    if (!doc.exists) {
      alert("Access Denied. Not an admin.");
      window.location.href = "index.html";
    }
  });
});

// DASHBOARD COUNTS
function loadDashboardCounts() {
  db.collection("bookings").get().then(snapshot => {
    let total = snapshot.size;
    let approved = 0;
    let cancelled = 0;

    snapshot.forEach(doc => {
      const data = doc.data();
      if (data.status === "approved") approved++;
      if (data.status === "cancelled") cancelled++;
    });

    document.getElementById("totalBookings").innerText = total;
    document.getElementById("approvedCount").innerText = approved;
    document.getElementById("cancelledCount").innerText = cancelled;
  });
}

// LOAD BOOKINGS
function loadAllBookings() {
  const container = document.getElementById("adminBookingsContainer");
  container.innerHTML = "Loading bookings...";

  db.collection("bookings").orderBy("createdAt", "desc").onSnapshot(snapshot => {
    container.innerHTML = "";

    snapshot.forEach(doc => {
      const booking = doc.data();
      const id = doc.id;

      const card = document.createElement("div");
      card.className = "booking-card";

      card.innerHTML = `
        <h3>${booking.station}</h3>
        <p><strong>User:</strong> ${booking.userEmail || "N/A"}</p>
        <p><strong>Date:</strong> ${booking.date}</p>
        <p><strong>Time:</strong> ${booking.time}</p>
        <p><strong>Payment:</strong> ${booking.payment}</p>
        <p><strong>Status:</strong> ${booking.status}</p>

        <button onclick="approveBooking('${id}')">Approve</button>
        <button onclick="cancelBooking('${id}')">Cancel</button>
        <button onclick="deleteBooking('${id}')">Delete</button>
      `;

      container.appendChild(card);
    });
  });
}

function approveBooking(id) {
  db.collection("bookings").doc(id).update({ status: "approved" }).then(loadDashboardCounts);
}

function cancelBooking(id) {
  db.collection("bookings").doc(id).update({ status: "cancelled" }).then(loadDashboardCounts);
}

function deleteBooking(id) {
  if (confirm("Delete this booking?")) {
    db.collection("bookings").doc(id).delete().then(loadDashboardCounts);
  }
}

function showDashboard() {
  document.getElementById("dashboardSection").style.display = "block";
  document.getElementById("bookingsSection").style.display = "none";
  loadDashboardCounts();
}

function showBookings() {
  document.getElementById("dashboardSection").style.display = "none";
  document.getElementById("bookingsSection").style.display = "block";
  loadAllBookings();
}

function logoutUser() {
  firebase.auth().signOut().then(() => {
    window.location.href = "login.html";
  });
}

window.onload = showDashboard;
function logoutAdmin() {
  firebase.auth().signOut().then(() => {
    window.location.href = "login.html"; // direct login page ki
  }).catch((error) => {
    console.error("Logout Error:", error);
  });
}

