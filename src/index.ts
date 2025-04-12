import app from './app';
const PORT = process.env.PORT || 3000;
import { syncDb } from '~/config/db';

syncDb().then(() => {
  app.listen(PORT, () => {
    console.log(
      `Database synced and server is running on http://localhost:${PORT}`,
    );
  });
});
