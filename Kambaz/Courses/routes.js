import * as dao from "./dao.js";
import * as modulesDao from "../Modules/dao.js";
import * as enrollmentsDao from "../Enrollments/dao.js";

export default function CourseRoutes(app) {
  app.post("/api/courses", async (req, res) => {
    try {
      const course = await dao.createCourse(req.body);
      console.log("Course created:", course);
      
      // 首先尝试从请求体中获取用户ID
      let userId = req.body.userId;
      
      // 如果请求体中没有用户ID，则尝试从会话中获取
      if (!userId) {
        const currentUser = req.session["currentUser"];
        console.log("Current user from session:", currentUser);
        
        if (currentUser) {
          userId = currentUser._id;
        }
      }
      
      // 如果有用户ID，则执行注册
      if (userId) {
        console.log("Attempting to enroll user:", userId, "in course:", course._id);
        await enrollmentsDao.enrollUserInCourse(userId, course._id);
        console.log("User enrolled successfully");
      } else {
        console.log("No user ID available, skipping enrollment");
      }
      
      res.json(course);
    } catch (error) {
      console.error("Error creating course:", error);
      res.status(500).json({ error: "Failed to create course" });
    }
  });
    
    app.post("/api/courses/:courseId/modules", async (req, res) => {
        const { courseId } = req.params;
        const module = {
          ...req.body,
          course: courseId,
        };
        const newModule = await modulesDao.createModule(module);
        res.send(newModule);
      });
    
  app.get("/api/courses", async (req, res) => {
    const courses = await dao.findAllCourses();
    res.send(courses);
  });
  
  // 获取特定课程的注册用户
  app.get("/api/courses/:cid/users", async (req, res) => {
    const { cid } = req.params;
    const users = await enrollmentsDao.findUsersForCourse(cid);
    res.json(users);
  });
  
  app.delete("/api/courses/:courseId", async (req, res) => {
    const { courseId } = req.params;
    const status = await dao.deleteCourse(courseId);
    res.send(status);
  });
  app.put("/api/courses/:courseId", async (req, res) => {
    const { courseId } = req.params;
    const courseUpdates = req.body;
    const status = await dao.updateCourse(courseId, courseUpdates);
    res.send(status);
  });
  app.get("/api/courses/:courseId/modules", async (req, res) => {
    const { courseId } = req.params;
    const modules = await modulesDao.findModulesForCourse(courseId);
    res.json(modules);
  });

}
