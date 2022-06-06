import ReactPaginate from "react-paginate";
import React, {
  useEffect,
  useState
} from "react";
import { connect } from 'react-redux';
import surveyReducer from '../../reducers/surveyReducer';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { fetchSurveys } from '../../actions';
import './paginationStyles.css';
import { toast } from "react-toastify";


const useEventSource = (url) => {
  const [data, updateData] = useState(null);

  useEffect(() => {
    const source = new EventSource(url);
    
    source.onmessage = function logEvents(event) {      
      updateData(JSON.parse(event.data));     
    }
  }, [])

  return data
}

function Items({ currentItems }) {
    return currentItems.map(survey => {
        return (
            <div key={survey._id} style={{margin:"10px", padding:"10px", display:"inline-grid"}}>
                <Card sx={{ maxWidth: 475, minWidth: 475, minHeight: 250 }}>
                <CardContent>
                <Typography variant="h5" component="div">
                    {survey.title}
                </Typography>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Sent Date: {new Date(survey.dateSend).toLocaleDateString()}
                </Typography>                
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    last responded: {new Date(survey.lastResponded).toLocaleString()}
                </Typography>
                <Typography variant="body2">
                    {survey.body}
                </Typography>
                </CardContent>
                <CardActions>
                <Button size="small">yes: {survey.yes}</Button>
                <Button size="small">no: {survey.no}</Button>
                </CardActions>
                </Card>
          </div>
        )
    })
}

function PaginatedItems({ itemsPerPage, fetchSurveys, surveys }) {
  
  const data = useEventSource('http://localhost:5000/survey/endpoint');

  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [sort,setSort]              = useState(false);    
  
  const notify = async ()=>{
    if( data.userResponded){
      toast("A user has responded");
  }}

  useEffect(()=>{
    fetchSurveys();
    notify();
  },[data]);

  useEffect(()=>{
    fetchSurveys();
  },[]);
 
  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    // console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    // console.log(surveys);
    setCurrentItems((sort ? surveys : surveys.reverse()).slice(itemOffset, endOffset));
    setPageCount(Math.ceil(surveys.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, surveys, sort]);

  const handlePageClick = (event) => {
    const newOffset = event.selected * itemsPerPage % surveys.length;
    setItemOffset(newOffset);
  };

  
  return (
    <>
      <h3 style={{color: "white"}} onClick={()=>setSort(prevState => !prevState)}>{sort ? "Oldest First" : "Newest First"}</h3>
      <Items currentItems={currentItems} />
      <div style={{position:"fixed",bottom:"1vh",left:"40vw"}}>
      <ReactPaginate
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={pageCount}
        previousLabel="< previous"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={null}
      />
      </div>
    </>
  );
}

function mapStateToProps({surveys}){
    return({surveys})
}
export default connect(mapStateToProps,{ fetchSurveys })(PaginatedItems);
