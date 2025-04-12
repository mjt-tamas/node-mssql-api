import { BaseController } from '~/common/base.controller';
import { UserService } from './user.service';
import { userCreateSchema, userUpdateSchema } from './user.validator';
import { idSchema } from '~/common/base.validator';
import { errors } from '~/middleware/exception.middleware';

export class UserController extends BaseController {
  constructor(private userService = new UserService()) {
    super();
  }
  //CREATE
  public create = this.handler(
    {
      body: userCreateSchema,
    },
    async (req, res) => {
      const user = await this.userService.create(req.body);
      return res.status(201).send(user);
    },
  );
  //READ
  public list = this.handler({}, async (_, res) => {
    const users = await this.userService.list();
    return res.send(users);
  });
  public getById = this.handler(
    {
      params: idSchema,
    },
    async (req, res) => {
      const user = await this.userService.getById(req.params.id);
      if (!user) {
        throw errors.notFound('User');
      }
      return res.send(user);
    },
  );
  //UPDATE
  public update = this.handler(
    {
      params: idSchema,
      body: userUpdateSchema,
    },
    async (req, res) => {
      const { user } = await this.userService.update(req.params.id, req.body);
      if (!user) {
        throw errors.notFound('User');
      }
      return res.send(user);
    },
  );
  //DELETE
  public delete = this.handler(
    {
      params: idSchema,
    },
    async (req, res) => {
      const deletedUserCount = await this.userService.delete(req.params.id);
      if (!deletedUserCount) {
        throw errors.notFound('user');
      }
      return res.status(204).send();
    },
  );
}

export default new UserController();
