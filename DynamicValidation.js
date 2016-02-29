var maxlenfirstname;
var maxlenlastname;
var maxlenconnect;
var maxlendescript;
var lenstatusfirstname;
var lenstatuslastname;
var lenstatusconnect;
var lenstatusdes;
var validationfirstname;
var validationlastname;
var validationconnect;
var validationdescription;
var statusfname;
var statuslname;
var statusconn;
var statusdesc;
var number;
var statusvalidation;
var counter = 1;
var jsonitem = [];
var i;

$(document).ready(function () {


    $("#activedash").removeClass("active");
    $("#activereport").removeClass("active");
    $("#activepackages").removeClass("active");
    $("#activeaccount").removeClass("active");
    $("#activereport").removeClass("active");
    $("#activeupload").removeClass("active");
    $("#activepay").removeClass("active");
    $("#activecontact").addClass("active");

    function getCookie(name) {
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    var csrftoken = getCookie('csrftoken');

    $.ajaxSetup({
        beforeSend: function (xhr, settings) {
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
        }
    });

    $("#send").click(function () {

        for (i=0;i<counter;i++) {

            var X_Connect = $("#x_" + i).val();
            var Y_Description = $("#y_" + i).val();
            var msgErrorTagDescript = $("#msgErrorTagDescript_" + i);
            var msgErrorTagConntact = $("#msgErrorTagConntact_" + i);
            var msgErrorDescript = $('#msgErrorDescript_' + i);
            var msgErrorConntact = $('#msgErrorConntact_' + i);
            var emailerror = $("#emailerror_" + i);
            var errornumber = $("#errornumber_" + i);
            var entererror = $("#entererror_" + i);
            number = $("#droptest_" + i).val();

            $("#warningphone").hide();
            $("#warningmobile").hide();
            $("#warningemail").hide();
            $("#warningaddress").hide();
            errornumber.hide();

            if ($("#firstname").val().trim() == "") {
                $("#msgErrorTagFirstname").hide();
                $('#msgErrorFirstname').show();
                statusfname = false;
            }
            else {
                $('#msgErrorFirstname').hide();
                statusfname = true;
            }
            if ($("#lastname").val().trim() == "") {
                $("#msgErrorTagLastname").hide();
                $('#msgErrorLastname').show();
                statuslname = false;
            }
            else {
                $('#msgErrorLastname').hide();
                statuslname = true;
            }
            if (X_Connect.trim() == "") {
                msgErrorTagConntact.hide();
                msgErrorConntact.show();
                statusconn = false;
            }
            else {
                msgErrorConntact.hide();
                statusconn = true;
            }
            if (Y_Description.trim() == "") {
                msgErrorTagDescript.hide();
                msgErrorDescript.show();
                statusdesc = false;
            }
            else {
                msgErrorDescript.hide();
                statusdesc = true;
            }
            if (statusfname && statuslname && statusconn && statusdesc) {
                entererror.hide();
                msgErrorConntact.hide();
                if (CheckLength(X_Connect, Y_Description)) {
                    if (!HTMLValidation_FirstName()) {
                        $("#msgErrorTagFirstname").hide();
                        validationfirstname = true;
                    }
                    else {
                        validationfirstname = false;
                    }
                    if (!HTMLValidation_LastName()) {
                        $("#msgErrorTagLastname").hide();
                        validationlastname = true;
                    }
                    else {
                        validationlastname = false;
                    }
                    if (!HTMLValidation_Connect(X_Connect)) {
                        msgErrorTagConntact.hide();
                        validationconnect = true;
                    }
                    else {
                        validationconnect = false;
                    }
                    if (!HTMLValidation_Description(Y_Description)) {
                        msgErrorTagDescript.hide();
                        validationdescription = true;
                    }
                    else {
                        validationdescription = false;
                    }
                    if (validationfirstname && validationlastname && validationconnect && validationdescription) {
                        entererror.hide();
                        emailerror.hide();
                        entererror.hide();
                        $('#msgErrorLastname').hide();
                        if (number == 0) {
                            entererror.show();
                            return false;
                        }
                        if (number == 3) {

                            if (EmailValidation(X_Connect)) {
                                entererror.hide();
                                statusvalidation = true;
                            }
                            else {
                                entererror.hide();
                                emailerror.show();
                                statusvalidation = false;
                                return false;
                            }
                        }
                        if (number == 1 || number == 2) {

                            if (NumberValidation(X_Connect)) {
                                entererror.hide();
                                statusvalidation = true;
                            }
                            else {
                                entererror.hide();
                                statusvalidation = false;
                                errornumber.show();
                                return false;
                            }
                        }
                        if (number == 4) {
                            entererror.hide();
                            statusvalidation = true;
                        }
                        if (statusvalidation) {
                            item = {};
                            item ["name"] = $(".FirstName").val();
                            item ["family"] = $(".LastName").val();
                            item ["contactInfo"] = X_Connect;
                            item ["description"] = Y_Description;
                            item ["contactType"] = number;
                            jsonitem.push(item);

                        }
                        else {
                            entererror.show();
                            return false;
                        }

                    }
                    else {
                        if (!validationfirstname) {
                            $("#msgErrorTagFirstname").show();
                            return false;
                        }
                        if (!validationlastname) {

                            $("#msgErrorTagLastname").show();
                            return false;
                        }
                        if (!validationconnect) {
                            msgErrorTagConntact.show();
                            return false;
                        }
                        if (!validationdescription) {
                            msgErrorTagDescript.show();
                            return false;
                        }
                    }
                }
                else {
                    $("#msgError").show();
                    return false;
                }
            }
            else
                return false;
        }
        AjaxContact(jsonitem);
    });

    $(function () {
        $(document).on('click', '.btn-add', function (e) {
            var inputstyle =

                "<div class='clearfix' attr='x_" + counter + "'>" +
                "<div class='col-sm-6'>" +
                "<div class='col-sm-3 dropleft'>" +
                "<div class='dropcontrol'>" +
                "<select id='droptest_" + counter + "' class='btn-primary droptext'>" +
                "<li>" +
                "<option  value='0'>انتخاب کنید</option>" +
                "</li>" +
                "<li>" +
                "<option  class='mobile' value='1'>موبایل</option>" +
                "</li>" +
                "<li>" +
                "<option  class='telephone' value='2'>تلفن ثابت</option>" +
                "</li>" +
                "<li>" +
                "<option  class='Email' value='3'>ایمیل</option>" +
                "</li>" +
                "<li>" +
                "<option  class='contactaddress' value='4'>سایر</option>" +
                "</li>" +
                "</select>" +
                "<div class='input-group'>" +
                "<span id='entererror_" + counter + "'class='msgerror'> لطفا انتخاب کنید</span>" +
                "</div>" +
                "</div>" +
                "</div>" +
                "<div class='col-sm-9'>" +
                "<div class='controls'>" +
                "<input id='x_" + counter + "' attr='x_" + counter + "' type='text' class='form-control conn' placeholder='لطفا راه ارتباطی مورد نظر را وارد کنید' name='Connect' maxlength='50' style='direction: ltr;text-align: center;'>" +
                "</div>" +
                "<span id='msgErrorConntact_" + counter + "' attr='x_" + counter + "' class='msgerror'> لطفا راه ارتباطی را وارد کنید </span>" +
                "<span id='msgErrorTagConntact_" + counter + "' attr='x_" + counter + "' class='msgerror'> این کاراکترها غیرمجاز می باشند </span>" +
                "<span id='warningmobile_" + counter + "' attr='x_" + counter + "' class='msgerror'> توجه : لطفا شماره موبایل را وارد کنید</span>" +
                "<span id='warningphone_" + counter + "' attr='x_" + counter + "' class='msgerror'> توجه : لطفا شماره تلفن ثابت را وارد کنید</span>" +
                "<span id='warningemail_" + counter + "' attr='x_" + counter + "' class='msgerror'> توجه : لطفا ایمیل را وارد کنید</span>" +
                "<span id='warningaddress_" + counter + "' attr='x_" + counter + "' class='msgerror'>توجه : راه ارتباطی به دلخواه وارد گردد</span>" +
                "<span id='errornumber_" + counter + "' attr='x_" + counter + "' class='msgerror'> لطفا عدد وارد کنید </span>" +
                "<span id='emailerror_" + counter + "' attr='x_" + counter + "' class='msgerror'>لطفا ایمیل را صحیح وارد کنید</span>" +
                "</div>" +
                "</div>" +
                "<div class='col-sm-6 desc'>" +
                "<label class='control-label col-sm-3' style='text-align: left;'> توضیحات :</label>" +
                "<div class='col-sm-9'>" +
                "<div class='entry input-group'>" +
                "<input id='y_" + counter + "' attr='y_" + counter + "' type='text' class='form-control decrept' name='decrept' maxlength='100'>" +
                "<div attr='x_" + counter + "'class='input-group-addon btn-remove' style='cursor:pointer;'><span class='glyphicon glyphicon-minus'></span>" +
                "</div>" +
                "</div>" +
                "<div class='entry input-group'>" +
                "<span attr='x_" + counter + "' id='msgErrorDescript_" + counter + "' class='msgerror'> لطفا توضیحات را وارد کنید </span>" +
                "<span attr='x_" + counter + "' id='msgErrorTagDescript_" + counter + "' class='msgerror'> این کاراکترها غیرمجاز می باشند </span>" +
                "<span class='input-group-btn'>" +
                "</span>" +
                "</div>" +
                "</div>" +
                "</div>";

            $("#append").append(inputstyle);
            counter = parseInt(counter) + 1;
        });

        $(document).on('click', '.btn-remove', function (e) {
            var attr = $(this).attr('attr');
            $('div[attr=' + attr + ']').remove();

        });
    });
});


    model = Jsonmodel;
    $.ajax({
        url: "/api/contact",
        datatype: 'json',
        type: 'POST',
        data: {'contactmodel[]': JSON.stringify(model)},
        success: function (data) {
            $(".seccuess").html(data).show();
            $("#firstname").val("");
            $("#lastname").val("");
            //X_Connect.val("");
            //Y_Description.val("");
        },
        error: function (data) {

            if (data.status == 400) {
                $(".errormsg").html(data.responseText).show();
                $("#firstname").val("");
                $("#lastname").val("");
                $("#connect").val("");
                $("#decreption").val("");
            }
            if (data.status == 401) {

                $(".errormsg").html(data.responseText).show();
                $("#firstname").val("");
                $("#lastname").val("");
                $("#connect").val("");
                $("#decreption").val("");
            }
            if (data.status == 402) {

                $(".errormsg").html(data.responseText).show();
                $("#firstname").val("");
                $("#lastname").val("");
                $("#connect").val("");
                $("#decreption").val("");
            }

            if (data.status == 404) {
                $(".errormsg").html(data.responseText).show()
                $("#firstname").val("");
                $("#lastname").val("");
                $("#connect").val("");
                $("#decreption").val("");
            }

        }
    });
}

function NumberValidation(conn_num) {


    var mobile = conn_num;
    var re = /^\d+$/;
    if (re.test(mobile))
        return true;
    else
        return false


}

function EmailValidation(conn_email) {


    var email = conn_email;
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(email))
        return true;
    else
        return false


}

function CheckLength(conn, descrip) {

    maxlenfirstname = $("#firstname").val().length;
    maxlenlastname = $("#lastname").val().length;
    maxlenconnect = conn.length;
    maxlendescript = descrip.length;

    if (maxlenfirstname <= 50)
        lenstatusfirstname = true;
    else
        lenstatusfirstname = false;
    if (maxlenlastname <= 50)
        lenstatuslastname = true;
    else
        lenstatuslastname = false;
    if (maxlenconnect <= 50)
        lenstatusconnect = true;
    else
        lenstatusconnect = false;
    if (maxlendescript <= 50)
        lenstatusdes = true;
    else
        lenstatusdes = false;
    if (lenstatusfirstname && lenstatuslastname && lenstatusconnect && lenstatusdes)
        return true;
    else
        return false;
}

function HTMLValidation_FirstName() {

    filter_firstname = $('#firstname').val();

    var re = /\?|\\|\*|<|>|\||%/g;
    if (re.test(filter_firstname))
        return true;
    else {
        return false;

    }
}

function HTMLValidation_LastName() {
    filter_lastname = $('#lastname').val();
    var re = /\?|\\|\*|<|>|\||%/g;
    if (re.test(filter_lastname)) {

        return true;
    }
    else {
        return false;
    }
}

function HTMLValidation_Connect(conn) {

    filter_conn = conn;
    var re = /\?|\\|\*|<|>|\||%/g;
    if (re.test(filter_conn)) {

        return true;
    }
    else {
        return false;
    }
}

function HTMLValidation_Description(Description) {

    filter_Description = Description;
    var re = /\?|\\|\*|<|>|\||%/g;
    if (re.test(filter_Description)) {
        return true;
    }
    else {
        return false;
    }
}
