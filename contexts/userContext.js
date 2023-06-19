import { createContext } from "react";
import { useState } from "react";

export const user=createContext({
    username:"",
    setusername:()=>{},
    logoutuser:()=>{}
})

function UserContext({children}){
    const [username,setusername]=useState("")
    function logoutuser(){
        setusername("");
    }
    return (
        <user.Provider value={{username:username,
        setusername:setusername,
        logoutuser:logoutuser
        }}>
            {children}
        </user.Provider>
    )
}

export default UserContext;