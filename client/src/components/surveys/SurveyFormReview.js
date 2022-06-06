import React from 'react';
import Button from "@mui/material/Button";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import FIELDS from './formFields'
import MailIcon from '@mui/icons-material/Mail';
import * as actions from  '../../actions';

const SurveyFormReview =({onCancel, formValues, submitSurvey, history})=>{
  let navigate = useNavigate();
  

  const reviewFields = FIELDS.map(({label, name}) => {
    return(
      <div style={{padding: '3px',margin: '10px',fontSize:'24px'}}>
        <label>{label}</label>
        <div style={{padding: '3px',color:"grey"}}>
          {formValues[name]}
        </div>
      </div>
    )
  }) 

  return(
        <div>
        <form onSubmit={()=>navigate("../surveys", {replace: true} )}>          
        Please confirm the details before sending the email.
            {reviewFields}
          <Button
          variant="contained"
          onClick={onCancel}
          type="submit"
          sx={{ position: "absolute", bottom: 16, left: 16 }}
          >
            go back
          </Button>
          <Button
            onClick={() => submitSurvey(formValues)}
            variant="contained"
            type="submit"
            sx={{ position: "absolute", bottom: 16, right: 16 }}
          >
            send survey 
            <MailIcon/>
          </Button>
          </form> 
        </div>
    )
}
function mapStateToProps(state){
  return{
      formValues: state.form.surveyForm.values
  };
}
export default connect(mapStateToProps, actions)(SurveyFormReview);