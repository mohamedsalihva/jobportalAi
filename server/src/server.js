import 'dotenv/config';
import app from "./app.js";
import connectDB  from './config/db.js';


const PORT = process.env.PORT || 3000;

connectDB();



app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
