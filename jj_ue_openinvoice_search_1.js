/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */
define(['N/search'],
    /**
 * @param{search} search
 */
    (search) => {
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
            let objSearch = search.create(
                {
                    type: search.Type.INVOICE,
                    filters: [['status', 'is', 'CustInvc:A'], 'AND' , ['mainline','is','T']],
                    columns: ['tranid', 'trandate', 'entity','email','total']
                });
                let searchresultset = objSearch.run();
                searchresultset.each(function(searchresult)
                {
                    let docnum = searchresult.getValue({name :'tranid'});
                    let date = searchresult.getValue({name :'trandate'});
                    let customername = searchresult.getValue({name :'entity'});
                    let emailid = searchresult.getValue({name :'email'});
                    let amount = searchresult.getValue({name :'total'});
                    log.debug('Document Number', docnum);
                    log.debug('Date', date);
                    log.debug('Customer Name', customername);
                    log.debug('Email Id', emailid);
                    log.debug('Amount', amount);
                    return true;
                });     
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
