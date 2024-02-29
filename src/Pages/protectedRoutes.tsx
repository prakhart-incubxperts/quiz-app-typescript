import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { checkUser } from "../APIManager/userApi";


export function ProtectedRoutes(props:any){
    
    const Component=props;
    const Navigate=useNavigate();
    useEffect(() => {
       let login=localStorage.getItem('token');
       checkLogin(login);
    //    if(login){
    //     Navigate('/account');
    //    }
      },[]);

      async function checkLogin(token:any){
        const res=await checkUser(token);
        if(res?.data.message==='profile accessed'){
            Navigate('/account');
        }
        else{
            Navigate('/user');
        }
      }

    return(
        <div>
            <Component/>
        </div>
    )
}