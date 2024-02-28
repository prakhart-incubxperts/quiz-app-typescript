import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { findorCreateUser, getUserByEmail, saveUser } from "../APIManager/userApi";
import { UserData } from "../Interface/model";

export function UserRegistration() {
    
    const role: string | any = localStorage.getItem('role');
    const [data, setData] = useState<UserData>({ UserName: '', UserEmail: '',Password:'', CreatedBy: '', CreatedAt: '', UpdatedBy: '', UpdatedAt: '', status: 'True' });
    const [isDisable,setIsDisable]= useState<boolean>(false);
    const [isLogin,setIsLogin] = useState<boolean>(false);
    const [confirmPassword,setConfirmPassword] = useState<string>('');
    const { state } = useLocation();
    const Navigate = useNavigate();
    const Topicid = state?.topicid;
    const topic = state?.topic;
    let isUser = false;

    useEffect(() => {
    }, []);

    async function handleClick(e: any) {
        debugger
        console.log(state?.topicid,state?.topic);
        e.preventDefault()        
        setData({ ...data, CreatedBy: role })
        if (data?.UserEmail !== "" && data?.UserEmail !== undefined) {
            if(!isLogin){
                if(data?.Password===confirmPassword){
                    const name = data?.UserName;
                    const userEmail = data?.UserEmail;
                    const res=await findorCreateUser(data);
                    console.log("response from user:",res);           
                    Navigate("/test", { state: { Topicid, topic, name, userEmail } });
                }
                else{
                    alert("Confirm Password must be same");
                }
            }
            else{
                const name = data?.UserName;
                const userEmail = data?.UserEmail;
                const res=await findorCreateUser(data);
                console.log("response from user:",res);           
                Navigate("/test", { state: { Topicid, topic, name, userEmail } });
            }
            
        } 
    }

    function handleOnChange(e: any) {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    function handleConfirmPassword(e:any){
        if(data?.Password!==e.target.value){
            return false
        }
        setConfirmPassword(e.target.value);
    }

    function handleForgotPassword(){

    }

    function handleLogin(e:any){
        if(e.target.id==='newUser'){
            setIsLogin(true);
            setIsDisable(true);
        }
        else{
            setIsDisable(true);
            setIsLogin(false);
        }
    }

    return (
        <div>
        <div className="container p-3 ">
            <div className="mx-auto">
                <div className="mx-auto col-md-6 shadow p-2 mb-5 bg-white rounded">
                    <form className="form-control border-0" onSubmit={handleClick}>
                        <div className="text-center mb-4">
                            <h1 className="h3 mb-3 font-weight-normal">{isLogin?'Login':'Sign-Up'}</h1>
                        </div>
                        <div className="form-label-group p-3">
                            <input type="text" name="UserName" className="form-control" placeholder="Name" onChange={handleOnChange} required autoFocus />
                        </div>
                        <div className="form-label-group p-3">
                            <input type="email" name="UserEmail" className="form-control" pattern="[a-z0-9._%+\-]+@[a-z]+\.[a-z]{2,}$" onChange={handleOnChange} placeholder="Email" required /> 
                        </div>
                        <div className="form-label-group p-3">
                            <input type="password" name="Password" className="form-control" placeholder="Password" onChange={handleOnChange} required /> 
                        </div>
                        <div className="form-label-group p-3" hidden={isLogin}>
                            <input type="password" name="confirmPassword" className="form-control" placeholder="Confirm Password" hidden={isLogin} disabled={isLogin} pattern={data?.Password} onChange={handleConfirmPassword}  required/> 
                        </div>
                        <div className="form-label-group" hidden={!isLogin}>
                            <Link to={''} onClick={handleForgotPassword} >Forgot Password?</Link>
                        </div>
                        <div className="form-label-group p-3">
                        <button className="btn btn-lg btn-primary btn-block" type="submit" >{topic!==undefined?'Start Test':'Login'}</button>
                        </div>
                        <div className="form-label-group p-2">
                        {isLogin?<p>Don't have an Account? <Link id="existing" onClick={handleLogin} to={''}>Signup</Link></p>:<p>Already have an Account? <Link id="newUser" to={''} onClick={handleLogin}>Login</Link></p>}
                        </div>
                        {/* <p className="mt-4 mb-3 text-muted text-center">{topic} Test consist of all levels of questions , each question is of 30 seconds</p> */}
                        {/* <p className="mt-3 mb-2 text-muted text-center"><h5>Attempted Questions can not be re-attempted</h5></p> */}
                    </form>
                </div>
            </div>
        </div>
        </div>
    )
}