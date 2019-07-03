/**
 * Send data by ajax
 * used in index, create event, create blog
 * @author Lixiao
 * @return callback function to display the data
 * @version v1.0
 */

function sendAjaxQuery(url, data) {
    $.ajax({
        url: url ,
        data: data,
        dataType: 'json',
        type: 'POST',
        success: function (dataR) {
            // no need to JSON parse the result, as we are using
            // dataType:json, so JQuery knows it and unpacks the
            // object for us before returning it
            var ret = dataR;
            console.log(ret);
            if (url === "/createblog"){
                window.location.replace("/blog");
            }
            if (url === "/createvent"){
                window.location.replace("/event");
            }
            // in order to have the object rinted by alert
            // we need to JSON stringify the object
            // document.getElementById('results').innerHTML= JSON.stringify(ret);
        },
        error: function (xhr, status, error) {
            alert('Error: ' + error.message);
        }
    });
}

function onSubmit(url) {
    var formArray= $("form").serializeArray();
    var data={};
    for (index in formArray){
        data[formArray[index].name]= formArray[index].value;
    }
    console.log(data);
    // const data = JSON.stringify($(this).serializeArray());
    sendAjaxQuery(url, data);
    event.preventDefault();
}

