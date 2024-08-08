/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
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
define(['N/record', 'N/search', 'N/ui/serverWidget'],
    /**
 * @param{record} record
 * @param{search} search
 * @param{serverWidget} serverWidget
 */
    (record, search, serverWidget) => {
        /**
         * Defines the Suitelet script trigger point.
         * @param {Object} scriptContext
         * @param {ServerRequest} scriptContext.request - Incoming request
         * @param {ServerResponse} scriptContext.response - Suitelet response
         * @since 2015.2
         */
        const onRequest = (scriptContext) => 
        {
            try
            {            
                if (scriptContext.request.method === 'GET') 
                {
                    let form = serverWidget.createForm({title: 'SalesOrder Filter Based on Status'});
                    form.clientScriptFileId = 582;
                    let statusForm = form.addField(
                    { 
                        id: 'custpage_status',
                        type: serverWidget.FieldType.SELECT,
                        label: 'Status'
                    });
                    statusForm.addSelectOption(
                    {
                        value: '',
                        text: '' 
                    });
                    statusForm.addSelectOption(
                    {
                        value: 'SalesOrd:B',
                        text: 'Pending Fulfillment' 
                    });
                    statusForm.addSelectOption(
                    {
                        value: 'SalesOrd:D',
                        text: 'Partially Fulfilled' 
                    });
                    statusForm.addSelectOption(
                    {
                        value: 'SalesOrd:E',
                        text: 'Pending Billing/Partially Fulfilled' 
                    });
                    statusForm.addSelectOption(
                    {
                        value: 'SalesOrd:F',
                        text: 'Pending Billing' 
                    });
                    // let statusSearch = search.create({
                    //     type: search.Type.SALES_ORDER,
                    //     columns: ['statusref']
                    // });
                    // let statusSearchResult = statusSearch.run();
                    // statusSearchResult.each(function (result) 
                    // {
                    //     let status = result.getText('statusref');
                    //     let statusValue = result.getValue('statusref');
                    //     statusForm.addSelectOption(
                    //     {
                    //         value: statusValue,
                    //         text: status
                    //     });
                    //     return true;
                    // });

                    let customerForm = form.addField(
                    { 
                        id: 'custpage_customer',
                        type: serverWidget.FieldType.SELECT,
                        label: 'Customer',
                        source:'customer'
                    });
                    // customerForm.addSelectOption(
                    // {
                    //     value: '',
                    //     text: '' 
                    // });
                    // let customerSearch = search.create({
                    //     type: search.Type.CUSTOMER,
                    //     columns: ['entityid','companyname']
                    // });
                    // let customerSearchResult = customerSearch.run();
                    // customerSearchResult.each(function (result) 
                    // {
                    //     let customer = result.getValue('entityid');
                    //     let customerValue = result.getValue('companyname');
                    //     customerForm.addSelectOption(
                    //     {
                    //         value: customerValue,
                    //         text: customer
                    //     });
                    //     return true;
                    // });

                    let subsidiaryForm = form.addField(
                    { 
                        id: 'custpage_subsidiary',
                        type: serverWidget.FieldType.SELECT,
                        label: 'Subsidiary',
                        source: 'subsidiary'
                    });
                    // subsidiaryForm.addSelectOption(
                    // {
                    //     value: '',
                    //     text: '' 
                    // });
                    // let subsidiarySearch = search.create({
                    //     type: search.Type.SUBSIDIARY,
                    //     columns: ['name']
                    // });
                    // let subsidiarySearchResult = subsidiarySearch.run();
                    // subsidiarySearchResult.each(function (result) 
                    // {
                    //     let subsidiary = result.getValue('name');
                    //     subsidiaryForm.addSelectOption(
                    //     {
                    //         value: result.id,
                    //         text: subsidiary
                    //     });
                    //     return true;
                    // });

                    let departmentForm = form.addField(
                    { 
                        id: 'custpage_department',
                        type: serverWidget.FieldType.SELECT,
                        label: 'Department',
                        source: 'department'
                    });
                    // departmentForm.addSelectOption(
                    // {
                    //     value: '',
                    //     text: '' 
                    // });
                    // let deptSearch = search.create({
                    //     type: search.Type.DEPARTMENT,
                    //     columns: ['name']
                    // });
                    // let deptSearchResult = deptSearch.run();
                    // deptSearchResult.each(function (result) 
                    // {
                    //     let department = result.getValue('name');
                    //     let deptValue = result.getValue('name');
                    //     departmentForm.addSelectOption(
                    //     {
                    //         value: deptValue,
                    //         text: department
                    //     });
                    //     return true;
                    // });


                    let soSublist = form.addSublist(
                    {
                        id: 'custpage_salesorder_sublist',
                        type: serverWidget.SublistType.LIST,
                        label: 'Sales Orders'
                    });
                    soSublist.addField(
                    {
                        id: 'custpage_internalid',
                        type: serverWidget.FieldType.TEXT,
                        label: 'Internal ID'
                    });
                    soSublist.addField(
                    {
                        id: 'custpage_docname',
                        type: serverWidget.FieldType.TEXT,
                        label: 'Document Number'
                    });
                    soSublist.addField(
                    {
                        id: 'custpage_date',
                        type: serverWidget.FieldType.DATE,
                        label: 'Date'
                    });
                    soSublist.addField(
                    {
                        id: 'custpage_status',
                        type: serverWidget.FieldType.TEXT,
                        label: 'Status'
                    });
                    soSublist.addField(
                    {
                        id: 'custpage_customer',
                        type: serverWidget.FieldType.TEXT,
                        label: 'Customer'
                    });
                    soSublist.addField(
                    {
                        id: 'custpage_subsidiary',
                        type: serverWidget.FieldType.TEXT,
                        label: 'Subsidiary'
                    });
                    soSublist.addField(
                    {
                        id: 'custpage_department',
                        type: serverWidget.FieldType.TEXT,
                        label: 'Department'
                    });
                    soSublist.addField(
                    {
                        id: 'custpage_class',
                        type: serverWidget.FieldType.TEXT,
                        label: 'Class'
                    });
                    // soSublist.addField(
                    // {
                    //     id: 'custpage_linenumber',
                    //     type: serverWidget.FieldType.INTEGER,
                    //     label: 'Line number'
                    // });
                    soSublist.addField(
                    {
                        id: 'custpage_subtotal',
                        type: serverWidget.FieldType.CURRENCY,
                        label: 'Subtotal'
                    });
                    soSublist.addField(
                    {
                        id: 'custpage_tax',
                        type: serverWidget.FieldType.CURRENCY,
                        label: 'Tax'
                    });
                    soSublist.addField(
                    {
                        id: 'custpage_total',
                        type: serverWidget.FieldType.CURRENCY,
                        label: 'Total'
                    });

                    let status = scriptContext.request.parameters.statusValue||'';
                    let customer = scriptContext.request.parameters.customerValue||'';
                    let subsidiary = scriptContext.request.parameters.subsidiaryValue||'';
                    let department = scriptContext.request.parameters.departmentValue||'';

                    statusForm.defaultValue = status;
                    customerForm.defaultValue = customer;
                    subsidiaryForm.defaultValue = subsidiary;
                    departmentForm.defaultValue = department;

                    let filter =[['mainline','is','T'],
                                    'AND',
                                    ['status', 'noneof', 'SalesOrd:A', 'SalesOrd:C', 'SalesOrd:G', 'SalesOrd:H']];
                    if(status)
                    {
                        filter.push('AND',['status', 'is', status]);
                    }
                    if(customer)
                    {
                        filter.push('AND', ['entity', 'anyof', customer]);
                    }
                    if(subsidiary)
                    {
                        filter.push('AND', ['subsidiary', 'anyof', subsidiary]);
                    }
                    if(department)
                    {
                        filter.push('AND', ['department', 'anyof', department]);
                    }
    
                    let soSearch = search.create({
                        type: search.Type.SALES_ORDER,
                        filters: filter,
                        columns: ['internalid', 'tranid', 'trandate', 'statusref', 'entity', 'subsidiary', 'department', 'class', 'line', 'amount', 'taxamount', 'total']
                    });
                    let i=0;
                    let resultSet = soSearch.run();
                    resultSet.each(function (result)
                    {
                        soSublist.setSublistValue({
                            id: 'custpage_internalid',
                            line: i,
                            value: result.getValue('internalid')
                        });
                        soSublist.setSublistValue({
                            id: 'custpage_docname',
                            line: i,
                            value: result.getValue('tranid')
                        });
                        soSublist.setSublistValue({
                            id: 'custpage_date',
                            line: i,
                            value: result.getValue('trandate')
                        });
                        soSublist.setSublistValue({
                            id: 'custpage_status',
                            line: i,
                            value: result.getText('statusref')
                        });

                        soSublist.setSublistValue({
                            id: 'custpage_customer',
                            line: i,
                            value: result.getText('entity')
                        });
                        soSublist.setSublistValue({
                            id: 'custpage_subsidiary',
                            line: i,
                            value: result.getText('subsidiary')
                        });
                        soSublist.setSublistValue({
                            id: 'custpage_department',
                            line: i,
                            value: result.getText('department') || null
                        });
                        soSublist.setSublistValue({
                            id: 'custpage_class',
                            line: i,
                            value: result.getText('class') || null
                        });
                        // soSublist.setSublistValue({
                        //     id: 'custpage_linenumber',
                        //     line: i,
                        //     value: result.getValue('line')
                        // });
                        soSublist.setSublistValue({
                            id: 'custpage_subtotal',
                            line: i,
                            value: result.getValue('amount')|| null
                        });
                        soSublist.setSublistValue({
                            id: 'custpage_tax',
                            line: i,
                            value: result.getValue('taxamount') || null
                        });
                        soSublist.setSublistValue({
                            id: 'custpage_total',
                            line: i,
                            value: result.getValue('total')
                        });
                        i++;
                        return true;
                    });
                    log.debug("Working");
                    scriptContext.response.writePage(form);
                }
            }
            catch(e){
                log.error('Error found',e.message);
            }
        }

        return {onRequest}

    });
