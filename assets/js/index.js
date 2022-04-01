//when creating new user, the user presses on submit button
//then we want a confirmation message that user has been added.

//#add_user is the html id of the form
$("#add_user").submit(function (event) {
    alert("Data inserted successfuly");
});



$("#update_user").submit(function (event) {
    event.preventDefault();


    var unindexed_array = $(this).serializeArray();

    // console.log(unindexed_array);

    var data = {};


    $.map(unindexed_array, function (n, i) {
        data[n['name']] = n['value'];
    });

    // console.log(data);


    var request = {
        "url": `http://localhost:8080/api/users/${data.id}`,
        "method": "PUT",
        "data": data
    }


    $.ajax(request).done(function (response) {
        alert("Data updated successfuly");
    });
});


if (window.location.pathname == "/") {
    $ondelete = $(".table tbody td a.delete");
    $ondelete.click(function (event) {
        var id = $(this).attr("data-id");


        var request = {
            "url": `http://localhost:8080/api/users/${id}`,
            "method": "DELETE"
        }

        if(confirm("Are you sure to delete this user?")) {
            $.ajax(request).done(function (response) {
                alert("Data deleted successfuly");
                location.reload();
            });
        }
    });

}