import Database from "../Database/index.js";
import { v4 as uuidv4 } from "uuid";

// 获取所有作业
export function findAllAssignments() {
  return Database.assignments;
}

// 根据课程ID获取作业
export function findAssignmentsForCourse(courseId) {
  return Database.assignments.filter(
    (assignment) => assignment.course === courseId
  );
}

// 根据ID查找作业
export function findAssignmentById(assignmentId) {
  return Database.assignments.find(
    (assignment) => assignment._id === assignmentId
  );
}

// 创建新作业
export function createAssignment(assignment) {
  const newAssignment = { ...assignment, _id: uuidv4() };
  Database.assignments = [...Database.assignments, newAssignment];
  return newAssignment;
}

// 更新作业
export function updateAssignment(assignmentId, assignmentUpdates) {
  const assignment = Database.assignments.find(
    (assignment) => assignment._id === assignmentId
  );
  if (assignment) {
    Object.assign(assignment, assignmentUpdates);
    return assignment;
  }
  return null;
}

// 删除作业
export function deleteAssignment(assignmentId) {
  const originalLength = Database.assignments.length;
  Database.assignments = Database.assignments.filter(
    (assignment) => assignment._id !== assignmentId
  );
  return Database.assignments.length !== originalLength;
}