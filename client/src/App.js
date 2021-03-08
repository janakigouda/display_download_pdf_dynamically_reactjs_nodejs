import React, { Component } from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';
// import { Document, Page, pdfjs } from 'react-pdf';

import './App.css';

class App extends Component {
  state = {
    name: '',
    receiptId: 0,
    price1: 0,
    price2: 0,
  }

  // handleChange = ({ target: { value, name } }) => this.setState({ [name]: value })

  createAndDownloadPdf = () => {
    axios.post('/create-pdf')
      .then(() => axios.get('fetch-pdf', { responseType: 'blob' }))
      .then((res) => {
        const pdfBlob = new Blob([res.data], { type: 'application/pdf' });

        saveAs(pdfBlob, 'newPdf.pdf');
      })
  }

  createAndPreviewPdf = async () => {
    axios.post('/create-pdf')
      .then(() => axios.get('fetch-pdf', { responseType: 'blob' }))
      .then(response => {
        //Create a Blob from the PDF Stream
        const file = new Blob([response.data], {
          type: "application/pdf"
        });
        console.log(file);
        //Build a URL from the file
        const fileURL = URL.createObjectURL(file);
        //Open the URL on new Window
        // console.log(fileURL);

        window.open(fileURL);
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    return (
      <div className="App">
        {/* <input type="text" placeholder="Name" name="name" onChange={this.handleChange} />
        <input type="number" placeholder="Receipt ID" name="receiptId" onChange={this.handleChange} />
        <input type="number" placeholder="Price 1" name="price1" onChange={this.handleChange} />
        <input type="number" placeholder="Price 2" name="price2" onChange={this.handleChange} /> */}
        <button onClick={this.createAndDownloadPdf}>Download PDF</button>
        <button onClick={this.createAndPreviewPdf}>Preview PDF</button>
      </div>
    );
  }
}

export default App;
