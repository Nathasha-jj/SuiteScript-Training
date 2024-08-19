/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */
/*
 * ABC Inc
 *
 * ${OTP-7495} : ${Overdue Warning}
 *
 
 *
 * Author: Jobin & Jismi IT Services LLP
 *
 * Date Created : 1-August-2024
 *
 * Description :This script is to send a warning email to sales rep on creation of sales orders for a customer with overdue. 
 *
 * REVISION HISTORY
 *
 * @version 1.0 OTP-7495 : 1-August-2024 
 */
define(['N/email', 'N/record', 'N/runtime'],
    /**
 * @param{email} email
 * @param{record} record
 * @param{runtime} runtime
 */
    (email, record, runtime) => {
       

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
            try
            {
                if(scriptContext.type !== scriptContext.UserEventType.CREATE)
                {
                    return;
                }
                let newrecord = scriptContext.newRecord;
                log.debug('New Record', newrecord);
                let salesOrderId = newrecord.id;
                log.debug('Sales Order Id', salesOrderId);
                let customerId = newrecord.getValue('entity');
                log.debug("Customer", customerId);
                let customerName = newrecord.getText('entity');
                log.debug("Customer", customerName);
                let salesrepId = newrecord.getValue('salesrep');
                log.debug("Sales Rep", salesrepId);
                let currentUser = runtime.getCurrentUser();
                let authorId = currentUser.id;
                log.debug('Author Id',authorId);
                let objRecCustomer = record.load(
                {
                    type: record.Type.CUSTOMER,
                    id: customerId
                });
                let overdueAmount = objRecCustomer.getValue('overduebalance');
                log.debug("OverDue Amount", overdueAmount);
                let emailBody = '<html><body><a href= https://td2924623.app.netsuite.com/app/accounting/transactions/salesord.nl?id='+salesOrderId+'&whence=>'+'Click Here to view the created Sales Order'+'</body></html>';
                if(overdueAmount > 0)
                {
                    email.send(
                    {
                        author: authorId,
                        recipients: salesrepId,
                        subject: "Sales Order Created for Customer with Overdue",
                        body: 'Salesorder has been created for the customer: ' + customerName + ' with overdue amount: ' + overdueAmount +'<br/>'+ emailBody 
                    });
                }
            }
            catch(e)
            {
                log.error("Error",e.message);
            }
        }

        return {afterSubmit}

    });
