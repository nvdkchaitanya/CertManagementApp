import { LightningElement,wire } from 'lwc';
import getdata from '@salesforce/apex/CertificationRequests.getDraftRequests';
import updateRequest from '@salesforce/apex/CertificationRequests.updateRequest';
export default class AppUserComponentTwo extends LightningElement {

    Requests;
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

    ind; 
    submitreq(event){
     
        this.ind=event.target.value;
        
        this.ReqRecordId = this.Requests[this.ind].Id;
       
       updateRequest({ReqRecordId:this.ReqRecordId,status:'Draft'}).then(result=>{if(result=='Request Updated Successfully'){alert(result);window.location.reload();}else alert(result);});
    }




}