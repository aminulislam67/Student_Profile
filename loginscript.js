$(document).ready(function() {
    $('#loginForm').submit(function(event) {
      event.preventDefault(); // Prevent form submission
  
      // Retrieve form values
      var username = $('#username').val();
      var password = $('#password').val();
  
      // Retrieve registration data from JSON file
      $.getJSON('registrationData.json', function(data) {
        // Check if the username and password match
        var success = false;
        for (var i = 0; i < data.length; i++) {
          if (data[i].username === username && data[i].password === password) {
            success = true;
            break;
          }
        }
  
        if (success) {
          alert('Login successful!');
          // Redirect to the desired page after successful login
          window.location.href = 'dashboard.html';
        } else {
          alert('Invalid username or password. Please try again.');
        }
  
        // Clear the form fields
        $('#loginForm')[0].reset();
      });
    });
  });
  