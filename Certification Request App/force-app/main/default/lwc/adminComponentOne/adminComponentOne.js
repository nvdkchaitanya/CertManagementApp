import { LightningElement,wire } from 'lwc';
import addemployee from '@salesforce/apex/CertificationRequests.addNewEmp';
import addcertification from '@salesforce/apex/CertificationRequests.addNewCert';
import addvoucher from '@salesforce/apex/CertificationRequests.addNewVou';
import viewemployees from '@salesforce/apex/CertificationRequests.getAllEmployees';
import viewcertifications from '@salesforce/apex/CertificationRequests.getAllCertifications';
import viewvouchers from '@salesforce/apex/CertificationRequests.getAllVouchers';
import deldata from'@salesforce/apex/CertificationRequests.deleteEmp';
import deldata1 from '@salesforce/apex/CertificationRequests.deletecert';
import updateE from '@salesforce/apex/CertificationRequests.updEmp';

export default class AdminComponentOne extends LightningElement {
    empflag;
    certflag;
    vouflag;

    viewempflag;
    viewcertflag;
    viewvouflag;

    Employees;
    Certifications;
    Vouchers;

    @wire (viewemployees)
    getApexData({error,data}){
        if(data){
            console.log(data);
            this.Employees=data;
            
        }
        if(error){
            console.log('error has occured');
        }
    }

    @wire (viewcertifications)
    getApexData1({error,data}){
        if(data){
            console.log(data);
            this.Certifications=data;
            
        }
        if(error){
            console.log('error has occured');
        }
    }

    @wire (viewvouchers)
    getApexData2({error,data}){
        if(data){
            console.log(data);
            this.Vouchers=data;
           
        }
        if(error){
            console.log('error has occured');
        }
    }

    viewemps() {
        this.viewempflag = true;
    }

    viewcerts() {
        this.viewcertflag = true;
    }
    viewvous() {
        this.viewvouflag = true;
    }

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

    CertRecordId;

    EmpNameChange(event) {
        this.EmpName = event.target.value;
    }
    EmpIdChange(event) {
        this.EmpId = event.target.value;
    }
    EmpMailChange(event) {
        this.EmpMail = event.target.value;
    }
    EmpPSChange(event) {
        this.EmpPS = event.target.value;
    }
    EmpSSChange(event) {
        this.EmpSS = event.target.value;
    }
    EmpExpChange(event) {
        this.EmpExp = event.target.value;
    }
    EmpCommChange(event) {
        this.EmpComm = event.target.value;
    }

    CertNameChange(event) {
        this.CertName = event.target.value;
    }
    CertIdChange(event) {
        this.CertId = event.target.value;
    }
    CertCostChange(event) {
        this.CertCost = event.target.value;
    }
    CertCommChange(event) {
        this.CertComm = event.target.value;
    }

    VouIdChange(event) {
        this.VouId = event.target.value;
    }
    VouCostChange(event) {
        this.VouCost = event.target.value;
    }
    VouValidChange(event) {
        this.VouValid = event.target.value; 
        this.openlookup = true;
    }

    VouCommChange(event) {
        this.VouComm = event.target.value;
    }

    handleAutoSelect(event) {
        
        var nav = event.detail; 
        this.VouCert = nav.selectedRecordName;
        this.CertRecordId = nav.selectedRecordId;
        
    }

    empform() {
       
        this.empflag = true;
    }

    certform() {
       
        this.certflag = true;
    }

    vouform() {
     
        this.vouflag = true;
        
    }


    addemp() {
        
        addemployee({ EmpName: this.EmpName, EmpId: this.EmpId, EmpMail: this.EmpMail, EmpPS: this.EmpPS, EmpSS: this.EmpSS, EmpExp: this.EmpExp, EmpComm: this.EmpComm }).then(result => { if (result == 'Employee Created Successfully') { alert(result); } else alert(result); });
        this.empflag = false;
        window.location.reload();
        
    }

    addcert() {
        
        addcertification({ CertName: this.CertName, CertId: this.CertId, CertCost: this.CertCost, CertComm: this.CertComm }).then(result => { if (result == 'Certification Created Successfully') { alert(result); } else alert(result); });
        this.certflag = false;
        window.location.reload();
        
    }

    addvou() {
        
        addvoucher({ VouId: this.VouId, VouCost: this.VouCost, VouValid: this.VouValid, VouCert: this.CertRecordId, VouComm: this.VouComm }).then(result => { if (result == 'Voucher Added Successfully') { alert(result); } else alert(result); });

        this.vouflag = false;
        window.location.reload();
        
    }

    closepopup() {
        this.empflag = false;
        this.certflag = false;
        this.vouflag = false;
        this.viewvouflag=false;
        this.viewempflag=false;
        this.viewcertflag=false;
        
    }
    ind;
    deleteemp(event){
        this.ind=event.target.value;
        deldata({i:this.ind});
        location.reload();
    }
    deletecert(event){
        this.ind=event.target.value;
        deldata1({i:this.ind});
        location.reload();
    }
    updempflag;
    index;
    updemp(event){
        //alert("COOL1");
        this.index=event.target.value;
        //alert("Index is  "+this.index);
        this.EmpName=this.Employees[this.index].Name;
        //alert("COOL2");
        this.EmpId=this.Employees[this.index].Employee_ID__c;
        //alert("COOL3");
        this.EmpMail=this.Employees[this.index].Mail_ID__c;
        //alert("COOL4");
        this.EmpPS=this.Employees[this.index].Primary_Skill__c;
        //alert("COOL5");
        this.EmpSS=this.Employees[this.index].Secondary_Skill__c;
        //alert("COOL6");
        this.EmpExp=this.Employees[this.index].Experience__c;
        //alert("COOL7");
        this.EmpComm=this.Employees[this.index].Comments__c;
        alert("COOL111");
        this.updempflag=true;
        
    }
    updateEmp(){
        alert("Hello");
        updateE({empname:this.EmpName,empid:this.Empid,empmail:this.EmpMail,empps:this.EmpPS,empss:this.EmpSS,empexp:this.EmpExp,empcomm:this.EmpComm});
       
        this.updempflag=false;
        
        location.reload();
        
        
    }

 
} 