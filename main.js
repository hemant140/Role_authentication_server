import express from 'express';
import dotenv from 'dotenv';
import { errorhandler, notFound } from './middleware/errorhandler.js';
import { connectDB } from './config/db.js';
import taskRoute from './routes/task.routes.js';
import authRoute from './routes/auth.routes.js';
import userRoute from './routes/user.routes.js';
import roleRoute from './routes/role.routes.js';
import permissionRoute from './routes/permission.routes.js';
import sidebarRoute from './routes/sidebar.routes.js';
import { loggerMiddleWare } from './middleware/logger.js';
import { rateLimitMiddleWare } from './middleware/rateLimit.js';
dotenv.config();

const app = express();

connectDB();
app.use(express.json());

app.use(loggerMiddleWare)
// app.use(rateLimitMiddleWare)

app.use('/auth', authRoute);
app.use('/task', taskRoute);
app.use('/user', userRoute);
app.use('/role', roleRoute);
app.use('/permission', permissionRoute);
app.use('/sidebar', sidebarRoute);

app.get('/', (req, res) => {
    res.json({ Message: `Server is running ${process.env.PORT}` })
})


app.use(notFound);
app.use(errorhandler);

app.listen(process.env.PORT, () => {
    console.log(`Server is running port ${process.env.PORT}`);
});


