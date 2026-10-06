/* ==========================================================================
   数据文件 —— 个人资料 + 项目作品数据
   数据来源：profile_demo.md
   后续新增项目：只需在 projects 数组中追加一个对象即可，
   页面会自动渲染新条目，无需改动其它文件。
   如需使用本地截图：给对象添加 image 字段并指向图片路径，
   例如 image: "assets/project-xx.jpg"，即可覆盖自动生成的预览图。
   ========================================================================== */

var PROFILE = {
  tagline: "软件工程在读 · AI 辅助开发",
  bio: "广州软件学院软件工程在读学生，主要关注 AI 辅助开发与大语言模型技术，平时使用 Python、Java 和 TypeScript 进行项目开发。",
  heroIntro:
    "你好，我是林畅，广州软件学院软件工程专业在读。目前主要关注 AI 辅助开发与大语言模型技术，平时使用 Python、Java 和 TypeScript 进行项目开发，也在持续学习前后端开发、数据可视化与 AI 应用构建。以下是我近期的项目经历，欢迎浏览。",
  stats: [
    { num: "", label: "精选项目", plus: true },   // num 由 main.js 自动填充为项目数量
    { num: "", label: "技能标签", plus: true },   // num 自动填充为技能数量
    { num: "在读", label: "广州软件学院", plus: false }
  ],
  skills: [
    {
      name: "编程语言",
      items: ["Python", "Java", "TypeScript", "HTML/CSS"]
    },
    {
      name: "当前方向",
      items: ["AI 辅助开发", "大语言模型应用"]
    },
    {
      name: "持续学习中",
      items: ["前后端开发", "数据可视化", "AI 应用构建"]
    }
  ],
  aboutText: [
    "我目前在 <strong>广州软件学院</strong> 攻读软件工程专业，主要关注 <span class=\"accent\">AI 辅助开发</span> 与 <span class=\"accent\">大语言模型</span> 技术。",
    "平时主要使用 Python、Java 和 TypeScript 进行项目开发，也在持续学习前后端开发、数据可视化与 AI 应用构建。"
  ],
  facts: [
    { k: "所在院校", v: "广州软件学院 · 软件工程" },
    { k: "技术方向", v: "AI 辅助开发 · 大语言模型应用" },
    { k: "主要技能", v: "Python、Java、TypeScript、HTML/CSS" },
    { k: "所在城市", v: "中国·广州" }
  ],
  email: "xiaohe@example.com",
  wechat: "xiaohezi",
  github: "https://github.com/xiaohe-dev",
  website: "https://xiaohe.dev"
};

/* 项目数据：字段说明
   title      项目名称
   desc       项目简介
   stack      技术栈（数组，自动渲染为标签）
   date       完成时间
   category   类别
   image      可选，本地/自定义图片路径（覆盖自动生成图）
   imagePrompt 自动生成预览图用的画面描述
   link       可选，项目链接 */
var PROJECTS = [
  {
    title: "轻记账",
    desc: "“轻记账”是一款面向日常生活场景的极简记账微信小程序，重点解决快速记录和查看个人收支的问题。项目支持语音快捷记账、月度收支统计和预算提醒，并使用微信云开发完成数据存储与后端能力。",
    stack: ["TypeScript", "微信小程序", "微信云开发", "ECharts"],
    date: "2025.04",
    category: "移动应用",
    link: "#",
    imagePrompt: "Minimalist accounting app UI, light green and white theme, expense entry interface with voice input, monthly statistics charts, clean mobile app design"
  },
  {
    title: "拾光集市",
    desc: "“拾光集市”是一个面向校园场景的二手交易平台，提供商品发布、关键词检索、站内私信和信用评分等功能。从需求梳理、界面设计到主要接口开发均独立完成，上线测试后累计注册用户超过 300 人。",
    stack: ["Java", "Spring Boot", "MySQL", "TypeScript", "Vue"],
    date: "2025.09",
    category: "Web应用",
    link: "#",
    imagePrompt: "Campus second-hand trading platform web interface, product cards grid, search bar and chat, warm clean modern UI, student marketplace website"
  },
  {
    title: "城市脉搏",
    desc: "“城市脉搏”是一个城市实时交通与天气数据可视化大屏，用于集中展示交通、天气和城市运行信息。项目通过多数据源轮询聚合数据，并结合 SVG 图表、Canvas 粒子地图和响应式布局实现大屏可视化展示。",
    stack: ["TypeScript", "HTML/CSS", "Canvas", "SVG", "ECharts"],
    date: "2026.03",
    category: "数据可视化",
    link: "#",
    imagePrompt: "City traffic and weather data visualization dashboard, dark blue background, glowing particle map of city roads, weather and traffic charts, modern big screen"
  },
  {
    title: "课语通",
    desc: "“课语通”是一个基于大语言模型的课程问答助手。用户上传课程资料后，系统能够建立知识索引，根据课程内容回答问题，并提供引用出处和知识点小测，帮助学生快速复习和整理课程重点。",
    stack: ["Python", "FastAPI", "RAG", "向量检索", "大语言模型 API", "Streamlit"],
    date: "2026.07",
    category: "AI应用",
    link: "#",
    imagePrompt: "AI course question answering assistant web app, document upload interface, chat Q&A with citations and quiz, clean academic light theme, modern web UI"
  }
];
