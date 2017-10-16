angular.module('mainApp').controller('Ctrl',function($http,$scope){




     $scope.Submit = function(){

          $http.post('/table',{year : $scope.year, week: $scope.week},{
               headers:{
                 'Content-Type': 'application/json'
                 
               }
          }).success(function(response){
               console.log(response);
               $scope.consumptions = response;
          }).error(function(error){
               console.log(error);
          });
     }

    Date.prototype.getWeekNumber = function(){
       var d = new Date(Date.UTC(this.getFullYear(), this.getMonth(), this.getDate()));
       var dayNum = d.getUTCDay() || 7;
       d.setUTCDate(d.getUTCDate() + 4 - dayNum);
       var yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
       return Math.ceil((((d - yearStart) / 86400000) + 1)/7)
     };


     $scope.myDate = new Date();
     

     $scope.initialise= function(){
          $scope.year=$scope.myDate.getFullYear();
          $scope.week= $scope.myDate.getWeekNumber();
          $http.post('/table',{year : $scope.myDate.getFullYear(), week: $scope.myDate.getWeekNumber()},{
               headers:{
                 'Content-Type': 'application/json'
                 
               }
          }).success(function(response){
               console.log(response);
               $scope.consumptions = response;
          }).error(function(error){
               console.log(error);
          });
     }

     $scope.initialiseFields = function(){
        $scope.week = $scope.myDate.getWeekNumber();
        $scope.year = $scope.myDate.getFullYear();
     }


});