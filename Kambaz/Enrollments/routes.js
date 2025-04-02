import * as dao from "./dao.js";

export default function EnrollmentRoutes(app) {
  // 获取所有注册记录
  app.get("/api/enrollments", (req, res) => {
    const enrollments = dao.findAllEnrollments();
    res.json(enrollments);
  });

  // 根据用户ID获取注册记录
  app.get("/api/users/:userId/enrollments", (req, res) => {
    const { userId } = req.params;
    const enrollments = dao.findEnrollmentsByUser(userId);
    res.json(enrollments);
  });

  // 根据课程ID获取注册记录
  app.get("/api/courses/:courseId/enrollments", (req, res) => {
    const { courseId } = req.params;
    const enrollments = dao.findEnrollmentsByCourse(courseId);
    res.json(enrollments);
  });

  // 检查用户是否已注册课程
  app.get("/api/users/:userId/courses/:courseId/enrolled", (req, res) => {
    const { userId, courseId } = req.params;
    const isEnrolled = dao.isUserEnrolledInCourse(userId, courseId);
    res.json({ enrolled: isEnrolled });
  });

  // 注册用户到课程
  app.post("/api/users/:userId/courses/:courseId/enroll", (req, res) => {
    const { userId, courseId } = req.params;
    const result = dao.enrollUserInCourse(userId, courseId);
    if (result.success) {
      res.status(201).json(result);
    } else {
      res.status(400).json(result);
    }
  });

  // 取消用户课程注册
  app.delete("/api/users/:userId/courses/:courseId/enroll", (req, res) => {
    const { userId, courseId } = req.params;
    const success = dao.unenrollUserFromCourse(userId, courseId);
    if (success) {
      res.json({ success: true });
    } else {
      res.status(404).json({ success: false, message: "Enrollment not found" });
    }
  });
}