# WPS AI 官网 Demo — 产品需求文档（PRD）

**版本：** v1.0  
**日期：** 2026-05-19  
**作者：** 产品团队  
**状态：** 草稿

---

## 目录

1. [产品概述](#1-产品概述)
2. [整体布局与视觉规范](#2-整体布局与视觉规范)
3. [路由规律与路径设计](#3-路由规律与路径设计)
4. [模块分布总览](#4-模块分布总览)
5. [模块间跳转关系](#5-模块间跳转关系)
6. [多语言实现方案](#6-多语言实现方案)
7. [各模块详细方案](#7-各模块详细方案)
   - 7.1 首页（Home）
   - 7.2 博客（Blog）
   - 7.3 百科（Encyclopedia）
   - 7.4 产品（Product）
   - 7.5 模板（Template）
   - 7.6 指南（Guide）
   - 7.7 文档中心（Docs）
   - 7.8 定价（Pricing）
   - 7.9 问答社区（Q&A / Answers）
8. [SEO 专项方案](#8-seo-专项方案)
   - 8.1 Sitemap 与索引入口治理
   - 8.2 hreflang 多语言标签规范
   - 8.3 全球访问性能与 CDN 优化
   - 8.4 图片资源优化
   - 8.5 页面级 SEO 信号
   - 8.6 结构化数据（Schema.org）
   - 8.7 内容质量与内链策略
9. [技术架构约束](#9-技术架构约束)
10. [验收标准](#10-验收标准)

---

## 1. 产品概述

### 1.1 产品定位

WPS AI 官网 Demo 是一套基于 **React + Vite** 构建的前端单页应用（SPA），目的是向用户呈现 WPS AI 全产品线的品牌形象、功能介绍、内容营销和社区互动能力。其核心价值在于：

- **统一品牌入口**：汇聚博客、百科、模板、文档、定价、Q&A 社区等内容于一站
- **多语言覆盖**：支持 20 种语言区域（en-us、zh-cn、zh-tw、ja-jp、ko-kr、es-es、de-de、fr-fr 等），面向全球用户
- **SEO 驱动增长**：通过技术合规、内容结构化、站内链路优化，提升自然搜索流量
- **社区化互动**：以 Q&A 模块为核心，构建完整的知识问答生命周期闭环

### 1.2 技术栈

| 层次 | 技术选型 |
|------|---------|
| 框架 | React 18 + Vite |
| 样式 | Tailwind CSS |
| 路由 | Custom History API（`window.history.pushState` + `popstate`） |
| 数据 | 静态 JS 文件（`src/data/`），无后端 API |
| 国际化 | 离线翻译引擎（`translateOfflinePhrase` + `phraseExtensions`） |
| 构建 | Vite（生产构建为静态文件） |

### 1.3 目标用户

| 用户类型 | 使用场景 |
|---------|---------|
| 潜在客户 | 通过 Google 搜索进入，了解 WPS AI 产品功能与定价 |
| 现有用户 | 查阅帮助文档、教程指南、Q&A 社区 |
| 开发者 / 合作伙伴 | 查阅 API 文档、技术百科 |
| 内容消费者 | 阅读博客、下载模板、学习操作指南 |

---

## 2. 整体布局与视觉规范

### 2.1 页面结构

```
┌────────────────────────────────────────────────┐
│  全局 Header（固定顶部）                         │
│  Logo + 主导航（Blog/Encyclopedia/Product/...）  │
│  + 语言切换 + 登录/已登录状态                     │
├────────────────────────────────────────────────┤
│                                                │
│  主内容区（动态渲染，按 pageType 切换）           │
│                                                │
├────────────────────────────────────────────────┤
│  全局 Footer（Sticky）                          │
│  版权信息 + 快速链接 + 社交媒体                   │
└────────────────────────────────────────────────┘
```

### 2.2 Header 规范

- **Logo**：左对齐，点击跳转至当前语言首页 `/{locale}/`
- **主导航**：水平排列，当前活跃模块高亮。模块包括：首页、博客、百科、产品、模板、指南、文档、定价、问答
- **语言切换器**：右侧下拉菜单，切换后保持路径结构，仅替换 locale 段
- **登录状态**：
  - 未登录：显示「Sign In」按钮，点击触发虚拟登录弹窗
  - 已登录：显示用户头像占位 + 「已登录」文字，点击下拉显示「退出登录」

### 2.3 Footer 规范

- 全局 Footer 默认渲染
- **例外**：当百科详情叠层（Encyclopedia Overlay）打开时，Footer 隐藏，避免视觉干扰
- 包含：版权声明、快速导航链接、多语言声明

### 2.4 响应式断点

| 断点 | 宽度 | 适配策略 |
|------|------|---------|
| mobile | < 768px | 汉堡菜单，单列布局 |
| tablet | 768px – 1024px | 两列布局，精简导航 |
| desktop | > 1024px | 完整导航，多列卡片布局 |

---

## 3. 路由规律与路径设计

### 3.1 路径命名约定

所有路由遵循 `/{locale}/{module}/{subpath}/` 模式：

```
/{locale}/                          # 首页
/{locale}/blog/                     # 博客列表
/{locale}/blog/{slug}/              # 博客详情（叠层 Overlay）
/{locale}/encyclopedia/             # 百科列表
/{locale}/encyclopedia/{slug}/      # 百科详情（叠层 Overlay）
/{locale}/product/                  # 产品页
/{locale}/template/                 # 模板列表
/{locale}/template/{slug}/          # 模板详情
/{locale}/guide/                    # 指南列表
/{locale}/guide/{category}/         # 指南分类
/{locale}/guide/{category}/{slug}/  # 指南详情
/{locale}/docs/                     # 文档中心列表
/{locale}/docs/{slug}/              # 文档详情（叠层 Overlay）
/{locale}/pricing/                  # 定价页
/{locale}/answers/                  # Q&A 首页
/{locale}/answers/{topicSlug}/      # Q&A 分类问题列表
/{locale}/answers/{topicSlug}/{questionSlug}/  # 问题详情
/{locale}/answers-ask/              # 发起提问页
```

### 3.2 Locale 段规范

| locale 值 | 对应语言 | 示例路径 |
|-----------|---------|---------|
| `en-us` | 英语（美国） | `/en-us/blog/` |
| `zh-cn` | 简体中文 | `/zh-cn/blog/` |
| `zh-tw` | 繁体中文 | `/zh-tw/blog/` |
| `ja-jp` | 日语 | `/ja-jp/blog/` |
| `ko-kr` | 韩语 | `/ko-kr/blog/` |
| `es-es` | 西班牙语 | `/es-es/blog/` |
| `de-de` | 德语 | `/de-de/blog/` |
| `fr-fr` | 法语 | `/fr-fr/blog/` |
| `pt-br` | 葡萄牙语（巴西） | `/pt-br/blog/` |
| `ar-sa` | 阿拉伯语 | `/ar-sa/blog/` |
| （其余 10 种） | … | … |

> **SEO 要求**：路由中的 locale 段需与 `<html lang="…">` 属性、`<link rel="alternate" hreflang="…">` 保持一致。

### 3.3 路由实现机制

- 使用 `window.history.pushState` 进行无刷新导航
- 监听 `popstate` 事件处理浏览器前进/后退
- `getPageType(path)` 函数解析当前路径，返回对应的页面类型标识
- 所有路径帮助函数统一命名为 `getLocale{Module}Path(locale, params)` 格式

---

## 4. 模块分布总览

| 模块 | 路径前缀 | 核心功能 | 数据来源 |
|------|---------|---------|---------|
| 首页 | `/{locale}/` | 品牌展示、功能亮点、CTA | `siteLocaleData.js` |
| 博客 | `/{locale}/blog/` | 文章列表、详情、标签过滤 | `blogData.js` |
| 百科 | `/{locale}/encyclopedia/` | 术语解释、分类浏览 | `encyclopediaData.js` |
| 产品 | `/{locale}/product/` | 产品功能介绍、对比 | `siteLocaleData.js` |
| 模板 | `/{locale}/template/` | 模板浏览、下载 | `siteLocaleData.js` |
| 指南 | `/{locale}/guide/` | 操作教程、分类导航 | `siteLocaleData.js` |
| 文档 | `/{locale}/docs/` | 技术文档、API 参考 | `docsCenterMeta.js` |
| 定价 | `/{locale}/pricing/` | 套餐对比、购买引导 | `siteLocaleData.js` |
| 问答社区 | `/{locale}/answers/` | 提问、回答、投票、举报 | `App.jsx`（内联数据）|

---

## 5. 模块间跳转关系

### 5.1 "下一步行动"（Next Steps）跳转

各模块通过 `moduleJourneyConfigs` 配置，在内容底部提供跨模块推荐链接，实现用户旅程的自然延伸：

```
博客文章  →  相关百科词条 / 产品页 / 模板页
百科词条  →  相关博客 / 指南
产品页    →  定价页 / 模板页 / 指南
指南      →  文档中心 / Q&A 社区
定价页    →  产品页 / 免费试用（外链）
Q&A 社区  →  文档中心 / 指南
```

### 5.2 全局搜索跳转

Header 搜索框（如实现）支持跨模块搜索，结果按模块分组展示，点击直接跳转对应路径。

### 5.3 面包屑导航

详情页（博客、百科、文档、Q&A 问题详情）提供面包屑导航：

```
首页 > 模块名称 > （分类名称）> 当前页标题
```

面包屑链接对 SEO 有正向价值，同时提供结构化数据（BreadcrumbList Schema）。

### 5.4 标签/分类内链

- 博客标签点击 → 跳转博客标签筛选页
- 百科分类点击 → 跳转百科该分类列表
- Q&A 分类卡片点击 → 跳转该分类问题列表页

---

## 6. 多语言实现方案

### 6.1 语言检测与匹配

1. 从 URL 路径第一段提取 locale（如 `en-us`）
2. 通过 `localeToContentLanguageMap` 映射为内容语言（如 `en`）
3. 内容语言通过 `contentLanguageFallbackMap` 进行 fallback（大多数语言 fallback 到 `en`，`zh-tw` fallback 到 `zh`）

### 6.2 翻译体系

| 翻译层级 | 覆盖范围 | 实现方式 |
|---------|---------|---------|
| UI 文本 | 按钮、标签、提示语等 | `uiText.js` / `siteLocaleData.js` 中的 `*UiByLanguage` 对象 |
| 内容标题/摘要 | 博客、百科、模板等内容元数据 | `blogData.js`、`encyclopediaData.js` 等按语言提供原生内容 |
| 通用短语 | 产品功能描述等通用文本 | `translateOfflinePhrase()` + `offlinePhraseTranslations.js` |
| 扩展短语 | 各语言特有表达 | `phraseExtensions/*.json`（支持 ar、de、es、fr、id、it、ms、nl、pl、pt、ru、th、tr、vi） |
| 修复补丁 | 已知翻译错误修正 | `offlinePhraseTranslationRepairs.js` |

### 6.3 中文内容特殊处理

- `isZhContent` 标志位：当语言为 `zh` 或 `zh-tw` 时为 `true`
- 中文内容直接展示中文原文（博客、百科、Q&A 中文数据）
- 非中文内容通过翻译引擎处理英文源文

### 6.4 语言切换 UX

- 语言切换时，保持当前模块路径不变，仅替换 locale 段
- 若目标语言无对应内容（如某博客仅有英文版），则回退至英文内容并在页面顶部提示
- 语言切换下拉菜单按地区分组展示（亚太、欧洲、美洲等）

### 6.5 多语言 SEO 合规（详见第 8 章）

- 每个页面在 `<head>` 中输出完整的 `hreflang` alternate 标签组
- 所有语言版本互相引用（形成完整的语言簇）
- 包含 `x-default` 指向英文首页

---

## 7. 各模块详细方案

### 7.1 首页（Home）

**路径**：`/{locale}/`

**核心内容区块**：

1. **Hero 区**：主标题 + 副标题 + CTA 按钮（「免费试用」/「了解更多」）+ 主视觉图
2. **功能亮点区**：三列或四列卡片，每卡含图标、标题、简介
3. **产品截图区**：展示核心 AI 功能截图（Writer、Spreadsheets、PDF AI 等）
4. **用户评价区**：引用真实用户评语（结构化数据：Review Schema）
5. **合作品牌区**：Logo 墙展示（无文字，纯视觉信任背书）
6. **底部 CTA 区**：再次引导转化

**交互**：
- Header 登录按钮：触发虚拟登录弹窗
- CTA 按钮：跳转产品页或外部注册链接

**SEO 关键点**：
- `<title>`：「WPS AI - AI-Powered Office Suite | {语言区域名称}」
- `<meta description>`：包含核心关键词（AI office、document AI、WPS AI）
- Hero 主图使用 `<picture>` + `srcset`，配置 `loading="eager"` + `fetchpriority="high"`（详见 8.4）
- 首页 Schema：`Organization` + `WebSite` + `SiteLinksSearchBox`

---

### 7.2 博客（Blog）

**路径**：`/{locale}/blog/`（列表）、`/{locale}/blog/{slug}/`（详情叠层）

**功能需求**：

**列表页**：
- 文章卡片：封面图、标题、摘要（前 120 字）、发布日期、标签、阅读时长
- 标签筛选栏：点击标签过滤文章列表（支持 URL 参数 `?tag=xxx` 持久化）
- 分页或无限滚动
- 搜索框：在列表页内搜索文章标题 + 摘要

**详情页（叠层 Overlay）**：
- 全屏叠层展示，背景页不卸载（保留滚动位置）
- 内容区：标题、副标题、正文（Markdown 渲染）、标签
- 内链段落：`linkifyBlogParagraph()` 自动将关键词链接至相关博客/百科
- 「下一步」模块：推荐相关文章 + 跨模块推荐（模板、指南）
- 关闭按钮：叠层关闭，URL 回退至列表页

**数据结构（`blogData.js`）**：
```js
{
  slug: 'article-slug',
  title: { en: '...', zh: '...', ja: '...', ko: '...' },
  excerpt: { en: '...', zh: '...' },
  content: { en: '...', zh: '...' },
  tags: ['AI', 'Writing'],
  publishedAt: '2026-01-15',
  readingTime: 5, // minutes
}
```

**SEO 关键点**：
- 详情页 `<title>`：「{文章标题} | WPS AI Blog」
- `<meta description>`：取 excerpt 前 155 字
- `<link rel="canonical">` 指向详情页绝对路径
- 结构化数据：`Article` Schema（含 `datePublished`、`author`、`image`）
- 图片使用 WebP 格式 + `alt` 属性描述图片内容

---

### 7.3 百科（Encyclopedia）

**路径**：`/{locale}/encyclopedia/`（列表）、`/{locale}/encyclopedia/{slug}/`（详情叠层）

**功能需求**：

**列表页**：
- 字母索引导航（A-Z）：点击快速定位至该字母组
- 分类筛选：按功能分类（AI 功能、文档处理、协作等）
- 搜索框：实时过滤词条名称

**详情页（叠层 Overlay）**：
- 词条标题、定义（一句话）、详细解释
- 相关词条推荐（内链到其他百科词条）
- 延伸阅读（链接到相关博客文章）
- Footer 隐藏（`isEncyclopediaOverlayOpen` 时）

**数据结构（`encyclopediaData.js`）**：
```js
{
  slug: 'ai-writing-assistant',
  title: { en: '...', zh: '...' },
  definition: { en: '...' },
  content: { en: '...' },
  category: 'ai-features',
  relatedSlugs: ['natural-language-processing', 'smart-suggestions'],
}
```

**SEO 关键点**：
- `<title>`：「{词条名称} - WPS AI Encyclopedia」
- 结构化数据：`DefinedTerm` Schema
- 百科词条具有高度的长尾关键词价值，应确保每个词条有独立的可索引 URL
- `<link rel="canonical">` 指向规范叠层路径

---

### 7.4 产品（Product）

**路径**：`/{locale}/product/`

**功能需求**：

- **产品矩阵展示**：WPS Writer AI、WPS Spreadsheets AI、WPS PDF AI、WPS Presentation AI
- 每个产品：功能亮点（3-5 条）、截图/演示 GIF、核心 Use Case
- **功能对比表**：WPS AI vs 竞品（Microsoft Office、Google Docs）
- **CTA 按钮**：「免费试用」→ 注册页、「查看定价」→ 定价模块

**SEO 关键点**：
- `<title>`：「WPS AI Products - AI-Powered Document Suite | WPS」
- 结构化数据：`SoftwareApplication` Schema（每个产品一条）
- 功能对比区使用语义化 `<table>` 标签，利于搜索引擎抓取结构化对比信息
- 产品截图使用有意义的 `alt` 属性（如「WPS AI Writer 智能写作功能截图」）

---

### 7.5 模板（Template）

**路径**：`/{locale}/template/`（列表）、`/{locale}/template/{slug}/`（详情）

**功能需求**：

**列表页**：
- 模板卡片网格（3-4 列）：封面预览图、模板名称、分类标签、下载量
- 分类筛选：文档、表格、演示文稿、PDF
- 排序：最新、最热门、编辑推荐
- 搜索：模板名称 + 描述

**详情页**：
- 模板预览（大图）
- 描述、使用场景、适用版本
- 下载按钮（链接至实际文件或外部）
- 相关模板推荐

**SEO 关键点**：
- `<title>`：「{模板名称} 免费下载 | WPS AI 模板」
- 结构化数据：`CreativeWork` Schema（含 `fileFormat`、`downloadUrl`）
- 模板列表分页深页面（page=2、page=3 等）配置 `canonical` 指向主列表页，避免薄内容被判定 Soft 404

---

### 7.6 指南（Guide）

**路径**：`/{locale}/guide/`（首页）、`/{locale}/guide/{category}/`（分类）、`/{locale}/guide/{category}/{slug}/`（详情）

**功能需求**：

**首页**：
- 分类卡片（6-8 个）：图标、分类名称、文章数量
- 热门指南推荐（3 篇）
- 搜索框

**分类页**：
- 该分类下所有指南列表
- 二级分类过滤（如「AI 功能」→「智能写作」、「语法检查」）

**详情页**：
- 步骤化内容（Step 1、Step 2…）
- 截图辅助（使用 `<figure>` + `<figcaption>`）
- 相关指南推荐
- 问题反馈入口（链接至 Q&A 社区）

**SEO 关键点**：
- 结构化数据：`HowTo` Schema（适用于步骤类指南）
- `<title>`：「如何{操作描述} | WPS AI 指南」
- 指南内容使用正确标题层级（`h1` → `h2` → `h3`）

---

### 7.7 文档中心（Docs）

**路径**：`/{locale}/docs/`（列表）、`/{locale}/docs/{slug}/`（详情叠层）

**功能需求**：

**列表页**：
- 分类导航：快速入门、API 参考、SDK 文档、更新日志
- 版本选择器（如支持多版本）
- 搜索框（仅搜索文档内容）

**详情页（叠层 Overlay，组件 `DocsCenterPage.jsx`）**：
- 左侧目录树（固定）
- 右侧内容（Markdown 渲染）
- 代码块高亮
- 「反馈」链接 → Q&A 社区

**SEO 关键点**：
- 技术文档具有高权威性信号，保证每篇文档有独立 URL 和完整 `<title>` / `<meta description>`
- 结构化数据：`TechArticle` Schema
- 确保文档叠层 URL 对爬虫可见（使用 `pushState` 更新 URL）

---

### 7.8 定价（Pricing）

**路径**：`/{locale}/pricing/`

**功能需求**：

- **套餐卡片**：免费版、专业版、企业版（含月付/年付切换）
- **功能对比表**：各套餐功能清单（语义化 `<table>`）
- **FAQ 区**：常见定价问题（使用 `<details>` + `<summary>` 或手风琴组件）
- **CTA 按钮**：「立即购买」→ 外部结账链接

**SEO 关键点**：
- `<title>`：「WPS AI 定价 - 选择适合您的套餐 | WPS」
- 结构化数据：`FAQPage` Schema（FAQ 区域）
- 定价页为高商业意图页面，确保加载速度（LCP < 2.5s），提升转化率
- 月付/年付切换使用 JavaScript 切换，不改变 URL（避免产生重复内容问题）

---

### 7.9 问答社区（Q&A / Answers）

**路径体系**：
```
/{locale}/answers/                           # Q&A 首页
/{locale}/answers/{topicSlug}/              # 分类问题列表
/{locale}/answers/{topicSlug}/{questionSlug}/  # 问题详情
/{locale}/answers-ask/                       # 发起提问
```

#### 7.9.1 Q&A 首页

**布局**：
- 顶部操作栏（两行并排）：
  - 第一行：搜索框（按分类名搜索） + 「Ask a Question」按钮
  - 第二行：「My Questions」、「My Likes」、「My Replies」按钮（需登录）
- 分类卡片网格：所有主题分类（含「Other」作为最后一项）
- 点击分类卡片 → 跳转至该分类的问题列表页

**分类卡片数据**：每张卡片显示分类名称、问题数量、代表性 icon，末尾固定「Other（其他）」分类。

**「My *」面板**：
- 点击「My Questions」：展开内联面板，列出当前用户发布的问题（支持查看/删除）
- 点击「My Likes」：展开内联面板，列出已点赞问题（支持查看/取消点赞）
- 点击「My Replies」：展开内联面板，列出已发布回复（支持查看/删除）
- 三个面板互斥，同时只展示一个

#### 7.9.2 分类问题列表页（Forum）

**布局**：
- 移除左侧 Sidebar 过滤器
- 顶部：分类标题 + 问题数量 + 搜索框（按问题标题搜索）
- Tab 排序栏：「Latest」｜「Most Voted」｜「Unanswered」｜「Official Replies」
- 问题卡片列表：每张卡片含标题、摘要、投票数、回复数、发布者、时间、标签
- 卡片间有明显间距

**问题卡片展开规则**：
- 默认展示前 2 条回复（优先展示官方回复或最高赞）
- 超过 2 条时显示「显示更多回复」展开按钮

#### 7.9.3 问题详情页

**布局**：
- 顶部：「← 返回列表」面包屑
- 问题主体：标题、正文、发布者、发布时间、所属分类标签
- 问题点赞（❤ 数量）：已登录可点赞，点赞后心形变红
- 回答列表：
  - 每条回答：作者名、发布时间、内容正文
  - 官方回答：绿色「Official」徽章（仅官方账号的回答有此标识）
  - 已采纳回答：蓝色「Accepted」徽章
  - 每条回答可点赞（❤）/ 举报（🚩）
- 发布回答表单：Textarea + 「Post Answer」按钮（需登录）
- 举报弹窗：选择举报原因 + 提交

#### 7.9.4 提问页（Ask）

**布局**：
- 分类选择器（下拉）：默认选中当前分类（从列表页进入时），或默认第一个分类（从首页进入时），含「Other」选项
- 问题标题输入框（required）
- 问题详情 Textarea（可选）
- 「Publish」按钮：提交后在本地创建 draft 问题并跳转至其详情页
- 「Cancel」按钮：返回上一页

#### 7.9.5 登录弹窗

**触发条件**：点赞、提问、回答时，若未登录，弹出此弹窗。

**内容**：
- 标题：「Sign in to WPS Account」
- 描述：「Please sign in to use community features…」
- 按钮：「Sign In」（虚拟登录，设置 `isLoggedIn = true`） + 「Cancel」
- 登录成功后执行之前触发的挂起操作（`loginModalPendingAction`）

**登录态变化**：
- Header 右上角从「Sign In」变为「已登录」状态（含退出按钮）
- 登录态仅在会话内有效（页面刷新后重置）

#### 7.9.6 Q&A 数据结构

```js
// 问题
{
  id: 'q-001',
  slug: 'how-to-batch-replace-toc',
  title: '如何批量替换目录页码？',
  questionBody: '详细描述...',
  topic: 'WPS Writer · 目录与样式',
  topicSlug: 'wps-writer',
  author: '用户名',
  authorType: 'community', // 'official' | 'community'
  createdAt: '2026-01-10',
  updatedAt: '2026-01-15',
  votes: 23,
  badge: 'official', // 'official' | 'popular' | null
  answers: [Answer],
}

// 回答
{
  id: 'a-001',
  author: 'WPS 支持工程师 · Lina',
  authorType: 'official', // 'official' | 'community'
  body: '回答内容...',
  likes: 19,
  isAccepted: false,
  officialTags: ['verified'],
  createdAt: '2026-01-11',
}
```

**SEO 关键点**：
- Q&A 问题详情页：`<title>` 为「{问题标题} | WPS AI 问答社区」
- 结构化数据：`QAPage` Schema（含 `acceptedAnswer`、`suggestedAnswer`）
- 分类列表页：`<title>` 为「{分类名} 相关问题 | WPS AI 问答社区」
- 用户动态生成的 Draft 问题（本地 state）不应被搜索引擎收录，建议生产环境加 `noindex`

---

## 8. SEO 专项方案

> 本章基于《WPS AI 国际站 SEO 技术基建分析报告》（SEO.doc）中识别的问题点，结合本 Demo 架构，提出具体的实施方案。

### 8.1 Sitemap 与索引入口治理

#### 8.1.1 问题识别（源自 SEO.doc 第 4.1 节）

SEO.doc 揭示了生产环境以下问题（Demo 中需提前预防）：

| 问题 | 影响 |
|------|------|
| Sitemap 结构不匹配（`urlset` 误用为索引型） | 搜索引擎无法稳定识别下级 Sitemap |
| Sitemap 中含 274 条异常 URL（404、5xx、重定向） | 浪费抓取预算，稀释内容质量 |
| GSC 提交混乱（35 个 URL 中 24 个有问题） | 影响 Google 对站点结构的稳定识别 |
| 已抓取未收录 URL 增至 111,584 条 | 大量低价值 URL 消耗爬虫资源 |

#### 8.1.2 Demo 实施方案

**Sitemap 生成规则**（Demo 阶段建议使用 Vite 构建插件或静态脚本生成）：

```xml
<!-- /sitemap.xml（索引型） -->
<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap><loc>https://demo.wpsai.com/sitemap-pages.xml</loc></sitemap>
  <sitemap><loc>https://demo.wpsai.com/sitemap-blog.xml</loc></sitemap>
  <sitemap><loc>https://demo.wpsai.com/sitemap-encyclopedia.xml</loc></sitemap>
  <sitemap><loc>https://demo.wpsai.com/sitemap-qa.xml</loc></sitemap>
</sitemapindex>
```

**Sitemap 内容规范**：
- 每个 URL 必须返回 HTTP 200（上线前全量扫描验证）
- 不包含测试页面、接口 URL、参数化分页深页（超过第 3 页的分页页）
- Q&A 用户动态创建的 Draft 问题不写入 Sitemap
- 每条 URL 包含 `<lastmod>`（取数据最后更新时间）

**优先级设置**：
```xml
<url>
  <loc>https://demo.wpsai.com/en-us/</loc>
  <priority>1.0</priority>
  <changefreq>daily</changefreq>
</url>
<url>
  <loc>https://demo.wpsai.com/en-us/blog/ai-writing-tips/</loc>
  <priority>0.8</priority>
  <changefreq>monthly</changefreq>
</url>
```

**robots.txt 规范**：
```
User-agent: *
Allow: /
Disallow: /api/
Disallow: /*.json$
Disallow: /assets/

Sitemap: https://demo.wpsai.com/sitemap.xml
```

---

### 8.2 hreflang 多语言标签规范

#### 8.2.1 问题识别（源自 SEO.doc 第 4.2 节）

生产环境中 `ja-JP` 和 `tr-TR` 页面存在 hreflang 路径错误拼接问题：所有语言版本的 URL 都被错误追加了 `/ja-JP/` 或 `/tr-TR/` 路径，导致多语言互指关系断裂。

#### 8.2.2 Demo 正确实现方案

**hreflang 生成原则**：

1. 每个语言版本页面输出**同一组完整的** hreflang 标签
2. 每条 hreflang 指向该语言的**固定规范 URL**，不拼接当前页面路径
3. 包含 `x-default` 指向英文默认版本

**标准实现（`<head>` 内）**：

```html
<!-- 以 /en-us/blog/ 为例，所有语言版本均输出此完整组 -->
<link rel="alternate" hreflang="en" href="https://demo.wpsai.com/en-us/blog/" />
<link rel="alternate" hreflang="zh-Hans" href="https://demo.wpsai.com/zh-cn/blog/" />
<link rel="alternate" hreflang="zh-Hant" href="https://demo.wpsai.com/zh-tw/blog/" />
<link rel="alternate" hreflang="ja" href="https://demo.wpsai.com/ja-jp/blog/" />
<link rel="alternate" hreflang="ko" href="https://demo.wpsai.com/ko-kr/blog/" />
<link rel="alternate" hreflang="es" href="https://demo.wpsai.com/es-es/blog/" />
<link rel="alternate" hreflang="de" href="https://demo.wpsai.com/de-de/blog/" />
<link rel="alternate" hreflang="fr" href="https://demo.wpsai.com/fr-fr/blog/" />
<link rel="alternate" hreflang="pt-BR" href="https://demo.wpsai.com/pt-br/blog/" />
<link rel="alternate" hreflang="ar" href="https://demo.wpsai.com/ar-sa/blog/" />
<link rel="alternate" hreflang="x-default" href="https://demo.wpsai.com/en-us/blog/" />
```

**错误示例（必须避免）**：
```html
<!-- ❌ 错误：将当前 locale 路径拼接到其他语言 URL 后 -->
<link rel="alternate" hreflang="en" href="https://demo.wpsai.com/en-us/ja-jp/" />
```

**代码实现建议**（`App.jsx` 中）：

```js
// 使用静态映射表，而非动态拼接
const hreflangMap = {
  'en':    `${baseUrl}/en-us${canonicalPath}`,
  'zh-Hans': `${baseUrl}/zh-cn${canonicalPath}`,
  'zh-Hant': `${baseUrl}/zh-tw${canonicalPath}`,
  'ja':    `${baseUrl}/ja-jp${canonicalPath}`,
  'ko':    `${baseUrl}/ko-kr${canonicalPath}`,
  // ... 其余语言
  'x-default': `${baseUrl}/en-us${canonicalPath}`,
}
// canonicalPath = 当前路径去掉 locale 段后的公共路径
// 例如 /en-us/blog/article-slug/ → /blog/article-slug/
```

---

### 8.3 全球访问性能与 CDN 优化

#### 8.3.1 问题识别（源自 SEO.doc 第 4.3.1 节）

| 问题 | 数据 |
|------|------|
| 裸域 `wps.com` 单点 IPv4，无全球就近调度 | 仅解析至 190.92.221.14 |
| HTTPS 裸域跳转全球中位耗时 | 717.9ms，P90 达 1125.4ms |
| 巴西、欧洲等区域耗时严重 | 最大值 2100.1ms |

#### 8.3.2 Demo 及生产环境实施方案

**Demo 阶段（静态托管）**：
- 建议将 Demo 部署至支持全球边缘节点的平台（Cloudflare Pages / Vercel / Netlify）
- 自动获得全球 PoP 分发 + HTTPS + HTTP/2 支持

**生产环境优化方向**：

```
优化前：用户 → wps.com（单点） → 301 → www.wps.com（CloudFront）
优化后：用户 → wps.com（CDN 边缘 PoP，就近）→ 301（边缘即时返回）→ www.wps.com（CloudFront）
```

| 优化项 | 方案 |
|-------|------|
| 裸域 CDN 接入 | 使用支持 Apex 域名的 CDN（Cloudflare CNAME Flattening / AWS Route53 ALIAS） |
| IPv6 支持 | 裸域开启 AAAA 记录 |
| 重定向在边缘完成 | 使用 CDN Edge Rules/Functions 返回 301，不回源 |
| 监控 | 建立 TTFB + 重定向耗时 + 地区分布监控 |

**核心指标目标**：

| 指标 | 目标值 |
|------|-------|
| 裸域首跳 TTFB（全球中位） | < 200ms |
| LCP（首页） | < 2.5s（Core Web Vitals 良好档） |
| FID / INP | < 100ms |
| CLS | < 0.1 |

---

### 8.4 图片资源优化

#### 8.4.1 问题识别（源自 SEO.doc 第 4.3.2 节）

| 问题 | 数据 |
|------|------|
| 首屏主视觉图体积偏大 | PNG 约 549KB，拖慢 LCP |
| 无响应式图片配置 | 未使用 `<picture>`、`srcset`、`sizes` |
| 现代格式支持不足 | 运行时未发现 WebP / AVIF 响应 |
| 懒加载覆盖不完整 | 132 张非首屏图未配置懒加载 |

#### 8.4.2 Demo 实施方案

**图片格式分层策略**（参考 Microsoft 官网实践）：

```html
<!-- ✅ 标准实现：AVIF → WebP → PNG 格式降级 + 多尺寸响应式 -->
<picture>
  <source
    type="image/avif"
    srcset="
      /images/hero-320.avif 320w,
      /images/hero-640.avif 640w,
      /images/hero-1280.avif 1280w
    "
    sizes="(max-width: 768px) 100vw, 50vw"
  />
  <source
    type="image/webp"
    srcset="
      /images/hero-320.webp 320w,
      /images/hero-640.webp 640w,
      /images/hero-1280.webp 1280w
    "
    sizes="(max-width: 768px) 100vw, 50vw"
  />
  <img
    src="/images/hero-1280.png"
    alt="WPS AI 智能文档处理界面展示"
    width="1280"
    height="720"
    loading="eager"
    fetchpriority="high"
  />
</picture>
```

**各设备优先加载尺寸**：

| 设备类型 | 视口宽度 | 优先加载尺寸 |
|---------|---------|------------|
| 移动端 | < 480px | 320w / 480w |
| 平板 | 480px – 1024px | 640w |
| 桌面端 | > 1024px | 800w – 1280w |

**懒加载规范**：

```html
<!-- ✅ 首屏图片：eager + 高优先级 -->
<img src="..." loading="eager" fetchpriority="high" />

<!-- ✅ 非首屏图片：统一懒加载 -->
<img src="..." loading="lazy" />
```

**Vite 构建集成方案**：
- 使用 `vite-plugin-imagemin` 或 `@squoosh/lib` 在构建时生成多格式多尺寸图片
- 所有图片输出至 `/dist/images/` 并自动注入 `<picture>` 标签

---

### 8.5 页面级 SEO 信号

每个页面需通过 React `useEffect` 动态更新 `<head>` 内容（或使用 `react-helmet-async`）：

#### 8.5.1 标题（`<title>`）规范

| 模块 | 格式 |
|------|------|
| 首页 | `WPS AI - AI-Powered Office Suite` |
| 博客列表 | `WPS AI Blog - Tips, Guides & Updates` |
| 博客详情 | `{文章标题} \| WPS AI Blog` |
| 百科详情 | `{词条名称} - AI Office Glossary \| WPS` |
| 产品页 | `WPS AI Products - AI Document Tools` |
| Q&A 首页 | `WPS AI Community Q&A - Ask & Answer` |
| Q&A 问题详情 | `{问题标题} \| WPS AI Community` |
| 定价页 | `WPS AI Pricing - Plans & Features` |

**通用规则**：
- 长度控制在 50-60 字符
- 核心关键词靠前
- 避免关键词堆砌

#### 8.5.2 描述（`<meta description>`）规范

- 长度控制在 120-155 字符
- 包含核心关键词 + 价值主张 + 行动号召
- 博客/百科/Q&A 详情页取内容摘要前 150 字

#### 8.5.3 Canonical 规范

```html
<!-- 每个页面都需要 canonical，指向该页面的绝对 URL -->
<link rel="canonical" href="https://demo.wpsai.com/en-us/blog/ai-writing-tips/" />
```

**特殊场景**：
- 模板分页（`?page=2`）的 canonical 指向无参数的列表主页
- 博客标签筛选页（`?tag=ai`）根据内容重要性决定是否使用 canonical 或 noindex

---

### 8.6 结构化数据（Schema.org）

| 页面 | Schema 类型 | 关键字段 |
|------|------------|---------|
| 首页 | `Organization` | name, url, logo, sameAs（社交媒体） |
| 首页 | `WebSite` + `SiteLinksSearchBox` | url, potentialAction |
| 博客详情 | `Article` | headline, datePublished, author, image |
| 百科词条 | `DefinedTerm` | name, description, inDefinedTermSet |
| 指南详情 | `HowTo` | name, step（每个步骤含 name + text + image） |
| Q&A 问题详情 | `QAPage` | mainEntity: Question（含 acceptedAnswer / suggestedAnswer） |
| 定价 FAQ | `FAQPage` | mainEntity: Question + acceptedAnswer |
| 产品页 | `SoftwareApplication` | name, operatingSystem, applicationCategory, offers |
| 模板详情 | `CreativeWork` | name, fileFormat, downloadUrl, author |

**Q&A Schema 示例**：

```json
{
  "@context": "https://schema.org",
  "@type": "QAPage",
  "mainEntity": {
    "@type": "Question",
    "name": "多语言文档批量替换品牌词后，目录页码错位怎么处理？",
    "answerCount": 2,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "推荐修复顺序：1. 关闭"显示修订"模式...",
      "upvoteCount": 19,
      "author": { "@type": "Person", "name": "WPS 支持工程师 · Lina" }
    },
    "suggestedAnswer": {
      "@type": "Answer",
      "text": "文档含分节符时需逐节更新目录...",
      "upvoteCount": 7
    }
  }
}
```

---

### 8.7 内容质量与内链策略

#### 8.7.1 内容质量保障

| 原则 | 具体措施 |
|------|---------|
| 避免薄内容 | 博客文章正文 > 500 字，百科词条 > 200 字，Q&A 问题详情 > 100 字 |
| 避免重复内容 | 同一内容不同语言版本通过 hreflang 区分，不同路径同内容使用 canonical |
| 内容时效性 | 博客/指南包含 `datePublished` 和 `dateModified`，定期更新 |
| 原创性 | Q&A 用户生成内容（UGC）通过举报机制进行内容治理 |

#### 8.7.2 内链网络构建

**`linkifyBlogParagraph()` 自动内链规则**：

```js
// 在博客正文中自动识别关键词并链接至对应百科词条或相关博客
// 规则：
// 1. 匹配encyclopediaData中的term名称 → 链接至 /{locale}/encyclopedia/{slug}/
// 2. 匹配blogData中的标题关键词 → 链接至 /{locale}/blog/{slug}/
// 3. 每篇文章同一词汇最多链接 1 次，避免过度内链
```

**模块间推荐链路（`moduleJourneyConfigs`）**：

```
博客文章末尾 → 推荐：相关百科词条 × 2 + 相关模板 × 1
百科词条末尾 → 推荐：相关操作指南 × 1 + 相关博客 × 1
指南末尾     → 推荐：相关文档 × 1 + Q&A 社区链接
Q&A 回答区   → 推荐：相关文档 / 指南
```

**内链密度建议**：
- 每篇博客 2-5 条内链
- 每个百科词条 1-3 条内链
- 避免导航链接（Header/Footer）在权重计算中占比过大

#### 8.7.3 防止低价值 URL 暴露

| 场景 | 方案 |
|------|------|
| Q&A Draft 问题（仅前端 state） | 不写入 Sitemap，不对外链接 |
| 模板分页深页（> page 3） | canonical 指向主列表页 |
| 测试/预览路径 | `robots.txt` Disallow + `<meta name="robots" content="noindex">` |
| 用户个人面板（My Questions 等） | 不对外暴露独立 URL，使用内联面板展示 |

---

## 9. 技术架构约束

### 9.1 SPA 与 SEO 的核心矛盾

本项目为 CSR（客户端渲染）SPA，存在以下 SEO 限制：

| 限制 | 影响 | 缓解方案 |
|------|------|---------|
| JavaScript 渲染依赖 | 搜索引擎需执行 JS 才能获取内容 | 关键内容在首次 HTML 中可见（避免纯 JS 渲染） |
| `<head>` 动态更新 | 爬虫可能抓取默认 title | 使用 `react-helmet-async` 确保 SSR 时 head 正确 |
| 无 SSR/SSG | 无法输出预渲染 HTML | Demo 阶段可接受；生产环境建议迁移至 Next.js |

### 9.2 Demo 阶段 SEO 可行性

Demo 为纯静态 SPA，以下 SEO 措施在 Demo 阶段即可实施：

✅ 可实施：
- `<title>`、`<meta description>` 动态更新（通过 `document.title` + `document.querySelector('meta[name=description]')` 在路由变化时更新）
- `<link rel="canonical">` 动态注入
- hreflang 标签组动态生成
- 结构化数据（JSON-LD）动态注入 `<script type="application/ld+json">`
- robots.txt 静态文件
- Sitemap 静态 XML 文件（构建时生成）
- 图片格式优化（构建时处理）

⚠️ Demo 局限（生产需补全）：
- 真实 SSR/SSG 预渲染（需 Next.js 或 Astro）
- 真实 CDN 全球调度
- 真实 GSC 提交与监控

### 9.3 性能预算

| 指标 | Demo 目标 | 生产目标 |
|------|---------|---------|
| Lighthouse Performance | ≥ 85 | ≥ 90 |
| LCP | < 3s | < 2.5s |
| TBT | < 300ms | < 200ms |
| CLS | < 0.1 | < 0.05 |
| 首页包体积（JS gzip） | < 300KB | < 200KB |

---

## 10. 验收标准

### 10.1 功能验收

| 模块 | 验收点 |
|------|-------|
| 路由 | 所有路径按规范跳转，前进/后退正常，URL 与页面内容一致 |
| 多语言 | 切换语言后内容、UI 文本、路径均正确更新；fallback 机制正常 |
| 博客/百科 | 列表筛选、详情叠层、内链高亮、关闭返回均正常 |
| Q&A 首页 | 分类卡片点击跳转、搜索过滤、My* 面板开关均正常 |
| Q&A 论坛 | Tab 切换排序、搜索、展开/收起回复均正常 |
| Q&A 详情 | 点赞（红心）、官方徽章绿色显示、举报弹窗均正常 |
| 登录弹窗 | 未登录时点赞/提问/回答触发弹窗；登录后 Header 状态变化 |
| 虚拟登录 | 登录后可执行点赞/发布；退出后状态重置 |

### 10.2 SEO 验收

| 检查项 | 工具 / 方法 | 标准 |
|-------|-----------|------|
| 每页有唯一 `<title>` | Chrome DevTools / Screaming Frog | 无重复标题，长度 50-60 字符 |
| 每页有 `<meta description>` | Screaming Frog | 无缺失，长度 120-155 字符 |
| canonical 标签正确 | Screaming Frog | 无自我指向错误，无循环 |
| hreflang 完整无错 | hreflang Validator | 所有语言互相引用，无路径拼接错误 |
| 结构化数据验证 | Google Rich Results Test | 无错误，类型与页面内容匹配 |
| 图片有 alt 属性 | Axe / Lighthouse | alt 属性描述图片内容，非空非 filename |
| Sitemap 无异常 URL | XML Sitemap Validator | 所有 URL 返回 200，无 4xx/5xx |
| robots.txt 语法正确 | robots.txt Tester | 关键页面 Allow，测试路径 Disallow |
| Core Web Vitals | Lighthouse | LCP < 3s，CLS < 0.1，TBT < 300ms |

### 10.3 多语言验收

| 检查项 | 标准 |
|-------|------|
| 20 种语言路径均可访问 | 每个 locale 首页返回对应语言内容 |
| hreflang 无路径拼接错误 | ja-jp、tr-tr 页面的 hreflang 不含 /ja-jp/ 或 /tr-tr/ 路径 |
| 语言 fallback 正常 | 无原生内容时降级至 en，不显示乱码或空白 |
| RTL 布局（ar-sa） | 阿拉伯语页面布局从右到左，无溢出或文本错位 |

---

*文档结束*

---

**变更记录**

| 版本 | 日期 | 变更内容 | 作者 |
|------|------|---------|------|
| v1.0 | 2026-05-19 | 初稿，覆盖全站模块 + SEO 专项方案 | 产品团队 |
