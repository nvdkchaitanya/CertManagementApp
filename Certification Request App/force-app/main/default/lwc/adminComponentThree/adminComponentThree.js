import { LightningElement, wire } from 'lwc';
import getdata from '@salesforce/apex/CertificationRequests.getApprovedRequests';
import getdata1 from '@salesforce/apex/CertificationRequests.getRejectedRequests';
import getdata2 from '@salesforce/apex/CertificationRequests.getAssignedRequests';
export default class AdminComponentThree extends LightningElement {
    Requests;
    Requests1;
    Requests2;
    @wire(getdata)
    getApexData({ error, data }) {
        if (data) {
            console.log(data);
            this.Requests = data;
           
        }
        if (error) {
            console.log('error has occured');
        }
    }

    @wire(getdata1)
    getApexData1({ error, data }) {
        if (data) {
            console.log(data);
            this.Requests1 = data;
          
        }
        if (error) {
            console.log('error has occured');
        }
    }

    @wire(getdata2)
    getApexData2({ error, data }) {
        if (data) {
            console.log(data);
            this.Requests2 = data;
            
        }
        if (error) {
            console.log('error has occured');
        }
    }


}