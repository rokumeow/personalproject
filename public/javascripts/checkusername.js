/**
 * Check the username when sign up
 * @author Lixiao
 * @return json data
 * @version v1.0
 */

$(".reg-username").blur(function () {
    $.ajax({
        data:{sRole:"2",name:$(this).val()},
        url:"/signin",
        type:"POST",
        dataType:'json',
        success:function (msg) {
            if(msg.msg==1){
                $(".tishi").html("This username has been used");
                $(".reg-username").focus().addClass("red-border");
            }else{
                $(".tishi").html("");
                $(".reg-username").removeClass("red-border");
            }
        },
        error:function (err) {
            console.log(err)
        }
    });
});