// import { Request, Response } from "express";
// import { createPostSchema, option } from "../utilities/utils";
// import { PostInstance } from "../model/postModel";
// import { v4 as uuidv4 } from "uuid";
// // import { token } from "morgan";
// import jwt from "jsonwebtoken";
// import { UserInstance } from "../model/userModel";
// const jwt_secret = process.env.JWT_SECRET as any;

// // create a post
// export const createPost = async (req: Request | any, res: Response | any) => {
//   try {
//     // console.log("hello" + req.headers.authorization.split(" ")[1]);
//     const id = uuidv4();
//     // console.log(id);
//     console.log(req.user.id);
   
//     const userId = req.user.id;

//     const validateResult = createPostSchema.validate(req.body, option);
//     if (validateResult.error) {
//       return res
//         .status(400)
//         .json({ msg: validateResult.error.details[0].message });
//     }
//     const postRecord = await PostInstance.create({
//       id,
//       ...req.body,
//       userId: userId,
//     });
//     //  res.header.likes = postRecord.likes;
//     return res
//       .status(201)
//       .json({ msg: "post created successfully", postRecord });
//   } catch (err) {
//     res.status(500).json({ msg: "cannot create post", err });
//   }
// };

// export const deletePost = async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;
//     const postRecord = await PostInstance.findOne({
//       where: { id },
//     });
//     if (!postRecord) {
//       return res.status(404).json({
//         error: "Post not found",
//       });
//     }
//     const deletePost = await postRecord.destroy();
//     return res.status(200).json({
//       msg: "Post deleted successfully",
//       deletePost,
//     });
//   } catch (err) {
//     return res.status(500).json({
//       error: "server error",
//     });
//   }
// };

// export const likePost = async (req: Request | any, res: Response) => {
//   try {
//     const { id } = req.params;
//     console.log(typeof id);
//     // console.log({ id: id });
//     const user = (await PostInstance.findOne({
//       where: { id },
//     })) as unknown as { [key: string]: string |string[] | number };

//     const currentUser = await UserInstance.findOne({
//       where: { id: req.user.id },
//     }) as unknown as { [key: string]: string };
//     // console.log(req.body.userId);
//     // console.log(post);
   
//     if(Array.isArray(user.likes)){
//     if (!user.likes.includes(req.body.userId)) {
//       let likes = user.likes as string[];
//       likes.push(req.body.userId);
//       user.likes = likes;
//     //   console.log(likes);

//     const count = user.likesCount as number;
//         user.likesCount = count + 1;
   
//     //   console.log(count);
    
//       likes.push(currentUser.id);
//       await PostInstance.update({
//         likes,
//       }, {
//         where: { id },
//       });
//     } 
//     return res.status(200).json({
//         msg: "Post liked successfully",
//         user,
//         });

//     } else if (!Array.isArray(user.likes)) {
//       let likes: string[] = [];
//       likes.pop;
//       user.likes = likes;

//       let count = user.likesCount as number;
//       user.likesCount = count - 1;
//     //   count.length - 1;
//       //   await post.save();
//       likes.push(currentUser.id);
//       await PostInstance.update({
//         likes,
//       }, {
//         where: { id },
//       })
//         return res.status(200).json({
//             msg: "Post liked successfully",
//             user,
//             });

//     } else {
//         res.status(403).json("You already liked this post");
//     }
    

//     //   if (!postRecord) {
//     //     return res.status(404).json({
//     //       error: "Post not found",
//     //     });
//     //   }
//     //   const likePost = await postRecord.increment("likeCount", { by: 1 });
//     //   return res.status(200).json({
//     //     msg: "Post liked successfully",
//     //     likePost,
//     //   });
//   } catch (err) {
//     return res.status(500).json({
//       error: "server error",
//     });
//   }
// };

// //get a post
// export const getPost = async (req: Request, res: Response) => {
//     try{
//          const { id } = req.params;
//          const post = await PostInstance.findOne({
//             where: { id },
//          })
//          if(!post){
//              return res.status(404).json({
//                  error: "Post not found",
//              })
//          }
//             return res.status(200).json({
//                 msg: "Post retrieved successfully",
//                 post,
//             })

//     }catch (err) {
//         return res.status(500).json({
//           error: "server error",
//         });
//       }
// }

// // timeline post
// export const timelinePost = async (req: Request, res: Response) => {
//     try{
//         const currentUser = await UserInstance.findOne({
//             where: { id: req.body.userId },
//           }) as unknown as { [key: string]: string[] };
//           console.log(currentUser);

//           const userPosts = await PostInstance.findAll({
//             where: { userId: currentUser.id },
//           }) as unknown as { [key: string]: string }[];
//           console.log(userPosts);

//           const friendPosts = await Promise.all(
//             currentUser.following.map((friendId: string) => {
//               return PostInstance.findAll({
//                 where: { userId: friendId },
//               }) as unknown as { [key: string]: string }[];
//             })
//           );
//           console.log(friendPosts);
//           res.json(userPosts.concat(...friendPosts));
//     }catch (err) {
//         return res.status(500).json({
//           error: "server error",
//         });
//       }
// }