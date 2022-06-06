import React from 'react';
import {Link} from "react-router-dom";
import SurveyList from "./surveys/SurveyList";
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { makeStyles } from '@material-ui/core/styles';



const Dashboard = () => {
    return (
        <div>
            <SurveyList/>
            <Box sx={{ '& > :not(style)': { m: 1 },position: 'fixed' , bottom: 16, right: 16}}>
                <Fab color="primary" aria-label="add" >
                    <Link to='/survey/new'>
                        <AddIcon />
                    </Link>
                </Fab>
            </Box>
        </div>
    );
};

export default Dashboard;