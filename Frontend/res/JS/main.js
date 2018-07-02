$(document).ready(function(){
  $( ".st" ).datepicker();
  $( ".et" ).datepicker();
  function setbg(color)
  {
  document.getElementById("styled").style.background=color
  }
    function validateEmail(email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
      }
      
    console.log('working')
    $('#req_form').submit(function(event){
      event.preventDefault();
      let name= $('.name').val();
      let email=$('.email').val();
      let studio=$('.studios option:selected').val();
      let description=$('textarea').val();
      let st = $('.st').val();
      let et = $('.et').val();
      let manager = $('.man').val();
      let team = $('.team').val();
      let assets = $('.ass').val();
      let shootType = $('.shoot').val();
      let crew = $('.crew').val();
      let time_enter = $('.entert').val();
      let time_exit = $('.exitt').val();
      console.log('Working idhar bhi!')
      console.log()
      let enterdata = st+ ' ' +time_enter;
      let exitdata = et + ' ' + time_exit;
      $('#display').empty();
      if(name=== '' && email === ''){
          
          console.log('First check')
          $('#display').append('<p>Fill the form</p>')
         
      }
      else if(name !== '' && email === '' ){
        console.log('Second check')
          $('#display').append('<p>Email can\'t be empty</p>')
      }
      else if(name === '' && email !== ''){
        console.log('Third check')
          $('#display').append('<p>Name can\'t be empty</p>')
      }
      else if (!validateEmail(email)) {
        $('#display').append('<p>Please enter a valid email address</p>')
      }
      else if (st < Date.now() || et < Date.now() || st>et){
         $('#display').append('<p>Please check your dates</p>')
      }
      else{
        $('#display').empty();
         $.ajax({
             type: "POST",
             url: "http://localhost:8080/api/request",
             data: {
                 name: name,
                 email: email,
                 studio: studio,
                 description : description,
                 startTime: enterdata,
                 endTime : exitdata,
                 manager : manager,
                 team : team,
                 assets : assets,
                 shootType : shootType,
                 crew : crew

             },
             crossDomain : true,
             success : function(data){
                 console.log(data.message);
                 $('#display').append(data.message);
             },
             error: function(jqXHR, textStatus, err) {
                 console.log('Or this!')
                alert('text status '+textStatus+', err '+err)
            }

         })
      }
    });
  });