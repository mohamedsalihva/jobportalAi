import 'dotenv/config';
import app from "./app.js";
import connectDB  from './config/db.js';


const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Backend running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Server startup aborted: database is not reachable.");
    process.exit(1);
  }
};

startServer();
