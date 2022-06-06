import axios from "axios";
import { FETCH_USER,FETCH_SURVEY } from "./types";

export const fetchUser = () => async (dispatch) => {
  const response = await axios.get("/auth/api/current_user");
  
  dispatch({ type: FETCH_USER, payload: response.data });
};

export const submitSurvey = (values) => async dispatch => {
  const res = await axios.post('/survey/surveys',values);

  dispatch({ type: FETCH_USER, payload: res.data });
}

export const fetchSurveys= () => async dispatch =>{
  const res = await axios.get('survey/surveyCollections');

  dispatch({ type: FETCH_SURVEY, payload: res.data })
}