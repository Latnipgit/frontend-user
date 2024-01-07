import { createSelector } from 'reselect';

const selectDocumentReducer = (state) => state.documentsReducer;

export const getGeneralDocumentsSelector = createSelector(
    [selectDocumentReducer],
    (DocumentsReducer) => DocumentsReducer.generalDocuments.response
)
