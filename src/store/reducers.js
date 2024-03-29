import { combineReducers } from "redux";

// Front
import Layout from "./layout/reducer";

// Authentication
import Login from "./auth/login/Login.reducer";
import register_login_reducer from "./auth/register2/Register.reducer";
import Account from "./auth/register/reducer";
import ForgetPassword from "./auth/forgetpwd/ForgetPassword.reducer";
import Profile from "./auth/profile/reducer";

//E-commerce
import ecommerce from "./e-commerce/reducer";

//Calendar
import calendar from "./calendar/reducer";

//chat
import chat from "./chat/reducer";

//crypto
import crypto from "./crypto/reducer";

//invoices
import invoices from "./invoices/reducer";

import companyList from "./company/Company.reducer"
//jobs
import JobReducer from "./jobs/reducer";

//projects
import projects from "./projects/reducer";

//tasks
import tasks from "./tasks/reducer";

//contacts
import contacts from "./contacts/reducer";

//mails
import mails from "./mails/reducer";

//Dashboard 
import Dashboard from "./dashboard/reducer";

//Dasboard saas
import DashboardSaas from "./dashboard-saas/reducer";

//Dasboard crypto
import DashboardCrypto from "./dashboard-crypto/reducer";

//Dasboard blog
import DashboardBlog from "./dashboard-blog/reducer";

//Dasboard job
import DashboardJob from "./dashboard-jobs/reducer";

import employeeList from "./Employee/reducer";
import searchCompany from "././auth/companySearch/reducer";
import changePasswordReducer from "././changePassword/reducer";
import employeeListCusstomer from "./sendbilltransacttion/reducer"
import { DebtorsReducer } from "./debtors/debtors.reducer";
import { AddCustomerReducer } from "./addCustomer/addCustomer.reducer";
import { ReportDefulterPreviewReducer } from "./ReportDefulterPreview/ReportDefulterPreview.reducer";
import { ReportMeDefulterReducer } from "./ReportMeDefulter/ReportMeDefulter.reducer";
import { CompanySearchReducer } from "./CompanySearch/CompanySearch.reducer";
import documentsReducer from "./Documents/DocumentsdReducer";
import { UploadPendingListReducer } from "./UploadPendingDocList/UploadPendingDocList.reducer";
import { CompanySearchViewReducer } from "./CompanySearchView/CompanySearchView.reducer";
import { SelectCompanyReducer } from "./selectCompany/selectCompany.reducer";
import { SubscriptionReducer } from "./Subscription/CompanySearch/SubscriptionReducer";


const rootReducer = combineReducers({
  // public
  Layout,
  Login,
  SubscriptionReducer,
  register_login_reducer,
  Account,
  DebtorsReducer,
  ForgetPassword,
  Profile,
  ecommerce,
  calendar,
  chat,
  mails,
  crypto,
  documentsReducer,
  invoices,
  JobReducer,
  projects,
  tasks,
  contacts,
  Dashboard,
  DashboardSaas,
  DashboardCrypto,
  DashboardBlog,
  DashboardJob,
  companyList,
  employeeList,
  searchCompany,
  changePasswordReducer,
  employeeListCusstomer,
  AddCustomerReducer,
  ReportDefulterPreviewReducer,
  ReportMeDefulterReducer,
  CompanySearchReducer,
  UploadPendingListReducer,
  CompanySearchViewReducer,
  SelectCompanyReducer,

});

export default rootReducer;
