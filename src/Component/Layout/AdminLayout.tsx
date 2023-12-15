import { useSelector } from "react-redux";
import { stateRedux } from "../../Type/ReduxTypes";
import { useEffect } from "react";
import { ROLE_ADMIN } from "../../Constant/Constant";
import { useNavigate } from "react-router";


export function AdminLayout () {

    const user = useSelector((state: stateRedux) =>state.userReducer.user);
    const navigate = useNavigate()


    useEffect(()=>{

        if (user.role != ROLE_ADMIN) {
            navigate("/home",{replace: true})
        }
        
     },[])

     return(<div></div>)

}