import React from "react";
import { Navigate } from "react-router-dom";
import UserList from "../pages/admin/UserList";
import SendBillTransaction from "../pages/Dashboard/users/send-bill-transaction/sendbillTransaction";
import MembersList from "../pages/admin/Members/memberlist/MembersList";
import RegisteredCompanyList from "../pages/admin/Members/RegisteredCompany/RegisteredCompanyList";
import DiputedBillings from "../pages/admin/DisputedBillings/DiputedBillings";
import ApprovedTranction from "../pages/admin/ApprovedTransaction/ApprovedTranction";
import CompanySearch from "../pages/admin/company-search/companysearch";
import DebtorsList from "../pages/admin/DebtorsList/debtorslist";
import CrediotorList from "../pages/admin/CreditorsList/CreditorsList";
import Invoice from "../pages/admin/Invoice/Invoice";
import ReporteDefaulter from "../pages/admin/ReportDefaulter/RepoertDefaulter"
import ReportDebtor from "../pages/admin/Invoice/ReportaDebtor";
import Document from "../pages/Dashboard/users/Documents/documents";
import ContactsProfile from "../pages/Dashboard/users/profile";
import Employee from "../pages/Dashboard/users/employeeRegistratiion/employee"
import EmployeeList from "../pages/Dashboard/users/employeeRegistratiion/employeeList"
// Pages Component
import Chat from "../pages/Chat/Chat";

// File Manager
import FileManager from "../pages/FileManager/index";

// Profile
import UserProfile from "../pages/Authentication/user-profile";

// Pages Calendar
import Calendar from "../pages/Calendar/index";

// //Tasks
import TasksList from "../pages/Tasks/tasks-list";
import TasksCreate from "../pages/Tasks/tasks-create";

// //Projects
import ProjectsGrid from "../pages/Projects/projects-grid";
import ProjectsList from "../pages/Projects/projects-list";
import ProjectsOverview from "../pages/Projects/ProjectOverview/projects-overview";
import ProjectsCreate from "../pages/Projects/projects-create";

// //Ecommerce Pages
import EcommerceProducts from "../pages/Ecommerce/EcommerceProducts/index";
import EcommerceProductDetail from "../pages/Ecommerce/EcommerceProducts/EcommerceProductDetail";
import EcommerceOrders from "../pages/Ecommerce/EcommerceOrders/index";
import EcommerceCustomers from "../pages/Ecommerce/EcommerceCustomers/index";
import EcommerceCart from "../pages/Ecommerce/EcommerceCart";
import EcommerceCheckout from "../pages/Ecommerce/EcommerceCheckout";
import EcommerceShops from "../pages/Ecommerce/EcommerceShops/index";
import EcommerceAddProduct from "../pages/Ecommerce/EcommerceAddProduct";

//Email
import EmailInbox from "../pages/Email/email-inbox";
import EmailRead from "../pages/Email/email-read";
import EmailBasicTemplte from "../pages/Email/email-basic-templte";
import EmailAlertTemplte from "../pages/Email/email-template-alert";
import EmailTemplateBilling from "../pages/Email/email-template-billing";

//Invoices
import InvoicesList from "../pages/Invoices/invoices-list";
import InvoiceDetail from "../pages/Invoices/invoices-detail";

// Authentication related pages
import Login from "../pages/Authentication/Login";
import Logout from "../pages/Authentication/Logout";
import Register from "../pages/Authentication/Register";
import ForgetPwd from "../pages/Authentication/ForgetPassword";

//  // Inner Authentication
import Login1 from "../pages/AuthenticationInner/Login";
import Login2 from "../pages/AuthenticationInner/Login2";
import Register1 from "../pages/AuthenticationInner/Register";
import Register21 from "../pages/AuthenticationInner/Register21";
import Recoverpw from "../pages/AuthenticationInner/Recoverpw";
import Recoverpw2 from "../pages/AuthenticationInner/Recoverpw2";
import ForgetPwd1 from "../pages/AuthenticationInner/ForgetPassword";
import ForgetPwd2 from "../pages/AuthenticationInner/ForgetPassword2";
import LockScreen from "../pages/AuthenticationInner/auth-lock-screen";
import LockScreen2 from "../pages/AuthenticationInner/auth-lock-screen-2";
import ConfirmMail from "../pages/AuthenticationInner/page-confirm-mail";
import ConfirmMail2 from "../pages/AuthenticationInner/page-confirm-mail-2";
import EmailVerification from "../pages/AuthenticationInner/auth-email-verification";
import EmailVerification2 from "../pages/AuthenticationInner/auth-email-verification-2";
import TwostepVerification from "../pages/AuthenticationInner/auth-two-step-verification";
import TwostepVerification2 from "../pages/AuthenticationInner/auth-two-step-verification-2";

// Dashboard
import Dashboard from "../pages/Dashboard/index";
import DashboardSaas from "../pages/Dashboard-saas/index";
import DashboardCrypto from "../pages/Dashboard-crypto/index";
import Blog from "../pages/Dashboard-Blog/index";
import DashboardJob from "../pages/DashboardJob/index";

//Crypto
import CryptoWallet from "../pages/Crypto/CryptoWallet/crypto-wallet";
import CryptoBuySell from "../pages/Crypto/crypto-buy-sell";
import CryptoExchange from "../pages/Crypto/crypto-exchange";
import CryptoLending from "../pages/Crypto/crypto-lending";
import CryptoOrders from "../pages/Crypto/CryptoOrders/crypto-orders";
import CryptoKYCApplication from "../pages/Crypto/crypto-kyc-application";
import CryptoIcoLanding from "../pages/Crypto/CryptoIcoLanding/index";

// Charts
import ChartApex from "../pages/Charts/Apexcharts";
import ChartistChart from "../pages/Charts/ChartistChart";
import ChartjsChart from "../pages/Charts/ChartjsChart";
import EChart from "../pages/Charts/EChart";
import SparklineChart from "../pages/Charts/SparklineChart";
import ChartsKnob from "../pages/Charts/charts-knob";
import ReCharts from "../pages/Charts/ReCharts";

// Maps
import MapsGoogle from "../pages/Maps/MapsGoogle";
import MapsVector from "../pages/Maps/MapsVector";
import MapsLeaflet from "../pages/Maps/MapsLeaflet";

//Icons
import IconBoxicons from "../pages/Icons/IconBoxicons";
import IconDripicons from "../pages/Icons/IconDripicons";
import IconMaterialdesign from "../pages/Icons/IconMaterialdesign";
import IconFontawesome from "../pages/Icons/IconFontawesome";

//Tables
import BasicTables from "../pages/Tables/BasicTables";
import DatatableTables from "../pages/Tables/DatatableTables";
import ResponsiveTables from "../pages/Tables/ResponsiveTables";
import DragDropTables from "../pages/Tables/DragDropTables";

//Blog
import BlogList from "../pages/Blog/BlogList/index";
import BlogGrid from "../pages/Blog/BlogGrid/index";
import BlogDetails from "../pages/Blog/BlogDetails";

//Job
import JobGrid from "../pages/JobPages/JobGrid/index";
import JobDetails from "../pages/JobPages/JobDetails";
import JobCategories from "../pages/JobPages/JobCategories";
import JobList from "../pages/JobPages/JobList";
import ApplyJobs from "../pages/JobPages/ApplyJobs/index";
import CandidateList from "../pages/JobPages/CandidateList";
import CandidateOverview from "../pages/JobPages/CandidateOverview";

// Forms
import FormElements from "../pages/Forms/FormElements";
import FormLayouts from "../pages/Forms/FormLayouts";
import FormAdvanced from "../pages/Forms/FormAdvanced";
import FormEditors from "../pages/Forms/FormEditors";
import FormValidations from "../pages/Forms/FormValidations";
import FormMask from "../pages/Forms/FormMask";
import FormRepeater from "../pages/Forms/FormRepeater";
import FormUpload from "../pages/Forms/FormUpload";
import FormWizard from "../pages/Forms/FormWizard";

//Ui
import UiAlert from "../pages/Ui/UiAlert";
import UiButtons from "../pages/Ui/UiButtons";
import UiCards from "../pages/Ui/UiCards";
import UiCarousel from "../pages/Ui/UiCarousel";
import UiColors from "../pages/Ui/UiColors";
import UiDropdown from "../pages/Ui/UiDropdown";
import UiGeneral from "../pages/Ui/UiGeneral";
import UiGrid from "../pages/Ui/UiGrid";
import UiImages from "../pages/Ui/UiImages";
import UiLightbox from "../pages/Ui/UiLightbox";
import UiModal from "../pages/Ui/UiModal";
import UiProgressbar from "../pages/Ui/UiProgressbar";
import UiTabsAccordions from "../pages/Ui/UiTabsAccordions";
import UiTypography from "../pages/Ui/UiTypography";
import UiVideo from "../pages/Ui/UiVideo";
import UiSessionTimeout from "../pages/Ui/UiSessionTimeout";
import UiRating from "../pages/Ui/UiRating";
import UiRangeSlider from "../pages/Ui/UiRangeSlider";
import UiNotifications from "../pages/Ui/ui-notifications";
import UiOffCanvas from "pages/Ui/UiOffCanvas";
import UiUtilitie from "../pages/Ui/UiUtilitie";
import UiPlaceholders from "../pages/Ui/UiPlaceholders";
import UiToasts from "../pages/Ui/UiToast";

//Pages
import PagesStarter from "../pages/Utility/pages-starter";
import PagesMaintenance from "../pages/Utility/pages-maintenance";
import PagesComingsoon from "../pages/Utility/pages-comingsoon";
import PagesTimeline from "../pages/Utility/pages-timeline";
import PagesFaqs from "../pages/Utility/pages-faqs";
import PagesPricing from "../pages/Utility/pages-pricing";
import Pages404 from "../pages/Utility/pages-404";
import Pages500 from "../pages/Utility/pages-500";

//Contacts
import ContactsGrid from "../pages/Contacts/contacts-grid";
import ContactsList from "../pages/Contacts/ContactList/contacts-list";
//import ContactsProfile from "../pages/Contacts/ContactsProfile/contacts-profile";
import Register2 from "pages/Authentication/register2";
import AddCompany from "pages/admin/ApprovedTransaction/add-company";
import ChangeNewPassword from "../pages/Authentication/ChangeNewPassword"


const authProtectedRoutes = [
  //User Panel Step 1
  { path: "/companies", component: <ApprovedTranction /> },
  { path: "/documents", component: <Document /> },
  { path: "/FormUpload", component: <FormUpload /> },
  { path: "/profile", component: <ContactsProfile /> },
  { path: "/notification", component: <ApprovedTranction /> },
  //USer Panel Step 2
  { path: "/company-dashboard", component: <Dashboard /> },
  { path: "/bad-debts", component: <UserList /> },
  { path: "/company-search", component: <CompanySearch /> },
  { path: "/debtors", component: <DebtorsList /> },
  { path: "/creditors", component: <CrediotorList /> },
  { path: "/send-bill-transaction", component: <SendBillTransaction /> },
  { path: "/recieved-payment", component: <DiputedBillings /> },
  { path: "/employee", component: <Employee /> },
  { path: "/ReportDefaulter", component: <ReporteDefaulter /> },
  { path: "/EmployeeList", component: <EmployeeList /> },
  { path: "/Invoice", component: <Invoice /> },
  { path: "/Report-defaulter", component: <ReportDebtor /> },
 

  { path: "/login-register", component: <Register2 /> },
  
  { path: "/add-company", component: <AddCompany /> },
  {
    path: "/",
    exact: true,
    component: < Navigate to="/login" />,
  },
];

const publicRoutes = [
  { path: "/logout", component: <Logout /> },
  { path: "/login", component: <Login /> },
  { path: "/forgot-password", component: <ForgetPwd /> },
  { path: "/register", component: <Register /> },
  { path: "/changePassword", component: <ChangeNewPassword /> },


  // { path: "/pages-maintenance", component: <PagesMaintenance /> },
  // { path: "/pages-comingsoon", component: <PagesComingsoon /> },
  // { path: "/pages-404", component: <Pages404 /> },
  // { path: "/pages-500", component: <Pages500 /> },
  // { path: "/crypto-ico-landing", component: <CryptoIcoLanding /> },

  // // Authentication Inner  
  // { path: "/user-logi2n", component: <Login1 /> },
  // { path: "/pages-login-2", component: <Login2 /> },
  // { path: "/pages-register", component: <Register1 /> },
  // { path: "/user-register", component: <Register21 /> },
  // { path: "/page-recoverpw", component: <Recoverpw /> },
  // { path: "/page-recoverpw-2", component: <Recoverpw2 /> },
  // { path: "/pages-forgot-pwd", component: <ForgetPwd1 /> },
  // { path: "/auth-recoverpw-2", component: <ForgetPwd2 /> },
  // { path: "/auth-lock-screen", component: <LockScreen /> },
  // { path: "/auth-lock-screen-2", component: <LockScreen2 /> },
  // { path: "/page-confirm-mail", component: <ConfirmMail /> },
  // { path: "/page-confirm-mail-2", component: <ConfirmMail2 /> },
  // { path: "/auth-email-verification", component: <EmailVerification /> },
  // { path: "/auth-email-verification-2", component: <EmailVerification2 /> },
  // { path: "/auth-two-step-verification", component: <TwostepVerification /> },
  // { path: "/auth-two-step-verification-2", component: <TwostepVerification2 /> },
];

export { authProtectedRoutes, publicRoutes };
