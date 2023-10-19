import axios from "axios"
import { func } from "prop-types"

export function getInvoiceList(props){
    const baseurl = 'https://bafana-backend.azurewebsites.net'
    const header={
      hearders: {
        "content-type":"application/json",
      }  

    }
    return axios.get(baseurl + "/api/debtors/getAllInvoicesRaisedByMe")
    .then(function(response){
        return response.data
    })
    .catch(function(error){
        return ""
    }); 
}