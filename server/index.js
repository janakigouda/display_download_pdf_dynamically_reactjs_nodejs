const express = require('express');
const bodyParser = require('body-parser');
const pdf = require('html-pdf');
const cors = require('cors');

const request = require('request');
var querystring = require('querystring');

const pdfTemplate = require('./documents/index1');

const app = express();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/create-pdf', (req, res) => {
    var form = {
        func_name: "getPassBookRecord",
        userId: "8884515968-Suresh-27"
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
        const data = JSON.parse(body)
            pdf.create(pdfTemplate(data), {}).toFile('result.pdf', (err) => {
            if (err) {
                res.send(Promise.reject());
            }
            res.send(Promise.resolve());
            });
    });
})
app.get('/fetch-pdf', (req, res) => {
    res.sendFile(`${__dirname}/result.pdf`);
})

app.post('/getDairyRecords', (req, res) => {
    res.status(200).json({
        "path": `${__dirname}/result.pdf`,

    })
})

app.listen(port, () => console.log(`Listening on port ${port}`));