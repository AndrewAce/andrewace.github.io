document.getElementById('bookingForm').addEventListener('submit', function(event) {
  event.preventDefault();

  // Get form inputs
  const customerName = document.getElementById('customerName').value;
  const serviceType = document.getElementById('serviceType').value;
  const bookingDate = document.getElementById('bookingDate').value;
  const startTime = document.getElementById('startTime').value;
  const endTime = document.getElementById('endTime').value;

  // Perform booking logic and validations
  const existingBookings = JSON.parse(sessionStorage.getItem('bookings')) || [];

  // Check if booking overlaps with existing bookings
  const isOverlapping = existingBookings.some(function(booking) {
    return (
      booking.bookingDate === bookingDate &&
      (
        (startTime >= booking.startTime && startTime < booking.endTime) ||
        (endTime > booking.startTime && endTime <= booking.endTime) ||
        (startTime <= booking.startTime && endTime >= booking.endTime)
      )
    );
  });

  if (isOverlapping) {
    alert('Booking time is already taken. Please choose a different time.');
    return;
  }

  // Create a new booking object
  const newBooking = {
    customerName: customerName,
    serviceType: serviceType,
    bookingDate: bookingDate,
    startTime: startTime,
    endTime: endTime
  };

  // Add the new booking to the existing bookings array
  existingBookings.push(newBooking);

  // Save the updated bookings array to session storage
  sessionStorage.setItem('bookings', JSON.stringify(existingBookings));

  // Show confirmation message with booking details
  const confirmationMessage = `Booking made for ${serviceType} from ${startTime} to ${endTime} on ${bookingDate}`;
  alert(confirmationMessage);

  // Redirect to confirmation page
  sessionStorage.setItem('confirmationDetails', confirmationMessage);
  window.location.href = 'confirmation.html';
});
