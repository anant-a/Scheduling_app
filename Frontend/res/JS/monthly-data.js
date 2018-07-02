$(document).ready(function () {
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
    $.ajax({
        type: "GET",

        headers: { "Authorization": localStorage.getItem('token') },
        url: "http://localhost:8080/api/request/approved",

        crossDomain: true,
        success: function (data) {
            console.log(data)
            if (data) {
                let len = data.length;
                let txt = "";
                if (len > 0) {
                    for (var i = 0; i < len; i++) {

                        if (data[i].startTime && data[i].endTime && data[i].studio && data[i].name && data[i].email && data[i].manager) {
                            let mydate = new Date(data[i].startTime);
                            //console.log(mydate)
                            let enddate = new Date(data[i].endTime);
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
                            txt += "<tr><td>" + data[i].studio + "</td><td>" + input_date + "</td><td>" + end_date + "</td><td>" +
                                input_time + "</td><td>" + exit_time + "</td><td>" + data[i].name + "</td><td>" +
                                data[i].email + "</td><td>" + data[i].manager + "</td></tr>";
                        }
                    }
                    if (txt != "") {
                        $("#table").append(txt).removeClass("hidden");
                    }
                }
            }
            $('.btn').click(function(){
            $("#table").table2excel({
                exclude: ".excludeThisClass",
                name: "Worksheet Name",
                filename:'std_details' //do not include extension
            });
        })
        let $rows = $('#table tr');
        $('#search').keyup(function() {
            let val = $.trim($(this).val()).replace(/ +/g, ' ').toLowerCase();
            
            $rows.show().filter(function() {
                let text = $(this).text().replace(/\s+/g, ' ').toLowerCase();
                return !~text.indexOf(val);
            }).hide();
        });
        },
        error: function (jqXHR, textStatus, err) {
            console.log(localStorage.getItem('token'))

            console.log('text status ' + textStatus + ', err ' + err)
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
  
})