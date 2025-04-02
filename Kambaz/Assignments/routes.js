import * as dao from "./dao.js";

export default function AssignmentRoutes(app) {
  // 获取所有作业
  app.get("/api/assignments", (req, res) => {
    const assignments = dao.findAllAssignments();
    res.json(assignments);
  });

  // 根据课程ID获取作业
  app.get("/api/courses/:courseId/assignments", (req, res) => {
    const { courseId } = req.params;
    const assignments = dao.findAssignmentsForCourse(courseId);
    res.json(assignments);
  });

  // 根据ID获取作业
  app.get("/api/assignments/:assignmentId", (req, res) => {
    const { assignmentId } = req.params;
    const assignment = dao.findAssignmentById(assignmentId);
    if (assignment) {
      res.json(assignment);
    } else {
      res.status(404).json({ message: "Assignment not found" });
    }
  });

  // 创建新作业
  app.post("/api/courses/:courseId/assignments", (req, res) => {
    const { courseId } = req.params;
    const assignment = {
      ...req.body,
      course: courseId,
    };
    const newAssignment = dao.createAssignment(assignment);
    res.json(newAssignment);
  });

  // 更新作业
  app.put("/api/assignments/:assignmentId", (req, res) => {
    const { assignmentId } = req.params;
    const assignmentUpdates = req.body;
    const status = dao.updateAssignment(assignmentId, assignmentUpdates);
    if (status) {
      res.json(status);
    } else {
      res.status(404).json({ message: "Assignment not found" });
    }
  });

  // 删除作业
  app.delete("/api/assignments/:assignmentId", (req, res) => {
    const { assignmentId } = req.params;
    const status = dao.deleteAssignment(assignmentId);
    if (status) {
      res.json({ status: "ok" });
    } else {
      res.status(404).json({ message: "Assignment not found" });
    }
  });
}