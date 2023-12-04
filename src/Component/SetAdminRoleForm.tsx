import { useState } from "react";
import apiService from '../ApiCaller/ApiCaller';
import { Container, Typography, Button, Box, TextField } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { stateRedux } from "../Type/ReduxTypes";
import { openModalWithNewMessage } from "../sagas/actions";

export function SetAdminRoleForm () {
    
  const [adminName, setAdminName] = useState<string>('');

  const dispatch = useDispatch()
  
  
    const handleAdminNameFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setAdminName(e.target.value);
    };
  
  
    const setAdminRoleSubmit = (e: React.FormEvent) => {
      e.preventDefault();

      apiService.setAdminRole(adminName)
        .then((resposne) => {
            if(resposne == true){
              dispatch(openModalWithNewMessage("SET ADMIN ROLE SUCCESSFULLY"))
            }else{
              dispatch(openModalWithNewMessage("You have no permission!!!"))
            }
        })
        .catch((error)=>{
          dispatch(openModalWithNewMessage("You have no permission!!!"))
          console.error("Error:", error)
        })    
      
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