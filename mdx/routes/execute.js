var http = require('http');

exports.execute = function(req,res){

    var queryString = req.body.queryString;
    var connectionString = req.body.connectionString;
    
    var respData = '';
    var options = {
        host: '127.0.0.1',
        port: 8080,
        path: '/mondrian/mdx2?queryString='+encodeURIComponent(queryString)+'&connectionString='+encodeURIComponent(connectionString)
    };

    http.get(options, function(res) {
        console.log("Got response: " + res.statusCode);

        res.on("data", function(chunk) {
            respData = respData + chunk;
        });
        
        res.on("end", function(){
            processResult(respData);
        });
        
    
    }).on('error', function(e) {
        console.log("Got error: " + e.message);
    });

    processResult = function(dataString){
    
        try{
            var data = JSON.parse(dataString);
            var lastAxis = data.axes.length - 1;
            for(var i=0; i<data.cells.length;i++)
                data.axes[lastAxis][i].values = data.cells[i].values;
    
            result = {
                axes : data.axes
            };
        }catch(e){
            result = dataString;
        }finally{
            res.send(result);
        }
    }    
}

