import React from "react";
import { UpperSection } from "./uppersection";
import { Navigation, Route, useNavigate } from 'react-router-dom';


export function DashBoard(){
    const Navigate=useNavigate();
    function handleOnClick(){
        Navigate("/user");
    }
    return(
        <main role="main">

            <UpperSection/>

      <div className="album py-5 bg-light">
        <div className="container">

          <div className="row">
            <div className="col-md-4">
              <div className="card mb-4 box-shadow bg-warning bg-gradient">
                <img className="card-img-top" data-src="holder.js/100px225?theme=thumb&bg=55595c&fg=eceeef&text=Thumbnail" />
                <div className="card-body ">
                  <p className="card-text">React</p>
                  <div className="d-flex justify-content-between align-items-center">
                  <small className="card-text">9 </small>
                    <div className="btn-group">
                      {/* <button type="button" className="btn btn-sm btn-outline-secondary">View</button> */}
                      <button type="button" className="btn btn-lg btn-outline-success" onClick={handleOnClick}>Start</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card mb-4 box-shadow bg-warning bg-gradient">
                <img className="card-img-top" data-src="holder.js/100px225?theme=thumb&bg=55595c&fg=eceeef&text=Thumbnail" />
                <div className="card-body ">
                  <p className="card-text">Node</p>
                  <div className="d-flex justify-content-between align-items-center">
                  <small className="card-text">9 </small>
                    <div className="btn-group">
                      {/* <button type="button" className="btn btn-sm btn-outline-secondary">View</button> */}
                      <button type="button" className="btn btn-lg btn-outline-success" onClick={handleOnClick}>Start</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card mb-4 box-shadow bg-warning bg-gradient">
                <img className="card-img-top" data-src="holder.js/100px225?theme=thumb&bg=55595c&fg=eceeef&text=Thumbnail" />
                <div className="card-body ">
                  <p className="card-text">History</p>
                  <div className="d-flex justify-content-between align-items-center">
                  <small className="card-text">9 </small>
                    <div className="btn-group">
                      {/* <button type="button" className="btn btn-sm btn-outline-secondary">View</button> */}
                      <button type="button" className="btn btn-lg btn-outline-success" onClick={handleOnClick}>Start</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card mb-4 box-shadow bg-warning bg-gradient">
                <img className="card-img-top" data-src="holder.js/100px225?theme=thumb&bg=55595c&fg=eceeef&text=Thumbnail" />
                <div className="card-body ">
                  <p className="card-text">Cricket</p>
                  <div className="d-flex justify-content-between align-items-center">
                  <small className="card-text">9 </small>
                    <div className="btn-group">
                      {/* <button type="button" className="btn btn-sm btn-outline-secondary">View</button> */}
                      <button type="button" className="btn btn-lg btn-outline-success" onClick={handleOnClick}>Start</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card mb-4 box-shadow bg-warning bg-gradient">
                <img className="card-img-top" data-src="holder.js/100px225?theme=thumb&bg=55595c&fg=eceeef&text=Thumbnail" />
                <div className="card-body ">
                  <p className="card-text">Movies</p>
                  <div className="d-flex justify-content-between align-items-center">
                  <small className="card-text">9 </small>
                    <div className="btn-group">
                      {/* <button type="button" className="btn btn-sm btn-outline-secondary">View</button> */}
                      <button type="button" className="btn btn-lg btn-outline-success" onClick={handleOnClick}>Start</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card mb-4 box-shadow bg-warning bg-gradient">
                <img className="card-img-top" data-src="holder.js/100px225?theme=thumb&bg=55595c&fg=eceeef&text=Thumbnail" />
                <div className="card-body ">
                  <p className="card-text">Java</p>
                  <div className="d-flex justify-content-between align-items-center">
                  <small className="card-text">9 </small>
                    <div className="btn-group">
                      {/* <button type="button" className="btn btn-sm btn-outline-secondary">View</button> */}
                      <button type="button" className="btn btn-lg btn-outline-success" onClick={handleOnClick}>Start</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card mb-4 box-shadow bg-warning bg-gradient">
                <img className="card-img-top" data-src="holder.js/100px225?theme=thumb&bg=55595c&fg=eceeef&text=Thumbnail" />
                <div className="card-body ">
                  <p className="card-text">Java</p>
                  <div className="d-flex justify-content-between align-items-center">
                  <small className="card-text">9 </small>
                    <div className="btn-group">
                      {/* <button type="button" className="btn btn-sm btn-outline-secondary">View</button> */}
                      <button type="button" className="btn btn-lg btn-outline-success" onClick={handleOnClick}>Start</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </main>
    )
}


