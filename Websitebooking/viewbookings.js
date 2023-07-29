window.addEventListener("DOMContentLoaded", () => {
  const bookingsList = document.getElementById("bookingsList");

  // Retrieve bookings from local storage
  const storedBookings = JSON.parse(localStorage.getItem("bookings"));

  for (let date in storedBookings) {
    const bookingsForDate = storedBookings[date];
    for (let i = 0; i < bookingsForDate.length; i++) {
      const booking = bookingsForDate[i];
      const listItem = document.createElement("li");
      listItem.textContent = `${date}: ${booking.startTime} - ${booking.endTime}`;
      bookingsList.appendChild(listItem);
    }
  }
});

