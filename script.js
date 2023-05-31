$(document).ready(function() {
  $('#registrationForm').submit(function(event) {
    event.preventDefault(); // Prevent form submission

    // Retrieve form values
    var username = $('#username').val();
    var password = $('#password').val();
    var firstName = $('#firstName').val();
    var lastName = $('#lastName').val();
    var email = $('#email').val();
    var phone = $('#phone').val();
    var gender = $('#gender').val();
    var dob = $('#dob').val();

    // Create an object for the new user
    var newUser = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: phone,
      gender: gender,
      dob: dob,
      username: username,
      password: password,
    };

    // Retrieve existing users from localStorage or initialize an empty array
    var existingUsers = localStorage.getItem('users');
    var users = existingUsers ? JSON.parse(existingUsers) : [];

    // Check if the username already exists
    var usernameExists = users.some(function(user) {
      return user.username === username;
    });

    if (usernameExists) {
      alert('Username already exists. Please choose a different username.');
    } else {
      // Add the new user to the array
      users.push(newUser);

      // Save the updated users array to localStorage
      localStorage.setItem('users', JSON.stringify(users));

      // Download the JSON file with the updated users data
      var jsonData = JSON.stringify(users);
      var blob = new Blob([jsonData], { type: 'application/json' });
      var url = URL.createObjectURL(blob);
      var link = document.createElement('a');
      link.href = url;
      link.download = 'registrationdata.json';
      link.click();

      alert('Registration successful!');
      // Clear the form after successful registration
      $('#registrationForm')[0].reset();
    }
  });
});
