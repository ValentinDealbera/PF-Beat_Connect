import {
  FormColumn,
  FormContainer,
  FormRow,
  Input,
  SwitchForm,
} from "@/components";

import {
  handleInputChange,
  handleSubmit,
  validateForm,
} from "@/data/formLogic";

import { forwardRef, useImperativeHandle } from "react";
import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adminPostUser, adminEditUser } from "@/redux/slices/admin";
import { useRouter } from "next/router";

const AdminCreateUserForm = forwardRef((props, ref) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const formRef = useRef(null);
  const validateMode = "user";
  const [fieldsToValidate, setFieldsToValidate] = useState([]);
  const [error, setErrors] = useState({});
  const defaultValues =
    useSelector((state) => state.admin.currentEditUser) || {};
  const mode = props.mode;
  const [softD, setSoftD] = useState(defaultValues.softDelete);
  const [sellerState, setSellerState] = useState(defaultValues.isSeller);
  const [adminState, setAdminState] = useState(defaultValues.superAdmin);

  console.log("defaultValues", defaultValues);


    const [form, setForm] = useState({
      username: `${mode === "edit" ? defaultValues.username : ""}`,
      firstName: `${mode === "edit" ? defaultValues.firstName : ""}`,
      lastName: `${mode === "edit" ? defaultValues.lastName : ""}`,
      image: "",
      email: `${mode === "edit" ? defaultValues.email : ""}`,
      // password: `${mode === "edit" ? defaultValues.password : ""}`,
      id: `${mode === "edit" ? defaultValues._id : ""}`,
      bio: `${mode === "edit" ? defaultValues.bio : ""}`,
      backImage:"",
      // seller: `${mode === "edit" ? defaultValues.isSeller : ""}`, 
      // admin: `${mode === "edit" ? defaultValues.superAdmin : ""}`,
      // soft: `${mode === "edit" ? defaultValues.softDelete : ""}`,     
    });

    const handleInput = (e) => {
      handleInputChange(
        e,
        fieldsToValidate,
        setFieldsToValidate,
        form,
        setForm,
        validateMode
      );
    };

    const onSubmit = async (e) => {
      console.log("onSubmit", e, validateMode);
      const actionToDispatch = mode === "edit" ? adminEditUser : adminPostUser;
      try {
        await handleSubmit({
          form: form,
          actionToDispatch: actionToDispatch,
          dispatch: dispatch,
          setErrors: setErrors,
          validateMode: validateMode,
          formRef: formRef.current,
        });
        router.push("/admin/users");
      } catch (error) {
        console.error(error);
      }
    };

    useEffect(() => {
      setErrors(validateForm(form, fieldsToValidate, validateMode));
    }, [form, fieldsToValidate]);

    useImperativeHandle(ref, () => ({
      submit: () => {
        // formRef.current.submit();
        onSubmit();
      },
    }));

    useEffect(()=>{
      if(softD){
        setSoftD(false)
      } else{
        setSoftD(true)
      }
    },[form.soft]);

    useEffect(()=>{
      if(sellerState){
        setSellerState(false)
      } else{
        setSellerState(true)
      }
    },[form.seller]);

    useEffect(()=>{
      if(adminState){
        setAdminState(false)
      } else{
        setAdminState(true)
      }
    },[form.admin]);

    const arraySoftDelete = {
      name: "soft",
      label: "Soft Delete",
      arrayButtons: [
        {
          text: "Yes",
          active: !softD,
          handleAction: () => {
            setForm({
              ...form,
              soft: "DELETE",
            });
          },
        },
        {
          text: "No",
          active: softD,
          handleAction: () => {
            setForm({
              ...form,
              soft: "DELETE",
            });
          },
        },
      ],
    };

    const arraySeller= {
      name: "seller",
      label: "Is Seller",
      arrayButtons: [
        {
          text: "Yes",          
          active: !sellerState,
          handleAction: () => {
            setForm({
              ...form,
              seller: "VENDEDOR",
            });
          },
        },
        {
          text: "No",
          active: sellerState,
          handleAction: () => {
            setForm({
              ...form,
              seller: "VENDEDOR",
            });
          },
        },
      ],
    };

    const arrayAdmin= {
      name: "admin",
      label: "Is Admin",
      arrayButtons: [
        {
          text: "Yes",
          active: !adminState,
          handleAction: () => {
            setForm({
              ...form,
              admin: "ADMIN",
            });
          },
        },
        {
          text: "No",
          active: adminState,
          handleAction: () => {
            setForm({
              ...form,
              admin: "ADMIN",
            });
          },
        },
      ],
    };

    console.log("El FORM", form)



    return (
      <form ref={formRef} onSubmit={onSubmit}>
        <FormContainer>
          <FormRow>
            <FormColumn className="w-full">
              <Input
                id="firstName"
                name="firstName"
                label="First Name"
                placeholder="First Name:"
                defaultValue={mode === "edit" ? defaultValues.firstName : ""}
                type="text"
                onChange={handleInput}
                error={error.firstName}
              />
              <Input
                name="lastName"
                id="lastName"
                label="Last Name"
                placeholder="Last Name:"
                defaultValue={mode === "edit" ? defaultValues.lastName : ""}
                type="text"
                onChange={handleInput}
                error={error.lastName}
              />
              <Input
                name="username"
                id="username"
                label="UserName"
                placeholder="UserName:"
                defaultValue={mode === "edit" ? defaultValues.username : ""}
                type="text"
                onChange={handleInput}
                error={error.username}
              />
              <Input
                id="bio"
                name="bio"
                label="Bio"
                placeholder="Bio:"
                defaultValue={mode === "edit" ? defaultValues.bio : ""}
                type="text"
                onChange={handleInput}
                error={error.bio}
              />              
            </FormColumn>
            <FormColumn className="w-full">
              <Input
                name="password"
                label="Password"
                placeholder="password:"
                defaultValue={mode === "edit" ? defaultValues.password : ""}
                type="password"
                onChange={handleInput}
                error={error.password}
              />
              <Input
                name="email"
                label="Email"
                placeholder="Email:"
                defaultValue={mode === "edit" ? defaultValues.email : ""}
                type="email"
                onChange={handleInput}
                error={error.email}
              />
              <Input
                  name="backImage"
                  label="Cover Image"
                  placeholder="Cover Image:"                  
                  type="file"
                  onChange={handleInput}
                  error={error.backImage}
                />
                <Input
                  name="image"
                  label="Profile Image"
                  placeholder="Profile Image:"                  
                  type="file"
                  onChange={handleInput}
                  error={error.image}
                />
            </FormColumn>
            </FormRow>
            <FormRow>
              <SwitchForm
                label="SoftDelete"
                name="soft"
                nameInput="soft"
                // defaultValue={mode === "edit" ? defaultValues.softDelete : ""}
                onChange={handleInput}
                arrayButtons={arraySoftDelete.arrayButtons}
                error={error.soft}
              />
              <SwitchForm
                label="Is Seller"
                name="seller"
                nameInput="seller"
                // defaultValue={mode === "edit" ? defaultValues.IsSeller : ""}
                onChange={handleInput}
                arrayButtons={arraySeller.arrayButtons}
                error={error.seller}
              />
              <SwitchForm
                label="Super Admin"
                name="admin"
                nameInput="admin"
                // defaultValue={mode === "edit" ? defaultValues.superAdmin : ""}
                onChange={handleInput}
                arrayButtons={arrayAdmin.arrayButtons}
                error={error.admin}
              />            
          </FormRow>
        </FormContainer>
      </form>
    )
  }
);
export default AdminCreateUserForm;
