import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getUserByEmail, saveUser } from "../APIManager/userApi";
import { UserData } from "../Interface/model";

export function UserRegistration() {
    
    const role: string | any = localStorage.getItem('role');
    const [data, setData] = useState<UserData>({ UserName: '', UserEmail: '', CreatedBy: '', CreatedAt: '', UpdatedBy: '', UpdatedAt: '', status: 'True' });
    const Navigate = useNavigate();
    const { state } = useLocation();
    const Topicid = state?.topicid;
    const topic = state?.topic;
    let isUser = false;

    useEffect(() => {
    }, []);

    async function handleClick(e: any) {
        debugger
        e.preventDefault()        
        setData({ ...data, CreatedBy: role })
        if (data?.UserEmail !== "" && data?.UserEmail !== undefined) {
            const name = data?.UserName;
            const userEmail = data?.UserEmail;
            const res =await getUserByEmail(userEmail);
            if(res?.length===0){
                isUser=true;
            }
            if (isUser) {
                 await saveUser(data);
            }           
            Navigate("/test", { state: { Topicid, topic, name, userEmail } });
        } 
    }

    function handleOnChange(e: any) {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    return (
        <div>
        <div className="container p-3 ">
            <div className="mx-auto">
                <div className="mx-auto col-md-6 shadow p-3 mb-5 bg-white rounded">
                    <form className="form-control border-0" onSubmit={handleClick}>
                        <div className="text-center mb-4">
                            <h1 className="h3 mb-3 font-weight-normal">Register</h1>
                        </div>
                        <div className="form-label-group p-3">
                            <input type="text" name="UserName" className="form-control" placeholder="Name" onChange={handleOnChange} required autoFocus />
                        </div>
                        <div className="form-label-group p-3">
                            <input type="email" name="UserEmail" className="form-control" pattern="[a-z0-9._%+\-]+@[a-z]+\.[a-z]{2,}$" onChange={handleOnChange} placeholder="Email" required /> 
                        </div>
                        <button className="btn btn-lg btn-primary btn-block" type="submit" >Start Test</button>
                        <p className="mt-4 mb-3 text-muted text-center">{topic} Test consist of all levels of questions , each question is of 30 seconds</p>
                        <p className="mt-3 mb-2 text-muted text-center"><h5>Attempted Questions can not be re-attempted</h5></p>
                    </form>
                </div>
            </div>
        </div>
        </div>
    )
}