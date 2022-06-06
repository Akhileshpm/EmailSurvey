import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import SurveyField from "./SurveyField";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import validateEmails from "../../utils/validateEmails";
import FIELDS from './formFields';


class surveyForm extends Component {
  renderFields() {
    const app = [];
    app.push(
      FIELDS.map(({ label, name }) => (
        <Field
          key={name}
          label={label}
          type="text"
          name={name}
          component={SurveyField}
        />
      ))
    );
    return <div>{app}</div>;
  }
  render() {
    return (
      <div>
        <form
          onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}
        >
          <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1 },
                alignItems:'center'
              }}
            noValidate
            autoComplete="off"
          >
            {this.renderFields()}
          </Box>

          <Box sx={{ position: "absolute", bottom: 16, left: 16 }}>
            <Link to="/surveys" style={{ textDecoration: "none" }}>
              <Button variant="contained">cancel</Button>
            </Link>
          </Box>

          <Button
            variant="contained"
            type="submit"
            sx={{ position: "absolute", bottom: 16, right: 16 }}
          >
            next
          </Button>
        </form>
      </div>
    );
  }
}

function validate(values){
    const errors = {};
    errors.emails = validateEmails(values.emails || '');
    FIELDS.map(({name}) => {
        if(!values[name]){
            errors[name] = `You must provide a value`;
        }
    })
    return errors;
}

//reduxForm can manipulate the props that is passed to the surveyForm similar to connect()
export default reduxForm({
  validate,
  form: "surveyForm",
  destroyOnUnmount: false
})(surveyForm);
