import app from './app';
const PORT = process.env.PORT || 3000;
import { sequelize } from '~/config/db';

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(
      `Database synced and server is running on http://localhost:${PORT}`,
    );
  });
});
