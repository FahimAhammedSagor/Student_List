$("document").ready(function() {
    let localStudents = localStorage.getItem("student-list");
    localStudents = localStudents !== null ? JSON.parse(localStudents) : [];

    localStudents.forEach(function(student) {
        var tr = `
            <tr>
                <th scope="row">${student.name}</th>
                <td>${student.id}</td>
                <td>${student.email}</td>
                <td>${student.department}</td>
                <td><button class="btn btn-primary btn-sm edit">Edit</button><button class="btn btn-danger btn-sm delete">Delete</button></td>
            </tr>
        `;
        
        $(".student-list").append(tr);
    })
})



$(".registration-form").on("submit", function(e) {
    e.preventDefault();


    // Get input field values 
    var name = $(".name").val();
    var id = $(".id").val();
    var id = $(".mail").val();
    var department = $(".department").val();

    // Check either submit or update 
    if($(".submit-button").text() == 'Submit') {

        // create new tr for new entry 
        var tr = `
            <tr>
                <th scope="row">${name}</th>
                <td>${id}</td>
                <td>${email}</td>
                <td>${department}</td>
                <td><button class="btn btn-primary btn-sm edit">Edit</button><button class="btn btn-danger btn-sm delete">Delete</button></td>
            </tr>
        `;
        
        $(".student-list").append(tr);

        addStudentToLocalStorage(name, id,email, department);

        iziToast.success({
            title: 'OK',
            message: 'Successfully added student!',
            position: 'topRight'
        });

    } else {
        
        // Loop to find the row to update 
        $(".student-list tr").each(function(index, element) {
            // Check if tr > 2nd td value is same as the id input 
            if($(element).children("td:nth-child(2)").text() == id) {

                // update name value from input 
                $(element).children("th").text(name);
                // update departmen tvalue
                $(element).children("td:nth-child(3)").text(department);
                // remove disabled of id input
                $(".id").removeAttr("disabled");
                // change text of the submit button
                $(".submit-button").text("Submit");

                iziToast.success({
                    title: 'OK',
                    message: 'Successfully updated student!',
                    position: 'topRight'
                });
            }
        });
    }

    // reset the form values
    $(".name").val("");
    $(".id").val("");
    $(".email").val("");
    $(".department").val("");
});

// remove tr on delete
$("body").on("click", ".delete", function() {
    var id = $(this).parent().prev().prev().text();
    deleteFromLocalStorage(id);

    $(this).parent().parent().remove();

    iziToast.success({
        title: 'OK',
        message: 'Successfully deleted a student!',
        position: 'topRight'
    });
})

// on click edit apply
$("body").on("click", ".edit", function() {

    // get values of department, id and name
    var department = $(this).parent().prev().text();
    var id = $(this).parent().prev().prev().text();
    var email = $(this).parent().prev().prev().text();
    var name = $(this).parent().prev().prev().prev().text();

    // update the form with the values
    $(".name").val(name);
    $(".id").val(id);
    $(".email").val(email);
    $(".department").val(department);

    // make id disabled
    $(".id").attr("disabled", "");
    // change the button text to update so that it looks an update form 
    $(".submit-button").text("Update")

})

function addStudentToLocalStorage(name, id, department) {
    let student = {
        name: name,
        id: id,
        email:email,
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







