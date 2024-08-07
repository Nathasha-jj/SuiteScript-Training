/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */
define(['N/record'],(record) => 
    {
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
                type: record.Type.CUSTOMER,
                isDynamic: true,
                defaultValues: 
                {
                    'subsidiary' : 1
                }
            });
            objRec.setValue(
            {
                fieldId : 'companyname',
                value : "ABC Company 1",
                ignoreFiledChange: true
            }
            );
            objRec.setValue('phone', 1234567890);
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
