import { LightningElement,api } from 'lwc';

export default class Certrecordscomponent extends LightningElement {
    @api rec;
    @api iconname = 'standard:account';

    handleSelect(  ) {
        let selectEvent = new CustomEvent('select',{
            detail : { selRec : this.rec }
        });
        this.dispatchEvent( selectEvent );
    }

    handleRemove(  ) {
        let selectEvent = new CustomEvent('select',{
            detail : { selRec : undefined }
        });
        this.dispatchEvent( selectEvent );
    }
}     