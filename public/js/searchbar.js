/**
 * Contorls the display of search bar
 * @author Min
 * @version v1.0
 */

function changeType(value) {
    // console.log(value)
    if (value == 0) {
        document.getElementById("searcharea");
        document.getElementById("searchtype").innerHTML = "Blog ";
    } else if(value == 1) {
        document.getElementById("searcharea");
        document.getElementById("searchtype").innerHTML = "Event ";
        // document.getElementById("searchbutton").value = "event";
    } /*else if (value == 2) {
        document.getElementById("searcharea").type = "text";
        // document.getElementById("searchbutton").innerHTML = "Location";
        // document.getElementById("searchbutton").value = "eventlocation";
    } else if (value == 3) {
        document.getElementById("searcharea").type = "text";
        // document.getElementById("searchbutton").innerHTML = "Event Author";
        // document.getElementById("searchbutton").value = "eventauthor";
    } else if (value == 4) {
        document.getElementById("searcharea").type = "date";
        // document.getElementById("searchbutton").innerHTML = "Blog Date";
        // document.getElementById("searchbutton").value = "blogdate";
    } else if (value == 5) {
        document.getElementById("searcharea").type = "text";
    //     document.getElementById("searchbutton").innerHTML = "Blog Author";
    //     document.getElementById("searchbutton").value = "blogauthor";
    // } else if (value == 6) {
        document.getElementById("searcharea").type = "text";
        // document.getElementById("searchbutton").innerHTML = "Blog";
        // document.getElementById("searchbutton").value = "blog";*/
}
