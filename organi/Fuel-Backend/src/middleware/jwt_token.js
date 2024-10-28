// import jwt from 'jsonwebtoken';
// import { EXPIRE } from '../helpers/constant.js';

// export const createToken = async (userData) => {
//     const key = process.env.JWT_KEY
//     const { token, ...signature } = userData;

//     try {
//         let mytoken = await jwt.sign({ signature }, key, { expiresIn: EXPIRE });
//         console.log(mytoken)
//         return mytoken;
//     } catch (error) {
//         return error
//     }
// };
