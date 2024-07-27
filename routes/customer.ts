import { Router, Response, Request, NextFunction } from "express";
import { createCustomer, getAllCustomers, removeCustomer, editCustomer, getCustomer } from "../controllers/customer.js";
import { Customer } from "../db/entities/Customer.js";



const router = Router()

router.get("/", getAllCustomers)

router.post("/",  async (req:Request, res:Response, next:NextFunction)=>{
    const payload: Customer= req.body
    if(!payload.name || !payload.mobilePhone || !payload.balance ){
        res.json({
            messege:"Some feilds are missing",
            success: false
        })
        return;
    }
    try {
        const customer = await createCustomer(payload)

        res.json({
            messege:"Customer created successfully",
            customer: customer
        })
    } catch (error) {
        console.log("Error" + error);
        next(error)
    }

})

router.delete("/:id", async (req:Request, res:Response, next:NextFunction)=>{
    const id= await Number(req.params.id)

    try {
        const customer = await removeCustomer(id)

        res.json({
            messege:"Customer have been removed successfully",
            success: true
        })
    } catch (error) {
        console.log("Error" + error);
        next(error)
    }
})

router.put("/:id", async (req: Request, res: Response, next:NextFunction) =>{
    const id = await Number(req.params.id)
    const payload: Customer = req.body

    try {
        const customer = await editCustomer(id, payload)

        res.json({
            messege:"Customer edited successfully",
            success: true
        })
    } catch (error) {
        console.log("Error" + error);
        next(error)
    }
})

router.get("/:id", async(req: Request, res: Response, next: NextFunction)=>{
    const id =  Number(req.params.id)
    const payload:Customer= req.body
    
    try {
        const customer = await getCustomer(id)
        
        res.json({
            messege:"Here's the Customer you're looking for: ",
            customer: customer
        })
    } catch (error) {
        console.log("Error" + error);
        next(error)
    }
})


export default router