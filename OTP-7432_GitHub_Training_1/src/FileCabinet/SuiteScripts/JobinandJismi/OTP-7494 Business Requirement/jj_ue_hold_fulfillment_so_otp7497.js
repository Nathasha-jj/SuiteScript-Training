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
 * Author: Jobin & Jismi
 *
 * Date Created : 1-August-2024
 *
 * Description :This script is to restrict the item fulfillment process from a sales order created upon specific condition and to send email to sales rep.
 *
 * REVISION HISTORY
 *
 * @version 1.0 OTP-7497 : 1-August-2024 
 */
define(['N/email', 'N/record', 'N/search','N/ui/serverWidget','N/runtime'],
    /**
 * @param{email} email
 * @param{record} record
 * @param{search} search
 * @param{serverWidget} serverWidget 
 * @param{runtime} runtime 
 */
    (email, record, search,serverWidget,runtime) => {
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
            if(scriptContext.type == scriptContext.UserEventType.VIEW)
            {
                let newrecord = scriptContext.newRecord;
                log.debug('New Record', newrecord);
                let salesOrderId = newrecord.id;
                log.debug('Sales Order Id', salesOrderId);
                let holdFulfillment = newrecord.getValue('custbody_jj_hold_fulfillment_1');
                log.debug("Hold Fulfillment", holdFulfillment);
                if(holdFulfillment == true)
                {
                    scriptContext.form.removeButton('process');
                }
            }
        }

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
            if(scriptContext.type == scriptContext.UserEventType.CREATE)
            {
                let newrecord = scriptContext.newRecord;
                log.debug('New Record', newrecord);
                let salesOrderId = newrecord.id;
                log.debug('Sales Order Id', salesOrderId);
                let holdFulfillment = newrecord.getValue('custbody_jj_hold_fulfillment_1');
                log.debug("Hold Fulfillment", holdFulfillment);
                let salesrepId = newrecord.getValue('salesrep');
                log.debug("Sales Rep", salesrepId);
                let currentUser = runtime.getCurrentUser();
                let authorId = currentUser.id;
                log.debug('Author Id',authorId);
                if(holdFulfillment == true)
                {
                    email.send(
                    {
                        author: authorId,
                        recipients: salesrepId,
                        subject: "Hold Fulfillment",
                        body: 'Holding the fulfillment of the item since the checkbox is checked'
                    });
                }
            }
        }

        /**
         * Defines the function definition that is executed after record is submitted.
         * @param {Object} scriptContext
         * @param {Record} scriptContext.newRecord - New record
         * @param {Record} scriptContext.oldRecord - Old record
         * @param {string} scriptContext.type - Trigger type; use values from the context.UserEventType enum
         * @since 2015.2
         */
        const afterSubmit = (scriptContext) => 
        {

        }

        return {beforeLoad, beforeSubmit, afterSubmit}

    });
