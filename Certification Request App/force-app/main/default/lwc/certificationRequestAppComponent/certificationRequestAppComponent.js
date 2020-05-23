import { LightningElement,wire,api,track } from 'lwc';
import getdata from '@salesforce/apex/CertificationRequests.getAllRequests';
import addemployee from '@salesforce/apex/CertificationRequests.addNewEmp';
import addcertification from '@salesforce/apex/CertificationRequests.addNewCert';
import addvoucher from '@salesforce/apex/CertificationRequests.addNewVou';
import addrequest from '@salesforce/apex/CertificationRequests.addNewReq';
import updateRequest from '@salesforce/apex/CertificationRequests.updateRequest';

export default class CertificationRequestAppComponent extends LightningElement {

    Requests;
    empflag;
    certflag;
    vouflag;
    reqflag;
    openlookup;
    
    EmpName;
    EmpId;
    EmpMail;
    EmpPS;
    EmpSS;
    EmpExp;
    EmpComm;

    CertName;
    CertId;
    CertCost;
    CertComm;

    VouId;
    VouCost;
    VouValid;
    VouCert;
    VouComm;

    ReqEmp;
    ReqCert;
    ReqDueDate;
    ReqComm;

    CertRecordId;
    EmpRecordId;

    EmpNameChange(event){
        this.EmpName=event.target.value;
    }
    EmpIdChange(event){
        this.EmpId=event.target.value;
    }
    EmpMailChange(event){
        this.EmpMail=event.target.value;
    }
    EmpPSChange(event){
        this.EmpPS=event.target.value;
    }
    EmpSSChange(event){
        this.EmpSS=event.target.value;
    }
    EmpExpChange(event){
        this.EmpExp=event.target.value;
    }
    EmpCommChange(event){
        this.EmpComm=event.target.value;
    }

    CertNameChange(event){
        this.CertName=event.target.value;
    }
    CertIdChange(event){
        this.CertId=event.target.value;
    }
    CertCostChange(event){
        this.CertCost=event.target.value;
    }
    CertCommChange(event){
        this.CertComm=event.target.value;
    }

    VouIdChange(event){
        this.VouId=event.target.value;
    }
    VouCostChange(event){
        this.VouCost=event.target.value;
    }
    VouValidChange(event){
        this.VouValid=event.target.value;
        this.openlookup=true;
    }
 
    VouCommChange(event){
        this.VouComm=event.target.value;
    }

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
       // alert(this.VouCert);
        //alert(this.CertRecordId);
    }
    handleAutoSelect1(event){
        var emp = event.detail;
        this.ReqEmp=emp.selectedRecordName;
        this.EmpRecordId=emp.selectedRecordId;
       // alert(this.ReqEmp);
       // alert(this.EmpRecordId);
    }
    
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
    
    empform(){
       // alert('Button Working');
        this.empflag=true;
    }

    certform(){
       // alert('Cert Button Working');
        this.certflag=true;
    }

    vouform(){
       
        this.vouflag=true;
      
    }

    reqform(){
        this.reqflag=true;
        //this.openlookup=true;
    }

    addemp(){
       
        addemployee({EmpName:this.EmpName, EmpId:this.EmpId, EmpMail:this.EmpMail, EmpPS:this.EmpPS, EmpSS:this.EmpSS, EmpExp:this.EmpExp, EmpComm:this.EmpComm});
        this.empflag=false;
        location.reload();
       
    }

    addcert(){
        
        addcertification({CertName:this.CertName, CertId:this.CertId, CertCost:this.CertCost, CertComm:this.CertComm});
        this.certflag=false;
        location.reload();
       // alert('Certification Added Successfully');
    }

    addvou(){
        //alert(this.VouId+' '+this.VouCost+' '+this.VouCert);
        addvoucher({VouId:this.VouId, VouCost:this.VouCost, VouValid:this.VouValid, VouCert:this.CertRecordId, VouComm:this.VouComm}).then(result=>{if(result=='Voucher Added Successfully'){alert(result);}else alert(result);});
        
        this.vouflag=false;
       
    }

    addreq(){
        //alert(this.ReqEmp+' '+this.VouCert);
        addrequest({ReqEmp:this.EmpRecordId, ReqCert:this.CertRecordId, ReqDueDate:this.ReqDueDate, ReqComm:this.ReqComm}).then(result=>{if(result=='Request Added Successfully'){alert(result);window.location.reload();}else alert(result);});
        
    }

    closepopup(){
        this.empflag=false;
        this.certflag=false;
        this.vouflag=false;
        this.reqflag=false;
        this.openlookup=false;
    }

    ind;
    submitreq(event){
       // alert('button working');
        this.ind=event.target.value;
        //alert('index : '+this.ind);
        this.ReqRecordId = this.Requests[this.ind].Id;
       // alert('Record Id : '+this.ReqRecordId);
       updateRequest({ReqRecordId:this.ReqRecordId,status:'Submitted'}).then(result=>{if(result=='Request Updated Successfully'){alert(result);window.location.reload();}else alert(result);});
    }

    rejectreq(event){
        // alert('button working');
         this.ind=event.target.value;
         //alert('index : '+this.ind);
         this.ReqRecordId = this.Requests[this.ind].Id;
        // alert('Record Id : '+this.ReqRecordId);
        updateRequest({ReqRecordId:this.ReqRecordId,status:'Rejected'}).then(result=>{if(result=='Request Updated Successfully'){alert(result);window.location.reload();}else alert(result);});
     }
     
     approvereq(event){
        // alert('button working');
         this.ind=event.target.value;
         //alert('index : '+this.ind);
         this.ReqRecordId = this.Requests[this.ind].Id;
        // alert('Record Id : '+this.ReqRecordId);
        updateRequest({ReqRecordId:this.ReqRecordId,status:'Approved'}).then(result=>{if(result=='Request Updated Successfully'){alert(result);window.location.reload();}else alert(result);});
     }


    




    
}