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
        const beforeLoad = (scriptContext) => 
        {
            let objRec = record.create(
                {
                    type: record.Type.PURCHASE_ORDER,
                    isDynamic: true,
                });
                objRec.setValue(
                {
                    fieldId : 'entity',
                    value : 24,
                    ignoreFieldChange: true
                });
                objRec.setValue('subsidiary', 1);
                objRec.selectNewLine(
                {
                    sublistId: 'item'
                });
                objRec.setCurrentSublistValue(
                {
                    sublistId: 'item',
                    fieldId: 'item',
                    value: 36
                });
                objRec.setCurrentSublistValue(
                {
                    sublistId: 'item',
                    fieldId: 'quantity',
                    value: 1
                });
                objRec.setCurrentSublistValue(
                {
                    sublistId: 'item',
                    fieldId: 'rate',
                    value: 1000
                });
                objRec.commitLine(
                {
                    sublistId: 'item'
                });
                let recordId = objRec.save(
                {
                    enableSourcing: true,
                    ignoreMandatoryFields: true
                });
                log.debug("Record id", recordId);
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
        const afterSubmit = (scriptContext) => {

        }

        return {beforeLoad, beforeSubmit, afterSubmit}

    });
