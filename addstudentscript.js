$(document).ready(function() {
    $('#studentForm').submit(function(event) {
      event.preventDefault(); // Prevent form submission
  
      // Retrieve form values
      
      var firstName = $('#firstName').val();
      var lastName = $('#lastName').val();
      var studentId = $('#studentId').val();
      var email = $('#email').val();
      var group = $('#group').val();
      var admissionDate = $('#admissionDate').val();
  
      // Create an object for the new student
      var newStudent = {
        
        firstName: firstName,
        lastName: lastName,
        studentId: studentId,
        email: email,
        group: group,
        admissionDate: admissionDate
      };
  
      // Retrieve existing students from localStorage or initialize an empty array
      var existingStudents = localStorage.getItem('students');
      var students = existingStudents ? JSON.parse(existingStudents) : [];


  
      // Check if the username already exists
    var studentidexist = students.some(function(students) {
      return students.studentId === studentId;
    });

    if (studentidexist ) {
      alert('ID already exists. You might have made a mistake.');
    } else {
      // Add the new user to the array
      students.push(newStudent);
    
  
      // Save the updated students array to localStorage
      localStorage.setItem('students', JSON.stringify(students));
  
      // Download the JSON file with the updated student data
      var jsonData = JSON.stringify(students);
      var blob = new Blob([jsonData], { type: 'application/json' });
      var url = URL.createObjectURL(blob);
      var link = document.createElement('a');
      link.href = url;
      link.download = 'studentdata.json';
      link.click();
  
      alert('Student information added successfully!');
      // Clear the form after adding student information
      $('#studentForm')[0].reset();
    }
    });
  });
  