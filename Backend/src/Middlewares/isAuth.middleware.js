import jwt from "jsonwebtoken"

 const isAuth = async(req, res, next) => {
try {
    let {token} = req.cookies
    if(!token)
    {
        return res.status(400).json({message:"User doesn't have token"})
    }
    let verifytoken = await jwt.verify(token, process.env.JWT_SECRET)
    if(!verifytoken)
    {
     return res.status(400).json("User donot have verify token")
    }
    req.userId= verifytoken.userId
    next()
} catch (error) {
    return res.status(500).json({messsage: "Something went wrong"})
}
}
export default isAuth;