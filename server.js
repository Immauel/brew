
//Initiallising node modules
var express = require("express");
var bodyParser = require("body-parser");
var logger = require('morgan'); 
var sql = require("mssql");  
var app = express(); 
var moment = require('moment');
var math = require('mathjs');

// Body Parser Middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(logger('dev'));  


//CORS Middleware
app.use(function (req, res, next) {
    //Enabling CORS 
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization");
    next();
});
var config = {
    "user": 'sa',
    "password": 'immanueli190813fF@',
    "server": '127.0.0.1',
    "database": 'Brew',
    "port": '49163',
    "dialect": "mssql",
    "dialectOptions": {
        "instanceName": "SQLEXPRESS"
    },
    "options": {
      "encrypt": true
    }
};

//Function to connect to database and execute query

//@param query (String) callback (function)
var executeQuery = function(query,callback){
	//if the connection is already open close it
	if(sql){
		sql.close();
	}
	//openning a new connection
	sql.connect(config,function(err){
		if(err){
			console.log(err);
			callback(err);
		}
		else{
			//new request
			var request = new sql.Request();

			request.query(query,function(err,results){
				if(err){
					console.log(err);
					callback(err);
				}
				else{
					callback(null,results)
				}
			});
			
		}

	});
}

var comsu = function(Oname,coms,limit){
	 var odays=[];
	 var day = {};
	 var defaultColor ="#699064";

	for(var s =0;s<coms.length;s++){
		day = {};
		 switch(Oname){
		
	 	case "NaOH_1_LH1_KPI":
	 		if( math.compare(coms[s].NaOH_1_LH1_KPI,limit) !=-1){
				day.color = "red";
				
			}
			else{
				day.color = defaultColor;
			}
			//console.log(math.compare(coms[s].NaOH_1_LH1_KPI,limit));
			day.value = coms[s].NaOH_1_LH1_KPI;
			odays[s] = day;
	 		break;
	 	case "NaOH_1_LH2_KPI":
	 		if(math.compare(coms[s].NaOH_1_LH2_KPI,limit)!=-1){
				day.color = "red";
			}
			else{
				day.color = defaultColor;
			}
			//console.log(math.compare(coms[s].NaOH_1_LH2_KPI,limit));
			day.value = coms[s].NaOH_1_LH2_KPI;
			odays[s] = day;
	 		break;
	 	case "NaOH_1_LH3_KPI":
	 		if(math.compare(coms[s].NaOH_1_LH3_KPI,limit)!=-1){
				day.color = "red";
			}
			else{
				day.color = defaultColor;
			}
			//console.log(math.compare(coms[s].NaOH_1_LH3_KPI,limit));
			day.value = coms[s].NaOH_1_LH3_KPI;
			odays[s] = day;
	 		break;
	 	case "NaOH_1_LH5_KPI":
	 		if(math.compare(coms[s].NaOH_1_LH5_KPI,limit)!=-1){
				day.color = "red";
			}
			else{
				day.color = defaultColor;
			}
			//console.log(math.compare(coms[s].NaOH_1_LH5_KPI,limit));
			day.value = coms[s].NaOH_1_LH5_KPI;
			odays[s] = day;
	 		break;
	 	case "NaOH_1_LH8_KPI":
	 		if(math.compare(coms[s].NaOH_1_LH8_KPI,limit)!=-1){
				day.color = "red";
			}
			else{
				day.color = defaultColor;
			}

			//console.log(math.compare(coms[s].NaOH_1_LH8_KPI,limit));
			day.value = coms[s].NaOH_1_LH8_KPI;
			odays[s] = day;
	 		break;
	 	case "NaOH_1_Regen_1_KPI":
	 		if(math.compare(coms[s].NaOH_1_Regen_1_KPI,limit)!=-1){
				day.color = "red";
			}
			else{
				day.color = defaultColor;
			}
			day.value = coms[s].NaOH_1_Regen_1_KPI;
			odays[s] = day;
	 		break;
	 	case "NaOH_1_Regen_2_KPI":
	 		if(math.compare(coms[s].NaOH_1_Regen_2_KPI,limit)!=-1){
				day.color = "red";
			}
			else{
				day.color = defaultColor;
			}
			day.value = coms[s].NaOH_1_Regen_2_KPI;
			odays[s] = day;
	 		break;
	 	case "NaOH_1_PALL_KPI":
	 	if(math.compare(coms[s].NaOH_1_PALL_KPI,limit)!=-1){
				day.color = "red";
			}
			else{
				day.color = defaultColor;
			}
			day.value = coms[s].NaOH_1_PALL_KPI;
			odays[s] = day;
	 		break;
	 	case "NaOH_BH_Total_KPI":
	 	    if(math.compare(coms[s].NaOH_BH_Total_KPI*100000,limit*100000)!=-1){
				day.color = "red";
			}
           	else{
				day.color = defaultColor;
			}
			day.value = coms[s].NaOH_BH_Total_KPI;
			odays[s] = day;
	 		break;
	 		
	 }
	  odays[s].EndDate=coms[s].EndDate
		
	}
	//console.log(limit);
	var finalObject = new Object();
	finalObject.name = Oname;
	finalObject.limit= limit;
	finalObject.days=odays;

	return finalObject;
}

app.post('/table', function(req,res){

	firstDay = new Date(req.body.year, 0, 1).getDay();
	console.log(firstDay);
	var year = req.body.year;
	var week = req.body.week;
	var d = new Date("Jan 01, "+year+" 01:00:00");
	var w = d.getTime() -(3600000*24*(firstDay-1))+ 604800000 * (week-1)
	var n1 = new Date(w);
	var n2 = new Date(w + 518400000)
    var startDate = moment(n1).format('YYYY-MM-DD HH:mm:ss');
    var endDate = moment(n2).format('YYYY-MM-DD HH:mm:ss');

    console.log(endDate+" s: "+startDate);

	executeQuery("select * from iis_Chemical_Consumption_PLAY where EndDate >= '"+startDate+"' and EndDate <= '"+endDate+"' order by EndDate ASC", function(err,result){
		if(err){
			res.send(err);

		}
		else{
			
			var consumptions = result.recordset;

			executeQuery("select * from iis_ConsumptionLimits", function(err,resl){
				var limits = resl.recordset;
                
                var finalResults = [];
                finalResults[0] = comsu("NaOH_1_LH1_KPI",consumptions,limits[0].MaxValue);
                finalResults[1] = comsu("NaOH_1_LH2_KPI",consumptions,limits[1].MaxValue);
                finalResults[2] = comsu("NaOH_1_LH3_KPI",consumptions,limits[2].MaxValue);
                finalResults[3] = comsu("NaOH_1_LH5_KPI",consumptions,limits[3].MaxValue);
                finalResults[4] = comsu("NaOH_1_LH8_KPI",consumptions,limits[4].MaxValue);
                finalResults[5] = comsu("NaOH_1_Regen_1_KPI",consumptions,limits[5].MaxValue);
                finalResults[6] = comsu("NaOH_1_Regen_2_KPI",consumptions,limits[6].MaxValue);
                finalResults[7] = comsu("NaOH_1_PALL_KPI",consumptions,limits[7].MaxValue);
                finalResults[8] = comsu("NaOH_BH_Total_KPI",consumptions,limits[8].MaxValue);

                var ffresult =[];

                for(var a =0;a<finalResults.length;a++){
                	var flag = 0;
                	for(var c=0;c<finalResults[a].days.length;c++){
                		if(finalResults[a].days[c].color==='red'){
                			flag++;
                		}
                	}

                	if(flag>0){

                		ffresult.push(finalResults[a]);
                	}

                	flag =0;
                }

                res.send(ffresult);

			});

		}
	})
});

//Routes
//app.use('/api',require('./routes/api.js'));

//Pages
app.use(express.static(__dirname+"/public"));

var server = app.listen(8080, function () {
    console.log('Server is running.. At port 8080');
});