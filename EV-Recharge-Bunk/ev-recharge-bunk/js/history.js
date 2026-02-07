

firebase.auth().onAuthStateChanged(user => {
    if (!user) {
        window.location.href = "index.html";
        return;
    }
    loadBookings(user.email);
});

function loadBookings(email) {
    const container = document.getElementById("bookingHistory");
    container.innerHTML = "Loading...";

    db.collection("bookings")
    .where("email", "==", email)
    .orderBy("createdAt", "desc")
    .onSnapshot(snapshot => {

        container.innerHTML = "";

        snapshot.forEach(doc => {
            const data = doc.data();

            const card = document.createElement("div");
            card.className = "booking-card";

            card.innerHTML = `
                <h3>${data.station}</h3>
                <p>Date: ${data.date}</p>
                <p>Time: ${data.time}</p>
                <p>Payment: ${data.payment}</p>
                <p>Status: <span class="status-text ${data.status === 'Booked' ? 'status-booked' : 'status-cancelled'}">${data.status}</span></p>
                ${data.status === "Booked" ? `<button onclick="cancelBooking('${doc.id}')">Cancel Booking</button>` : ""}
            `;

            container.appendChild(card);
        });

    });
}

function cancelBooking(id) {
    if (!confirm("Cancel this booking?")) return;

    db.collection("bookings").doc(id).update({
        status: "Cancelled"
    })
    .then(() => {
        console.log("Booking cancelled");
    });
}
