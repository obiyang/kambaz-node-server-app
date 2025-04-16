import Assignment from "./model.js";

// 获取所有作业
export const findAllAssignments = async () => {
  return await Assignment.find();
};

// 根据课程ID获取作业
export const findAssignmentsForCourse = async (courseId) => {
  return await Assignment.find({ course: courseId });
};

// 根据ID查找作业
export const findAssignmentById = async (assignmentId) => {
  return await Assignment.findById(assignmentId);
};

// 创建新作业
export const createAssignment = async (assignment) => {
  // 如果没有提供_id，生成一个唯一ID
  if (!assignment._id) {
    // 使用MongoDB ObjectId的字符串表示作为ID
    assignment._id = `A${Date.now()}`;
  }
  const newAssignment = new Assignment(assignment);
  return await newAssignment.save();
};

// 更新作业
export const updateAssignment = async (assignmentId, assignmentUpdates) => {
  return await Assignment.findByIdAndUpdate(
    assignmentId, 
    { $set: assignmentUpdates }, 
    { new: true }
  );
};

// 删除作业
export const deleteAssignment = async (assignmentId) => {
  const result = await Assignment.deleteOne({ _id: assignmentId });
  return result.deletedCount > 0;
};