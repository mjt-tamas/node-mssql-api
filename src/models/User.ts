import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Comment, CommentId } from './Comment';
import type { Post, PostId } from './Post';

export interface UserAttributes {
  id: number;
  username: string;
  email: string;
  password: string;
  created_at?: Date;
  updated_at?: Date;
}

export type UserPk = "id";
export type UserId = User[UserPk];
export type UserOptionalAttributes = "id" | "created_at" | "updated_at";
export type UserCreationAttributes = Optional<UserAttributes, UserOptionalAttributes>;

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  id!: number;
  username!: string;
  email!: string;
  password!: string;
  created_at?: Date;
  updated_at?: Date;

  // User hasMany Comment via user_id
  Comments!: Comment[];
  getComments!: Sequelize.HasManyGetAssociationsMixin<Comment>;
  setComments!: Sequelize.HasManySetAssociationsMixin<Comment, CommentId>;
  addComment!: Sequelize.HasManyAddAssociationMixin<Comment, CommentId>;
  addComments!: Sequelize.HasManyAddAssociationsMixin<Comment, CommentId>;
  createComment!: Sequelize.HasManyCreateAssociationMixin<Comment>;
  removeComment!: Sequelize.HasManyRemoveAssociationMixin<Comment, CommentId>;
  removeComments!: Sequelize.HasManyRemoveAssociationsMixin<Comment, CommentId>;
  hasComment!: Sequelize.HasManyHasAssociationMixin<Comment, CommentId>;
  hasComments!: Sequelize.HasManyHasAssociationsMixin<Comment, CommentId>;
  countComments!: Sequelize.HasManyCountAssociationsMixin;
  // User hasMany Post via user_id
  Posts!: Post[];
  getPosts!: Sequelize.HasManyGetAssociationsMixin<Post>;
  setPosts!: Sequelize.HasManySetAssociationsMixin<Post, PostId>;
  addPost!: Sequelize.HasManyAddAssociationMixin<Post, PostId>;
  addPosts!: Sequelize.HasManyAddAssociationsMixin<Post, PostId>;
  createPost!: Sequelize.HasManyCreateAssociationMixin<Post>;
  removePost!: Sequelize.HasManyRemoveAssociationMixin<Post, PostId>;
  removePosts!: Sequelize.HasManyRemoveAssociationsMixin<Post, PostId>;
  hasPost!: Sequelize.HasManyHasAssociationMixin<Post, PostId>;
  hasPosts!: Sequelize.HasManyHasAssociationsMixin<Post, PostId>;
  countPosts!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof User {
    return sequelize.define('User', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: "UQ__Users__F3DBC572D63D45C4"
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: "UQ__Users__AB6E616436984571"
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('getdate')
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('getdate')
    }
  }, {
    tableName: 'Users',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__Users__3213E83FBD6810C6",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "UQ__Users__AB6E616436984571",
        unique: true,
        fields: [
          { name: "email" },
        ]
      },
      {
        name: "UQ__Users__F3DBC572D63D45C4",
        unique: true,
        fields: [
          { name: "username" },
        ]
      },
    ]
  }) as typeof User;
  }
}
