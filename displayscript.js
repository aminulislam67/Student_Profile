$(document).ready(function() {
    displayStudents();
  
    function displayStudents() {
      $.getJSON('studentdata.json', function(students) {
        var tableBody = $('#studentTableBody');
        tableBody.empty();
  
        for (var i = 0; i < students.length; i++) {
          var student = students[i];
          var row = $('<tr>');
          row.append('<td>' + (i + 1) + '</td>');
          row.append('<td>' + student.id + '</td>');
          row.append('<td>' + student.firstName + '</td>');
          row.append('<td>' + student.lastName + '</td>');
          row.append('<td>' + student.email + '</td>');
          row.append('<td>' + student.group + '</td>');
          row.append('<td>' + student.admissionDate + '</td>');
          row.append('<td><button class="btn btn-primary btn-sm edit" data-id="' + student.id + '">Edit</button> <button class="btn btn-danger btn-sm delete" data-id="' + student.id + '">Delete</button></td>');
  
          tableBody.append(row);
        }
  
        attachEventHandlers();
      });
    }
  
    $('#searchForm').submit(function(event) {
      event.preventDefault();
  
      var searchId = $('#searchId').val();
      var searchName = $('#searchName').val();
  
      $.getJSON('studentdata.json', function(students) {
        var filteredStudents = filterStudents(students, searchId, searchName);
        displayStudents(filteredStudents);
      });
    });
  
    function filterStudents(students, searchId, searchName) {
      return students.filter(function(student) {
        return (searchId === '' || student.id.includes(searchId)) &&
               (searchName === '' || (student.firstName + ' ' + student.lastName).toLowerCase().includes(searchName.toLowerCase()));
      });
    }
  
    function attachEventHandlers() {
      $('.edit').click(function() {
        var studentId = $(this).data('id');
  
        $.getJSON('studentdata.json', function(students) {
          var student = students.find(function(student) {
            return student.id === studentId;
          });
  
          if (student) {
            // Redirect to the edit page passing the student data
            localStorage.setItem('currentStudent', JSON.stringify(student));
            window.location.href = 'edit.html';
          }
        });
      });
  
      $('.delete').click(function() {
        var studentId = $(this).data('id');
  
        if (confirm('Are you sure you want to delete this student?')) {
          $.getJSON('studentdata.json', function(students) {
            var filteredStudents = students.filter(function(student) {
              return student.id !== studentId;
            });
  
            // Save the updated students array to the JSON file
            saveStudents(filteredStudents);
          });
        }
      });
    }
  
    function saveStudents(students) {
      var jsonData = JSON.stringify(students);
  
      // Download the updated JSON file
      var file = new Blob([jsonData], { type: 'application/json' });
      var fileURL = URL.createObjectURL(file);
      var a = document.createElement('a');
      a.href = fileURL;
      a.download = 'studentdata.json';
      a.click();
    }
  });
  