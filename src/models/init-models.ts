import type { Sequelize } from "sequelize";
import { Comment as _Comment } from "./Comment";
import type { CommentAttributes, CommentCreationAttributes } from "./Comment";
import { Post as _Post } from "./Post";
import type { PostAttributes, PostCreationAttributes } from "./Post";
import { User as _User } from "./User";
import type { UserAttributes, UserCreationAttributes } from "./User";

export {
  _Comment as Comment,
  _Post as Post,
  _User as User,
};

export type {
  CommentAttributes,
  CommentCreationAttributes,
  PostAttributes,
  PostCreationAttributes,
  UserAttributes,
  UserCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  const Comment = _Comment.initModel(sequelize);
  const Post = _Post.initModel(sequelize);
  const User = _User.initModel(sequelize);

  Comment.belongsTo(Post, { as: "post", foreignKey: "post_id"});
  Post.hasMany(Comment, { as: "Comments", foreignKey: "post_id"});
  Comment.belongsTo(User, { as: "user", foreignKey: "user_id"});
  User.hasMany(Comment, { as: "Comments", foreignKey: "user_id"});
  Post.belongsTo(User, { as: "user", foreignKey: "user_id"});
  User.hasMany(Post, { as: "Posts", foreignKey: "user_id"});

  return {
    Comment: Comment,
    Post: Post,
    User: User,
  };
}
