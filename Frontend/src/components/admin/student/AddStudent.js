import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import adminService from "../../../services/adminService";
import {Form, FormGroup, Label, Input, Button, Col, Row, FormFeedback} from 'reactstrap';


const AddStudent = () => {

    let navigate = useNavigate();

    

    const [student, setStudent] = useState({
        name: "",
        mobile: "",
        username:"",
        password:"",
        email:"",
        foodChoice:"JAIN",
        role:"STUDENT"
    });

    const {name,mobile,username,password,email,foodChoice,role} = student;

    const initialError={
        name: "Cannot be empty",
        mobile: "CAnnot be empty",
        
        password:"Enter the Password",
        email:"Cannot be empty",
        foodChoice:"Select Food choice",
       }
       const [formErrors,setFormErrors]=useState(initialError)
       const validateForm = (targetName, targetValue) => {
         console.log("INSIDE Validation function")  
         console.log(targetName, targetValue)
           if(targetName=== "email") {
             if (targetValue === "") {
               setFormErrors({...formErrors, email: "email is mandatory"})
             } else if (new RegExp("^[A-Za-z0-9.]+@iiitb\.ac\.in$").test(targetValue)===false) {
               setFormErrors({...formErrors, email: "Invalid emailId"})
             } else {
               setFormErrors({...formErrors, email: ""})
             }
           }
           if(targetName=== "name") {
             if (targetValue === "") {
               setFormErrors({...formErrors, name: "Student Name is mandatory"})
             } else {
               setFormErrors({...formErrors, name: ""})
             }
           }
           if(targetName=== "mobile") {
             if (new RegExp("^\\d{10}$").test(targetValue)===false) setFormErrors( {...formErrors, mobile: "Invalid Mobile only(10 digits allowed)"})
             else setFormErrors( {...formErrors, mobile: ""})
           }
          if(targetName==="password"){
               if(targetValue.length<=4){
                   setFormErrors({...formErrors,password:"Password is too short"})
               }
               else {
                   setFormErrors({...formErrors,password:""})
               }
       
           }

        if(targetName==="foodChoice"){
            if (targetValue === "") {
                setFormErrors({...formErrors, foodChoice: "foodChoice is mandotry"})
              } else {
                setFormErrors({...formErrors, foodChoice: ""})
              }
        }
        if(targetName==="username"){
            if (targetValue === "") {
                setFormErrors({...formErrors, username: "User Name is mandatory"})
              } else {
                setFormErrors({...formErrors, username: ""})
              }
        }


         }



    const onInputChange = (e) => {
        console.log("inside InpulChange")
        console.log(e.target.name );
        console.log(e.target.value);
        validateForm(e.target.name,e.target.value)
        setStudent({...student, [e.target.name]: e.target.value});
        
        console.log(student);
    };


    const onSubmit = async (e) => {
        e.preventDefault();
        
        let nerrors = 0;
        Object.values(formErrors).forEach((value) => nerrors += value.length === 0 ? 0 : 1);
        if(nerrors === 0) {
        try{
            console.log(student)

            const response=await adminService.addUser(student);
            alert('Student Added')
           
        navigate("/admin");
        }
        catch(err){
            alert('Server Unavailable!!! Please Try again after Sometime')
        }
    }
    else{
        alert(nerrors+ ' errors found! Please Correct')
    }
    };

    return (
        <div className="container">
        <div className="row">
            <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                <h2 className="text-center m-4"> Add New Student </h2>
                <Form onSubmit={(e) => onSubmit(e)}>
                    <div className="mb-3">
                        <FormGroup>
                        <Label htmlFor="Name" className="form-label">
                            Name
                        </Label>
                        <Input
                            valid={formErrors.name===""}
                            invalid={formErrors.name!==""}

                            type={"text"}
                            className="form-control"
                            placeholder="Enter name"
                            name="name"
                            value={name}
                            onChange={(e) => onInputChange(e)}
                        />
                        <FormFeedback>{formErrors.name}</FormFeedback>
                        </FormGroup>
                    </div>
                    <div className="mb-3">
                    <FormGroup>
                        <Label htmlFor="mobile" className="form-label">
                            Contact
                        </Label>
                        <Input
                            valid={formErrors.mobile===""}
                            invalid={formErrors.mobile!==""}
                            type={"text"}
                            className="form-control"
                            placeholder="Enter mobile number"
                            name="mobile"
                            value={mobile}
                            onChange={(e) => onInputChange(e)}
                        />
                        <FormFeedback>{formErrors.mobile}</FormFeedback>
                        </FormGroup>
                    </div>
                    <div className="mb-3">
                    <FormGroup>
                        <Label htmlFor="emailId" className="form-label">
                            emailId
                        </Label>
                        <Input
                            valid = {formErrors.email===""} 
                            invalid = {formErrors.email!==""}
                            type="text"
                            className="form-control"
                            placeholder="Enter Email-Id"
                            name="email"
                            value={email}
                            onChange={(e) => onInputChange(e)}
                        />
                        <FormFeedback>{formErrors.email}</FormFeedback>
                        </FormGroup>
                    </div>
                  
                   
                    <div className="mb-3">
                    <FormGroup>
                        <Label htmlFor="foodChoice" className="form-label">
                            foodChoice
                        </Label>
                        <Input
                            valid = {formErrors.foodChoice===""} 
                            invalid = {formErrors.foodChoice!==""}
                            type="select"
                            className="form-control"
                            placeholder="Enter FoodChoice"
                            name="foodChoice"
                            value={foodChoice}

                            onChange={(e) => onInputChange(e)}
                        >
                        <option id="JAIN" value="JAIN">Jain</option>
                      <option id= "VEG" value="VEG">Veg</option>
                      <option id="NONVEG" value="NONVEG">Non-veg</option>
                        </Input>
                        <FormFeedback>{formErrors.foodChoice}</FormFeedback>
                        </FormGroup>
                    </div>
                    
                        <div className="mb-3"><FormGroup>
                            <Label htmlFor="username" className="form-label">
                                UserName
                            </Label>
                            <Input
                            valid={formErrors.username===""}
                            invalid={formErrors.username!==""}
                                type="text"
                                className="form-control"
                                placeholder="Enter UserName"
                                name="username"
                                value={username}
                                onChange={(e) => onInputChange(e)}
                            />
                            <FormFeedback>{formErrors.username}</FormFeedback>
                        </FormGroup></div>
                   
                    <div className="mb-3"><FormGroup>
                        <Label htmlFor="password" className="form-label">
                            Password
                        </Label>
                        <Input
                            valid={formErrors.password===""}
                            invalid={formErrors.password!==""}
                            type="password"
                            className="form-control"
                            placeholder="Enter Password"
                            name="password"
                            value={password}
                            onChange={(e) => onInputChange(e)}
                        />
                        <FormFeedback>{formErrors.password}</FormFeedback>
                        </FormGroup>
                    </div>
                    
                    <center><Button type="submit" className="btn btn-outline-primary">
                        Submit
                    </Button>
                        <Link className="btn btn-outline-danger mx-2" to="/admin">
                            Cancel
                        </Link>
                    </center>
                </Form>
            </div>
        </div>
    </div>

    );
};

export default AddStudent;