import { useNavigate } from "react-router-dom"

export function UserRegistration() {
    const Navigate=useNavigate();
    function handleClick(){
        Navigate("/test")
    }

    return (
        <div className="container p-4">
            {/* <div className="row"> */}
                <div className="mx-auto ">
                    <div className="mx-auto col-md-6">
                    <form className="form-control">
                        <div className="text-center mb-4">
                            {/* <img className="mb-4" src="https://getbootstrap.com/docs/4.0/assets/brand/bootstrap-solid.svg" width="72" height="72" /> */}
                            <h1 className="h3 mb-3 font-weight-normal">Register</h1>
                            <p> <code></code><a href="https://caniuse.com/#feat=css-placeholder-shown"></a></p>

                        </div>

                        <div className="form-label-group">
                            <input type="text" id="inputName" className="form-control" placeholder="Name" required autoFocus />
                            <label htmlFor="inputName"></label>
                            {/* <label>Name</label> */}
                        </div>

                        <div className="form-label-group">
                            <input type="email" id="inputEmail" className="form-control" placeholder="Email" required />
                            <label htmlFor="inputEmail"></label>
                            {/* <label>Email</label> */}
                        </div>
                        <button className="btn btn-lg btn-primary btn-block" type="submit" onClick={handleClick}>Start Test</button>
                        <p className="mt-5 mb-3 text-muted text-center">Test consist of 10 questions, each question is of 30 seconds</p>
                        <p className="mt-3 mb-2 text-muted text-center">Attempted Questions can not be re-attempted</p>
                    </form>
                    </div>
                </div>
            {/* </div> */}
        </div>
    )
}