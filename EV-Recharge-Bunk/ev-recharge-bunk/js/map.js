document.addEventListener("DOMContentLoaded", () => {
    const map = L.map('map').setView([17.385044, 78.486671], 11);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

    const stations = [
        ["Banjara Hills",17.4126,78.4482],
        ["Jubilee Hills",17.4239,78.4738],
        ["Madhapur",17.4483,78.3915],
        ["Gachibowli",17.4401,78.3489],
        ["Begumpet",17.4435,78.4626],
        ["Secunderabad",17.4399,78.4983],
        ["Kukatpally",17.4948,78.3996],
        ["LB Nagar",17.3457,78.5522],
        ["Dilsukhnagar",17.3688,78.5247],
        ["Uppal",17.4050,78.5591],
        ["Shamshabad",17.2403,78.4294],
        ["Mehdipatnam",17.3960,78.4392],
        ["Ameerpet",17.4375,78.4482],
        ["Nampally",17.3924,78.4672],
        ["Hitech City",17.4474,78.3762]
    ];

    stations.forEach(s => {
        L.marker([s[1],s[2]]).addTo(map)
          .bindPopup(`<b>${s[0]}</b><br><a href="booking.html?station=${s[0]}">Book Slot</a>`);
    });
});
