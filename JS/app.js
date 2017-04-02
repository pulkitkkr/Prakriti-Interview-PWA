var myApp = angular.module('Prakriti',['ngStorage']);
var ValidUsers=['Aash01','Deep02','Hard03','Harsh04','Laksh05','Parul06','PranG07','Pranj08','Sap09','Soha10','Viks11','PJ12'];
var CurrentDetail={};

myApp.controller('WelcomeCtrl', ['$localStorage','$rootScope',function ($localStorage,$rootScope) {
 	this.VerifyUser = function(){
 		var Verified_User=false;
 		if(this.data){
 			var parm1 = this.data;
 			ValidUsers.forEach(function(entry){
 				if(entry==parm1){
 					Verified_User=true;
 					CurrentDetail.Password=parm1;
 					//console.log("User Verified");
 					$rootScope.ShowWelcome = false;
 					$rootScope.BasicQues = true;
 					$rootScope.FinalQues = false;
 					$rootScope.Thanks = false;
 					$rootScope.Export = false;
 					$rootScope.DataDelete = false;
 				}
 				else{
 				//	console.log("Checked "+parm1+" with "+entry+" User Doesn't Exist");
 				}
 			});
 		}
 		else{
 			alert("Please Enter Interviewer's Password in Password Field");
 		}
 		if(!Verified_User){
 			alert("User Doesnt Exist");
 		}
 		
 	};
}]);
myApp.controller('DeleteCtrl', ['$localStorage','$rootScope', function ($localStorage,$rootScope) {
	this.deleteAll = function(){
		if(this.pwd==='pk9711187234')	{
		delete $localStorage.AllUsers;
		console.log("AllUser :"+$localStorage.AllUsers);
		alert('All Locally Stored Interviews Deleted');
		
 		$rootScope.BasicQues = true;
 		
 		$rootScope.Thanks = false;
 		$rootScope.Export = false;
 		$rootScope.DataDelete = false;
	}
	else{
		alert('You Entered Wrong Master Password');
	}

	};

	
}]);
myApp.controller('navCtrl', ['$rootScope', function ($rootScope) {
	this.homeClicked = function(){
	
 		$rootScope.BasicQues = true;
   		 
 		$rootScope.Thanks = false;
 		$rootScope.Export = false;
 		$rootScope.DataDelete = false;
 		CurrentDetail={};
	};
	this.exportClicked = function(){
		 
 		$rootScope.BasicQues = false;
   		 
 		$rootScope.Thanks = false;
 		$rootScope.Export = true;
 		$rootScope.DataDelete = false;
 		CurrentDetail={};
	};
	this.deleteAll= function(){
		 
 		$rootScope.BasicQues = false;
   	 
 		$rootScope.Thanks = false;
 		$rootScope.Export = false;
 		$rootScope.DataDelete = true;

	}
	
}]);
myApp.controller('ThanksCtrl', [ '$rootScope', function ($rootScope) {
	this.Reset = function(){
		
 		$rootScope.BasicQues = true;
   		
 		$rootScope.Thanks = false;
 		$rootScope.Export = false;
 		$rootScope.DataDelete = false;
 		CurrentDetail={};
	};
	
}]);
myApp.controller('BasicCtrl', ['$localStorage','$rootScope', function ($localStorage,$rootScope) {

	var ControllerScope = this;
	this.Reset = function(){
		$rootScope.ShowWelcome = true;
 		$rootScope.BasicQues = false;
   		$rootScope.FinalQues = false;
 		$rootScope.Thanks = false;
 		$rootScope.Export = false;
 		$rootScope.DataDelete = false;
 		CurrentDetail={};
	};

	this.VerifyFinal = function(){

			CurrentDetail.UID = ControllerScope.Basic.UID;
			CurrentDetail.interview = ControllerScope.Basic.interview;
			
			CurrentDetail.Name = ControllerScope.Basic.Name;
			CurrentDetail.Confidence = $( "input[name='confidence']:checked" ).val();
			CurrentDetail.SpeakingSkills = $( "input[name='speak']:checked" ).val();
			CurrentDetail.Knowledge = $( "input[name='knowledge']:checked" ).val();
			CurrentDetail.Responsibility = $( "input[name='responsibility']:checked" ).val();
			CurrentDetail.TimeDevotion = $( "input[name='time']:checked" ).val();
			CurrentDetail.WorkDevotion = $( "input[name='work']:checked" ).val();
			CurrentDetail.Overall = $( "input[name='overall']:checked" ).val();
			CurrentDetail.Comments = ControllerScope.Comments;
			
		    if(!$localStorage.AllUsers){
				$localStorage.AllUsers =[{Name:"TestUser",UID:"Test001",interview:"TestDepartment",Confidence:"-1",SpeakingSkills:"-1",Knowledge:"-1",Responsibility:"-1",TimeDevotion:"-1",WorkDevotion:"-1",Overall:"-1",Comments:"Test Comments"}];
				console.log($localStorage.AllUsers);
			}
			var all = $localStorage.AllUsers;
			console.log("all: "+ all);
			all.push(CurrentDetail);
			console.log("all after Push: "+ all);
			$localStorage.AllUsers = all;
			console.log("all after local Push: "+ $localStorage.AllUsers);
			;
 			$rootScope.BasicQues = false;
 		    $rootScope.Thanks = true;
 			$rootScope.Export = false;
 			$rootScope.DataDelete = false;
 			CurrentDetail={};
		
	};	

	
}]);  
myApp.controller('ExportCtrl', ['$localStorage','$rootScope',function ($localStorage,$rootScope) {
	
	this.exportData = function () {

		if(!$localStorage.AllUsers){
			alert("No Data To Export");
		}
		else{
			console.log($localStorage.AllUsers);
			alasql('SELECT * INTO XLSX("PrakritiInterview.xlsx",{headers:true}) FROM ?',[$localStorage.AllUsers]);
		}
  	};
	
}]); 
myApp.controller('FinalCtrl', ['$localStorage','$rootScope', function ($localStorage,$rootScope) {
	
	
}]);

