$(function(){
    $('#jwt-login').click(function(){
        $.post('/jwt', {username: $('#jwt-username').val() , password: $('#jwt-password').val()}, function(err, data){
            console.log(err, data)
        })
        return false;
    })
})