import express from 'express';
import dotenv from 'dotenv/config';
import bcrypt from 'bcrypt';
import path from 'path';
import viewEngine from './viewEngine';
import route from './routes/route';
import pool from './config/db';
import RedisStore from "connect-redis";
import session from 'express-session';
import { createClient } from "redis";
import cors from 'cors';

const app = express();

const port = process.env.PORT || 6868;
app.use(cors());
app.use(session({
    secret: process.env.SESSION_SECRET || 'mySecret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));


app.use((req, res, next) => {
    res.locals.session = req.session;
    next();
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

viewEngine(app);

app.use('/', route);

pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log("Connected to MySQL database!");
    connection.release();
});


app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}/`);
});


// import express from 'express';
// import dotenv from 'dotenv/config';
// import bcrypt from 'bcrypt';
// import path from 'path';
// import viewEngine from './viewEngine';
// import route from './routes/route';
// import pool from './config/db';
// import RedisStore from "connect-redis";
// import session from 'express-session';
// import { createClient } from "redis";

// dotenv.config();

// const app = express();
// const port = process.env.PORT || 6868;

// // Redis client configuration (nếu bạn cần Redis để lưu session)
// const redisClient = createClient({
//     url: process.env.REDIS_URL || 'redis://localhost:6379'
// });
// redisClient.connect().catch(console.error);

// const redisStore = new RedisStore({
//     client: redisClient,
//     prefix: 'session:',
//     ttl: 86400 // thời gian sống của session là 1 ngày
// });

// // Cấu hình session với Redis
// app.use(session({
//     store: redisStore,  // sử dụng Redis Store
//     secret: process.env.SESSION_SECRET || 'mySecret',
//     resave: false,
//     saveUninitialized: true,
//     cookie: {
//         secure: false,   // true nếu bạn sử dụng HTTPS, hiện tại để false
//         maxAge: 86400000 // thời gian sống của session cookie là 1 ngày
//     }
// }));

// // Đảm bảo session được truyền vào mọi render trong EJS
// app.use((req, res, next) => {
//     res.locals.session = req.session;
//     next();
// });

// // Middleware để kiểm tra quyền hạn
// const checkRole = (roles) => (req, res, next) => {
//     if (!req.session.user || !roles.includes(req.session.user.role)) {
//         return res.status(403).send('Bạn không có quyền truy cập!');
//     }
//     next();
// };

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// app.use(express.static(path.join(__dirname, 'public')));

// // Sử dụng view engine
// viewEngine(app);

// // Các route
// app.use('/', route);

// // Kết nối database
// pool.getConnection((err, connection) => {
//     if (err) throw err;
//     console.log("Connected to MySQL database!");
//     connection.release();
// });

// // Kiểm tra nếu người dùng chưa đăng nhập
// const checkAuthenticated = (req, res, next) => {
//     if (!req.session.user) {
//         return res.redirect('/login');
//     }
//     next();
// };

// // Chạy server
// app.listen(port, () => {
//     console.log(`Server is running at http://localhost:${port}/`);
// });


