import { useState, useEffect } from "react";
import { Autocomplete } from "@mui/material";
import { TextField } from "@mui/material"; 
import { useDispatch, useSelector } from "react-redux";
import { adminGetUsersForms } from "@/redux/slices/admin";

export default function SetUser (id, name, onChange){

    const dispatch = useDispatch();
    const defaultUsers = useSelector((state) => state.admin.usersForms); 
    const options = defaultUsers.map(user => ({
        label: user.username,
        value: user._id
      }));

      useEffect(() => {
      dispatch(adminGetUsersForms());        
      }, []);

      console.log("usuarios", options);     

  return (
    <Autocomplete
      id={id}
      name={name}
      options={options}
      getOptionLabel={(option) => option.label}
      onChange={onChange}
      renderInput={(params) => (
        <TextField {...params} label="Seleccionar opción" variant="outlined" />
      )}
      isOptionEqualToValue={(option, value) => option.value === value.value}
    />
  )
}