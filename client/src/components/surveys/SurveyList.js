import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSurveys } from '../../actions';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import surveyReducer from '../../reducers/surveyReducer';
import PaginatedItems from './PaginatedItems';

class SurveyList extends Component {
    state = { 
        sort: false
    };

    render() {
        return (
            <div className='container'>
                <h1 style={{color:"white"}}>My Surveys</h1>
                {/* <h3 onClick={()=>this.setState((prevState)=>({sort: !prevState}))}>
                     Click To Toggle
                </h3>
                <h1>{this.state.sort ? ("Oldest Order") : ("Newest First")}</h1>    
                {this.state.sort ? this.renderLists(): this.renderReverseLists()} */}
                <PaginatedItems itemsPerPage={4}/>
            </div>
        );
    }
}
function mapStateToProps({surveys}){
    return({surveys})
}
export default connect(mapStateToProps,{ fetchSurveys })(SurveyList);