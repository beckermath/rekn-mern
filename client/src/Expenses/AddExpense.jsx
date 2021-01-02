import React from 'react'
import AppContext from '../AppContext'
import * as Yup from 'yup';
import { Typography } from 'antd';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { FormInput } from "shards-react";
import { Button } from "shards-react";
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css"
import { FormSelect } from "shards-react";
import {
    InputGroup,
    InputGroupText,
    InputGroupAddon,
  } from "shards-react";

import { getPayIndex, getMooch } from '../expense.utilities';
const { Title } = Typography;

const styles = {
    padding: '20px',
}

const errorStyles = {
    textAlign: 'center'
}

const Input = ({field, form, ...props}) => {
    return <FormInput {...field} {...props} name='desc' placeholder='Description'/>
}

const InputSelect = ({field, form, ...props}) => {
    const ctx = React.useContext(AppContext);

    return (
        <FormSelect placeholder = "Payed by" {...field} {...props} style={{ width: '100%' }} >
            <option placeholder = "Payed by" key = {-1}></option>
            {ctx.people.map((person, index) => (
                <option key={index}>{person}</option>
            ))}
        </FormSelect>
    )
}

const InputNum = ({field, form, ...props}) => {
    return (
        <InputGroup>
            <InputGroupAddon type="prepend">
                <InputGroupText>$</InputGroupText>
            </InputGroupAddon>
            <FormInput {...field} {...props} type='number' name = 'amount' placeholder="Amount"/>
        </InputGroup>
    )
}

const AddExpense2 = () => {
    const ctx = React.useContext(AppContext);

    return (
        <Formik
            initialValues={{
                desc: '',
                payedBy: '',
                amount: '',
                forWho: []
            }}
            validationSchema={Yup.object().shape({
                desc: Yup.string()
                    .required('Provide a description'),
                payedBy: Yup.string()
                    .required('Select who payed'),
                amount: Yup.number()
                    .required('Provide an amount'),
                forWho: Yup.array()
                    .min(1, 'Select who is involved')
            })}
            onSubmit={(fields, {resetForm}) => {
                ctx.setExpenses([...ctx.expenses, [getPayIndex(fields, ctx.people), fields.amount, getMooch(fields, ctx.people)]])
                const exp = {
                    desc: fields.desc,
                    amount: fields.amount,
                    payedBy: fields.payedBy,
                    forWho: ctx.people.length === fields.forWho.length ? "everyone" : fields.forWho.join(" and ")
                }
                ctx.setExpensesDisplay([...ctx.expensesDisplay, exp]);
                resetForm({values: ''});
            }}
            render={() => (
                <Form>
                    <div style={styles}>
                        <Title level = {4}>Description</Title>
                        <Field component = {Input} name = 'desc'/>
                        <div style={errorStyles}>
                            <ErrorMessage name = 'desc' ></ErrorMessage>
                        </div>
                        <br/>
                        <Title level = {4}>Amount</Title>
                        <Field component = {InputNum} name = 'amount'/>
                        <div style={errorStyles}>
                            <ErrorMessage name = 'amount'></ErrorMessage>
                        </div>
                        <br/>
                        <Title level = {4}>Payed by</Title>
                        <Field placeholder='Payed by' component = {InputSelect} name = 'payedBy'/>
                        <div style={errorStyles}>
                            <ErrorMessage name = 'payedBy' ></ErrorMessage>
                        </div>
                        <br/>
                        <Title level = {4}>For who?</Title>
                        {ctx.people.map((person, index) => (
                            <div>
                                <span>{person}  </span>
                                <Field type ='checkbox' key = {index} label= {person} value = {person} name = 'forWho'/>
                            </div>
                        ))}
                        
                        <div style={errorStyles}>
                            <ErrorMessage name = 'forWho'></ErrorMessage>
                        </div>
                        <br/>
                        <Button style={{ width: '100%' }}>Add Expense</Button>
                    </div>
                </Form>
            )}
        />
    )
}

export default AddExpense2;