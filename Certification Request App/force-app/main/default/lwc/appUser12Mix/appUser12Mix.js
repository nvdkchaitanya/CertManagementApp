import { LightningElement,wire } from 'lwc';
import addrequest from '@salesforce/apex/CertificationRequests.addNewReq';
import getdata from '@salesforce/apex/CertificationRequests.getDraftRequests';
import updateRequest from '@salesforce/apex/CertificationRequests.updateRequest';
import viewemployees from '@salesforce/apex/CertificationRequests.getAllEmployees';
import viewcertifications from '@salesforce/apex/CertificationRequests.getAllCertifications';
import addemployee from '@salesforce/apex/CertificationRequests.addNewEmp';
import deldata from'@salesforce/apex/CertificationRequests.deleteEmp';
export default class AppUser12Mix extends LightningElement {
    viewempflag;
    viewcertflag;
    viewemps() {
        this.viewempflag = true;
    }
    viewcerts() {
        this.viewcertflag = true;
    }
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
    Employees;
    Certifications;
    @wire (viewemployees)
    getApexData1({error,data}){
        if(data){
            console.log(data);
            this.Employees=data; 
        }
        if(error){
            console.log('error has occured');
        }
    }

    @wire (viewcertifications)
    getApexData2({error,data}){
        if(data){
            console.log(data);
            this.Certifications=data;
            
        }
        if(error){
            console.log('error has occured');
        }
    }
    ind;
    deleteemp(event){
        this.ind=event.target.value;
        deldata({i:this.ind});
        location.reload();
    }
   
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
        this.viewempflag=false;
        this.viewcertflag=false;
        this.empflag=false;
    }

   

    ind; 
    submitreq(event){
     
        this.ind=event.target.value;
        
        this.ReqRecordId = this.Requests[this.ind].Id;
       
       updateRequest({ReqRecordId:this.ReqRecordId,status:'Draft'}).then(result=>{if(result=='Request Updated Successfully'){alert(result);window.location.reload();}else alert(result);});
    }
    empflag;
    id;
    mail;
    ps;
    ss;
    exp;
    comm;
    addemppopup(){
        this.empflag=true;
    }
    EmpNameChange(event){
        this.Name=event.target.value;
    }
    EmpIdChange(event){
        this.id=event.target.value;
    }
    EmpMailChange(event){
        this.mail=event.target.value;
    }
    EmpPSChange(event){
        this.ps=event.target.value;
    }
    EmpSSChange(event){
        this.ss=event.target.value;
    }
    EmpExpChange(event){
        this.exp=event.target.value;
    }
    EmpCommChange(event){
        this.comm=event.target.value;
    }
    addemp(){
        addemployee({EmpName: this.Name, EmpId: this.id, EmpMail: this.mail, EmpPS: this.ps, EmpSS: this.ss, EmpExp: this.exp, EmpComm: this.comm});
        this.empflag=false;
    }



} 