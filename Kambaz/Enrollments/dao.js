import Database from "../Database/index.js";
import { v4 as uuidv4 } from "uuid";

// 获取所有注册记录
export function findAllEnrollments() {
  return Database.enrollments;
}

// 根据用户ID获取注册记录
export function findEnrollmentsByUser(userId) {
  return Database.enrollments.filter(
    (enrollment) => enrollment.user === userId
  );
}

// 根据课程ID获取注册记录
export function findEnrollmentsByCourse(courseId) {
  return Database.enrollments.filter(
    (enrollment) => enrollment.course === courseId
  );
}

// 检查用户是否已注册课程
export function isUserEnrolledInCourse(userId, courseId) {
  return Database.enrollments.some(
    (enrollment) => enrollment.user === userId && enrollment.course === courseId
  );
}

// 注册用户到课程
export function enrollUserInCourse(userId, courseId) {
  // 检查是否已注册
  if (isUserEnrolledInCourse(userId, courseId)) {
    return { success: false, message: "User already enrolled in this course" };
  }
  
  const newEnrollment = { _id: uuidv4(), user: userId, course: courseId };
  Database.enrollments.push(newEnrollment);
  return { success: true, enrollment: newEnrollment };
}

// 取消用户课程注册
export function unenrollUserFromCourse(userId, courseId) {
  const originalLength = Database.enrollments.length;
  Database.enrollments = Database.enrollments.filter(
    (enrollment) => !(enrollment.user === userId && enrollment.course === courseId)
  );
  return Database.enrollments.length !== originalLength;
}
