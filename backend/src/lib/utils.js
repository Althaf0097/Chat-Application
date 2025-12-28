import jwt from 'jsonwebtoken';

export const generateToken = (UserId,res) =>{
    const token = jwt.sign({id:UserId},process.env.JWT_SECRET,{
        expiresIn:'7d'
    });

    res.cookie('token',token,{
        httpOnly:true, //accessible only by web server: cross-site scripting protection
        secure:process.env.NODE_ENV === 'production',
        sameSite:'strict',
        maxAge:7*24*60*60*1000 //7 days
    });
}