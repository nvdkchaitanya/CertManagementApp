public with sharing class CertificationRequests {
    public CertificationRequests() {}
    //Code for getting all the request records sorted by employee name
    @AuraEnabled(cacheable=true)
    public static List<Certification_Request__c> getAllRequests(){
        List<Certification_Request__c> reqs = [SELECT Employee__r.Name,Certification__c,Status__c,Voucher__c,Due_Date__c,Comments__c,Name,Id FROM Certification_Request__c] ;
        return reqs;
    }
    @AuraEnabled(cacheable=true)
    public static List<Employee__c> getAllEmployees(){
        List<Employee__c> emps = [SELECT Name,Employee_ID__c,Mail_ID__c,Primary_Skill__c,Secondary_Skill__c,Experience__c,Comments__c FROM Employee__c] ;
        return emps;
    }

    @AuraEnabled(cacheable=true)
    public static List<Certification__c> getAllCertifications(){
        List<Certification__c> certs = [SELECT Name,Certificate_ID__c,Certification_Cost__c FROM Certification__c];
        return certs;
    }

    @AuraEnabled(cacheable=true)
    public static List<Voucher__c> getAllVouchers(){
        List<Voucher__c> vous = [SELECT Name,Certification__c,Active__c,Validity__c,Voucher_Cost__c,Comments__c FROM Voucher__c];
        return vous;
    }
    //Code for getting request records where status is assigned
    @AuraEnabled(cacheable=true)
    public static List<Certification_Request__c> getDraftRequests(){
        List<Certification_Request__c> reqs = [SELECT Employee__r.Name,Certification__r.Name,Status__c,Voucher__c,Due_Date__c,Comments__c,Name FROM Certification_Request__c WHERE Status__c=Null ORDER BY Employee__c ASC NULLS FIRST] ;
        return reqs;
    }
    
    
    
    @AuraEnabled(cacheable=true)
    public static List<Certification_Request__c> getAssignedRequests(){
        List<Certification_Request__c> reqs = [SELECT Employee__r.Name,Certification__r.Name,Status__c,Voucher__c,Due_Date__c,Comments__c,Name FROM Certification_Request__c WHERE Status__c='Assigned' ORDER BY Employee__c ASC NULLS FIRST] ;
        return reqs;
    }
    @AuraEnabled(cacheable=true)
    public static List<Certification_Request__c> getApprovedRequests(){
        List<Certification_Request__c> reqs = [SELECT Employee__r.Name,Certification__r.Name,Status__c,Voucher__c,Due_Date__c,Comments__c,Name FROM Certification_Request__c WHERE Status__c='Approved' ORDER BY Employee__c ASC NULLS FIRST] ;
        return reqs;
    }
    @AuraEnabled(cacheable=true)
    public static List<Certification_Request__c> getSubmittedRequests(){
        List<Certification_Request__c> reqs = [SELECT Employee__r.Name,Certification__r.Name,Status__c,Voucher__c,Due_Date__c,Comments__c,Name FROM Certification_Request__c WHERE Status__c='Draft' ORDER BY Employee__c ASC NULLS FIRST] ;
        return reqs;
    }
    @AuraEnabled(cacheable=true)
    public static List<Certification_Request__c> getRejectedRequests(){
        List<Certification_Request__c> reqs = [SELECT Employee__r.Name,Certification__r.Name,Status__c,Voucher__c,Due_Date__c,Comments__c,Name FROM Certification_Request__c WHERE Status__c='Rejected' ORDER BY Employee__c ASC NULLS FIRST] ;
        return reqs;
    } 
    @AuraEnabled(cacheable=true)
    public static List<Certification_Request__c> getResultRequests(){
        List<Certification_Request__c> reqs = [SELECT Employee__r.Name,Certification__r.Name,Status__c,Voucher__c,Due_Date__c,Comments__c,Name FROM Certification_Request__c WHERE Status__c='Passed' AND Status__c='Failed' ORDER BY Employee__c ASC NULLS FIRST] ;
        return reqs;
    }
    @AuraEnabled(cacheable=true)
    public static List<Certification_Request__c> getPassedRequests(){
        List<Certification_Request__c> reqs = [SELECT Employee__r.Name,Certification__r.Name,Status__c,Voucher__r.Name,Due_Date__c,Comments__c,Name FROM Certification_Request__c WHERE Status__c='Passed' ORDER BY Employee__c ASC NULLS FIRST] ;
        return reqs;
    }
    @AuraEnabled(cacheable=true)
    public static List<Certification_Request__c> getFailedRequests(){
        List<Certification_Request__c> reqs = [SELECT Employee__r.Name,Certification__r.Name,Status__c,Voucher__r.Name,Due_Date__c,Comments__c,Name FROM Certification_Request__c WHERE Status__c='Failed' ORDER BY Employee__c ASC NULLS FIRST] ;
        return reqs;
    }
    //code for adding new employee record
    @AuraEnabled
    public static String addNewEmp(String EmpName,String EmpId,String EmpMail,String EmpPS,String EmpSS,String EmpExp,String EmpComm){
        Employee__c newemp = new Employee__c(Name=EmpName, Employee_ID__c=EmpId, Mail_ID__c=EmpMail, Primary_Skill__c=EmpPS, Secondary_Skill__c=EmpSS, Experience__c=EmpExp, Comments__c=EmpComm);
        
        try {insert newemp; }
        catch(Exception e){
             return e.getMessage();
        } 
        return 'Employee Created Successfully';
        
    }
    //code for adding new certification record
    @AuraEnabled
    public static String addNewCert(String CertName, String CertId, Integer CertCost, String CertComm){
        Certification__c newcert = new Certification__c(Name=CertName, Certificate_ID__c=CertId, Certification_Cost__c=CertCost, Certification_Comments__c=CertComm);
       
          
        try {insert newcert; }
        catch(Exception e){
             return e.getMessage();
        } 
        return 'Certification Created Successfully';       
    }
    //code for adding new voucher record
    @AuraEnabled
    public static String addNewVou( Decimal VouCost, Date VouValid,String VouCert, String VouComm){
        Voucher__c newvou = new Voucher__c( Voucher_Cost__c=VouCost, Validity__c=VouValid, Certification__c=VouCert, Comments__c=VouComm);
       try {insert newvou; }
       catch(Exception e){
            return e.getMessage();
       } 
       return 'Voucher Added Successfully';    
    }


    //code for adding new Request record
    @AuraEnabled
    public static String addNewReq(String ReqEmp, String ReqCert, Date ReqDueDate, String ReqComm){
        Certification_Request__c newreq = new Certification_Request__c(Employee__c=ReqEmp, Certification__c=ReqCert, Due_Date__c=ReqDueDate, Comments__c=ReqComm);
        try {insert newreq; }
        catch(Exception e){
            //throw e;
            return e.getMessage();
       } 
       return 'Request Added Successfully';      
    }



    //code for submitting request for approval
    @AuraEnabled
    public static String updateRequest(String ReqRecordId,String status){
        Certification_Request__c updreq = new Certification_Request__c(Id=ReqRecordId,Status__c=status);
        try {update updreq; }
        catch(Exception e){
            //throw e;
            return e.getMessage();
       } 
       return 'Request Updated Successfully';     
    }
    //code for deleting employees record
    @AuraEnabled
    public static void deleteEmp(Integer i){
        List<Employee__c> l=[SELECT Name,Employee_ID__c,Mail_ID__c FROM Employee__c];
        Employee__c e=l[i];
        delete e;    
    }
    @AuraEnabled
    public static void deletecert(Integer i){
        List<Certification__c> l=[SELECT Certificate_ID__c,Name,Certification_cost__c FROM Certification__c];
        Certification__c e=l[i];
        delete e;    
    }

    @AuraEnabled
    public static void updEmp(String empname,String empid,String empmail,String empps,String empss,String empexp,String empcomm){        
    
        Employee__c c=new Employee__c(Name=empname,Employee_ID__c=empid,Mail_ID__c=empmail,Primary_Skill__c=empps,Secondary_Skill__c=empss,Experience__c=empexp,Comments__c=empcomm);
        upsert c;
        
    }
}
