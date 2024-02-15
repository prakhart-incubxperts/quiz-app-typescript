import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import BarChartIcon from '@mui/icons-material/BarChart';
import { useEffect } from 'react';

export function AccountPage(){

    const role = localStorage.getItem('role');

    useEffect(() => {
        fetchUserData()
      }, []);

      function fetchUserData(){
        
      }

    return(
        <div>
            <div className="album py-5 my-2 bg-light">
        <div className="container mt-2">
          <div className="row">
            <div className="col-md-4">
                <div className="card mb-4 shadow p-2 mb-4 bg-primary rounded bg-primary-subtle bg-gradient">
                  <div className="d-flex bd-highlight mb-3 my-1">
                      <h5 className="me-auto p-2 bd-highlight ">{'topic name'}</h5>
                      <p className="card-text p-2 bd-highlight mx-1">Attempts: {'0'}</p>
                  </div>
                  <div className="card-body ">
                  {/* <p className="dcard-text">{topic}</p> */}
                    <div className="d-flex justify-content-between">
                      <div className="btn-group">
                        <button type="button" className="btn btn-sm btn-outline-primary bd-highlight" name={''} value={''} ><BarChartIcon/></button>
                      </div>
                      <div className="btn-group">
                        {role === "admin" ? <><button type="button" className="btn btn-sm btn-outline-secondary bd-highlight" >List</button>&nbsp;
                          <button type="button" className="btn btn-sm btn-outline-primary bd-highlight " ><AddIcon fontSize="small"/> Question</button></>
                          : <button type="button" className="btn btn-sm btn-outline-success bd-highlight" >Start</button>}
                      </div>
                      <div className="btn-group">
                        <button className="btn btn-lg btn-outline p-2 bd-highlight bd-highlight"><EditIcon fontSize="medium" color="info"/></button>
                        {/* <button className="btn btn-lg btn-outline p-2 bd-highlight" hidden={isDisable} disabled={isDisable}><DeleteIcon fontSize="medium" color="inherit"/></button> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              </div>
                </div>
              </div>
        </div>
    )
}