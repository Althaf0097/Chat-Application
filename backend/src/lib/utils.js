import jwt from 'jsonwebtoken';

export const generateToken = (UserId,res) =>{
    const {JWT_SECRET, NODE_ENV} = process.env;
    if(!JWT_SECRET){
        throw new Error("JWT_SECRET is not defined in environment variables");
    }

    const token = jwt.sign({id:UserId},JWT_SECRET,{
        expiresIn:'7d'
    });

    res.cookie('token',token,{
        httpOnly:true, //accessible only by web server: cross-site scripting protection
        secure:process.env.NODE_ENV === 'production',
        sameSite:'strict',
        maxAge:7*24*60*60*1000 //7 days
    });
}