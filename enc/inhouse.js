var fieldValidate = '';
var secMethod = '';
var date = new Date();
var month = date.getMonth() + 1;
var curYear = date.getFullYear();
date = date.getDate() + "/" + month + "/" + curYear;
var closing = true;
var IsCancelButton = false;
var needToConfirm = true;
var hrefcon = true;
var cancelconform = true;

function closeButton(object) {
	if (confirm("Are you sure you wish to quit? Selecting OK will automatically return you to the online store.")) {
		OnCancelHandler(object);
		IsCancelButton = true;
	}
}

function onBeforeUnloadHandler(object) {
	if (closing && !IsCancelButton) {
		if (needToConfirm && hrefcon && cancelconform && timeout) {
			event.returnValue = "Your activation has not completed!\nTo complete your activation click 'Cancel'.";
		}
	}
}

function openContactus() {
	window.open("https://support.matchmove.com/securecode/federal/faq.html",
				"privacy",
				"scrollbars=0,left=0,top=0,width=600,height=400,toolbar=false,status=yes,menubar=no,resizable=0,directories=No,top=15, left=5");
}

function setResendParam() {
	console.log("resend url : " + $('#resendOtp').val());
	var inhouseVal = $("#inhouseVal").val();
	var paramVal = $("#paramVal").val();
	$.ajax({
		url: $('#resendOtp').val(),
		type: "post",
		data:{"inhouseVal":""+inhouseVal+"","paramVal":""+paramVal},
		async: false,
		success: function(d) {
			$("#otpVal").val("");
			$('#resendMsgDiv').css({"color":"#00B9B9"}).show();
			setTimeout(function() { $('#resendMsgDiv').hide(); }, 3000);
		}
	});
}

$(document).ready(function () {
	$('#resendMsgDiv').hide();
	var methodsTab = $("#methodsValue").val().replace("[","").replace("]","").split(",");
	for (i = 0; i < methodsTab.length; i++) {
		console.log("i :"+methodsTab[i]);
		var a=methodsTab[i].trim();
		if (a.toUpperCase()=="OTP") {
			$("#tabMenus").append('<label class="clearfix"><input type="radio" id="OTPLBL" name="radio" onclick="optionSelect(\'OTP\')"/> <div class="box"><p>OTP</p></div></label>');
		} else if (a.toUpperCase()=="IPIN") {
			$("#tabMenus").append('<label class="clearfix"><input type="radio" id="IPINLBL" name="radio" onclick="optionSelect(\'IPIN\')" /><div class="box"><p>IPIN</p></div></label>');
		} else if (a.toUpperCase()=="STATICPIN") {
			$("#tabMenus").append('<label class="clearfix"><input type="radio" id="SPINLBL" name="radio" onclick="optionSelect(\'STATICPIN\')" /><div class="box"><p>Static Password</p></div></label>');
		}
	}
});

//Added by Mamta For input box validation and f12 ,f5, rightclick 
function check_input(value,id)
{

if(id=='otpVal')
{
      if(value.length==6)
     {
     // alert('true');
      document.getElementById("IDCT_BUTID").disabled=false;
      document.getElementById("IDCT_BUTID").style.opacity='100%' ;
	}
}
}

//Disable right click script 
document.addEventListener('contextmenu', event => event.preventDefault());

document.onkeypress = function (event)
 {
    event = (event || window.event);
    return keyFunction(event);
}
document.onmousedown = function (event) {
    event = (event || window.event);
    return keyFunction(event);
}
document.onkeydown = function (event) {
    event = (event || window.event);
    return keyFunction(event);
}

function keyFunction(event){
    //"F12" key
    if (event.keyCode == 123) {
    //alert("Can't press F12");
        return false;
    }
	//cntrl+shift+I
    if (event.ctrlKey && event.shiftKey && event.keyCode == 73) {
   // alert("Can't press cntrl+shift+I");
        return false;
    }
   
    //F5
    if (event.keyCode == 116) {
   //  alert("Can't press F5");
       return false;
    }
} 
function formvalid() {

	var cardNo = $("#cardNo").val();
	var ipin1 = $("#ipin1").val();
	var ipin2 = $("#ipin2").val();
	var ipin = $("#iPinVal").val();
	var issueMonth = $("#month").val();
	var issueYear = $("#year").val();
	var dob = $("#dob").val();
	var mobNo = $("#mobNo").val();
	var otpVal = $("#otpVal").val();
	var regExp = /^[0-9]+$/;
	//alert('formvalid');
	if (fieldValidate.toUpperCase() == "OTP") {
		if (otpVal.length == 0) {
			alert("Please enter your OTP!");
			return false;
		} else if (otpVal.length != 6) {
			alert('OTP should be of 6 digits!');
			return false;
		} else if (!(otpVal.match(regExp))) {
			alert('Only numbers are allowed!');
			return false;
		}
	} else if (fieldValidate.toUpperCase() == "STATICPIN") {
		if (mobNo.length == 0) {
			alert('Please enter your mobile number!');
			return false;
		} else if (dob.length == 0) {
			alert('Please enter your Date of Birth!');
			return false;
		} else if (!(dob.match(regExp)) || !(mobNo.match(regExp))) {
			alert('Only numbers are allowed!');
			return false;
		} else if (dob.length != 4 || mobNo.length != 4) {
			alert('Should be of 4 digits!');
			return false;
		}
	} else if (fieldValidate.toUpperCase() == "IPIN") {
		secMethod = $("#secMethod").val();
		var data = $("#defaultMethod").val();
		if ((data.toUpperCase() != 'IPIN') && (secMethod == null || secMethod == '')) {
			if (cardNo.length == 0) {
				alert('Please enter your card number!');
				return false;
			} else if (!(cardNo.match(regExp))) {
				alert('Only numbers are allowed!');
				return false;
			} else if (cardNo.length != 16) {
				alert('Card number should be of 16 digits!');
				return false;
			} else if (ipin1.length == 0 || ipin2.length == 0 ) {
				alert('Please enter IPIN!');
				return false;
			} else if (ipin1.length != 6 || ipin2.length != 6) {
                                alert('IPIN should be of 6 digits!');
                                return false;
                        } else if (!(ipin1.match(regExp)) || !(ipin2.match(regExp))) {
                                alert('Only numbers are allowed!');
                                return false;
                        } else if (ipin1 != ipin2) {
				alert('IPIN should be same!');
				return false;
			} else if (issueMonth == "0" || issueYear == "0") {
				alert('Select correct issue date!');
				return false;
			}
			ipin = ipin2;
		} else if ((data.toUpperCase() == 'IPIN') || ((data.toUpperCase() != 'IPIN') && (secMethod.toUpperCase() == 'IPIN'))) {
			if (ipin.length == 0 ) {
				alert('Please enter IPIN!');
				return false;
			} else if (ipin.length != 6) {
                                alert('IPIN should be of 6 digits!');
                                return false;
                        } else if(!(ipin.match(regExp))) {
				alert('Only numbers are allowed!');
				return false;
			}
		}
	}
	$("#otp").val(otpVal);
	var staticPwd = mobNo + dob;
	var issueDate = issueMonth + issueYear;
	setValues(staticPwd, cardNo, ipin, issueDate);
	return true;
}

function setValues(staticPwd, cardNo, ipin, issueDate) {
	//alert("staticPwd : " + staticPwd);
	$("#spin").val(staticPwd);
	$("#cardNumber").val(cardNo);
	$("#ipin").val(ipin);
	$("#issueDate").val(issueDate);
}

function languageChange(lang) {
	if (lang == "EN") {
		$("#content_eng").show();
	} else if (lang == "VN") {

	} else if (lang == "ID") {

	}
}

function optionSelect(data) {
	if(($('#resendValue').val()=='RESEND_1')||($('#resendValue').val()=='WRONGOTP')){
		data = 'OTP';
		if($('#secPage').val()=='SecPage'){
			$('#resendValue').val('');
		}
	}
	console.log('option : '+data);
	$('#setStaticPIN,#otpMsglbl,#setCreatedIPIN,#setEnterIpinHead,#errorOtpMsg').hide();
	if (data.toUpperCase() == "OTP") {
		fieldValidate = data;
		$('#OTPLBL').prop("checked",true);
		$("#VALTYPE").val("otp"); //Setting validation type
		$("#otpData").css({"display":"block", "width":"100%"});
		$("#resendLink,#ul_Contect,#otpMsglbl,#errorOtpMsg").show();
		$("#spinDob,#spinMob,#ipinData,#setIpinHead,#setIpinP,#setIpinList").hide();
		var defVal = $("#defaultMethod").val().trim();
		if (defVal.toUpperCase() != "OTP") {
			//if ($('#resendValue').val() != 'RESEND_1') {
			if ($('#resendValue').val() != 'WRONGOTP' && ($('#resendValue').val()!='')) {
				var inhouseVal = $("#inhouseVal").val();
				var paramVal = $("#paramVal").val();
				$.ajax({
					url: $('#resendOtp').val(),
					type: "post",
					data:{"inhouseVal":""+inhouseVal+"","paramVal":""+paramVal},
					async: false,
					success: function(d) {
					}
				});
			}
		}

	} else if (data.toUpperCase() == "IPIN") {
		fieldValidate = data;
		$('#IPINLBL').prop("checked",true);
		//$('#ul_Contect').show();
		var secMethod=$("#secMethod").val();
		setOrEnterIPIN(data,secMethod);
	} else if (data.toUpperCase() == "STATICPIN") {
		fieldValidate = data;
		$('#SPINLBL').prop("checked",true);
		$('#ul_Contect').show();
		var secMethod=$("#secMethod").val();
		setOrEnterSPIN(secMethod);
		/* $("#VALTYPE").val("staticpin"); //Setting validation type */
	} else 
	{
		$("#spinDob,#spinMob,#ipinData,#setIpinHead,#setIpinP,#setIpinList").hide();
		$("#otpData").css({"display":"block", "width":"100%"});
		$("#resendLink").show();
	}
}

function setOrEnterIPIN(data,secVal) {
	$("#VALTYPE").val("ipin"); //Setting validation type
	var data = $("#defaultMethod").val();
	if((data.toUpperCase() != 'IPIN') && (secVal == null || secVal == '')) {
		$('#ul_Contect').hide();
		$("#setIpinList,#setIpinP,#setIpinHead").show();
		$("#otpData,#resendLink,#spinDob,#spinMob,#ipinData,#otpMsglbl,#setCreatedIPIN").hide();
	} else if ((data.toUpperCase() == 'IPIN') || ((data.toUpperCase() != 'IPIN') && (secVal.toUpperCase() == 'IPIN'))) {
		$('#ul_Contect').show();
		$("#ipinData,#setCreatedIPIN,#setEnterIpinHead").show();
		$("#otpData,#resendLink,#spinDob,#spinMob,#setIpinHead,#setIpinP,#setIpinList").hide();
	} else {
		$('#ul_Contect').hide();
                $("#setIpinList,#setIpinP,#setIpinHead").show();
                $("#otpData,#resendLink,#spinDob,#spinMob,#ipinData,#otpMsglbl,#setCreatedIPIN").hide();
        }
}

function setOrEnterSPIN(secVal) {
	$('#setStaticPIN').show();
	$("#VALTYPE").val("spin"); //Setting validation type
	if(secVal == null || secVal == '') {
		$("#spinMob").show();
		$("#spinDob").show();
		$("#otpData,#resendLink,#setIpinHead,#setIpinP,#setIpinList,#ipinData").hide();
	} else {
		$("#spinDob").css({"display":"block", "width":"100%"});
		$("#spinMob,#ul_Contect").show();
		$("#setIpinP,#setIpinHead,#otpData,#resendLink,#ipinData,#setIpinList").hide();
	}
}

function populateYears() {
	var max = new Date().getFullYear(),
	min = max - 12,
	select = document.getElementById('year');
	for (var i = min; i <= max; i++) {
		var opt = document.createElement('option');
		opt.value = i;
		opt.innerHTML = i;
		select.appendChild(opt);
	}
}

function setHeaderText(cardNetwork) {
	if (cardNetwork == "VISA") {
		$("#headerText").append("Enter Your <i>VERIFIED BY " + cardNetwork + " Code</i><sup style='font-size: 10px;'>TM</sup>");
	} else if (cardNetwork == "MASTERCARD") {
		$("#headerText").append("Enter Your <i>" + cardNetwork + " 3D Secure Code</i><sup style='font-size: 10px;'>TM</sup>");
	} else if (cardNetwork == "RUPAY") {
		$("#headerText").append("Enter Your <i>" + cardNetwork + " Paysecure Code</i><sup style='font-size: 10px;'>TM</sup>");
	} else {
		$("#headerText").append("Enter Your <i>" + cardNetwork + " 3D Secure Code</i><sup style='font-size: 10px;'>TM</sup>");
	}
}
function resendTime(){
	let timeLeft =05;
		const countdownElement = document.getElementById('timeleft');
		const linkElement = document.getElementById('resendOtpBtn');
	
		// Update the timer every second
		const timerInterval = setInterval(updateTimer, 1000);
	
		function updateTimer() {
			timeLeft--;
			document.getElementById("timer").style.visibility = "visible";
			document.getElementById("resendOtpBtn").style.visibility = "hidden";
			//var message = 'Resend OTP in';
			countdownElement.textContent = timeLeft.innerHTML=' 00:' + timeLeft;
			if(timeLeft<10)
			{
				countdownElement.textContent = timeLeft.innerHTML=' 00:0' + timeLeft;
			}
			// Activate the link when time reaches 0
			if (timeLeft <= 0) {
				clearInterval(timerInterval);
			//	linkElement.style.display = 'inline'; // Display the link
			document.getElementById("timer").style.visibility = "hidden";
			       document.getElementById("resendOtpBtn").style.visibility = "visible";
				linkElement.style.pointerEvents='auto';
				document.getElementById('resendOtpBtn').disabled=false;
			//	document.getElementById('resendOtpBtn').style.display='inline';
		}
	}
}
	
document.addEventListener('DOMContentLoaded',function(){
		resendTime();
});
