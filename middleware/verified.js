import jwt from 'jsonwebtoken';

export const verifyToken = async(req, res, next) => {
  const authHeader = req.headers.authorization; 
  if (authHeader) {
    const token = await authHeader.split(' ')[1]; 
    jwt.verify(token, process.env.JWT_SEC, (err, user) => {
      if (err) res.status(403).json("Token isn't valid");
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json("You are not authenticated");
  };
};


export const verifiedTokenAuth=(req,res,next)=>{
  verifyToken(req,res,()=>{
     if(req.user.id===req.params.id||req.user.isAdmin){
      next()
     }else{
      res.status(403).json( " you are  not  allowed to do that")
     }
  })
}
export const verifiedTokenAdmin=(req,res,next)=>{
  verifyToken(req,res,()=>{
     if(req.user.isAdmin){
      next()
     }else{
      res.status(403).json( " you are  not  admin")
     }
  })
}
