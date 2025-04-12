import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Post, PostId } from './Post';
import type { User, UserId } from './User';

export interface CommentAttributes {
  id: number;
  post_id: number;
  user_id: number;
  content: string;
  created_at?: Date;
}

export type CommentPk = "id";
export type CommentId = Comment[CommentPk];
export type CommentOptionalAttributes = "id" | "created_at";
export type CommentCreationAttributes = Optional<CommentAttributes, CommentOptionalAttributes>;

export class Comment extends Model<CommentAttributes, CommentCreationAttributes> implements CommentAttributes {
  id!: number;
  post_id!: number;
  user_id!: number;
  content!: string;
  created_at?: Date;

  // Comment belongsTo Post via post_id
  post!: Post;
  getPost!: Sequelize.BelongsToGetAssociationMixin<Post>;
  setPost!: Sequelize.BelongsToSetAssociationMixin<Post, PostId>;
  createPost!: Sequelize.BelongsToCreateAssociationMixin<Post>;
  // Comment belongsTo User via user_id
  user!: User;
  getUser!: Sequelize.BelongsToGetAssociationMixin<User>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<User, UserId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<User>;

  static initModel(sequelize: Sequelize.Sequelize): typeof Comment {
    return sequelize.define('Comment', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Posts',
        key: 'id'
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('getdate')
    }
  }, {
    tableName: 'Comments',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__Comments__3213E83F98735840",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  }) as typeof Comment;
  }
}
