const express = require('express');
const app = express();
const request = require('request');
var querystring = require('querystring');

app.get('/', (req, res) => {
    var form= {
                func_name: "getPassBookRecord",
                userId: "8884515968-Suresh-27"
                // from_date :"17-02-2021",
                // to_date: "17-02-2021"
            }
    
    var formData = querystring.stringify(form);
    var contentLength = formData.length;
    
    request({
        headers: {
          'Content-Length': contentLength,
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        uri: 'http://www.cowsoncloud.com//cowsoncloud/api2/cow_records.php',
        body: formData,
        method: 'POST'
      }, function (err, response, body) {
          const data=JSON.parse(body)

          hash = data.result.reduce((p,c) => (p[c.date] ? p[c.date].push(c) : p[c.date] = [c],p) ,{}),
          newData = Object.keys(hash).map(k => ({date:k,value: hash[k]}));
          // var a=JSON.stringify(newData,null,2);
          // console.log(JSON.stringify(a[0],null, 2))
          res.send(newData);
          // var abc=a[0].value[0].id;
          // console.log(abc);

          // res.send(a)
        //   pdf.create(pdfTemplate(data), {}).toFile('result.pdf', (err) => {
        //     if(err) {
        //         res.send(Promise.reject());
        //     }
        //     res.send(Promise.resolve());
        // });

        
        // res.send(a);
        // res.status(200).json(data);
      });
})


app.listen('5001', function (req, res) {
    console.log("server is running");
})