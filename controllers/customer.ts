import { Request, Response } from "express";
import { AppError } from "../Errors/AppErrors.js";
import { Customer } from "../db/entities/Customer.js";
import { error } from "console";

const getAllCustomers= async (req: Request, res: Response) => {
    const customer = await Customer.find()
    res.json({
        message: "Getting all customers",
        customers :customer
    })
}

const createCustomer= async (payload:Customer)=>{
    const customer = await Customer.findOne({
    where:[
       {name: payload.name},
       {mobilePhone: payload.mobilePhone},
       {balance: payload.balance}
    ]});
    if(payload.mobilePhone){
        throw new AppError("A customer with this mobile phone already exist! ", 409, true)
    }
    const newCustomer = Customer.create(payload)
    return newCustomer.save()
}

const removeCustomer= async (id: number) =>{
    const customer = await Customer.findOne({where: {id:id}})
    
    if(!customer){
        throw new AppError("Customer not found", 404, true)
    }
    return customer.remove()

}

const editCustomer= async (id: number, payload: Customer) => {
    const customer = await Customer.findOne({where: {id:id} })

    if(!customer){
        throw new AppError("Customer not found", 404, true)
    }
    if(payload.name){
        customer.name= payload.name
    }
    if(payload.mobilePhone){
        customer.mobilePhone= payload.mobilePhone
    }
    if(payload.balance){
        customer.balance= payload.balance
    }
    
    return customer.save()
}

const getCustomer= async(id: number)=>{
    const customer = await Customer.findOne({ where: { id: id } })

    if (!customer) {
        throw new AppError("Customer not found", 404, true)
    }

    return customer
}

export {createCustomer, getAllCustomers, removeCustomer, editCustomer, getCustomer}