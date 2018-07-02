$(function () {
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

    // page is now ready, initialize the calendar...
    $.ajax({
        type: "GET",
        headers: {"Authorization": localStorage.getItem('token')},
        url: "http://localhost:8080/api/request/approved",
        crossDomain: true,
        success: function (mydata) {
            let cal_array = []
            let len = mydata.length;

            for (let i = 0; i < len; i++) {
                let cal_data = {}
                //console.log(mydata[i].startTime)
                let mydate = new Date(mydata[i].startTime);
                //console.log(mydate)
                let enddate = new Date(mydata[i].endTime);
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
                if(hh <10){
                    hh = hh + '0'
                }
                if(ss <10){
                    ss = ss + '0'
                }
                if(mm <10){
                    mm = mm + '0'
                }
                let input_time = hh + ':'+ mm + ':' + ss;
                //console.log(input_time)

                let ehh = enddate.getUTCHours();
                let emm = enddate.getUTCMinutes();
                let ess = enddate.getUTCSeconds();
                if(ehh <10){
                    ehh = ehh + '0'
                }
                if(ss <10){
                    ess = ess + '0'
                }
                if(emm <10){
                    emm = emm + '0'
                }
                let exit_time = ehh + ':'+ emm + ':' + ess;
                //console.log(exit_time)
                    
                    
                  

                cal_data.start = mydata[i].startTime;
                cal_data.end = mydata[i].endTime;
                cal_data.title = mydata[i].studio;
                if(edt > dt){
                    cal_data.allDay = true;
                }
                cal_data.description = '<li>'  + input_date + '<br/>' + end_date + '<br/>' + mydata[i].name + '<br/>' + mydata[i].studio + '<br/>' +input_time + '<br/>' +exit_time + '<br/>' + '</li>'
                cal_data.className = "studio_event"
                if(mydata[i].studio === 'studio-1'){
                cal_data.color = '#59abe3'
                }
                if(mydata[i].studio === 'studio-2'){
                    cal_data.color = 'green'
                }
                
                if(mydata[i].studio === 'studio-3'){
                    cal_data.color = 'red'
                }
                cal_data.textColor = 'black'

                cal_array.push(cal_data);
                //console.log('The resulting JSON object')
                //console.log(cal_array)
            }


            $('#calendar').fullCalendar({
                // put your options and callbacks here
                dayClick: function (date, jsEvent, view) {
                    console.log('clicked on ' + date.format());
                },
                themeSystem: 'bootstrap3',
                header: {
                  left: 'prev,next today',
                  center: 'title',
                  right: 'month,agendaWeek,agendaDay,listMonth'
                },
                weekNumbers: true,
                eventLimit: true,
                events: cal_array,
                eventClick: function (event) {

                    if (event.title) {
                        //console.log(event.description);
                        $('.modal').css('display', 'block')
                        $(event.description).appendTo('.detailed_list');
                    }
                }

            })
        }


    })
    $('span').click(function () {
        $('.modal').css('display', 'none');
        $('.detailed_list').empty();
    })
    $(window).click(function (e) {
        if (e.target === modal) {
            $('.modal').css('display', 'none')
            $('.detailed_list').empty();
        }
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
});