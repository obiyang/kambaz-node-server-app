import Database from "../Database/index.js";
import { v4 as uuidv4 } from "uuid";

export function findAllCourses() {
  return Database.courses;
}
// Kambaz/Courses/dao.js
export function findCoursesForEnrolledUser(userId) {
    console.log("Finding courses for user:", userId);
    const { courses, enrollments } = Database;
    console.log("Total courses:", courses.length);
    console.log("Total enrollments:", enrollments.length);
    
    // 打印该用户的所有注册记录
    const userEnrollments = enrollments.filter(e => e.user === userId);
    console.log("User enrollments:", userEnrollments);
    
    const enrolledCourses = courses.filter((course) =>
      enrollments.some((enrollment) => enrollment.user === userId && enrollment.course === course._id));
    
    console.log("Filtered courses count:", enrolledCourses.length);
    console.log("Filtered courses:", enrolledCourses);
    return enrolledCourses;
  }

  export function createCourse(course) {
    const newCourse = { ...course, _id: uuidv4() };
    Database.courses = [...Database.courses, newCourse];
    return newCourse;
  }

  export function deleteCourse(courseId) {
    const { courses, enrollments } = Database;
    Database.courses = courses.filter((course) => course._id !== courseId);
    Database.enrollments = enrollments.filter(
      (enrollment) => enrollment.course !== courseId
  );}
  
  export function updateCourse(courseId, courseUpdates) {
    const { courses } = Database;
    const course = courses.find((course) => course._id === courseId);
    Object.assign(course, courseUpdates);
    return course;
  }
  
  