import React,{Component} from "react";
import { BrowserRouter, Route, Routes, Link, Navigate } from "react-router-dom";
import {connect} from 'react-redux';
import * as actions from '../actions';
import Header from "./Header";
import HomePage from './HomePage';
import Dashboard from "./Dashboard";
import SurveyNew from "./surveys/SurveyNew";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Response =()=>{
  return(
    <div>
      Thanks for the response!
    </div>
  )
}
class App extends Component {
componentDidMount(){
  this.props.fetchUser();
}
render()
{  
  return(
    <div style={{background:"lightblue"}}>
        <BrowserRouter>
          <div>
          <Header/>
            <Routes>
              <Route path="/" element={<HomePage/>} />
              <Route path="/surveys" element={
              this.props.auth ? (<Dashboard/>): (<Navigate replace to = "/" />)} />
              <Route path="/survey/new" element={
              this.props.auth ? (<SurveyNew/>): (<Navigate replace to = "/" />)} />
              <Route path="/response" element={<Response/>} />
            </Routes>
          </div>
        </BrowserRouter>
      <ToastContainer />
    </div>
    );
}
}

function mapStateToProps({auth}){
  return({auth});
}
export default connect(mapStateToProps, actions)(App);
