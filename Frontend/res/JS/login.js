$(document).ready( function(){
    console.log('chol che')
    function validateEmail(email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
      }
    $('.btn').click(function(){ 
     let email = $('.email').val();
     let password=$('.pass').val();
     console.log(email);
     
     $('#display').empty();
     if(password=== '' && email === ''){
         
         console.log('First check')
         $('#display').append('<p>Fill the form</p>')
        
     }
     else if(password !== '' && email === '' ){
       console.log('Second check')
         $('#display').append('<p>Email can\'t be empty</p>')
     }
     else if(password === '' && email !== ''){
       console.log('Third check')
         $('#display').append('<p>Password can\'t be empty</p>')
     }
     else if (!validateEmail(email)) {
       $('#display').append('<p>Please enter a valid email address</p>')
     }
     else{
       $('#display').empty();
     $.ajax({
        type: "POST",
        url: "http://localhost:8080/api/request/login",
        data: {
            email: email,
           password: password
        },
        crossDomain : true,
        success : function(data){
            console.log(data.success);
            console.log(data.msg);
            if(data.success){
                location.href = "admin_home.html";
                localStorage.setItem('token', data.token);
            }
            $('#display').append(data.msg);
        },
        error: function(jqXHR, textStatus, err) {
            console.log('Or this!')
           alert('text status '+textStatus+', err '+err)
       }

    })
}
    });
});