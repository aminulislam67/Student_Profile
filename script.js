document.getElementById("registrationForm").addEventListener("submit", function(event) {
  event.preventDefault();


  var firstName = document.getElementById("firstName").value;
  var lastName = document.getElementById("lastName").value;
  var email = document.getElementById("email").value;
  var phone = document.getElementById("phone").value;
  var gender = document.getElementById("gender").value;
  var dob = document.getElementById("dob").value;
  var password = document.getElementById("password").value;

  // Create student object
  var student = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: phone,
      gender: gender,
      dob: dob,
      password: password
  };

  // Save student data to JSON file
  saveStudentData(student);
  alert("Registration successful!");

  // Reset form
  document.getElementById("registrationForm").reset();
});

function saveStudentData(student) {
  // Retrieve existing data or initialize an empty array if it doesn't exist
  var jsonData = localStorage.getItem("user");
  var user = jsonData ? JSON.parse(jsonData) : [];

  // Add the new student to the array
  user.push(student);

  // Save the updated array in local storage
  localStorage.setItem("user", JSON.stringify(user));

  // Save the JSON file
  downloadJSONFile(user);
}

function downloadJSONFile(user) {
  var jsonData = JSON.stringify(user);
  var file = new Blob([jsonData], {type: "application/json"});

  var a = document.createElement("a");
  var url = URL.createObjectURL(file);
  a.href = url;
  a.download = "student_data.json";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
