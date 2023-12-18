import { Request, Response } from 'express';
import  User  from '../model/userModel';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
// import { v4 as uuidv4 } from "uuid";
import { RegisterUserSchema, loginUserSchema, option, updateInfoSchema } from '../utilities/utils';

const jwt_secret = process.env.JWT_SECRET as string;

export const Register = async (req: Request | any, res: Response) => {
    try {
          //  const uuid:any = uuidv4();
      const {email, username, gender, password, confirm_password} = req.body;
        const validate = RegisterUserSchema.validate(req.body, option);
              if(validate.error){
                return res.status(400).json({ 
                    Error: validate.error.details[0].message });
              }
              const salt = await bcrypt.genSalt(10);
          const passwordhash  = await bcrypt.hash(req.body.password, salt)

          console.log(passwordhash);

        const userExist = await User.findOne({ email: email });

        // console.log(userExist);
           if(!userExist) {
                const user = await User.create({
                    email,
                    username,
                    gender,
                    password: passwordhash,
                  
                });

                console.log(userExist)
            

            return res.status(201).json({ message: "User created successfully", user});
            }
     return res.status(409).json({ message: "User already exist" });           
    }catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error"});
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const validate = loginUserSchema.validate(req.body, option);
            if(validate.error){
                return res.status(400).json({
                    error: validate.error.details[0].message
            })
          }
        const userExist = await User.findOne({ 
            where: { email: email }
         }) as unknown as {[key: string]: string}

          if(!userExist){
                return res.status(404).json({ message: "User not found"});
          }
          const { id } = userExist;
          const token = jwt.sign({id}, jwt_secret, { expiresIn: "1d" });

          const passwordMatch = await bcrypt.compare(password, userExist.password);
            if(passwordMatch){
                return res.status(200).json({
                    msg: "login successful",
                    user: userExist,
                    token
                })
           }
          return res.status(401).json({
                error: "Invalid credentials"
           })

    }catch(err) {
        return res.status(500).json({ message: "Internal server error"});
    }
}




// export const updateInfo = async (req: Request | any, res: Response) => {
//     try {
//       const validate = updateInfoSchema.validate(req.body, option);
//       if (validate.error) {
//         return res.status(400).json({
//           error: validate.error.details[0].message,
//         });
//       }
//       if (req.body.password) {
//         const salt = await bcrypt.genSalt(10);
//         req.body.password = await bcrypt.hash(req.body.password, salt);
//       }
  
//       const userId = req.params.id;
//       const info = await User.findOne({ where: { id: userId } });
//       if (!info)
//         return res.status(404).json({
//           error: "user not found",
//         });
  
//       const updatedInfo = await info.update(req.body);
//       return res.status(200).json({
//         msg: "info updated successfully",
//         updatedInfo,
//       });

//     } catch (err) {
//       return res.status(500).json({
//         error: "server error",
//       });
//     }
//   };
  
//   // delete info
//   export const deleteInfo = async (req: Request, res: Response) => {
//     try {
//       const { id } = req.params;
//       const UserRecord = await User.findOne({
//         where: { id },
//       });
//       if (!UserRecord) {
//         return res.status(404).json({
//           error: "User not found",
//         });
//       }
//       const deleteRecord = await UserRecord.destroy();
//       return res.status(200).json({
//         msg: "Account deleted successfully",
//         deleteRecord,
//       });
//     } catch (err) {
//       return res.status(500).json({
//         error: "server error",
//       });
//     }
//   };
  
//   // get a user
//   export const getUser = async (req: Request, res: Response) => {
//     try {
//       const { id } = req.params;
//       const user = (await UserInstance.findOne({
//         where: { id },
//       })) as unknown as { [key: string]: string };
  
//       if (!user) {
//         return res.status(404).json({ error: "User not found" });
//       }
//       user.password = "";
//       user.createdAt = "";
//       return res.status(200).json({
//         msg: "User found successfully",
//         user,
//       });
//     } catch (err) {
//       return res.status(500).json({
//         error: "server error",
//       });
//     }
//   };
  
//   // follow a user
//   export const followUser = async (req: Request | any, res: Response) => {
//     try {
//       const { id } = req.params;
  
//       const user = (await UserInstance.findOne({
//         where: { id },
//       })) as unknown as { [key: string]: string | string[]| number };
  
//       const currentUser = (await UserInstance.findOne({
//         where: { id: req.body.userId },
//       })) as unknown as { [key: string]: string };
  
//       if ( Array.isArray(user.followers)) {
//         if(!user.followers.includes(req.body.userId)){
//           let following = user.following as string[];
//           following.push(req.body.userId);
//           user.following = following;
    
//           const count = user.followerCount as number;
//             user.followerCount = count + 1;
//             const count1 = user.followingCount as number;
//             user.followingCount = count1 + 1;
    
//             following.push(currentUser.id);
//             await UserInstance.update({
//               following,
//             }, {
//               where: { id },
//             });
//         }
//         return res.status(200).json("user has been followed");
//       } else if (!Array.isArray(user.followers)) {
//         let following: string[] = [];
//         // console.log(following, "second")
//         following.push(req.body.userId);
//         user.following = following;
  
//         const count = user.followerCount as number;
//           user.followerCount = count + 1;
//           const count1 = user.followingCount as number;
//           user.followingCount = count1 + 1;
//         // console.log(user.followerCount, user.following);
  
//           following.push(currentUser.id);
//           await UserInstance.update({
//             following,
//           }, {
//             where: { id },
//           });
//         return res.status(200).json("user has been followed");
//       } else {
//         res.status(403).json("You already follow this user");
//       }
//     } catch (err) {
//       console.log(err);
//       return res.status(500).json({
//         error: "server error",
//       });
//     }
//   };
  
       // unfollow a user
//   export const unfollowUser = async (req: Request | any, res: Response) => {
//         try {
//           const { id } = req.params;
      
//           const user = (await UserInstance.findOne({
//             where: { id },
//           })) as unknown as { [key: string]: string | string[]| number };
      
//           const currentUser = (await UserInstance.findOne({
//             where: { id: req.body.userId },
//           })) as unknown as { [key: string]: string };
      
//           if ( Array.isArray(user.followers)) {
//             if(user.followers.includes(req.body.userId)){
//               let following = user.following as string[];
//               following.shift(req.body.userId);
//               user.following = following;
        
//               const count = user.followerCount as number;
//                 user.followerCount = count + 1;
//                 const count1 = user.followingCount as number;
//                 user.followingCount = count1 + 1;
//               // console.log(user.followerCount, user.following);
        
//                 following.push(currentUser.id);
//                 await UserInstance.update({
//                   following,
//                 }, {
//                   where: { id },
//                 });
//             }
//             return res.status(200).json("user has been unfollowed");
//           } else if (!Array.isArray(user.followers)) {
//             let following: string[] = [];
//             console.log(following, "second")
//             following.shift(req.body.userId);
//             user.following = following;
      
//             const count = user.followerCount as number;
//               user.followerCount = count - 1;
//               const count1 = user.followingCount as number;
//               user.followingCount = count1 - 1;
//             console.log(user.followerCount, user.following);
      
//               following.push(currentUser.id);
//               await UserInstance.update({
//                 following,
//               }, {
//                 where: { id },
//               });
//             return res.status(200).json("user has been unfollowed");
//           } else {
//             res.status(403).json("You already unfollow this user");
//           }
//         } catch (err) {
//           console.log(err);
//           return res.status(500).json({
//             error: "server error",
//           });
//         }
//       };
  
  
  
  
      