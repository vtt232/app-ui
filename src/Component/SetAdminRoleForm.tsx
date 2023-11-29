import { useState } from "react";
import apiService from '../ApiCaller/ApiCaller';
import { AdminPageProps } from "../Type/AdminPagePropsType";
import { Container, Typography, Button, Box, TextField } from '@mui/material';

export function SetAdminRoleForm (props: AdminPageProps) {
    
  const [adminName, setAdminName] = useState<string>('');
  
  
    const handleAdminNameFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setAdminName(e.target.value);
    };
  
  
    const setAdminRoleSubmit = (e: React.FormEvent) => {
      e.preventDefault();

      apiService.setAdminRole(adminName)
        .then((resposne) => {
            if(resposne == true){
                props.modalProps.message.setValue("SET ADMIN ROLE SUCCESSFULLY");
                props.sendMessageToNewAdmin(adminName);

            }else{
                props.modalProps.message.setValue("You have no permission!!!")
            }
        })
        .catch((error)=>{
          props.modalProps.message.setValue("You have no permission!!!")
          console.error("Error:", error)
        })

      props.modalProps.open();
  
    
      
    };
  
  
      return(
        <Box display="flex" flexDirection="column" alignItems="center">
        <h2>MY FORM</h2>
        <form onSubmit={setAdminRoleSubmit}>
        <div>
        <label htmlFor="content">
          <Typography variant="h6">NEW ADMIN:</Typography>
        </label>
        <TextField
          type="text"
          id="content"
          value={adminName}
          onChange={handleAdminNameFieldChange}
        />
        </div>
        <Box mt={2} display="flex" justifyContent="center">
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </Box>
      </form>
      </Box>)
  }