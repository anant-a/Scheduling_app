$(document).ready(function () {
   // let approved= []
   // let test=[]
   $.ajax({
    type: "GET",
    headers: {"Authorization": localStorage.getItem('token')},
    url: "http://localhost:8080/api/request/app_user",
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
           

        })
    }
})
})