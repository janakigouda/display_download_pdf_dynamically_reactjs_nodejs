const express = require('express');
const https=require('https');

const app = express();


https.get('https://134.209.144.127/cowsoncloud/api2/cow_records.php', (res) => {
  console.log('statusCode:', res.statusCode);
  console.log('headers:', res.headers);

  res.on('data', (d) => {
    process.stdout.write(d);
  });

}).on('error', (e) => {
  console.error(e);
});

// app.get('/',(req,res)=>{

//     const url="https://134.209.144.127/cowsoncloud/api2/cow_records.php?userId=8884515968-Suresh-27&func_name=getPassBookRecord";
//     https.get(url,function(response){
//         console.log(response);
//     })
//     res.send("server is running");
// })


app.listen('5001',function(req,res){
    console.log("server is running");
})