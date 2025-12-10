import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Login from './Login';
import Signup from './Signup';
import Dashboard from './Dashboard';
import CreatePlan from './CreatePlan';
import ViewPlans from './ViewPlans';
import CommunityPlans from './CommunityPlans';
import AdvisorFeedback from "./AdvisorFeedback";
import Advisor from "./Advisor";
import AdvisorPlans from "./AdvisorPlans";
import reportWebVitals from './reportWebVitals';
import PlanDetails from "./PlanDetails";
import 'bootstrap/dist/css/bootstrap.css';
import {Route, createBrowserRouter, createRoutesFromElements, RouterProvider} from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
    <Route path = "/" element = {<Login/>}/>
    <Route path = "/Login" element = {<Login/>}/>
    <Route path = "/Signup" element = {<Signup/>}/>
    <Route path="/Dashboard" element={<Dashboard/>}/>
    <Route path="/CreatePlan" element={<CreatePlan />} />
    <Route path="/ViewPlans" element={<ViewPlans />} />
    <Route path="/CommunityPlans" element={<CommunityPlans />} />
    <Route path="/AdvisorFeedback" element={<AdvisorFeedback />} />
    <Route path="/advisor" element={<Advisor />} />
    <Route path="/advisor/plan/:id" element={<AdvisorPlans />} />
    <Route path="/plans/:planId" element={<PlanDetails />} />
    </>
  )
)

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
