const assignment = {
    id: 1, title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-10-10", completed: false, score: 0,
};

// 创建模块对象
const module = {
    id: "CS5610",
    name: "Web Development",
    description: "Building web applications using React and Node.js",
    course: "CS Masters Program"
};

export default function WorkingWithObjects(app) {
  // Assignment 相关路由
  app.get("/lab5/assignment", (req, res) => {
    res.json(assignment);
  });
  app.get("/lab5/assignment/title", (req, res) => {
    res.json(assignment.title);
  });
  app.get("/lab5/assignment/title/:newTitle", (req, res) => {
    const { newTitle } = req.params;
    assignment.title = newTitle;
    res.json(assignment);
  });
  
  // 新增：更新assignment的score
  app.get("/lab5/assignment/score/:newScore", (req, res) => {
    const { newScore } = req.params;
    assignment.score = parseInt(newScore);
    res.json(assignment);
  });
  
  // 新增：更新assignment的completed状态
  app.get("/lab5/assignment/completed/:completed", (req, res) => {
    const { completed } = req.params;
    assignment.completed = completed === "true";
    res.json(assignment);
  });

  // 模块相关路由
  app.get("/lab5/module", (req, res) => {
    res.json(module);
  });
  
  app.get("/lab5/module/name", (req, res) => {
    res.json(module.name);
  });
  
  app.get("/lab5/module/name/:newName", (req, res) => {
    const { newName } = req.params;
    module.name = newName;
    res.json(module);
  });
  
  app.get("/lab5/module/description/:newDescription", (req, res) => {
    const { newDescription } = req.params;
    module.description = newDescription;
    res.json(module);
  });
};