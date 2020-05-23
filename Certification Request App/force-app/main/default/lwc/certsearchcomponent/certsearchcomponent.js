import { LightningElement,track,api } from 'lwc';

export default class Certsearchcomponent extends LightningElement {
    @track searckKeyword;
    @api isrequired = 'false';
    @api searchLabel = 'Search Account';
    @api showLabel   = 'true';

    renderedCallback() {
        if ( this.isrequired === "false" )
            return;
        if ( this.isrequired === "true") {
            let picklistInfo = this.template.querySelector('lightning-input');
            picklistInfo.required = true;
            this.isrequired = "false";
        } 
          
    }

    handleChange(event) {
        var keyword = event.target.value;
        if ( keyword && keyword.length >= 2 ) {
            let searchEvent = new CustomEvent('search',{
                detail : { value : keyword }
            });
            this.dispatchEvent(searchEvent);
        }
        
    }
} 