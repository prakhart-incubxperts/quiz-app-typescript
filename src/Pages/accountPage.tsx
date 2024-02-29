import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import BarChartIcon from '@mui/icons-material/BarChart';
import { useEffect } from 'react';
import { checkUser } from '../APIManager/userApi';
import { useNavigate } from 'react-router-dom';

export function AccountPage(){

    const role = localStorage.getItem('role');
    const Navigate=useNavigate();
    const token=localStorage.getItem('token');

    useEffect(() => {
        fetchUserData()
      }, []);

      async function fetchUserData(){
        debugger
        const res=await checkUser(token);
        if(res?.data.message!=='profile accessed'){
          Navigate('/user');
        }
      }

    return(
        <div>
            <div className="album py-5 my-2 bg-light">
        <div className="container mt-2">
          <div className="row">
          {/* {topicArray?.length > 0 ? topicArray?.map(topicinfo => {
              return (
              <div className="col-md-4">
                <div className="card mb-4 shadow p-2 mb-4 bg-white rounded bg-info-subtle bg-gradient">
                  <div className="d-flex bd-highlight mb-3 my-1">
                      <h5 className="me-auto p-2 bd-highlight text-capitalize">{topicinfo?.TopicName}</h5>
                      <p className="card-text p-2 bd-highlight mx-1 text-capitalize">Attempts: {topicinfo?.Attempts}</p>
                  </div>
                  <div className="card-body ">
                  // <p className="dcard-text">{topic}</p> 
                    <div className="d-flex justify-content-between">
                      <div className="btn-group">
                        <button type="button" className="btn btn-sm btn-outline-primary" name={topicinfo?.TopicName} value={ topicinfo?.TopicId} onClick={()=>getRank(topicinfo?.TopicName, topicinfo?.TopicId)}><BarChartIcon/></button>
                      </div>
                      <div className="btn-group">
                        {role === "admin" ? <><button type="button" className="btn btn-sm btn-outline-secondary" name={topicinfo?.TopicName} value={topicinfo?.TopicId} onClick={handleOnClickList}>List</button>&nbsp;
                          <button type="button" className="btn btn-sm btn-outline-primary" name={topicinfo?.TopicName} value={topicinfo?.TopicId} onClick={handleOnClickQ}><AddIcon fontSize="small"/> Question</button></>
                          : <button type="button" className="btn btn-sm btn-outline-success" name={topicinfo?.TopicName} value={topicinfo?.TopicId} onClick={handleOnClickStart}>Start</button>}
                      </div>
                      <div className="btn-group" hidden={isDisable}>
                        <button className="btn btn-lg btn-outline p-2 bd-highlight" name={topicinfo?.TopicName} value={topicinfo?.TopicId} hidden={isDisable} disabled={isDisable} onClick={()=>handleEditTopic(topicinfo?.TopicId,topicinfo?.TopicName)}><EditIcon fontSize="medium" color="info"/></button>
                       // <button className="btn btn-lg btn-outline p-2 bd-highlight" hidden={isDisable} disabled={isDisable}><DeleteIcon fontSize="medium" color="inherit"/></button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              )
            }) : "No Data Available"} */}
              </div>
                </div>
              </div>
        </div>
    )
}