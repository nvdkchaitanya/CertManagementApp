import { LightningElement } from 'lwc';
import addrequest from '@salesforce/apex/CertificationRequests.addNewReq';
export default class AppUserComponentOne extends LightningElement {
    reqflag;
    
    ReqEmp;
    ReqCert;
    ReqDueDate;
    ReqComm;

    CertRecordId;
    EmpRecordId;
 
    ReqDueDateChange(event){
        this.ReqDueDate=event.target.value;
    }
    ReqCommChange(event){
        this.ReqComm=event.target.value;
    }
    handleAutoSelect(event){
        var nav=event.detail;
   
        this.VouCert=nav.selectedRecordName;
        this.CertRecordId=nav.selectedRecordId;
       
    }
    handleAutoSelect1(event){
        var emp = event.detail;
        this.ReqEmp=emp.selectedRecordName;
        this.EmpRecordId=emp.selectedRecordId;
       
    }

    reqform(){
        this.reqflag=true;
    }
    addreq(){
        addrequest({ReqEmp:this.EmpRecordId, ReqCert:this.CertRecordId, ReqDueDate:this.ReqDueDate, ReqComm:this.ReqComm}).then(result=>{if(result=='Request Added Successfully'){alert(result);window.location.reload();}else alert(result);});
    }

    closepopup(){
        this.reqflag=false;
    }



} 