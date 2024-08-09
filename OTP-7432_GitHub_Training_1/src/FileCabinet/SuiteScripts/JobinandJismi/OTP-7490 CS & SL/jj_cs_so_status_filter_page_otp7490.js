/**
 * @NApiVersion 2.x
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */
/*
 * Jobin and Jismi IT Services LLP
 *
 * ${OTP-7490} : ${Custom page for display sales order based on the status}
 *
 
 *
 * Author: Jobin & Jismi
 *
 * Date Created : 6-August-2024
 *
 * Description :This script is to create a custom form that will display sales orders which need to be fulfilled or billed based on the filters. 
 *
 * REVISION HISTORY
 *
 * @version 1.0 OTP-7490 : 6-August-2024 
 */
define(['N/currentRecord', 'N/record', 'N/search','N/url'],
/**
 * @param{currentRecord} currentRecord
 * @param{record} record
 * @param{search} search
 */
function(currentRecord, record, search, url) {
    
    /**
     * Function to be executed after page is initialized.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @param {string} scriptContext.mode - The mode in which the record is being accessed (create, copy, or edit)
     *
     * @since 2015.2
     */
    // function pageInit(scriptContext) {

    // }

    /**
     * Function to be executed when field is changed.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @param {string} scriptContext.sublistId - Sublist name
     * @param {string} scriptContext.fieldId - Field name
     * @param {number} scriptContext.lineNum - Line number. Will be undefined if not a sublist or matrix field
     * @param {number} scriptContext.columnNum - Line number. Will be undefined if not a matrix field
     *
     * @since 2015.2
     */
    function fieldChanged(scriptContext) 
    {
        try
        {
            let currentRecord = scriptContext.currentRecord;
            console.log(currentRecord);
            let fieldId = scriptContext.fieldId;
            console.log("Field Id",fieldId);
            // let statusFilter = '';
            // let customerFilter = '';
            // let subsidiaryFilter = '';
            // let departmentFilter = '';

            let statusFilter = currentRecord.getValue('custpage_status');
            let customerFilter = currentRecord.getValue('custpage_customer');
            let subsidiaryFilter = currentRecord.getValue('custpage_subsidiary');
            let departmentFilter = currentRecord.getValue('custpage_department');
            // if(fieldId =='custpage_status')
            // {
            //     statusFilter=currentRecord.getValue('custpage_status'); // If we need to set single filter at a time
            // }
            // if(fieldId =='custpage_customer')
            // {
            //     customerFilter=currentRecord.getValue('custpage_customer');
            // }
            // if(fieldId =='custpage_subsidiary')
            // {
            //     subsidiaryFilter=currentRecord.getValue('custpage_subsidiary');
            // }
            // if(fieldId =='custpage_department')
            // {
            //     departmentFilter=currentRecord.getValue('custpage_department');
            // }

            if(fieldId=='custpage_status'||'custpage_customer'||'custpage_subsidiary'||'custpage_department')
            {
                document.location = url.resolveScript(
                {
                    deploymentId: 'customdeploy_jj_sl_so_filterpage_otp7490',
                    scriptId: 'customscript_jj_sl_so_filterpage_otp7490',
                    params: 
                    {
                        statusValue: statusFilter||'',
                        customerValue: customerFilter||'',
                        subsidiaryValue: subsidiaryFilter||'',
                        departmentValue: departmentFilter||''
                    }
                });
            }
        }
        catch(e)
        {
            log.error("Error",e.message);
        }
        
    }

    /**
     * Function to be executed when field is slaved.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @param {string} scriptContext.sublistId - Sublist name
     * @param {string} scriptContext.fieldId - Field name
     *
     * @since 2015.2
     */
    // function postSourcing(scriptContext) {

    // }

    /**
     * Function to be executed after sublist is inserted, removed, or edited.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @param {string} scriptContext.sublistId - Sublist name
     *
     * @since 2015.2
     */
    // function sublistChanged(scriptContext) {

    // }

    /**
     * Function to be executed after line is selected.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @param {string} scriptContext.sublistId - Sublist name
     *
     * @since 2015.2
     */
    // function lineInit(scriptContext) {

    // }

    /**
     * Validation function to be executed when field is changed.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @param {string} scriptContext.sublistId - Sublist name
     * @param {string} scriptContext.fieldId - Field name
     * @param {number} scriptContext.lineNum - Line number. Will be undefined if not a sublist or matrix field
     * @param {number} scriptContext.columnNum - Line number. Will be undefined if not a matrix field
     *
     * @returns {boolean} Return true if field is valid
     *
     * @since 2015.2
     */
    // function validateField(scriptContext) {

    // }

    /**
     * Validation function to be executed when sublist line is committed.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @param {string} scriptContext.sublistId - Sublist name
     *
     * @returns {boolean} Return true if sublist line is valid
     *
     * @since 2015.2
     */
    // function validateLine(scriptContext) {

    // }

    /**
     * Validation function to be executed when sublist line is inserted.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @param {string} scriptContext.sublistId - Sublist name
     *
     * @returns {boolean} Return true if sublist line is valid
     *
     * @since 2015.2
     */
    // function validateInsert(scriptContext) {

    // }

    /**
     * Validation function to be executed when record is deleted.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @param {string} scriptContext.sublistId - Sublist name
     *
     * @returns {boolean} Return true if sublist line is valid
     *
     * @since 2015.2
     */
    // function validateDelete(scriptContext) {

    // }

    /**
     * Validation function to be executed when record is saved.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @returns {boolean} Return true if record is valid
     *
     * @since 2015.2
     */
    // function saveRecord(scriptContext) {

    // }

    return {
        // pageInit: pageInit,
        fieldChanged: fieldChanged,
        // postSourcing: postSourcing,
        // sublistChanged: sublistChanged,
        // lineInit: lineInit,
        // validateField: validateField,
        // validateLine: validateLine,
        // validateInsert: validateInsert,
        // validateDelete: validateDelete,
        // saveRecord: saveRecord
    };
    
});
