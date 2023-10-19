const initialState={
    invoiceDetailssuccess:false,
    invoiceDetailsTrue:false,
    invoiceDetails:[],
    error:""
}

const InvoiceReducer = (state = initialState, action)=>{
    const newState ={...state};
    switch(action.type){
        case"INVOICE_LIST_SUCCESS":
        newState.invoiceDetails = action.value
        break;

        case "INVOICE_LIST_ERROR":
            newState.error="";
            break;
            default:
                break;

    }
    return newState
}
export default InvoiceReducer