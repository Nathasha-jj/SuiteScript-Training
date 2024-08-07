/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */
define(['N/search'],
    /**
 * @param{search} search
 */
    (search) => 
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
            /*let objSearch = search.create(
            {
                type: search.Type.CUSTOMER,
                title: 'Customer Created Search this Month JJ',
                filters: ['datecreated','on','today'],
                columns: 
                [
                    search.createColumn({ name: 'entityid', label: 'Customer Name' }),
                    search.createColumn({ name: 'subsidiary', label: 'Subsidiary' }),
                    search.createColumn({ name: 'salesrep', label: 'Sales Rep' }),
                    search.createColumn({ name: 'email', label: 'Email' }),
                    search.createColumn({ name: 'datecreated', label: 'Date Created' })
                ]
            });
            let searchId = objSearch.save();
            log.debug("Saved Search Id:", searchId); */

            let objSearch = search.create(
                {
                    type: search.Type.CUSTOMER,
                    filters:  [['datecreated','within','thismonth'], 'AND', ['subsidiary', 'anyof', 1] ],
                    columns: ['entityid', 'subsidiary', 'salesrep','email','datecreated']
                });
                let searchresultset = objSearch.run();
                searchresultset.each(function(searchresult)
                {
                    let customername = searchresult.getValue({name :'entityid'});
                    let subsidiaryname = searchresult.getValue({name :'subsidiary'});
                    let salesrepname = searchresult.getValue({name :'salesrep'});
                    let emailid = searchresult.getValue({name :'email'});
                    let createdate = searchresult.getValue({name :'datecreated'});
                    log.debug('Customer Name', customername);
                    log.debug('Subsidiary', subsidiaryname);
                    log.debug('Sales Rep', salesrepname);
                    log.debug('Email Id', emailid);
                    log.debug('Date Created', createdate);
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
        }
        return {beforeLoad, beforeSubmit, afterSubmit}
    });
