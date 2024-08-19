/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */
/*
 * ABC Inc
 *
 * ${OTP-7497} : ${Restrict Item Fulfillment}
 *
 
 *
 * Author: Jobin & Jismi IT Services LLP
 *
 * Date Created : 1-August-2024
 *
 * Description :This script is to restrict the item fulfillment process from a sales order created upon specific condition and to send email to sales rep.
 *
 * REVISION HISTORY
 *
 * @version 1.0 OTP-7497 : 1-August-2024 
 */
define(['N/record'],
    /**
 * @param{record} record
 */
    (record) => {
        /**
         * Defines the function definition that is executed before record is loaded.
         * @param {Object} scriptContext
         * @param {Record} scriptContext.newRecord - New record
         * @param {string} scriptContext.type - Trigger type; use values from the context.UserEventType enum
         * @param {Form} scriptContext.form - Current form
         * @param {ServletRequest} scriptContext.request - HTTP request information sent from the browser for a client action only.
         * @since 2015.2
         */
        const beforeLoad = (scriptContext) => 
        {
            try
            {
                // if(scriptContext.type == scriptContext.UserEventType.VIEW)
                // {
                let newrecord = scriptContext.newRecord;
                log.debug('New Record Load 1', newrecord);
                let salesOrderId = newrecord.id;
                log.debug('Sales Order Id', salesOrderId);
                let holdFulfillment = newrecord.getValue('custbody_jj_hold_fulfillment');
                log.debug("Hold Fulfillment", holdFulfillment);
                if(scriptContext.type == scriptContext.UserEventType.VIEW)
                {
                    if(holdFulfillment == true)
                    {
                        scriptContext.form.removeButton('process');
                    }
                    else
                    {
                        return true;
                    }
                }
            }
            catch(e)
            {
                log.error("Error",e.message);
            }
        }
        return {beforeLoad}

    });
