//to get api from unsplash to get random photos
const axios = require('axios') 
const http = require('http')
/** 
axios.get('https://swapi.co/api/people')
.then(response => response.data)
.then(data =>[
      console.log(data.count, data.results[0].name)
])
*/
const server = http.createServer((request, response) =>{
      axios.get('https://api.unsplash.com/photos/random?client_id=9624beb9b648caaab1465b0983e7566803df207583239dc0f0c5383f78dd1a03')
      .then(response => response.data)
      .then(data=> {
            response.setHeader('content-type' , 'text/html; charset=utf-8')
            response.end(`<img src="${data.urls.regular}">`)
      })
      
})
server.listen(3000)