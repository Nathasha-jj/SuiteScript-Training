/**
 * @NApiVersion 2.1
 * @NScriptType Restlet
 */
/*
 * Jobin and Jismi IT Services LLP
 *
 * ${OTP-7439} : ${RAF Assessment: Generate Invoice PDF}
 *
 
 *
 * Author: Jobin & Jismi
 *
 * Date Created : 26-August-2024
 *
 * Description :This script is to generate a PDF url for invoice passed through a RESTLet endpoint. 
 *
 * REVISION HISTORY
 *
 * @version 1.0 OTP-7439 : 26-August-2024 
 */
define(['N/file', 'N/record', 'N/render', 'N/search','N/https'],
    /**
 * @param{file} file
 * @param{record} record
 * @param{render} render
 * @param{search} search
 * @param{https} https
 */
    (file, record, render, search, https) => {

        /**
         * Defines the function that is executed when a POST request is sent to a RESTlet.
         * @param {string | Object} requestBody - The HTTP request body; request body is passed as a string when request
         *     Content-Type is 'text/plain' or parsed into an Object when request Content-Type is 'application/json' (in which case
         *     the body must be a valid JSON)
         * @returns {string | Object} HTTP response body; returns a string when request Content-Type is 'text/plain'; returns an
         *     Object when request Content-Type is 'application/json' or 'application/xml'
         * @since 2015.2
         */
        const post = (requestBody) => 
        {
            try
            {
                let recordName = requestBody.recordname;
                log.debug("Record name", recordName);
                let documentNo = requestBody.docnum;
                log.debug("Document Number", documentNo);
                let invoiceSearch = search.create(
                {
                    type: recordName,
                    filters:[ ['mainline', 'is', 'T'],'AND' ,['tranid','anyof',documentNo]],
                    columns: ['internalid','tranid']
                });
                let invoiceSearchResultSet = invoiceSearch.run();
                let invoiceId;
                invoiceSearchResultSet.each(function(searchResult)
                {
                    invoiceId = searchResult.getValue('internalid');
                    log.debug("Invoice Id", invoiceId);
                });
                if(invoiceId)
                {
                    let invId = Number(invoiceId);
                    let invoicePdf = render.transaction(
                    {
                        entityId: invId,
                        printMode: render.PrintMode.PDF,
                    });
                    let fileName = "Invoice_"+documentNo;
                    let fileObj = file.create(
                    {
                        name: fileName,
                        fileType: file.Type.PDF,
                        contents: invoicePdf.getContents(),
                        folder: 28
                    });
                    let fileId = fileObj.save();
                    log.debug("File Id", fileId);
                    let pdfurl = file.load({
                        id: fileId
                    });
                    let invoiceLocUrl = 'https://td2933495.app.netsuite.com/app/common/media/mediaitemfolders.nl?folder=28&whence=';
                    let returnvalue = { "recordName":"Invoice", "documentNo: ": documentNo,"Invoice File Name":fileName, "Invoice PDF Location URL": invoiceLocUrl}
                    return returnvalue
                }
                else
                {
                    let returnvalue = { "recordName":"Invoice", "documentNo: ": "No Invoice of the Specified Document Number", "INVOICE PDF URL": null}
                    return returnvalue
                }
            }
            catch(e)
            {
                log.error("Error", e);
            }
        }
        return {post}

    });
