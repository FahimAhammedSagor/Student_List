$("document").ready(function() {
    let localStudents = localStorage.getItem("student-list");
    localStudents = localStudents !== null ? JSON.parse(localStudents) : [];

    localStudents.forEach(function(student) {
        let tr = `
            <tr>
                <th scope="row">${student.name}</th>
                <td>${student.id}</td>
                <td>${student.number}</td>
                <td>${student.semester}</td>
                <td>${student.department}</td>
                <td><button class="btn btn-primary btn-sm  edit">Edit</button><button class="btn btn-danger btn-sm delete">Delete</button></td>
            </tr>
        `;
        
        $(".student-list").append(tr);
    })
})



$(".registration-form").on("submit", function(e) {
    e.preventDefault();


    // Get input field values 
    let name = $(".name").val();
    let id = $(".id").val();
    let number = $(".number").val();
    let semester = $(".semester").val();
    let department = $(".department").val();

    // Check either submit or update 
    if($(".submit-button").text() == 'Submit') {

        // create new tr for new entry 
        let tr = `
            <tr>
                <th scope="row">${name}</th>
                <td>${id}</td>
                <td>${number}</td>
                <td>${semester}</td>
                <td>${department}</td>
                <td><button class="btn btn-primary btn-sm  edit">Edit</button><button class="btn btn-danger btn-sm delete">Delete</button></td>
            </tr>
        `;
        
        $(".student-list").append(tr);

        addStudentToLocalStorage(name, id, number, semester, department);

        iziToast.success({
            title: 'Congratulations',
            message: 'Successfully added!',
            position: 'topRight'
        });

    } else {
        
        // Loop to find the row to update 
        $(".student-list tr").each(function(index, element) {
            if($(this).children("td:nth-child(2)").text() === id) {

                $(this).children("th").text(name);
                $(this).children("td:nth-child(3)").text(number);
                $(this).children("td:nth-child(4)").text(semester);
                $(this).children("td:nth-child(5)").text(department);

                updateLocalStorage(name, id, number, semester, department);
                
                $(".id").removeAttr("disabled");
                // change text of the submit button
                $(".submit-button").text("Submit");

                iziToast.success({
                    title: 'Congratulations',
                    message: 'Successfully updated!',
                    position: 'topRight'
                });
            }
        });
    }

    // reset the form values
    $(".name").val("");
    $(".id").val("");
    $(".number").val("");
    $(".semester").val("");
    $(".department").val("");
});

// remove tr on delete
$("body").on("click", ".delete", function() {
    var id = $(this).parent().prev().prev().prev().text();
    deleteFromLocalStorage(id);

    $(this).parent().parent().remove();

    iziToast.success({
        title: 'Congratulations',
        message: 'Successfully deleted !',
        position: 'topRight'
    });
})

// on click edit apply
$("body").on("click", ".edit", function() {

    // get values of department, id and name
     var department = $(this).parent().prev().text(); 
    

    var semester = $(this).parent().prev().prev().text(); 
    

    var number = $(this).parent().prev().prev().prev().text(); 
   

    var id = $(this).parent().prev().prev().prev().prev().text(); 
    

    var name = $(this).parent().prev().prev().prev().prev().prev().text(); 
  
    // update the form with the values
    $(".name").val(name);
    $(".id").val(id);
    $(".number").val(number);
    $(".semester").val(semester);
    $(".department").val(department);

    // make id disabled
    $(".id").attr("disabled", "");
    // change the button text to update so that it looks an update form 
    $(".submit-button").text("Update")

})

function addStudentToLocalStorage(name, id, number, semester,  department) {
    let student = {
        name: name,
        id: id,
        number: number,
        semester: semester,
        department: department
    }

    let localStudents = localStorage.getItem("student-list");
    localStudents = localStudents !== null ? JSON.parse(localStudents) : [];
    localStudents.push(student);
    localStorage.setItem("student-list", JSON.stringify(localStudents));
}

function deleteFromLocalStorage(id) {
    
    let localStudents = localStorage.getItem("student-list");
    localStudents = localStudents !== null ? JSON.parse(localStudents) : [];

    let updateList = localStudents.filter(function(student) {
        return student.id != id;
    })

    localStorage.setItem("student-list", JSON.stringify(updateList));
    
}

