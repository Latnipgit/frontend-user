import { createSelector } from 'reselect';

const selectDebtorsReducer = (state) => state.DebtorsReducer;

export const selectDebtorsList = createSelector(
    [selectDebtorsReducer],
    (DebtorsReducer) => DebtorsReducer.debtors.response
)

export const selectInvoiceList = createSelector(
    [selectDebtorsReducer],
    (DebtorsReducer) => DebtorsReducer.getInvoiceList != undefined ? DebtorsReducer.getInvoiceList.response : []
)

/* export const selectInvoiceListMap = createSelector(
    [selectInvoiceList],
    (DebtorsReducer) => {
        if (DebtorsReducer) {
            DebtorsReducer.map(data => {
                const { debtor: { companyName, address1, address2, firstname, lastname, }, invoices, totalAmount: amount, } = data;
                const status = "Pending"
                if (data.status === undefined) {
                    status = "Approved"
                } else {
                    status = data.status
                }
                const InvoiceNUmber = invoices[0].invoiceNumber
                const DueFrom = invoices[0].dueDate

                return { companyName, InvoiceNUmber, address1, address2, amount, DueFrom, firstname, lastname, status }
            })
        }
    }
) */

export const selectReportDefOpen = createSelector(
    [selectDebtorsReducer],
    (DebtorsReducer) => DebtorsReducer.isReportDefOpen
)

export const uploadCAcertificateSelector = createSelector(
    [selectDebtorsReducer],
    (DebtorsReducer) => DebtorsReducer.uploadCACertifateID != undefined ? DebtorsReducer.uploadCACertifateID.response : []
)
export const requestEditSelector = createSelector(
    [selectDebtorsReducer],
    (DebtorsReducer) => DebtorsReducer.requestAeditdefId != undefined ? DebtorsReducer.requestAeditdefId.response : []
)

export const selectFeedbackModalOpen = createSelector(
    [selectDebtorsReducer],
    (DebtorsReducer) => DebtorsReducer.isCustomerFeedbackModalOpen
)

export const confirReportDefaultModel = createSelector(
    [selectDebtorsReducer],
    (DebtorsReducer) => DebtorsReducer.isConfirmReportDefaultModal
)

export const ReportDefPreviewModal = createSelector(
    [selectDebtorsReducer],
    (DebtorsReducer) => DebtorsReducer.isPreviewModalOpen
)
export const uploadFilesModalOpen = createSelector(
    [selectDebtorsReducer],
    (DebtorsReducer) => DebtorsReducer.uploadPendingFilesModalOpen
)

export const selectCACertificateOpen = createSelector(
    [selectDebtorsReducer],
    (DebtorsReducer) => DebtorsReducer.isCACACertificateOpen
)

export const addInvoiceReportDebtorSelector = createSelector(
    [selectDebtorsReducer],
    (DebtorsReducer) => DebtorsReducer.addInvoice
)
/* export const selectDebtorsList = (state) => state.DebtorsReducer.debtors != undefined ? state.DebtorsReducer.debtors.response : [];
export const selectInvoiceList = (state) => state.DebtorsReducer.getInvoiceList != undefined ? state.DebtorsReducer.getInvoiceList.response : []

export const selectReportDefOpen = (state) => state.DebtorsReducer.isReportDefOpen; */

export const addInvoiceIdtoArray = createSelector(
    [selectDebtorsReducer],
    (DebtorsReducer) => DebtorsReducer.addInvoiceArray
)

export const addRatingofDebtor = createSelector(
    [selectDebtorsReducer],
    (DebtorsReducer) => DebtorsReducer.addRating
)