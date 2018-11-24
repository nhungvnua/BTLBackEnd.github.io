const http = require('http');
const fs = require('fs');
const path = require('path');
const queryString = require('querystring');
var server = http.createServer();
const jwt = require('jsonwebtoken');

const crypto = require('crypto');
const secret = 'safasfagfwewraws';

var sessions = [];

var server = http.createServer();

server.on('request', (req,res)=>{

    if(req.url =='/')  req.url += 'trangchu.html';

    let urlParts = req.url.split('/');
    let lastUrlPart = urlParts[urlParts.length -1];
    if(lastUrlPart.split('.').length ==1) req.url + '/trangchu.html';
    
    console.log(req.url);
    let rs = fs.createReadStream(path.normalize('.'+ req.url));
    rs.pipe(res);
    rs.on('error', (error)=>{
        res.writeHead(404);
        res.end('File not found')
    });

    

    /*var url = req.url;
    if(url=='/'){
        if(req.method =="GET"){
            var cookie = req.headers.cookie;
            if (cookie){

                var token = cookie.split('=')[1];
                jwt.verify(token,secret, function(err, decoded) {
                    if(decoded){
                        res.end('Welcome' + decoded.username)
                        return;
                    }
                  });


            //     var sessionId = cookie.split('=')[1];
            //     var session = false;
            //     for(let i=0; i<sessions.length; i++){
            //         if(sessions[i].sessionId == sessionId){
            //             session = sessions[i];
            //             break;
            //         }
            //     }
            
            

            // if(session){
            //     res.end('Welcome' + session.username);
            //     return;
            // }
        }
            
            var readStream = fs.createReadStream(path.resolve(__dirname,'dangnhap','dangnhap.html'));
            readStream.pipe(res);
        }
        */
        if(req.method == "POST"){
            var body ='';
            req.on('data',data => body += data);
            req.on('end',()=>{
                var params = queryString.parse(body);

                const hash = crypto.createHmac('sha256', secret)
                   .update(params.password)
                   .digest('hex');

                
                if(params.username == 'HONGNHUNG'&& hash == '398f5fe063b9b5ea07f42b1bef0b633924f06f34a7e912b2bf227d76c93b54a3'){
                    var signature = jwt.sign({username: params.username}, secret);
                    // var sessionId = uuid();
                    // sessions.push({
                    //     sessionId: sessionId,
                    //     username: params.username
                    // });
                    res.setHeader('Set-Cookie',`access_token=${signature}`);

                    res.end('Welcome ' + params.username);
                }else{
                    res.end('Username or password is not correct!');
                }
                console.log(hash);
            });
        }
       
    }
    /*else{
        var firstUrlPecies = url.split('/')[1].toUpperCase();
        if(firstUrlPecies == 'STATIC'){
            var localPath = url.split('/');
            localPath.splice(0,1);
            var filePath = localPath.join('/');
            var readStream = fs.createReadStream(filePath);
            readStream.pipe(res);
        }
    }

}*/
);
server.listen(4000);
console.log('ok nhung');


// function uuid()
// {
//     var seed = Date.now();

//     var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
//         var r = (seed + Math.random() * 16) % 16 | 0;
//         seed = Math.floor(seed/16);

//         return (c === 'x' ? r : r & (0x3|0x8)).toString(16);
//     });

//     return uuid;
// }