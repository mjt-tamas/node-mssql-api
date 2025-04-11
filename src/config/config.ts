import { config } from 'dotenv';

const path = './.env';

config({
  path,
  override: true,
});

const throwError = (msg: string) => {
  throw new Error(msg);
};
