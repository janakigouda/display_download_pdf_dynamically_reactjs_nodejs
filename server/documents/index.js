module.exports = (data) => {
   hash = data.result.reduce((p, c) => (p[c.date] ? p[c.date].push(c) : p[c.date] = [c], p), {}),
      newData = Object.keys(hash).map(k => ({ date: k, values: hash[k] }));
   let mode;
   let a = `<!doctype html>
               <html>
                  <head>
                     <meta charset="utf-8">
                     <title>PDF Result Template</title>
                     <style type="text/css" media="all">
                        @page {
                           size: A4;
                        } 
                        .invoice-box {
                        max-width: 800px;
                        margin: auto;
                        padding: 30px;
                        border: 1px solid #eee;
                        box-shadow: 0 0 10px rgba(0, 0, 0, .15);
                        font-size: 16px;
                        line-height: 24px;
                        date: #555;
                        page-break-after: auto;
                        }
                        .invoice-box table{
                           width: 100%;
                           text-align: left;
                        }
                        .invoice-box table tr.information thead.header{
                           display:block;
                           position: running(header);
                        }
                        @page {
                           @top{ content: element(header) }
                       }
                        .invoice-box table tr.information thead table td {
                           padding-bottom: 10px;
                        }
                        .invoice-box table tr.information table td.userid{
                           font-size:18px;
                           font-weight:bold;
                           text-align: center;
                        }
                        
                     </style>
                  </head>
                  <body>
                     <div class="invoice-box">
                        <table cellpadding="0" cellspacing="0">
                        <thead class="header">
                           <tr class="information">
                              <td colspan="2">
                                 <table>
                                    <tr>
                                       <td class="title"><img  src="data:image/png;base64,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"
                                          style="width:100%; max-width:156px;"></td>
                                       <td class="userid">
                                          ${data.post_sent.userId}
                                       </td>
                                    </tr>
                                 </table>
                              </td>
                           </tr>
                        </thead>
                        <tbody>
                                 `
                                 // outer loop
                                    for (let i = 0; i < newData.length; i++) {
                                       // checing the date
                                       if (newData[i].date == newData[i].date) {
                                          // console.log(newData[i].date);
                                          a+=`
                                          <tr class="tabs" style="margin-top:5px;">
                                                
                                          `
                                          // inner loop
                                          for (let j = 0; j < newData[i].values.length; j++) {
                                             // rturns morning and evening
                                             if (newData[i].values[j].mode === "AM") {
                                                mode = 'MORNING';
                                             }else{
                                                mode = 'EVENING';
                                             }
                                          a += `
                                                <td>
                                                   <table  style="border-bottom:1px solid gainsboro; margin-top:5px;">
                                                      <tr class="info" >
                                                         <td colspan="2">
                                                            <table>
                                                               <tr style="font-weight:bold; font-size:15px;">
                                                                  <td style="width:50%">${newData[i].values[j].soldTo}</td>
                                                                  <td style="width:50%; float:right;">${newData[i].values[j].date}</td>
                                                               </tr>
                                                            </table>
                                                         </td> 
                                                      </tr>
                                                      <tr  style="nth-child(even){background-color: #f2f2f2}">
                                                      <table style="border-collapse: collapse; border-bottom:1px solid gainsboro; margin-bottom:5px;">
                                                         <tr style="background-color:orange; color:white;">
                                                            <th> ${mode} </th>
                                                            <th> SNF </th>
                                                            <th> FAT </th>
                                                            <th> QTY </th>
                                                            <th> RATE </th>
                                                            <th> TOTAL </th>
                                                         </tr>
                                                         <tr>
                                                            <td>Cow</td>
                                                            <td>${Number(newData[i].values[j].cowSnf)}</td>
                                                            <td>${Number(newData[i].values[j].cowFat)}</td>
                                                            <td>${Number(newData[i].values[j].cowQty)}</td>
                                                            <td>${Number(newData[i].values[j].cowRate)}</td>
                                                            <td>${Number(newData[i].values[j].cowQty)*Number(newData[i].values[j].cowRate)}</td>
                                                         </tr> 
                                                         <tr>
                                                            <td>Buffalo</td>
                                                            <td>${Number(newData[i].values[j].buffSnf)}</td>
                                                            <td>${Number(newData[i].values[j].buffFat)}</td>
                                                            <td>${Number(newData[i].values[j].buffQty)}</td>
                                                            <td>${Number(newData[i].values[j].buffRate)}</td>
                                                            <td>${Number(newData[i].values[j].buffQty)*Number(newData[i].values[j].buffRate)}</td>
                                                         </tr>
                                                         <tr class="total" style="font-weight:bold; border-top:1px solid gainsboro; padding-bottom:5px;">
                                                            <td>Total</td>
                                                            <td></td>
                                                            <td></td>
                                                            <td>${Number(newData[i].values[j].cowQty)+Number(newData[i].values[j].buffQty)}</td>
                                                            <td></td>
                                                            <td>${Number(newData[i].values[j].cowQty)*Number(newData[i].values[j].cowRate)+Number(newData[i].values[j].buffQty)*Number(newData[i].values[j].buffRate)}</td>
                                                         </tr>
                                                      </table>
                                                   </table>
                                                </td>
                                             `
                                       }
                                    `</tr>`
                                    }
                                 }
                              var b=`${a}
                              </tbody>
                        </table>
                     </div>
                  </body>
               </html>
    `
    return (b);
};