/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
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
        const beforeLoad = (scriptContext) => {

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
            if (scriptContext.type !== scriptContext.UserEventType.CREATE) 
            {
                return;
            }
            let newrecord = scriptContext.newRecord;
            log.debug('New Record', newrecord);
            let recordtype = newrecord.type;
            log.debug('Record Type', recordtype);
            if (recordtype === 'salesorder') 
            {
                var customerId = newrecord.getValue('entity' );
                    record.submitFields(
                    {
                        type: record.Type.CUSTOMER,
                        id: customerId,
                        values: 
                        {
                            custentity_jj_sales_order_created: true // Replace with your custom field ID
                        }
                    });
            }
            else if(recordtype === 'purchaseorder')
            {
                var vendorId = newrecord.getValue({ fieldId: 'entity' });
                    record.submitFields(
                    {
                        type: record.Type.VENDOR,
                        id: vendorId,
                        values: 
                        {
                            custentity_jj_purchase_order_created: true // Replace with your custom field ID
                        }
                    });
            }
            return {
                afterSubmit: afterSubmit
            };
        }
        return {beforeLoad, beforeSubmit, afterSubmit}
    });