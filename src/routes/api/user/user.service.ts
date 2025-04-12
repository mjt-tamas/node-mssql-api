import { db } from '~/config/db';
import type { UserCreationAttributes } from '~/models/User';

export class UserService {
  //CREATE
  public async create(user: UserCreationAttributes) {
    const newUser = await db.User.create(user);
    return newUser;
  }
  //READ
  public async list() {
    const users = await db.User.findAll();
    return users;
  }
  public async getById(id: number) {
    const user = await db.User.findByPk(id);
    return user;
  }
  //UPDATE
  public async update(id: number, user: Partial<UserCreationAttributes>) {
    const [affectedRows, updatedUsers] = await db.User.update(user, {
      where: { id },
      returning: true,
    });
    return { affected_rows: affectedRows, user: updatedUsers[0] };
  }
  //DELETE
  public async delete(id: number) {
    const deletedUserCount = await db.User.destroy({
      where: { id },
    });
    return deletedUserCount;
  }
}
