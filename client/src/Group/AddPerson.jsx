import React from 'react';
import axios from 'axios';
import { FormInput } from "shards-react";
import { Button } from "shards-react";
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css"
import * as Yup from 'yup';
import { Typography } from 'antd';
import { Formik, Field, Form } from 'formik';
import AppContext from '../AppContext'
const { Title } = Typography;

const styles = {
  padding: '20px',
  margin: 'auto',
  maxWidth: 600
}

const Input = ({field, form, ...props}) => {
  return <FormInput {...field} {...props} name='name' placeholder='Name'/>
}



const AddPerson = () => {
  const ctx = React.useContext(AppContext)
  
  const handleAdd = async(personName) => {
    await axios.post('http://localhost:3000/api/person', {
        name: personName,
        balance: 0
      })
      .then((res) => {
        if(res.status === 201){
          ctx.setNumMembers(ctx.numMembers + 1);
        }
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  return (
    <Formik 
    initialValues={{
      name: ''
    }}
    validationSchema={Yup.object().shape({
      name: Yup.string()
      .required('Enter a name'),
    })}
    onSubmit={(fields, {resetForm}) => {
      handleAdd(fields.name);
      resetForm({values:''});
    }}
    render={() => (
      <Form>
        <div style={styles}>
          <Title level = {4}>Add to Group</Title>
          <Field component = {Input} name = 'name'/>
          <br/>
          <Button type = 'submit' style={{ width: '100%'}}>Add Person</Button>
        </div>
      </Form>
    )}
    />
  )
}

export default AddPerson;