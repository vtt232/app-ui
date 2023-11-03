import { useState } from "react";
import apiService from '../ApiCaller/ApiCaller';
import { AdminPageProps } from "../Type/ModalPropsType";

export function SetAdminRoleForm (props: AdminPageProps) {
    
  
  
  
    const handleAdminNameFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      props.setAdminNameField(e.target.value);
    };
  
  
    const setAdminRoleSubmit = (e: React.FormEvent) => {
      e.preventDefault();

      apiService.setAdminRole(props.adminNameField)
        .then((resposne) => {
            if(resposne == true){
                props.modalProps.setMessage("SET ADMIN ROLE SUCCESSFULLY");
                props.sendMessageToNewAdmin();

            }else{
                props.modalProps.setMessage("SET ADMIN ROLE FAILED")
            }
        })
        .catch((error)=>{console.error("Error:", error)})

      props.modalProps.open();
  
    
      
    };
  
  
      return(<div>
          <h2>My Form</h2>
          <form onSubmit={setAdminRoleSubmit}>
            <div>
              <label htmlFor="content">Content:</label>
              <input
                type="text"
                id="content"
                content={props.adminNameField}
                onChange={handleAdminNameFieldChange}
              />
            </div>
            <div>
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>)
  }