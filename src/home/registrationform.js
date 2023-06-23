import React, { useEffect, useState } from 'react';
import { useForm, Controller } from "react-hook-form";
import { Col, Row, Form, Button, Label, Input, FormFeedback, FormGroup } from 'reactstrap';
import Select from "react-select";
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import "./registrationform.css"

const Registrationform = () => {

    const schema = yup.object({
        name: yup.string().required('Name is required please !'),
        age: yup.string().required('Age is required please !'),
        sex: yup.string().required('Sex is required please !'),
        mobile: yup.string().min(10, 'Mobile number should contain 10 digits').max(10, 'Mobile number should contain 10 digits'),
        emergencyno: yup.string().min(10, 'Mobile number should contain 10 digits').max(10, 'Mobile number should contain 10 digits'),
        // gov: yup.object({
          govId: yup.string(),
          govIdNo: yup
            .number()
            .required("*required")
            .typeError("Must be a number")
            .test("valid", "required", (value, context) => {
              const { path } = context;
              console.log("context", context)
              if (context.parent.govId === "Aadhar") {
                if (context.parent.govIdNo.toString().length === 12) {
                  return true;
                } else {
                  return context.createError({ path, message: "Aadhar has 12 letters" });
                }
              } else if (context.parent.govId === "PAN") {
                if (context.parent.govIdNo.toString().length === 10) {
                  return true;
                } else {
                  return context.createError({
                    path,
                    message: "PAN has 10 letters"
                  });
                }
              }
            })
        // })
      });
      

    const defaultValues = {
        name: "",
        age: "",
        sex: "",
        mobile: "",
        // gov: {
            govId: "",
            govIdNo: "",
        // },
        guardlabel: "",
        guardName: "",
        email:"",
        emergencyno: "",
        address: "",
        state: "",
        city: "",
        country: { value: "India", label: "India" },
        pincode: "",
        occupation: "",
        religion: "",
        maritalStatus: "",
        bloodGrp: "",
        nationality: { value: "India", label: "India" }

    }

    const { control, register,
        setError,
        setValue,
        watch,
        trigger,
        handleSubmit,
        formState: { errors } } = useForm({ defaultValues, 
            resolver: yupResolver(schema),
        //     mode: "onChange",
        // reValidateMode: "onChange" 
    });
    const onSubmit = data => console.log("data", data);

    const [govIdVal, setGovIdVal] = useState("");

    const changeGovIdVal = (e) => {
        setGovIdVal(e.value)   
    }

    return (
        <div>

            <Form onSubmit={handleSubmit(onSubmit)}>
                <div className='personalDetail-block'>
                    <Row>
                        <h3 className='titles'>Personal Details</h3>
                        <Col md={5}>
                            <FormGroup row>
                                <Label className="form-label" sm={2}>
                                    Name <span className='text-danger'>*</span>
                                </Label>
                                <Col sm={10}>
                                    <Controller
                                        name="name"
                                        control={control}
                                        render={({ field, fieldState: { error } }) => (
                                            <Input
                                                id="name"
                                                invalid={errors.name && true}
                                                placeholder='Enter Name'
                                                {...field}
                                            />
                                        )}
                                    />
                                    {errors.name && (
                                        <FormFeedback>{errors.name.message}</FormFeedback>
                                    )}
                                </Col>
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <FormGroup row>
                                <Label className="form-label" sm={4}>
                                    Date of Birth or Age <span className='text-danger'>*</span>
                                </Label>
                                <Col sm={8}>
                                    <Controller
                                        name="age"
                                        control={control}
                                        render={({ field, fieldState: { error } }) => (
                                            <Input
                                                id="age"
                                                invalid={errors.age && true}
                                                placeholder='DD/MM/YYYY or age in years'
                                                type='date'
                                                // onChange={(e) => onChange(e.value)}
                                                // value={value}
                                                {...field}
                                            />
                                        )}
                                    />
                                    {errors.age && (
                                        <FormFeedback>{errors.age.message}</FormFeedback>
                                    )}
                                </Col>
                            </FormGroup>
                        </Col>
                        <Col md={3}>
                            <FormGroup row>
                                <Label className="form-label" sm={2}>
                                    Sex <span className='text-danger'>*</span>
                                </Label>
                                <Col sm={6}>
                                    <Controller
                                        name="sex"
                                        control={control}
                                        render={({ field: {onChange} , fieldState: { error } }) => (
                                            <Select
                                                placeholder='Enter Sex'
                                                id="sex"
                                                name="sex"
                                                  onChange={(e) => {
                                                    onChange(e.value)
                                                  }}
                                                invalid={errors.sex && true}
                                                className="react-select select-sm"
                                                classNamePrefix="select"
                                                options={
                                                    [{ value: "female", label: "Female" }, { value: "male", label: "Male" }, { value: "other", label: "other" }]
                                                }          
                                                // {...field}
                                            //   value={value}
                                            />
                                        )}
                                    />
                                    {errors.sex && (
                                        <p className='text-danger'>{errors.sex.message}</p>
                                    )}
                                </Col>
                            </FormGroup>                         
                        </Col>
                    </Row>
                    <Row>
                        <Col md={5}>
                        <FormGroup row>
                                <Label className="form-label" sm={2}>
                                    Mobile
                                </Label>
                                <Col sm={10}>
                                    <Controller
                                        name="mobile"
                                        control={control}
                                        render={({ field, fieldState: { error } }) => (
                                            <Input
                                                id="mobile"
                                                invalid={errors.mobile && true}
                                                placeholder='Enter Mobile'
                                                {...field}
                                            />
                                        )}
                                    />
                                    {errors.mobile && (
                                        <FormFeedback>{errors.mobile.message}</FormFeedback>
                                    )}
                                </Col>
                            </FormGroup>
                            {/* <label>Mobile</label>
                            <input {...register("mobileno")} placeholder='Enter Mobile' /> */}
                        </Col>
                        <Col md={7}>
                        <FormGroup row>
                                <Label className="form-label" sm={2}>
                                Govt Issued ID
                                </Label>
                                <Col sm={3}>
                                    <Controller
                                        name="govId"
                                        control={control}
                                        render={({ field: {onChange, value}, fieldState: { error } }) => (
                                            <Select
                                                placeholder='ID Type'
                                                id="govId"
                                                name="govId"
                                                  onChange={(e) => {
                                                    onChange(e.value)
                                                    setValue('govId', e.value)
                                                    trigger()
                                                    // changeGovIdVal(e)
                                                  }}
                                                invalid={errors?.govId && true}
                                                className="react-select select-sm"
                                                classNamePrefix="select"
                                                options={
                                                    [{ value: "Aadhar", label: "Aadhar" }, { value: "PAN", label: "PAN" }]
                                                }          
                                                // {...field}
                                            //   value={value}
                                            />
                                        )}
                                    />
                                </Col>
                                <Col sm={7}>
                                <Controller
                                        name="govIdNo"
                                        control={control}
                                        render={({ field : {onChange}, fieldState: { error } }) => (
                                            <Input
                                                id="govIdNo"
                                                invalid={errors?.govIdNo && true}
                                                placeholder='Enter Govt Id'
                                                onChange={(e) => {
                                                    onChange(e.target.value)
                                                    setValue('govIdNo', e.target.value)
                                                    trigger()
                                                }}
                                                // {...field}
                                            />
                                        )}
                                    />
                                {errors?.govIdNo && (
                                        <p className='text-danger'>{errors?.govIdNo?.message}</p>
                                    )}
                                </Col>
                            </FormGroup> 
                        </Col>
                    </Row>
                </div>
                <div className='contactDetail-block'>
                    <Row>
                        <h3 className='titles'>Contact Details</h3>
                        <Col md={4}>
                        <FormGroup row>
                                <Label className="form-label" sm={2}>
                                Guardian Details
                                </Label>
                                <Col sm={4}>
                                    <Controller
                                        name="guardlabel"
                                        control={control}
                                        render={({ field: {onChange, value}, fieldState: { error } }) => (
                                            <Select
                                                placeholder='Enter Label'
                                                id="guardlabel"
                                                name="guardlabel"
                                                  onChange={(e) => {
                                                    onChange(e.value)
                                                  }}
                                                
                                                className="react-select select-sm"
                                                classNamePrefix="select"
                                                options={
                                                    [{ value: "Father", label: "Father" }, { value: "Mother", label: "Mother" }]
                                                }          
                                                // {...field}
                                            //   value={value}
                                            />
                                        )}
                                    />
                                </Col>
                                <Col sm={6}>
                                <Controller
                                        name="guardName"
                                        control={control}
                                        render={({ field : {onChange}, fieldState: { error } }) => (
                                            <Input
                                                id="guardName"
                                                placeholder='Enter Guardian Name'
                                                onChange={(e) => {
                                                    onChange(e.target.value)
                                                }}
                                            />
                                        )}
                                    />
                                </Col>
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                        <FormGroup row>
                                <Label className="form-label" sm={2}>
                                    Email
                                </Label>
                                <Col sm={10}>
                                    <Controller
                                        name="email"
                                        control={control}
                                        render={({ field, fieldState: { error } }) => (
                                            <Input
                                                id="email"
                                                placeholder='Enter Email'
                                                {...field}
                                            />
                                        )}
                                    />
                                </Col>
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                        <FormGroup row>
                                <Label className="form-label" sm={4}>
                                Emergency Contact Number
                                </Label>
                                <Col sm={8}>
                                    <Controller
                                        name="emergencyno"
                                        control={control}
                                        render={({ field, fieldState: { error } }) => (
                                            <Input
                                                id="emergencyno"
                                                placeholder='Enter Emergency No'
                                                {...field}
                                            />
                                        )}
                                    />
                                    {errors.emergencyno && (
                                        <FormFeedback>{errors.emergencyno.message}</FormFeedback>
                                    )}
                                </Col>
                            </FormGroup>
                        </Col>
                    </Row>
                </div>
                <div className='addressDetail-block'>
                    <Row>
                        <h3 className='titles'>Address Details</h3>
                        <Col md={4}>
                        <FormGroup row>
                                <Label className="form-label" sm={2}>
                                Address
                                </Label>
                                <Col sm={10}>
                                    <Controller
                                        name="address"
                                        control={control}
                                        render={({ field, fieldState: { error } }) => (
                                            <Input
                                                id="address"
                                                placeholder='Enter Address'
                                                {...field}
                                            />
                                        )}
                                    />
                                </Col>
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                        <FormGroup row>
                                <Label className="form-label" sm={2}>
                                State
                                </Label>
                                <Col sm={10}>
                                    <Controller
                                        name="state"
                                        control={control}
                                        render={({ field: {onChange} , fieldState: { error } }) => (
                                            <Select
                                                placeholder='Enter State'
                                                id="state"
                                                name="state"
                                                  onChange={(e) => {
                                                    onChange(e.value)
                                                  }}

                                                className="react-select select-sm"
                                                classNamePrefix="select"
                                                options={
                                                    [{ value: "Gujarat", label: "Gujarat" }, { value: "Goa", label: "Goa" }]
                                                }          
                                            />
                                        )}
                                    />
                                </Col>
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <FormGroup row>
                                <Label className="form-label" sm={2}>
                                City
                                </Label>
                                <Col sm={10}>
                                    <Controller
                                        name="city"
                                        control={control}
                                        render={({ field: {onChange} , fieldState: { error } }) => (
                                            <Select
                                                placeholder='Enter City'
                                                id="city"
                                                name="city"
                                                  onChange={(e) => {
                                                    onChange(e.value)
                                                  }}
                                                className="react-select select-sm"
                                                classNamePrefix="select"
                                                options={
                                                    [{ value: "Surat", label: "Surat" }, { value: "Ahmdabad", label: "Ahmdabad" }]
                                                }          
                                            />
                                        )}
                                    />
                                </Col>
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                        <FormGroup row>
                                <Label className="form-label" sm={2}>
                                Country
                                </Label>
                                <Col sm={6}>
                                    <Controller
                                        name="country"
                                        control={control}
                                        render={({ field: {onChange} , fieldState: { error } }) => (
                                            <Select
                                                placeholder='Enter Country'
                                                id="country"
                                                name="country"
                                                  onChange={(e) => {
                                                    onChange(e.value)
                                                  }}
                                                className="react-select select-sm"
                                                classNamePrefix="select"
                                                options={
                                                    [{ value: "India", label: "India" }]
                                                }          
                                            />
                                        )}
                                    />
                                </Col>
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                        <FormGroup row>
                                <Label className="form-label" sm={2}>
                                Pincode
                                </Label>
                                <Col sm={10}>
                                    <Controller
                                        name="pincode"
                                        control={control}
                                        render={({ field, fieldState: { error } }) => (
                                            <Input
                                                id="pincode"
                                                placeholder='Enter Pincode'
                                                {...field}
                                            />
                                        )}
                                    />
                                </Col>
                            </FormGroup>
                        </Col>
                    </Row>
                </div>
                <div className='otherDetail-block'>
                    <Row>
                        <h3 className='titles'>Other Details</h3>
                        <Col md={4}>
                        <FormGroup row>
                                <Label className="form-label" sm={2}>
                                Occupation
                                </Label>
                                <Col sm={10}>
                                    <Controller
                                        name="occupation"
                                        control={control}
                                        render={({ field, fieldState: { error } }) => (
                                            <Input
                                                id="occupation"
                                                placeholder='Enter Occupation'
                                                {...field}
                                            />
                                        )}
                                    />
                                </Col>
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                        <FormGroup row>
                                <Label className="form-label" sm={2}>
                                Religion
                                </Label>
                                <Col sm={10}>
                                    <Controller
                                        name="religion"
                                        control={control}
                                        render={({ field: {onChange} , fieldState: { error } }) => (
                                            <Select
                                                placeholder='Enter Religion'
                                                id="religion"
                                                name="religion"
                                                  onChange={(e) => {
                                                    onChange(e.value)
                                                  }}
                                                className="react-select select-sm"
                                                classNamePrefix="select"
                                                options={
                                                    [{ value: "Hindus", label: "Hindus" }, { value: "Muslims", label: "Muslims"}, { value: "Sikh", label: "Sikh"}, { value: "Jain", label: "Jain"}]
                                                }          
                                            />
                                        )}
                                    />
                                </Col>
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                        <FormGroup row>
                                <Label className="form-label" sm={2}>
                                Marital Status
                                </Label>
                                <Col sm={10}>
                                    <Controller
                                        name="maritalStatus"
                                        control={control}
                                        render={({ field: {onChange} , fieldState: { error } }) => (
                                            <Select
                                                placeholder='Enter Marital Status'
                                                id="maritalStatus"
                                                name="maritalStatus"
                                                  onChange={(e) => {
                                                    onChange(e.value)
                                                  }}
                                                className="react-select select-sm"
                                                classNamePrefix="select"
                                                options={
                                                    [{ value: "Married", label: "Married" }, { value: "Unmarried", label: "Unmarried" }]
                                                }          
                                            />
                                        )}
                                    />
                                </Col>
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                        <FormGroup row>
                                <Label className="form-label" sm={2}>
                                Blood Group
                                </Label>
                                <Col sm={10}>
                                    <Controller
                                        name="bloodGrp"
                                        control={control}
                                        render={({ field: {onChange} , fieldState: { error } }) => (
                                            <Select
                                                placeholder='Enter Blood Group'
                                                id="bloodGrp"
                                                name="bloodGrp"
                                                  onChange={(e) => {
                                                    onChange(e.value)
                                                  }}
                                                className="react-select select-sm"
                                                classNamePrefix="select"
                                                options={
                                                    [{ value: "B+", label: "B+" }, { value: "AB+", label: "AB+" }]
                                                }          
                                            />
                                        )}
                                    />
                                </Col>
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                        <FormGroup row>
                                <Label className="form-label" sm={2}>
                                Nationality
                                </Label>
                                <Col sm={6}>
                                    <Controller
                                        name="nationality"
                                        control={control}
                                        render={({ field: {onChange, value} , fieldState: { error } }) => (
                                            <Select
                                                placeholder='Enter Nationality'
                                                id="nationality"
                                                name="nationality"
                                                  onChange={(e) => {
                                                    onChange(e.value)
                                                  }}
                                                defaultValue={{ value: "India", label: "India" }}
                                                className="react-select select-sm"
                                                classNamePrefix="select"
                                                options={
                                                    [{ value: "India", label: "India" }]
                                                }  
                                                // isClearable
                                                // value={value}        
                                            />
                                        )}
                                    />
                                </Col>
                            </FormGroup>
                        </Col>
                    </Row>
                </div>
                <div className='button-block'>
                    <Button color="danger" className='me-3' outline>CANCEL</Button>
                    <Button color="success" type='submit'>SUBMIT</Button>
                </div>
            </Form>
        </div>
    );
};


export default Registrationform;