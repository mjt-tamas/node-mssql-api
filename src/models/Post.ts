import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Comment, CommentId } from './Comment';
import type { User, UserId } from './User';

export interface PostAttributes {
  id: number;
  user_id: number;
  title: string;
  content?: string;
  created_at?: Date;
  updated_at?: Date;
}

export type PostPk = "id";
export type PostId = Post[PostPk];
export type PostOptionalAttributes = "id" | "content" | "created_at" | "updated_at";
export type PostCreationAttributes = Optional<PostAttributes, PostOptionalAttributes>;

export class Post extends Model<PostAttributes, PostCreationAttributes> implements PostAttributes {
  id!: number;
  user_id!: number;
  title!: string;
  content?: string;
  created_at?: Date;
  updated_at?: Date;

  // Post hasMany Comment via post_id
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
  // Post belongsTo User via user_id
  user!: User;
  getUser!: Sequelize.BelongsToGetAssociationMixin<User>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<User, UserId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<User>;

  static initModel(sequelize: Sequelize.Sequelize): typeof Post {
    return sequelize.define('Post', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    title: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true
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
    tableName: 'Posts',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__Posts__3213E83F037F8883",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  }) as typeof Post;
  }
}
