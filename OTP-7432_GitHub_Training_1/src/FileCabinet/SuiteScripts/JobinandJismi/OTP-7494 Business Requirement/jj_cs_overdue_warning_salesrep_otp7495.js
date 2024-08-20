/**
 * @NApiVersion 2.1
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */
/*
 * ABC Inc
 *
 * ${OTP-7495} : ${Overdue Warning}
 *
 
 *
 * Author: Jobin & Jismi IT Services LLP
 *
 * Date Created : 1-August-2024
 *
 * Description :This script is to send a warning to sales rep on creation of sales orders for a customer with overdue. 
 *
 * REVISION HISTORY
 *
 * @version 1.0 OTP-7495 : 1-August-2024 
 */
define(['N/currentRecord', 'N/record'],
/**
 * @param{currentRecord} currentRecord
 * @param{record} record
 */
function(currentRecord, record) {
    
    

    /**
     * Validation function to be executed when record is saved.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @returns {boolean} Return true if record is valid
     *
     * @since 2015.2
     */
    function saveRecord(scriptContext) 
    {
        try
        {
            let currentRec = scriptContext.currentRecord;
            let customerId = currentRec.getValue({fieldId: 'entity'});
            let customerRecord = record.load(
            {
                type: record.Type.CUSTOMER,
                id: customerId
            });
            let overdue = customerRecord.getValue({fieldId: 'overduebalance'});
            if (overdue > 0) 
            {
                let result = confirm("The customer is having overdue balances , Do you want to continue?")
                if (result) 
                {
                    return true;
                }
                else 
                {
                    return false;
                }
            }
            else {
                return true;
            }
        }
        catch(e)
        {

        }
    }

    return {
        saveRecord: saveRecord
    };
    
});
