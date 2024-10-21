// Initialize the map
const map = L.map('map').setView([51.505, -0.09], 13);

// Add OpenStreetMap tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);

// Add a marker at the initial location
const marker = L.marker([51.505, -0.09]).addTo(map)
    .bindPopup('You are here!')
    .openPopup();

// Loading Spinner Element
const loadingSpinner = document.getElementById('loading');

// Panic Button Functionality
// Panic Button Functionality
document.getElementById('panicButton').addEventListener('click', function() {
    Swal.fire({
        title: 'Are you sure?',
        text: "This will send an emergency alert to your contacts!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, send it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            // Make a POST request to send an alert using Twilio
            fetch('/api/send-alert', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: 'Emergency! Please respond immediately.',
                    phoneNumbers: ['+919381465866', '+18582812769'] // Replace with actual registered numbers
                })
            })
            .then(response => {
                if (response.ok) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Alert Sent!',
                        text: 'Your emergency contacts have been notified.'
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Failed to send alert. Please try again.'
                    });
                }
            })
            .catch(error => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong while sending the alert.'
                });
            });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire(
                'Cancelled',
                'Your emergency alert was not sent :)',
                'info'
            );
        }
    });
});


// Real-time Location Tracking Functionality
document.getElementById('locationButton').addEventListener('click', function() {
    loadingSpinner.style.display = 'block';

    navigator.geolocation.getCurrentPosition(position => {
        loadingSpinner.style.display = 'none';
        const { latitude, longitude } = position.coords;
        alert(`Your location: Latitude: ${latitude}, Longitude: ${longitude}`);
        map.setView([latitude, longitude], 13);
        marker.setLatLng([latitude, longitude])
              .bindPopup('You are here!')
              .openPopup();
    }, () => {
        loadingSpinner.style.display = 'none';
        alert('Unable to retrieve location.');
    });
});
