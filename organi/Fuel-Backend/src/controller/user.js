import { massages } from "../helpers/constant.js";
import { saveUser, userLogin, userUpdate } from "../service/user.js";

export const addUser = async (req, res) => {
  try {
    const data = await saveUser(req.body);
    res.send(data);
  } catch (error) {
    res.send(massages.internal_server_error)
  }
};

export const login = async (req, res) => {
  try {
    const data = await userLogin(req.body);
    res.send(data);
  } catch (error) {
    res.send(massages.internal_server_error)
  }
};

export const update = async (req, res) => {
  try {
    const data = await userUpdate(req.body);
    res.send(data);
  } catch (error) {
    console.log(error)
    res.send(massages.internal_server_error)
  }

};

// export const twoFActorAuthentication = async (req,res) => {
//     const data =  await twoFactorAuth(req.body)
//     res.send(data)
// }
