/** This is how to make a simple Server
const http = require('http')
const fs = require('fs')

const server =http.createServer((req, res)=>{
      const url = req.url
      res.setHeader("Content-Type", "text/html; charset=utf-8")

      if( url === '/'){
            fs.readFile('./index.html', null , (error,data)=>{
            if(error){
                  res.setHeader(404);
                  res.write("Whoops! File not Found!");
            }else{
                  res.write(data);
                  console.log('Index File found')
            }
            res.end();
      });
         
      } else if( url === "/fbw9"){
            fs.readFile('./indexFBW.html' , null , (error,data)=>{
                  if(error){
                        res.setHeader(404);
                        res.write("FBW9 Seite nicht gefunden");
                  }else{
                        res.write(data)
                        console.log('FBW9 Seite wurde gefunden')
                  }
            res.end()
            });
           
      }else{
            res.statusCode = 404
            res.write(`Unter ${url} gibt es keine Seite, geh bitte auf <a href="/">Startseite</a>`)
            res.end()
      }
})
server.listen(3000, (err) =>{

      if(err){
            return console.log('fehler', err)
      }
      console.log('Server running at Port 3000')
})
*/


/** Using Path
const http = require('http')
const fs = require('fs')
function sendFile(path, res){
      fs.readFile( path,(err,data)=>{
            if(err){
                  res.statusCode = 404
                  return res.end(`Die Datei ${path} wurde nicht gefunden, geh bitte auf <a href="/"`)
            }
            res.end(data)
      })

}


const server =http.createServer((req, res)=>{
      const url = req.url
      res.setHeader("Content-Type", "text/html; charset=utf-8")

      if( url === '/'){
         sendFile('./index.html', res)
      } else if( url === "/fbw9"){
         sendFile('./indexFBW.html', res)
            }
})
server.listen(3000, (err) =>{

      if(err){
            return console.log('fehler', err)
      }
      console.log('Server running at Port 3000')
})
*/


const http = require('http')
const fs = require('fs')
const port = 3001
// write 
const writer = fs.createWriteStream
//this is how to set stream to get user he answer
function sendFile(path, res){
      const fileReader = fs.createReadStream(path)
      fs.readFile( path,(err,data)=>{
            //i'll get error 404 if i didn't found the file
            if(err){
                  res.statusCode = 404
                  return res.end(`Die Datei ${path} wurde nicht gefunden, geh bitte auf <a href="/"`)
            }
            res.end(data)
      })
      //to send user our datas using pipw
      fileReader.pipe(res)

}


const server =http.createServer((req, res)=>{
      const url = req.url
      res.setHeader("Content-Type", "text/html; charset=utf-8")
      res.setHeader("Access-Control-Allow-Origin", "*")
      res.setHeader("Access-Control-Allow-Methods", "GET, PUT , POST, DELETE, HEAD")


      if( url === '/'){
        // sendFile('./index.html', res)
        const myJSON = {
              //to send my JSNO message =>
              message: "Ich komme aus dem Mars Planet!"
        }
        res.end(JSON.stringify(myJSON))
      } 
      else if (url === "/main"){
            sendFile('./index.html' ,res)
      }
      //this is how to get fbw9 file
      else if( url === "/fbw9"){
         sendFile('./indexFBW.html', res)
            } 
            //this is how to get all images =>
            else if( url.includes ('/images')){
                  console.log("load file", url)
             res.setHeader("Content-Type", "image/jpeg")
             sendFile( '.' + url , res)
            }
            //to save out datas using chun!!!
            else if( url ==='/send-data'){
                  Request.on('data', chunk =>{
                        fs.appendFile('dataStorage.txt' ,chunk)
                  })

            }
            //otherwidse i'll get an error and let youknow to go nback to the main sites!!! 
            else {
                  res.statusCode = 404
                  res.end(`Unter ${url} gibt es keine Seite, geh bitte auf <a href="/">Startseite</a>`)
              }

})

//this is how to set my port!!!
server.listen(port, (err) =>{

      if(err){
            return console.log('fehler', err)
      }
      console.log('Server running at Port' + port)
})