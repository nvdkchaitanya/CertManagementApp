import { LightningElement,wire } from 'lwc';
import getdata from '@salesforce/apex/CertificationRequests.getAssignedRequests';
import getdata1 from '@salesforce/apex/CertificationRequests.getPassedRequests';
import getdata2 from '@salesforce/apex/CertificationRequests.getFailedRequests';
import updateRequest from '@salesforce/apex/CertificationRequests.updateRequest';

export default class AppUserComponentThree extends LightningElement {
    Requests;
    Requests1;
    Requests2;
    @wire (getdata)
    getApexData({error,data}){
        if(data){
            console.log(data);
            this.Requests=data;
           
        }
        if(error){
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

    ind;
    passedreq(event){
         
         this.ind=event.target.value;
        
         this.ReqRecordId = this.Requests[this.ind].Id;
        
        updateRequest({ReqRecordId:this.ReqRecordId,status:'Passed'}).then(result=>{if(result=='Request Updated Successfully'){alert(result);window.location.reload();}else alert(result);});
     }
    failedreq(event){
         
         this.ind=event.target.value;
         
         this.ReqRecordId = this.Requests[this.ind].Id;
       
        updateRequest({ReqRecordId:this.ReqRecordId,status:'Failed'}).then(result=>{if(result=='Request Updated Successfully'){alert(result);window.location.reload();}else alert(result);});
     }

}