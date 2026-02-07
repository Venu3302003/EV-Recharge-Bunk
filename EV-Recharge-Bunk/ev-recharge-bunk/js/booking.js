document.getElementById("bookingForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const user = firebase.auth().currentUser;
    const station = document.getElementById("station").value;
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;
    const payment = document.getElementById("payment").value;

    if (!station || !date || !time || !payment) {
        alert("Please fill all fields");
        return;
    }
    

    // 🔍 CHECK SLOT AVAILABILITY
    db.collection("bookings")
    .where("station", "==", station)
    .where("date", "==", date)
    .where("time", "==", time)
    .where("status", "==", "Booked")
    .get()
    .then(snapshot => {

        if (!snapshot.empty) {
            alert("Slot already booked! Choose another time.");
            return;
        }

        // ✅ SAVE BOOKING
        db.collection("bookings").add({
            userId: user.uid,
            email: user.email,
            station,
            date,
            time,
            payment,
            status: "Booked",
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        })
        .then(() => {
            // 🎉 SHOW POPUP ONLY AFTER SUCCESS
            document.getElementById("successPopup");

            // 🔄 Reset form
            document.getElementById("bookingForm").reset();
        })
        .catch(error => {
            console.error("Booking Error:", error);
            alert("Error booking slot. Try again.");
        });

    });
});
 
const timeSelect= document.getElementById("time");
const timeSlots = [
    "06:00 AM - 07:00 AM",
    "07:00 AM - 08:00 AM",
    "08:00 AM - 09:00 AM",
    "09:00 AM - 10:00 AM",
    "10:00 AM - 11:00 AM",
    "11:00 AM - 12:00 PM",
    "12:00 PM - 01:00 PM",
    "01:00 PM - 02:00 PM",
    "02:00 PM - 03:00 PM",
    "03:00 PM - 04:00 PM",
    "04:00 PM - 05:00 PM",
    "05:00 PM - 06:00 PM",
    "06:00 PM - 07:00 PM",
    "07:00 PM - 08:00 PM"
];
timeSlots.forEach(slot => {
    const option = document.createElement("option");
    option.value = slot;
    option.textContent = slot;
    timeSelect.appendChild(option);
});
const form = document.getElementById("bookingForm");
const popup = document.getElementById("successPopup");

form.addEventListener("submit", function(e) {
    e.preventDefault();  // stop page refresh

    // here you will later save to Firebase

    popup.classList.remove("hidden");  // show popup AFTER booking
});

function closePopup() {
    popup.classList.add("hidden");
}
