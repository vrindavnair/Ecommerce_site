import userModel from "../models/userModel.js"
import {hashPassword,comparePassword} from './../helpers/authHelpers.js'
import JWT from "jsonwebtoken"




export const registerController=async(req,res)=>{
    try{
    const {name,email,password,address,phone,answer}=req.body
    console.log(req.body)
   
    if(!name){
        return res.send({error:"the name is required"})
    }
    if(!email){
        return res.send({error:"the email is required"})
    } 
    if(!password){
        return res.send({error:"the password is required"})
    } 
    if(!address){
        return res.send({error:"the addresss is required"})
    } 
    if(!phone){
        return res.send({error:"the phone is required"})
    } 
    if(!answer){
        return res.send({error:"the answer is required"})
    } 
    
    const existingUser=await userModel.findOne({email}) //checking user exist or not
    if(existingUser){
      return  res.send({
        success:false,
        message:"Already register"
    })

    }

    const hashedPassword=await hashPassword(password)//user register  
    const User=await new userModel({
        name,
        email,
        password:hashedPassword,
        phone,
        address,
        answer
    }).save()
    res.status(201).send({
        success:true,
        message:"sucessfully register"})
}catch(error){
    console.log(error)
   res.status(500).send({
    success:false,
    message:"failed"})
}

    
}



export const loginController = async (req, res) => {
   

    try {
        const { email, password } = req.body;
       //validation
        if (!email || !password) {
            return res.status(400).send({
                 success: false,
                  message: "Email and password are required." 
                })
        }

       //check user
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(404).send({ 
                success: false,
                 message: "User not found." 
                })
        }

    
        const match = await comparePassword(password, user.password);
        if (!match) {
            return res.status(200).send({
                 success: false,
                  message: "Invalid password."
                 });
        }

        //token
        const token=await JWT.sign({_id:user._id},process.env.JWT_SECRET,{
            expiresIn:"10d",
        })
        res.status(200).send({
            success:true,
            message:"login successfully",
            user:{
                _id:user._id,
                name:user.name,
                email:user.email,
                phone:user.phone,
                address:user.address,
                role:user.role,
            },
            token,
        })



    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
             message: "Internal server error." 
            });
    }
}


export const forgetPasswordController = async (req, res) => {
    //validate
    try {
        const { email, answer, newPassword } = req.body;

        if (!email) {
            return res.send({ error: "email is not registered" })
        }
        if (!answer) {
            return res.send({ error: "answer is invalid" })
        }
        if (!newPassword) {
            return res.send({ error: "password required" })
        }

        const user = await userModel.findOne({ email, answer });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "email and answer is wrong"
            })
        };

        const hashedPassword = await hashPassword(newPassword)
        await userModel.findByIdAndUpdate(user._id, {
            password: hashedPassword

        })
        res.status(200).send({
            success: true,
            message: "password changed successfully"
        })
    } catch (error) {
        res.send({
            success: false,
            message: "something went wrong"
        })
    }
}





export const testController = async (req, res) => {
    res.send("admin sucessfully verified")
   

}

