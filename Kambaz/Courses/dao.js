//import Database from "../Database/index.js";
import model from "./model.js";
import { v4 as uuidv4 } from "uuid";

export function findAllCourses() {
  return model.find();
}
// Kambaz/Courses/dao.js
export async function findCoursesForEnrolledUser(userId) {
    console.log("Finding courses for user:", userId);
    
    try {
        // 获取所有课程
        const courses = await model.find();
        console.log("Total courses:", courses.length);
        
        // 从Enrollments集合中获取用户的注册信息
        // 注意：这里假设您有一个enrollmentModel可用
        // 如果没有，您需要导入或创建它
        const enrollmentModel = (await import("../Enrollments/model.js")).default;
        const enrollments = await enrollmentModel.find();
        console.log("Total enrollments:", enrollments.length);
        
        // 过滤出用户的注册记录
        const userEnrollments = enrollments.filter(e => e.user === userId);
        console.log("User enrollments:", userEnrollments);
        
        // 过滤出用户注册的课程
        const enrolledCourses = courses.filter((course) =>
            enrollments.some((enrollment) => 
                enrollment.user === userId && 
                enrollment.course === course._id.toString()));
        
        console.log("Filtered courses count:", enrolledCourses.length);
        console.log("Filtered courses:", enrolledCourses);
        
        return enrolledCourses;
    } catch (error) {
        console.error("Error finding courses for enrolled user:", error);
        return [];
    }
}

export function createCourse(course) {
    const newCourse = { ...course, _id: uuidv4() };
    return model.create(newCourse);
}

export function deleteCourse(courseId) {
    return model.deleteOne({ _id: courseId });
}

export function updateCourse(courseId, courseUpdates) {
    return model.updateOne({ _id: courseId }, { $set: courseUpdates });
}