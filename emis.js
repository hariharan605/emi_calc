var _=function(x){
	return document.getElementById(x);
}
//getting the value 
function calc(e){
	var amt=_("loanamount").value;
	var intamt=_("rate").value;
	var time=_("tenure").value;
	//console.log(amt,intamt,time);

	calcEMI(amt,intamt,time);
	interestCal(amt,intamt,time);

}
//calculate EMI
function calcEMI(amt,intamt,time){
	var emi = getEmi(amt,intamt,time*12);
	var totIn =Math.round(emi*(time*12)); 
	var tp = totIn-amt;

	_("emi").innerHTML += _html("h2","Equated Monthly Installment")+emi;
	_("ti").innerHTML += _html("h2","Total Interest")+tp;
	_("tp").innerHTML += _html("h2","Total Amount")+totIn;
	_("emitbl").style.display="block";
}
function getEmi(a,i,mnth){
	var rate = i/12/100;
	var rate1 = rate+1;
	var frac = Math.pow(rate1,mnth);
	var es = (a*rate)*(frac/(frac-1));
	return Math.round(es);	
}



//helper to find simple interest
function simpleInterest(p,ri){
	return (p*ri*1)/(100*12);
}
var mon=["January","Febrauary","March","April","May","June","July","August","September","October","November","December",]

function interestCal(amt,intamt,time){
	
	var op = "";
	var noOfMonths = time*12;
	var emi = getEmi(amt,intamt,noOfMonths);
	op += "<table id='main' ><tr class='yrReport'>";
	op += _html("th","MONTH");
	op += _html("th","INTEREST");
	op += _html("th","PRINCIPAL");
	op += _html("th","EMI(A+B)");
	op += _html("th","BALANCE");
	
	//get current Date
	var dt= new Date();
	 
	for(var yr=dt.getFullYear();yr<=dt.getFullYear()+parseInt(time);yr++){
			
			//these two variables used to set the starting month and ending month
			var startMonth = dt.getFullYear() == yr ? dt.getMonth() : 0;
			var endMonth = dt.getFullYear()+parseInt(time) == yr ? dt.getMonth() : 12;
			
			var yearOnSi=0;
			var yearOnPl=0;
			var yearOnemi=0;
			
			var monthReport = "<tr class='monthTbl monthInf'><td colspan='5'><table>";
		//this loop is for creating the monthly report
		for( i = startMonth; i < endMonth; i++){
			var si = Math.round(simpleInterest(amt,intamt));
			var principal = emi - si;
			amt = amt - principal > 0 ? amt - principal : 0;
			monthReport += "<tr>";
			monthReport+= _html("td",mon[i]);
			monthReport+= _html("td",si);
			monthReport+= _html("td",principal);
			monthReport+= _html("td",emi);
			monthReport+= _html("td",amt);
			monthReport += "</tr>";
			yearOnSi +=si;
			yearOnPl += principal;
			yearOnemi +=emi;
		}
		monthReport +="</table></td>"
		//add yearly report
			op += "<tr class='yrReport'>";
			op+= "<td><span onclick='exp(this)' id='spas'>&#x290B;</span>  "+yr+"</td>"
			op += _html("td",yearOnSi);
			op += _html("td",yearOnPl);
			op += _html("td",yearOnemi);
			op += _html("td",amt);
			op += "</tr>";
		//followed by monthly report
			op += monthReport;
		
	}
	op += "</table>";
	_("InterestTbl").innerHTML = op;	
}

//use nextSibling property to display the monthly report
function exp(yrRow){
	yrRow.parentNode.parentNode.nextSibling.classList.toggle("monthInf");
}

function _html(ele,cont){
	return "<"+ele+">"+cont+"</"+ele+">";

}