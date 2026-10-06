/* ==========================================================================
   交互逻辑 —— 数据渲染 + 导航高亮 + 移动端菜单
   ========================================================================== */

/* 根据画面描述生成预览图 URL（可替换为真实截图后删除） */
var IMAGE_API = "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image";

function buildImageUrl(prompt, size) {
  return IMAGE_API + "?prompt=" + encodeURIComponent(prompt) + "&image_size=" + (size || "landscape_4_3");
}

function projectImage(p) {
  return p.image || buildImageUrl(p.imagePrompt);
}

/* ---------- 渲染个人资料 ---------- */
function renderProfile() {
  document.getElementById("profileTagline").textContent = PROFILE.tagline;
  document.getElementById("profileBio").textContent = PROFILE.bio;
  document.getElementById("heroIntro").textContent = PROFILE.heroIntro;

  // Hero 统计数字：前两项自动填充
  PROFILE.stats[0].num = PROJECTS.length;
  PROFILE.stats[1].num = PROFILE.skills.reduce(function (sum, g) {
    return sum + g.items.length;
  }, 0);
  document.getElementById("heroStats").innerHTML = PROFILE.stats
    .map(function (s) {
      return (
        '<div class="hero__stat">' +
        '<p class="num">' + s.num + (s.plus ? "<em>+</em>" : "") + "</p>" +
        '<p class="label">' + s.label + "</p>" +
        "</div>"
      );
    })
    .join("");

  // 关于我
  document.getElementById("aboutText").innerHTML = PROFILE.aboutText
    .map(function (p) { return "<p>" + p + "</p>"; })
    .join("");
  document.getElementById("aboutFacts").innerHTML = PROFILE.facts
    .map(function (f) {
      return "<li><span class=\"k\">" + f.k + "</span><span class=\"v\">" + f.v + "</span></li>";
    })
    .join("");

  // 联系方式
  var contactText =
    "有项目合作或交流想法，欢迎通过邮箱、微信或 GitHub 联系我：" +
    "邮箱 " + PROFILE.email +
    " · 微信 " + PROFILE.wechat +
    " · GitHub " + PROFILE.github.replace(/^https?:\/\//, "");
  document.getElementById("contactHint").textContent = contactText;
  var mailLinks = document.querySelectorAll("#contactEmail, #sideEmail");
  mailLinks.forEach(function (a) { a.href = "mailto:" + PROFILE.email; });
  document.querySelectorAll("#contactGithub, #sideGithub").forEach(function (a) {
    a.href = PROFILE.github;
  });
}

/* ---------- 渲染技能分组 ---------- */
function renderSkills() {
  document.getElementById("skillGroups").innerHTML = PROFILE.skills
    .map(function (g) {
      return (
        '<div class="skills__group">' +
        '<p class="skills__label">' + g.name + "</p>" +
        '<ul class="skills__items">' +
        g.items.map(function (it) { return "<li class=\"skills__item\">" + it + "</li>"; }).join("") +
        "</ul></div>"
      );
    })
    .join("");
}

/* ---------- 渲染项目列表 ---------- */
function renderProjects() {
  document.getElementById("projectList").innerHTML = PROJECTS.map(function (p, i) {
    var reverse = i % 2 === 1;
    var no = String(i + 1).padStart(2, "0");
    var stack = p.stack.map(function (s) { return "<li>" + s + "</li>"; }).join("");
    var link = p.link && p.link !== "#"
      ? '<a class="project__link" href="' + p.link + '" target="_blank" rel="noopener">查看项目 →</a>'
      : "";
    return (
      '<article class="project' + (reverse ? " project--reverse" : "") + '">' +
      '<div class="project__meta">' +
      '<span class="project__index">' + no + "</span>" +
      '<div class="project__facts">' +
      '<span class="project__cat">' + p.category + "</span>" +
      '<span class="project__date">' + p.date + "</span>" +
      "</div></div>" +
      '<div class="project__body">' +
      '<span class="project__tag">' + p.category + "</span>" +
      "<h3 class=\"project__title\">" + p.title + "</h3>" +
      '<p class="project__desc">' + p.desc + "</p>" +
      '<ul class="project__stack">' + stack + "</ul>" +
      link +
      "</div>" +
      '<figure class="project__media">' +
      '<img src="' + projectImage(p) + '" alt="' + p.title + ' 界面预览" loading="lazy">' +
      "</figure>" +
      "</article>"
    );
  }).join("");
}

/* ---------- 导航高亮（滚动监听） ---------- */
function setupNavHighlight() {
  var navLinks = Array.prototype.slice.call(document.querySelectorAll(".side-nav__link"));
  var sections = navLinks.map(function (link) {
    return document.querySelector(link.getAttribute("href"));
  });

  function update() {
    // 以视口 35% 高度处为当前阅读位置
    var pos = window.scrollY + window.innerHeight * 0.35;
    var currentId = sections[0] ? sections[0].id : "";

    sections.forEach(function (sec) {
      if (sec && sec.offsetTop <= pos) currentId = sec.id;
    });

    navLinks.forEach(function (link) {
      link.classList.toggle("active", link.getAttribute("href") === "#" + currentId);
    });
  }

  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
  update();
}

/* ---------- 移动端汉堡菜单 ---------- */
function setupNavToggle() {
  var sidebar = document.getElementById("sidebar");
  var toggle = document.getElementById("navToggle");

  toggle.addEventListener("click", function () {
    var open = sidebar.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", open);
  });

  // 点击导航链接后自动收起菜单
  document.querySelectorAll(".side-nav__link").forEach(function (link) {
    link.addEventListener("click", function () {
      sidebar.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

/* ---------- 主题切换（浅色 / 深色） ---------- */
var THEME_KEY = "portfolio-theme";

function readStoredTheme() {
  try {
    return localStorage.getItem(THEME_KEY);
  } catch (e) {
    return null; // 隐私模式等场景下 localStorage 不可用
  }
}

/* 应用主题：同步切换 data-theme、图标与无障碍文案 */
function applyTheme(theme) {
  var isDark = theme === "dark";
  document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");

  var toggle = document.getElementById("themeToggle");
  if (toggle) {
    var label = isDark ? "切换到浅色主题" : "切换到深色主题";
    toggle.setAttribute("aria-pressed", String(isDark));
    toggle.setAttribute("aria-label", label);
    toggle.setAttribute("title", label);
  }
}

function setupThemeToggle() {
  var toggle = document.getElementById("themeToggle");
  if (!toggle) return;

  toggle.addEventListener("click", function () {
    var next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
    applyTheme(next);
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch (e) {
      /* 忽略写入失败，不影响本次切换 */
    }
  });
}

/* 脚本位于 body 末尾，此处立即应用已保存主题，避免等待 DOMContentLoaded */
applyTheme(readStoredTheme() === "dark" ? "dark" : "light");

/* ---------- 初始化 ---------- */
document.addEventListener("DOMContentLoaded", function () {
  renderProfile();
  renderSkills();
  renderProjects();
  setupNavHighlight();
  setupNavToggle();
  setupThemeToggle();
  document.getElementById("year").textContent = new Date().getFullYear();
});
