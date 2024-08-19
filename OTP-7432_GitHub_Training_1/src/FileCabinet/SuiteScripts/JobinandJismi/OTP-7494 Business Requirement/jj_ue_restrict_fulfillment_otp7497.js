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
define(['N/email', 'N/log', 'N/record', 'N/runtime'],
    /**
 * @param{email} email
 * @param{log} log
 * @param{record} record
 * @param{runtime} runtime
 */
    (email, log, record, runtime) => {
        /**
         * Defines the function definition that is executed before record is submitted.
         * @param {Object} scriptContext
         * @param {Record} scriptContext.newRecord - New record
         * @param {Record} scriptContext.oldRecord - Old record
         * @param {string} scriptContext.type - Trigger type; use values from the context.UserEventType enum
         * @since 2015.2
         */
        const beforeSubmit = (scriptContext) => 
        {
            try
            {
                if(scriptContext.type == scriptContext.UserEventType.CREATE)
                {
                    let currentUser = runtime.getCurrentUser();
                    let authorId = currentUser.id;
                    log.debug('Author Id',authorId);
                    let newRec = scriptContext.newRecord;
                    log.debug
                    let soId = newRec.getValue({
                        fieldId : 'createdfrom'
                    });
                    log.debug("SO internal ID : ",soId);
                    let objRec = record.load(
                    {
                        type : 'salesorder',
                        id : soId,
                        isDynamic : true
                    });
                    let salesrepId = objRec.getValue('salesrep');
                    log.debug("Sales Rep", salesrepId);
                    let holdFulfillment = objRec.getValue(
                    {
                        fieldId : "custbody_jj_hold_fulfillment"
                    });
                    log.debug("Hold Fulfillment: ",holdFulfillment);
                    if(holdFulfillment == true)
                    {
                        email.send(
                        {
                            author: authorId,
                            recipients: salesrepId,
                            subject: "Hold Fulfillment",
                            body: 'Holding the item fulfillment of the salesorder because the hold fulfillment checkbox is checked'
                        });
                    }
                }
            }
            catch(e)
            {
                log.error("Error",e.message);
            }
        }

        return {beforeSubmit}

    });
