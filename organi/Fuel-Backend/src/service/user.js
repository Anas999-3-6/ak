import {  massages } from "../helpers/constant.js";
import { compareHash, convertHash } from "../helpers/hash.js";
import { UserModel } from "../model/user.js";
import { logger } from "../../app.js";

export const isUserAlreadyExist = async (email) => {
  const user = await UserModel.findOne({ email: email }, { _id: 1 }).lean();
  return !!user;
};

export const saveUser = async (userDetails) => {
  try {
    const userData = {
      firstname: userDetails.firstname,
      lastname: userDetails.lastname,
      email: userDetails.email,
      //   phone: userDetails.phone,
      password: userDetails.password,
    };

    const passwordHash = await convertHash(userData?.password);
    userData.password = passwordHash;

    const isAlreadyExist = await isUserAlreadyExist(userData.email);

    if (isAlreadyExist) {
      return massages.already_exist;
    }

    const userDataToSave = new UserModel(userData);
    return await userDataToSave.save();
  } catch (error) {
    console.log(error);
    logger.error(`${error.message}\n${error.stack}`);
    return massages.internal_server_error;
  }
};

export const userLogin = async (loginData) => {
  try {
    const userDetails = await UserModel.findOne({
      email: loginData.email,
    }).lean();
    if (!userDetails) {
      return massages.user_not_found;
    }
    const hash = await compareHash(loginData?.password, userDetails?.password);
    if (!hash) {
      return massages.wrong_credential;
    }

    //     const otp = createOtp()
    //     const mailcontent = `
    //     <html>
    //     <head>
    //         <style>
    //             /* Add CSS styles for your email */
    //             body {
    //                 font-family: Arial, sans-serif;
    //                 background-color: #f5f5f5;
    //                 padding: 20px;
    //             }
    //             .container {
    //                 background-color: #ffffff;
    //                 border-radius: 10px;
    //                 padding: 20px;
    //                 box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    //             }
    //             h3 {
    //                 color: #333333;
    //             }
    //             p {
    //                 color: #666666;
    //             }
    //         </style>
    //     </head>
    //     <body>
    //         <div class="container">
    //             <h3>Welcome to Fule Management Syetem</h3>
    //             <p>Your One Time Password : <b> ${otp} </b> </p>
    //             <p><a href="https://example.com">Click here</a> to visit our website.</p>
    //         </div>
    //     </body>
    //     </html>
    // `;
    //     await sendEmail("alok@samyotech.com", userDetails?.email, "otp verification", mailcontent)
    //     await UserModel.updateOne(
    //         { email: userDetails?.email },
    //         { $set: { last_otp: otp } }
    //     );

    //     return true
    let {  ...userdata } = userDetails;
    return userdata;
  } catch (error) {
    console.log(error);
    return massages.internal_server_error;
  }
};

// export const twoFactorAuth = async (userData) => {
//     const userDetails = await UserModel.findOne({ email: userData?.email }).lean() // asuming that email is correct

//     if (userDetails?.last_otp == userData?.otp) {
//         await UserModel.updateOne(
//             { email: userDetails?.email },
//             { $set: { last_otp: null } }
//         );
//         const token = await createToken(userDetails)
//         await UserModel.updateOne(
//             { email: userDetails?.email },
//             { $set: { token: token } }
//         );
//         let { password, __v, last_otp, ...userdata } = userDetails
//         userdata[TOKEN] = token
//         return userdata
//     } else {
//         return massages.wrong_credential
//     }

// }

export const userUpdate = async (userDetails) => {
  const where = {
    _id: userDetails.id,
  };
  let {  ...data } = userDetails;
  return UserModel.patch({ $set: { where }, data });
};
