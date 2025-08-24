### 什么是 VitePress？

**VitePress** 是一个基于 **Vite** 和 **Vue 3** 构建的静态网站生成器（SSG），主要用于构建 **快速、轻量、现代化的文档网站**。它由 Vue 团队开发，是 VuePress 的继任者，但使用了更现代的技术栈（Vite 而非 Webpack），因此具有更快的启动速度和热更新体验。

---

### VitePress 的主要作用

1. ✅ **快速生成静态文档网站**（如项目文档、API 文档、博客等）
2. ✅ **开箱即用的 Markdown 增强功能**（支持 Vue 组件嵌入、代码高亮、自定义容器等）
3. ✅ **极快的开发服务器启动和热更新**（得益于 Vite）
4. ✅ **主题系统灵活**，支持自定义布局和组件
5. ✅ **支持多语言、侧边栏、导航栏、搜索等功能**
6. ✅ **易于部署**（可部署到 GitHub Pages、Vercel、Netlify 等）

---

### 如何使用 VitePress（使用 Bun 作为包管理器）

虽然 VitePress 官方推荐使用 npm / yarn / pnpm，但 **Bun 完全兼容 npm 生态**，因此你可以无缝使用 Bun 来管理依赖。

以下是使用 **Bun** 搭建 VitePress 项目的完整步骤：

---

#### ✅ 步骤 1：创建项目目录

```bash
mkdir -p my-project/docs
cd my-project/docs
```

初始化项目（使用 Bun）：

```bash
# vitepress 官方网站 https://vitepress.dev/zh/
# bun in it --yes
bun add -D vitepress@next

# 用户必须手动输入 docs 不要选默认，否则会之间在项目根目录创建，导致文件污染
bun vitepress init
```

这会生成 `package.json`。

---

#### ✅ 步骤 2：安装 VitePress

```bash
bun add -D vitepress
```

> `-D` 表示作为开发依赖安装。

你也可以同时安装 Vue（VitePress 内部已包含，但显式安装更稳妥）：

```bash
bun add vue
```

---

#### ✅ 步骤 3：创建基本目录结构

```
my-vitepress-docs/
├── docs/
│   ├── index.md
│   └── about.md
├── .vitepress/
│   └── config.js
└── package.json
```

创建这些文件：

```bash
mkdir docs .vitepress
```

创建 `docs/index.md`：

```md
# Hello VitePress

欢迎使用 VitePress！这是首页。
```

创建 `docs/about.md`：

```md
# 关于我们

这是一个关于页面。
```

---

#### ✅ 步骤 4：配置 `.vitepress/config.js`

```js
// .vitepress/config.js
export default {
  title: '我的文档站',
  description: '使用 VitePress 和 Bun 构建',
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '关于', link: '/about' }
    ],
    sidebar: [
      {
        text: '指南',
        items: [
          { text: '首页', link: '/' },
          { text: '关于', link: '/about' }
        ]
      }
    ]
  }
}
```

---

#### ✅ 步骤 5：添加脚本到 `package.json`

```json
{
  "scripts": {
    "docs:dev": "vitepress dev",
    "docs:build": "vitepress build",
    "docs:preview": "vitepress preview"
  }
}
```

---

#### ✅ 步骤 6：启动开发服务器

```bash
bun run docs:dev
```

> 默认会启动在 `http://localhost:5173`

🎉 你应该能看到你的文档网站已经运行！

---

#### ✅ 步骤 7：构建静态文件（用于部署）

```bash
bun run docs:build
```

输出文件在 `docs/.vitepress/dist` 目录下，可部署到 GitHub Pages、Vercel 等。

---

### 额外提示

- ✅ **Markdown 中使用 Vue 组件**：你可以在 `.md` 文件中直接使用 Vue 语法（需在配置中启用 `markdown` 选项）。
- ✅ **自定义主题**：在 `.vitepress/theme` 中创建自定义主题。
- ✅ **Bun 的优势**：Bun 比 npm/yarn 更快，安装和运行脚本都更迅速，非常适合 VitePress 这类现代工具。

---

### 参考文档

- VitePress 官网：[https://vitepress.dev](https://vitepress.dev)
- Bun 官网：[https://bun.sh](https://bun.sh)

---

### 总结

| 项目 | 说明 |
|------|------|
| **VitePress** | 快速、现代的文档生成工具，基于 Vite + Vue 3 |
| **Bun** | 高性能 JavaScript 运行时和包管理器，完全兼容 npm 包 |
| **组合使用** | ✅ 完全可行，且性能更优 |

你现在就可以用 Bun + VitePress 快速搭建一个漂亮、快速的文档网站了！🚀

如有需要，我可以帮你生成完整的项目模板。