import { createSelector } from 'reselect';

const selectDebtorsReducer = (state) => state.DebtorsReducer;

export const selectDebtorsList = createSelector(
    [selectDebtorsReducer],
    (DebtorsReducer) => DebtorsReducer.debtors.response
)

/* export const selectInvoiceList = createSelector(
    [selectDebtorsReducer],
    (DebtorsReducer) => DebtorsReducer.getInvoiceList.response
) */

export const selectReportDefOpen = createSelector(
    [selectDebtorsReducer],
    (DebtorsReducer) => DebtorsReducer.isReportDefOpen
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

export const addInvoiceReportDebtorSelector = createSelector(
    [selectDebtorsReducer],
    (DebtorsReducer) => DebtorsReducer.addInvoice
)
export const selectInvoiceList = (state) => state.DebtorsReducer.getInvoiceList != undefined ? state.DebtorsReducer.getInvoiceList.response : []
/* export const selectDebtorsList = (state) => state.DebtorsReducer.debtors != undefined ? state.DebtorsReducer.debtors.response : [];

export const selectReportDefOpen = (state) => state.DebtorsReducer.isReportDefOpen; */

export const addInvoiceIdtoArray = createSelector(
    [selectDebtorsReducer],
    (DebtorsReducer) => DebtorsReducer.addInvoiceArray
)

export const addRatingofDebtor = createSelector(
    [selectDebtorsReducer],
    (DebtorsReducer) => DebtorsReducer.addRating
)