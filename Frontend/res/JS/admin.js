$(document).ready(function(){
    console.log('Chol che!')
    var active1 = false;
    var active2 = false;
    var active3 = false;
    var active4 = false;
  
      $('.parent2').on('click', function() {
      
      if (!active1) $(this).find('.test1').css({'background-color': 'gray', 'transform': 'translate(0px,125px)'});
      else $(this).find('.test1').css({'background-color': 'dimGray', 'transform': 'none'}); 
       if (!active2) $(this).find('.test2').css({'background-color': 'gray', 'transform': 'translate(60px,105px)'});
      else $(this).find('.test2').css({'background-color': 'darkGray', 'transform': 'none'});
        if (!active3) $(this).find('.test3').css({'background-color': 'gray', 'transform': 'translate(105px,60px)'});
      else $(this).find('.test3').css({'background-color': 'silver', 'transform': 'none'});
        if (!active4) $(this).find('.test4').css({'background-color': 'gray', 'transform': 'translate(125px,0px)'});
      else $(this).find('.test4').css({'background-color': 'silver', 'transform': 'none'});
      active1 = !active1;
      active2 = !active2;
      active3 = !active3;
      active4 = !active4;
        
      });
    let details_data=[];
    $.ajax({
        type: "GET",
        
        headers: {"Authorization": localStorage.getItem('token')},
        url: "http://localhost:8080/api/request/",

        crossDomain : true,
        success : function(data){
            
            //console.log(details_data);
            data.forEach(function(details){
              //  console.log(details);
              details_data.push(details);
              let mydate = new Date(details.startTime);
              //console.log(mydate)
              let enddate = new Date(details.endTime);
              year = mydate.getFullYear(); //getting starting year
              month = mydate.getMonth() + 1; // getting starting month
              dt = mydate.getDate();

              eyear = enddate.getFullYear(); //getting end year
              emonth = enddate.getMonth() + 1; // getting end month
              edt = enddate.getDate();       // getting end date

              if (dt < 10) {
                  dt = '0' + dt;
              }
              if (month < 10) {
                  month = '0' + month;
              }
              //console.log(edt)
              if (edt < 10) {
                  edt = '0' + edt;
              }
              if (emonth < 10) {
                  emonth = '0' + emonth;
              }
              let input_date = year + '-' + month + '-' + dt;
              let end_date = eyear + '-' + emonth + '-' + edt;

              let hh = mydate.getUTCHours();
              let mm = mydate.getUTCMinutes();
              let ss = mydate.getUTCSeconds();
              if (hh < 10) {
                  hh = hh + '0'
              }
              if (ss < 10) {
                  ss = ss + '0'
              }
              if (mm < 10) {
                  mm = mm + '0'
              }
              let input_time = hh + ':' + mm + ':' + ss;
              //console.log(input_time)

              let ehh = enddate.getUTCHours();
              let emm = enddate.getUTCMinutes();
              let ess = enddate.getUTCSeconds();
              if (ehh < 10) {
                  ehh = ehh + '0'
              }
              if (ss < 10) {
                  ess = ess + '0'
              }
              if (emm < 10) {
                  emm = emm + '0'
              }
              let exit_time = ehh + ':' + emm + ':' + ess;
                let req_data= '<li class="out_det">'+'<div class="text_wrapper">'+ 'Request Id:'+details.requestId+'<br> '+ 'Start Date:'+input_date+'<br/> '+ 'End Date:'+ end_date+'<br/> Start Time:'+ input_time+'<br/>End Time:'+ exit_time+'</div>'+
                '<br>'+
                '</li>';
                //console.log(req_data);
                //$('req_data').appendTo('.basic list');
                $(req_data).appendTo('.basic_list');
                
             })
           
             $('li').click(function(){
                 $('.modal').css('display', 'block')
                 $('.confirm').empty();
                 console.log(details_data);
                 let elem = $( this ).index()-1; 
                 let mydate = new Date(details_data[elem].startTime);
                 //console.log(mydate)
                 let enddate = new Date(details_data[elem].endTime);
                 year = mydate.getFullYear(); //getting starting year
                 month = mydate.getMonth() + 1; // getting starting month
                 dt = mydate.getDate();
   
                 eyear = enddate.getFullYear(); //getting end year
                 emonth = enddate.getMonth() + 1; // getting end month
                 edt = enddate.getDate();       // getting end date
   
                 if (dt < 10) {
                     dt = '0' + dt;
                 }
                 if (month < 10) {
                     month = '0' + month;
                 }
                 //console.log(edt)
                 if (edt < 10) {
                     edt = '0' + edt;
                 }
                 if (emonth < 10) {
                     emonth = '0' + emonth;
                 }
                 let input_date = year + '-' + month + '-' + dt;
                 let end_date = eyear + '-' + emonth + '-' + edt;
   
                 let hh = mydate.getUTCHours();
                 let mm = mydate.getUTCMinutes();
                 let ss = mydate.getUTCSeconds();
                 if (hh < 10) {
                     hh = hh + '0'
                 }
                 if (ss < 10) {
                     ss = ss + '0'
                 }
                 if (mm < 10) {
                     mm = mm + '0'
                 }
                 let input_time = hh + ':' + mm + ':' + ss;
                 //console.log(input_time)
   
                 let ehh = enddate.getUTCHours();
                 let emm = enddate.getUTCMinutes();
                 let ess = enddate.getUTCSeconds();
                 if (ehh < 10) {
                     ehh = ehh + '0'
                 }
                 if (ss < 10) {
                     ess = ess + '0'
                 }
                 if (emm < 10) {
                     emm = emm + '0'
                 }
                 let exit_time = ehh + ':' + emm + ':' + ess;
                 
                 let detailed_data = '<li class="in_det">'+'<strong>Request Id:</strong>'+'<span class="reqid">'+ details_data[elem].requestId+'</span>'+'<br> '+'<strong>Start Date:</strong>'+input_date+'<br/> '+'<strong>End Date:</strong>'
                 + end_date+'<br>'+'<strong>Start Time:</strong>'+input_time+'<br/> '+'<strong>End Time:</strong>'+exit_time+'<br/> '+'<strong>Name:</strong>'+details_data[elem].name+'<br>'+'<strong>Email:</strong>'+details_data[elem].email+'<br>'+'<strong>Studio:</strong>'+
                 details_data[elem].studio+'<br>'+'<strong>Status:</strong>'+details_data[elem].requestStatus+'<br>'+'<strong>Manager:</strong>'+details_data[elem].manager+'<br>'+'<strong>Shoot Type:</strong>'+details_data[elem].shootType+'<br>'+'<strong>Team Name:</strong>'+
                 details_data[elem].team+'<br>'+'<strong>Crew Involved:</strong>'+details_data[elem].crew+'<br>'+'<strong>Assets Required:</strong>'+details_data[elem].assets+'<br>'+
                 '</li>';
                 if((details_data[elem].requestStatus === 'Accepted') || (details_data[elem].requestStatus === 'Declined')){
                     $('.btn').css('display', 'none');
                 }
                 else{
                    $('.btn').css('display', 'inline-block');
                 }
                 $(detailed_data).appendTo('.detailed_list');

                //  details_data.forEach(function(details){
                //  })
             })
            $('span').click(function(){
                $('.modal').css('display', 'none');
                $('.detailed_list').empty();
            })
            $(window).click(function(e){
                if(e.target === modal){
                    $('.modal').css('display', 'none')
                    $('.detailed_list').empty();
                }
            })
            
        },
        error: function(jqXHR, textStatus, err) {
            console.log(localStorage.getItem('token'))
            
           console.log('text status '+textStatus+', err '+err)
       }

    

    })
   $('.btn').click(function(){
       let requestId = $('.reqid').html();
       let action = $(this).val();
       console.log(action)
       console.log(requestId)

      $.ajax({
          type: "GET",
          url: "http://localhost:8080/api/request/confirmation",
          headers: {"Authorization": localStorage.getItem('token')},
          data: {
              action: action,
             requestId: requestId
          },
          crossDomain : true,
          success : function(data){
             
              $('.confirm').empty();
              console.log(data.message);
              $('.confirm').append(data.message);
                 
          },
          error: function(jqXHR, textStatus, err) {
              console.log('Or this!')
             alert('text status '+textStatus+', err '+err)
         }

      }) 

})
$('.logout').click(function(){
    console.log('Logged Out')
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/request/logout",
        crossDomain: true,
        success: function (data) {
            localStorage.clear();
            location.href = "login.html"
            console.log(data.message)
        }
    })
})
   
    
})