/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */
define(['N/email', 'N/record'],
    /**
 * @param{email} email
 * @param{record} record
 */
    (email, record) => {
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
        const beforeSubmit = (scriptContext) => {

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
            if(scriptContext.type !== scriptContext.UserEventType.CREATE)
            {
                return;
            }
            let newrecord = scriptContext.newRecord;
            log.debug('New Record', newrecord);
            let recordId = newrecord.getValue('id');
            log.debug('Entity',recordId);
            let recordtype = newrecord.type;
            log.debug('Record Type', recordtype);
            let customerRecord = record.load({
                type: record.Type.CUSTOMER,
                id : recordId,
                isDynamic: true
            });
            let customerName = customerRecord.getText({fieldId: 'entityid'});
            log.debug('Customer name',customerName);
            let authorid = 31;
            let recepientid = -5;
            email.send({
                author: authorid,
                recipients: recepientid,
                subject: "New Customer created",
                body: `New Customer has been created: ${recordtype}, Internal Id: ${recordId}, Customer Name: ${customerName}`
            });
        }

        return {beforeLoad, beforeSubmit, afterSubmit}

    });
