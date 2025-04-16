import "dotenv/config"; 
import express from 'express';
import Hello from './Hello.js'
import Lab5 from './Lab5/index.js'
import cors from "cors";
import UserRoutes from "./Kambaz/Users/route.js";
import session from "express-session";
import CourseRoutes from "./Kambaz/Courses/routes.js";
import ModuleRoutes from "./Kambaz/Modules/routes.js";
import AssignmentRoutes from "./Kambaz/Assignments/routes.js";
import EnrollmentRoutes from "./Kambaz/Enrollments/routes.js";
import mongoose from "mongoose";

console.log("Environment variables:");
console.log("NODE_ENV:", process.env.NODE_ENV);
console.log("NETLIFY_URL:", process.env.NETLIFY_URL);
console.log("NODE_SERVER_DOMAIN:", process.env.NODE_SERVER_DOMAIN);
console.log("SESSION_SECRET:", process.env.SESSION_SECRET ? "True" : "False");
console.log("MONGO_CONNECTION_STRING exists:", process.env.MONGO_CONNECTION_STRING ? "Yes" : "No");

// 打印连接字符串（隐藏密码）
const CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kambaz";
const connectionStringForLog = CONNECTION_STRING.replace(/\/\/([^:]+):([^@]+)@/, '//\$1:****@');
console.log("MongoDB Connection String (password hidden):", connectionStringForLog);

// 添加详细的MongoDB连接日志
console.log("Attempting to connect to MongoDB...");
mongoose.connect(CONNECTION_STRING)
  .then(() => {
    console.log("✅ Connected to MongoDB successfully!");
    // 打印数据库信息
    const db = mongoose.connection;
    console.log("Database name:", db.name);
    console.log("Host:", db.host);
    console.log("Port:", db.port);
  })
  .catch(err => {
    console.error("❌ MongoDB connection error:", err.message);
    if (err.name === 'MongoServerError') {
      console.error("Error code:", err.code);
      console.error("Error response:", JSON.stringify(err.errorResponse || {}));
    }
    if (err.name === 'MongoServerError' && err.code === 8000) {
      console.error("Authentication failed. Please check username and password in your connection string.");
      console.error("Make sure the user exists and has the correct permissions.");
    }
    if (err.name === 'MongoServerSelectionError') {
      console.error("Could not connect to any MongoDB server.");
      console.error("Please check if the cluster is running and network access is configured correctly.");
    }
  });

const app = express()

// 添加详细的CORS配置日志
const corsOrigin = process.env.NETLIFY_URL || "http://localhost:5173";
console.log("CORS origin configured as:", corsOrigin);
console.log("CORS origin without trailing slash:", corsOrigin.replace(/\/$/, ''));

app.use(cors({
    credentials: true,
    origin: function(origin, callback) {
      console.log("Incoming request from origin:", origin);
      
      // 允许没有origin的请求（如Postman或直接访问）
      if (!origin) {
        console.log("No origin in request, allowing access");
        return callback(null, true);
      }
      
      // 移除末尾斜杠进行比较
      const originWithoutSlash = origin.replace(/\/$/, '');
      const allowedOriginWithoutSlash = corsOrigin.replace(/\/$/, '');
      
      console.log("Comparing:", originWithoutSlash, "with allowed:", allowedOriginWithoutSlash);
      
      if (originWithoutSlash === allowedOriginWithoutSlash) {
        console.log("✅ Origin allowed by CORS");
        callback(null, true);
      } else {
        console.log("❌ Origin rejected by CORS");
        callback(new Error(`Origin ${origin} not allowed by CORS`));
      }
    },
    credentials: true
  }
));

const sessionOptions = {
  secret: process.env.SESSION_SECRET || "kambaz",
  resave: false,
  saveUninitialized: false,
};

if (process.env.NODE_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
    domain: process.env.NODE_SERVER_DOMAIN,
  };
}

app.use(session(sessionOptions));
app.use(express.json()); 
UserRoutes(app); 
CourseRoutes(app);
Hello(app)
Lab5(app)
ModuleRoutes(app);
AssignmentRoutes(app);
EnrollmentRoutes(app);
app.listen(process.env.PORT || 4000)