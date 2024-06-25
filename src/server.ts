import { serve } from 'hono';
import app from './app';

const port = 3000;

serve({
  fetch: app.fetch,
  port: port,
}).then(() => {
  console.log(`Server running on http://localhost:${port}`);
});
