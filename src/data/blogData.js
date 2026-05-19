import { translateOfflinePhrase } from './offlinePhraseTranslations.js'
import { buildBlogLocaleJaKo } from './blogLocaleJaKo.js'
import { localizeBlogPostFields } from './contentLocale.js'

const structuredContentLanguages = [
  'ja',
  'ko',
  'es',
  'de',
  'fr',
  'pt',
  'ar',
  'it',
  'nl',
  'pl',
  'tr',
  'id',
  'th',
  'vi',
  'ms',
  'zh-tw',
  'ru',
]

const blogCategoryFilters = [
  { id: 'all', label: 'All' },
  { id: 'product', label: 'Product' },
  { id: 'ai', label: 'AI & Innovation' },
  { id: 'enterprise', label: 'Enterprise' },
  { id: 'stories', label: 'Customer Stories' },
  { id: 'company', label: 'Company News' },
]

const blogCategoryFiltersZh = [
  { id: 'all', label: '全部' },
  { id: 'product', label: '产品发布' },
  { id: 'ai', label: 'AI 与创新' },
  { id: 'enterprise', label: '企业解决方案' },
  { id: 'stories', label: '客户案例' },
  { id: 'company', label: '公司新闻' },
]

const blogPosts = [
  {
    slug: 'wps-copilot-redefine-work',
    featured: true,
    category: 'ai',
    date: '2026-05-12',
    authorName: 'Lin Wei',
    authorRole: 'VP, WPS AI Product',
    title: 'WPS Copilot: Your AI co-pilot for every document task',
    excerpt:
      'From drafting to analysis to presentation - how WPS Copilot is redefining what an office suite can do for 500 million users.',
    readTime: '6 min read',
    tags: ['WPS Copilot', 'AI'],
    image:
      'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1400&q=80',
    imageAlt: 'WPS Copilot AI',
    body: [
      'WPS Copilot is not an add-on - it is the core of how WPS Office works in 2026. Embedded directly into Writer, Spreadsheet, Presentation, and PDF, Copilot understands the document you are working on and acts on it: rewriting paragraphs, generating formulas, building slide decks, and summarizing hundred-page reports - all without switching apps.',
      'The philosophy is simple: your AI assistant should live where your work lives. That means no copy-pasting between a chat window and a document, no context lost in translation. When Copilot rewrites a paragraph in Writer, it reads the surrounding sections to maintain tone and argument flow. When it generates a chart in Spreadsheet, it reads the column headers and data types to choose the most appropriate chart type and apply the right labels.',
      'Enterprise teams using WPS 365 can configure Copilot to use on-premise LLM endpoints for strict data residency. In "zero data retention" mode, content sent to Copilot is never logged after the response is returned - critical for regulated industries like finance, healthcare, and legal services.',
      'Our internal data shows that WPS 365 Pro users complete first drafts 3x faster with Copilot active, and format documents in a third of the time using one-click Beautify. The ROI compounds: less time on formatting and drafting means more time on the work that actually requires human judgment.',
      'WPS Copilot is available today for WPS 365 Pro subscribers on Windows, macOS, iOS, Android, and web. The free tier includes 5 Copilot sessions per day - enough to experience the difference before upgrading.',
    ],
  },
  {
    slug: 'wps-web-collaboration',
    featured: true,
    category: 'product',
    date: '2026-05-05',
    authorName: 'Sarah Chen',
    authorRole: 'Product Lead, WPS Web',
    title: 'Collaborate Without Boundaries with WPS Web',
    excerpt:
      'Real-time co-editing, live cursors, and comment threads - WPS Web brings your entire team into one shared workspace, on any device.',
    readTime: '5 min read',
    tags: ['Collaboration', 'WPS Web', 'Cloud'],
    image:
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1400&q=80',
    imageAlt: 'Team collaboration on WPS Web',
    body: [
      'The nature of office work has changed. Teams no longer sit in the same room, on the same time zone, or even the same continent. WPS Web was built for this reality: a full-featured office suite that runs in the browser, syncs across all devices, and lets multiple people edit the same document simultaneously - with changes appearing in under 200 milliseconds.',
      'WPS Web\'s collaboration layer is built on WPS Drive, the cloud storage service that keeps every document in sync automatically. When you open a file on your phone that a colleague just updated on their laptop, you see the latest version instantly. There is no "email the latest version," no "who has the master copy" - there is one document, always current.',
      'Comment threads and @mentions keep conversations attached to the relevant content. Select any text, leave a comment, mention a colleague, and they receive an email notification with a link that scrolls directly to the comment. Resolved threads are archived but searchable - the full decision history stays with the document.',
      'Permission controls let owners set "view only," "comment," or "edit" access per link or per user. Spreadsheet owners can additionally restrict which columns or rows specific editors can modify - essential for shared budgets, HR records, or project trackers where some data must remain protected.',
      'WPS Web is available to all WPS users - Free accounts can view and comment, Pro accounts get full editing and collaboration. No installation required: access documents at web.wps.com from any modern browser on any operating system.',
    ],
  },
  {
    slug: 'smart-slides-launch',
    featured: true,
    category: 'product',
    date: '2026-04-21',
    authorName: 'Marcus Holt',
    authorRole: 'GM, WPS Presentation',
    title: 'Smart Slides: from outline to deck in minutes',
    excerpt:
      'AI generates structure, picks a theme, writes speaker notes, and refines slide-by-slide - all inside WPS Presentation.',
    readTime: '5 min read',
    tags: ['Smart Slides', 'Presentation', 'AI'],
    image:
      'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1400&q=80',
    imageAlt: 'WPS Presentation Smart Slides',
    body: [
      'Creating a presentation used to mean hours of blank-page anxiety: choosing a theme, arranging slides, writing speaker notes, inserting charts. Smart Slides collapses this process to minutes. Paste in a text outline or a document brief, choose a tone and visual style, and WPS Presentation builds the complete deck - with layouts, charts where data is detected, and speaker notes for every slide.',
      'The AI is not a one-shot generator. You stay in full control throughout. Regenerate any individual slide without touching the rest of the deck. Swap the entire theme with one click and all elements - fonts, colors, backgrounds - adapt to the new palette automatically. The result looks like a designer spent hours on it, because the system has internalized thousands of professional design rules.',
      'Smart Slides integrates naturally into existing workflows. Paste a meeting summary and get a stakeholder update deck. Paste a research paper and get a conference presentation. Paste a sales brief and get a pitch deck with competitive comparisons and pricing tables - formatted consistently, ready to present.',
      'The output is a standard PPTX file, fully editable in Microsoft PowerPoint 2016-2025 with no layout loss. Export to PDF, MP4 video, or web-embed HTML for maximum flexibility. The mobile app supports laser pointer mode and real-time audience Q&A via a QR-linked session during live presentations.',
      'Smart Slides is available for WPS 365 Pro and above on Windows, macOS, and WPS Web. The free tier allows up to 3 Smart Slides generations per month so you can try it before subscribing.',
    ],
  },
  {
    slug: 'pdf-ai-summarize',
    featured: true,
    category: 'ai',
    date: '2026-04-15',
    authorName: 'WPS Product Team',
    authorRole: 'WPS PDF',
    title: 'Summarize long PDFs with WPS AI in one click',
    excerpt:
      'Ask questions across hundred-page reports, get bullet summaries, and export key takeaways to Word - all without leaving WPS.',
    readTime: '4 min read',
    tags: ['PDF', 'AI Summarize', 'Copilot'],
    image:
      'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1400&q=80',
    imageAlt: 'WPS PDF AI Summarize',
    body: [
      'Reading a 150-page report should not take 150 minutes. WPS AI Summarize changes this: open any PDF, click AI Summarize, and choose your output format - bullet summary for quick scanning, executive brief for leadership review, or interactive Q&A for deep dives. The entire process takes under 30 seconds.',
      'Document Q&A is especially powerful for research and compliance work. Ask "What are the main risk factors in section 4?" or "Does this contract contain a limitation of liability clause, and on which page?" WPS AI answers with page-referenced quotes, so you can verify every claim in context.',
      'Citations are embedded in every summary output. Each bullet or paragraph is tagged with the page number it was drawn from. When you export to Word, the citations carry through as footnotes or inline references - ready for a literature review or audit trail.',
      'The AI reading engine supports scanned PDFs through built-in OCR. Even a document photographed on a phone can be processed, summarized, and searched with full accuracy. The OCR engine handles Latin, CJK (Chinese, Japanese, Korean), Arabic, and Devanagari scripts.',
      'WPS 365 Pro subscribers get unlimited AI PDF summaries and Q&A sessions. The free tier includes 5 sessions per day - sufficient for occasional use. Batch processing (summarize all PDFs in a folder overnight) is available as an enterprise feature on WPS 365 Team and above.',
    ],
  },
  {
    slug: 'wps-enterprise-security-2026',
    featured: false,
    category: 'enterprise',
    date: '2026-04-08',
    authorName: 'WPS Trust Center',
    authorRole: 'Security & Compliance',
    title: 'WPS 365 Enterprise: ISO 27001, GDPR, and data residency for regulated industries',
    excerpt:
      'How WPS Office meets the security and compliance standards required by global enterprises in finance, healthcare, government, and legal services.',
    readTime: '7 min read',
    tags: ['Enterprise', 'Security', 'Compliance', 'GDPR'],
    image:
      'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1400&q=80',
    imageAlt: 'WPS Enterprise Security',
    body: [
      'When Kingsoft set out to build WPS 365 Enterprise, the mandate was clear: security cannot be an afterthought or an add-on. It has to be designed in from the foundation. Today, WPS Office holds certifications under ISO/IEC 27001, ISO/IEC 27018, ISO/IEC 27701, and ISO/IEC 20000.',
      'All files stored in WPS Drive are encrypted at rest using AES-256. Data in transit between devices and WPS servers is protected with TLS 1.3. Enterprise customers can bring their own keys for maximum control.',
      'Data residency is a first-class feature in WPS 365 Enterprise. Organizations can specify which region stores their data, and regulated teams can choose private cloud or on-premise deployments.',
      'WPS Copilot in Enterprise mode offers a zero-data-retention option, critical for law firms, financial advisors, and healthcare providers who cannot allow client data to persist in any external system.',
    ],
  },
  {
    slug: 'global-teams-wps-365',
    featured: false,
    category: 'stories',
    date: '2026-03-28',
    authorName: 'WPS Customer Success',
    authorRole: 'Enterprise Accounts',
    title: 'How global teams standardize on WPS 365 across 40 countries',
    excerpt:
      'Inside the digital workplace transformation of organizations that chose WPS 365 as their primary productivity platform.',
    readTime: '6 min read',
    tags: ['Customer Stories', 'Enterprise', 'Digital Transformation'],
    image:
      'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1400&q=80',
    imageAlt: 'Global team using WPS',
    body: [
      'When a multinational organization decides to standardize its productivity platform, the challenges are formidable: different operating systems, legacy document formats, and strict IT control requirements. WPS 365 Enterprise was designed to solve these simultaneously.',
      'Microsoft Office compatibility is central. DOCX, XLSX, and PPTX files move between WPS and Microsoft Office with minimal formatting loss, making migration less disruptive for teams and partners.',
      'Administrators can deploy WPS 365 via MDM tools with pre-configured policies for formats, templates, AI usage, and cloud storage limits.',
      'Shared template libraries and real-time collaboration help teams reduce off-brand outputs and email-based versioning, accelerating rollout across regions.',
    ],
  },
  {
    slug: 'template-marketplace-100k',
    featured: false,
    category: 'company',
    date: '2026-03-18',
    authorName: 'WPS Corporate',
    authorRole: 'Newsroom',
    title: 'WPS Template Marketplace reaches 100,000 professional designs',
    excerpt:
      'From resume templates to pitch decks and regional holiday themes - how the WPS template ecosystem grew to serve 500 million users.',
    readTime: '4 min read',
    tags: ['Templates', 'Milestone', 'Creator Economy'],
    image:
      'https://images.unsplash.com/photo-1506784365847-bbad939e9335?auto=format&fit=crop&w=1400&q=80',
    imageAlt: 'WPS Template Marketplace',
    body: [
      'The WPS Template Marketplace has crossed 100,000 published designs - a milestone that reflects both the scale of the WPS user community and the growing professionalization of template creation as a craft.',
      'Community creators can publish paid packs with revenue share, while enterprises can curate approved private template catalogs for their organizations.',
      'Official templates are tested across Windows, macOS, iOS, Android, and web to ensure consistent rendering.',
      'The next phase of the marketplace introduces AI-assisted template personalization, helping users find and adapt templates faster.',
    ],
  },
  {
    slug: 'mobile-ai-full-office',
    featured: false,
    category: 'ai',
    date: '2026-02-24',
    authorName: 'Mobile Team',
    authorRole: 'WPS Mobile',
    title: 'Full office power in your pocket: WPS Mobile\'s AI update',
    excerpt:
      'Camera scan with OCR, AI rewrite, Smart Slides on mobile - the WPS Mobile 2026 update brings desktop-class AI to iPhone and Android.',
    readTime: '5 min read',
    tags: ['Mobile', 'OCR', 'AI', 'WPS App'],
    image:
      'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1400&q=80',
    imageAlt: 'WPS Mobile AI features',
    body: [
      'WPS Mobile 2026 brings desktop-class AI experiences to smartphones and tablets, making mobile a first-class work device.',
      'Camera Scan with AI turns printed pages or whiteboards into editable documents with OCR and layout preservation.',
      'AI Rewrite and Smart Slides on mobile help users revise text or build a presentation deck without opening a laptop.',
      'The same WPS 365 subscription covers desktop, web, and mobile, keeping documents, templates, and AI access consistent across devices.',
    ],
  },
]

const blogPostsZh = [
  {
    slug: 'wps-copilot-redefine-work',
    featured: true,
    category: 'ai',
    date: '2026-05-12',
    authorName: '林伟',
    authorRole: 'WPS AI 产品副总裁',
    title: 'WPS Copilot：你的全流程 AI 办公副驾',
    excerpt: '从写作、分析到演示生成，WPS Copilot 正在重塑 5 亿用户的日常办公方式。',
    readTime: '6 分钟阅读',
    tags: ['WPS Copilot', 'AI 办公'],
    image:
      'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1400&q=80',
    imageAlt: 'WPS Copilot AI',
    body: [
      'WPS Copilot 已深度融入 Writer、表格、演示与 PDF，不再是独立聊天窗口。你可以在当前文档中直接让 AI 改写段落、生成公式、总结长文和补充结构。',
      '我们坚持“AI 在工作流内完成工作”的产品理念：减少跨应用切换，避免上下文丢失。AI 的价值不只是给答案，而是直接把答案落到你的文档结构里。',
      '面向企业场景，WPS 365 支持数据驻留与零保留模式，帮助金融、医疗、法务等行业在合规前提下使用 AI。',
      '实测数据显示，开启 Copilot 后首稿产出效率提升约 3 倍，格式整理时间下降到原来的三分之一，让团队把精力回到真正高价值的判断与创作。',
    ],
  },
  {
    slug: 'wps-web-collaboration',
    featured: true,
    category: 'product',
    date: '2026-05-05',
    authorName: '陈莎拉',
    authorRole: 'WPS Web 产品负责人',
    title: '用 WPS Web 打造无边界协作体验',
    excerpt: '实时协同编辑、评论串、云端同步，让团队在任意设备上进入同一个工作现场。',
    readTime: '5 分钟阅读',
    tags: ['协作', 'WPS Web', '云文档'],
    image:
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1400&q=80',
    imageAlt: '团队协同办公',
    body: [
      'WPS Web 让团队成员无需安装客户端即可协同处理文档，编辑结果毫秒级同步，版本始终保持最新。',
      '评论与 @ 提及直接附着在内容上下文中，沟通链路和文档链路统一，决策信息不会散落在邮件或群聊里。',
      '权限可配置为查看、评论、编辑，并支持精细化控制共享范围，满足跨部门协作与敏感内容管理需求。',
      '无论你在桌面端、移动端还是浏览器端，WPS Drive 都会自动同步最近修改，真正实现“同一份文件、同一份真相”。',
    ],
  },
  {
    slug: 'smart-slides-launch',
    featured: true,
    category: 'product',
    date: '2026-04-21',
    authorName: '马库斯·霍尔特',
    authorRole: 'WPS 演示业务总经理',
    title: '智能演示：从大纲到成稿，只需几分钟',
    excerpt: '输入要点即可自动生成完整演示，主题、版式、讲稿备注一站式完成。',
    readTime: '5 分钟阅读',
    tags: ['智能演示', '演示文稿', 'AI'],
    image:
      'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1400&q=80',
    imageAlt: 'WPS 演示',
    body: [
      '智能演示能把会议提纲、方案摘要或研究材料快速转成结构完整的演示文稿，自动补齐封面、目录与关键论证页。',
      '你可以只重生成某一页，不影响其他页面；也可以一键切换主题，让整套视觉风格自动统一。',
      '输出支持 PPTX、PDF、视频等格式，便于跨团队、跨平台流转与汇报。',
      '对于高频汇报场景，这意味着更短准备时间和更稳定的内容质量。',
    ],
  },
  {
    slug: 'pdf-ai-summarize',
    featured: true,
    category: 'ai',
    date: '2026-04-15',
    authorName: 'WPS 产品团队',
    authorRole: 'WPS PDF',
    title: '一键总结长 PDF：WPS AI 让阅读更高效',
    excerpt: '支持百页文档摘要、问答追问与页码引用，复杂阅读任务也能快速收敛。',
    readTime: '4 分钟阅读',
    tags: ['PDF', 'AI 总结', '智能助手'],
    image:
      'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1400&q=80',
    imageAlt: 'WPS PDF AI',
    body: [
      '在 WPS PDF 中，你可以直接选择 AI 总结模式：要点摘要、管理层简报或交互式问答。',
      '每条结论都支持页码引用，便于追溯原文，特别适合法务审阅、政策解读、研究报告整理等高准确性场景。',
      '对扫描件同样可用，OCR 会先完成文字识别，再进入摘要与问答流程。',
      '从“读完”到“读懂”，WPS AI 把长文处理效率提升到分钟级。',
    ],
  },
  {
    slug: 'wps-enterprise-security-2026',
    featured: false,
    category: 'enterprise',
    date: '2026-04-08',
    authorName: 'WPS 信任中心',
    authorRole: '安全与合规团队',
    title: 'WPS 365 Enterprise：面向全球企业的安全与合规能力',
    excerpt: '覆盖 ISO 27001、GDPR、数据驻留与企业级权限治理，保障组织级 AI 办公落地。',
    readTime: '7 分钟阅读',
    tags: ['企业版', '安全', '合规'],
    image:
      'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1400&q=80',
    imageAlt: '企业安全',
    body: [
      'WPS 365 Enterprise 从底层架构开始构建安全能力，数据传输与存储全链路加密，并具备完整审计能力。',
      '企业可按需选择数据驻留区域，也可采用私有化或混合部署方案，满足本地监管与行业合规要求。',
      '在 AI 场景中，支持零保留策略，确保敏感内容在调用后不被持久化。',
      '我们希望企业在“效率提升”与“风险可控”之间不再做取舍。',
    ],
  },
  {
    slug: 'global-teams-wps-365',
    featured: false,
    category: 'stories',
    date: '2026-03-28',
    authorName: 'WPS 客户成功团队',
    authorRole: '企业客户方案',
    title: '全球团队如何在 40+ 国家统一使用 WPS 365',
    excerpt: '从兼容性、部署到模板治理，WPS 帮助组织完成跨区域办公平台统一。',
    readTime: '6 分钟阅读',
    tags: ['客户案例', '企业协同', '数字化转型'],
    image:
      'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1400&q=80',
    imageAlt: '全球团队协作',
    body: [
      '跨国团队在办公系统统一中最大的挑战，通常是兼容性与迁移成本。WPS 通过对主流格式的高兼容，降低了切换阻力。',
      '企业管理员可通过 MDM 工具进行静默部署与策略下发，统一模板、默认格式与权限配置。',
      '模板中心将品牌规范前置到创建环节，减少后期返工和视觉不一致问题。',
      '客户反馈显示，文档生产效率与跨团队协作速度在部署后均有显著提升。',
    ],
  },
  {
    slug: 'template-marketplace-100k',
    featured: false,
    category: 'company',
    date: '2026-03-18',
    authorName: 'WPS 官方新闻中心',
    authorRole: '新闻中心',
    title: 'WPS 模板市场突破 10 万精品模板',
    excerpt: '覆盖简历、方案、财务报表、演示提案等场景，持续增强内容生态与创作者价值。',
    readTime: '4 分钟阅读',
    tags: ['模板生态', '里程碑', '创作者'],
    image:
      'https://images.unsplash.com/photo-1506784365847-bbad939e9335?auto=format&fit=crop&w=1400&q=80',
    imageAlt: '模板生态',
    body: [
      'WPS 模板市场已形成“官方精品 + 社区创作”双轮驱动模式，为用户提供更高可用性的办公起点。',
      '创作者可通过平台发布模板并获得收益分成，优秀模板在全球用户场景中持续放大价值。',
      '企业可建立私有模板目录，把品牌与规范固化到模板资产层，提升组织输出一致性。',
      '接下来，模板推荐将进一步结合 AI 个性化能力，实现“描述需求即可匹配模板”。',
    ],
  },
  {
    slug: 'mobile-ai-full-office',
    featured: false,
    category: 'ai',
    date: '2026-02-24',
    authorName: '移动端团队',
    authorRole: 'WPS 移动端',
    title: 'WPS 移动端 2026：把完整 AI 办公能力装进口袋',
    excerpt: '拍照扫描、OCR、AI 改写、移动端智能演示，手机也能完成专业办公闭环。',
    readTime: '5 分钟阅读',
    tags: ['移动端', 'OCR', 'AI 办公'],
    image:
      'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1400&q=80',
    imageAlt: '移动办公',
    body: [
      'WPS 移动端新版将桌面端核心 AI 能力迁移到手机端，让“随时随地完成专业任务”成为现实。',
      '拍照扫描可自动识别文本与版式，直接生成可编辑文档，减少手工录入。',
      '移动端 AI 改写和智能演示生成可用于临时汇报、现场修订和跨时区协作。',
      '同一账号覆盖桌面、网页与移动端，体验与资产保持一致，真正做到连续办公。',
    ],
  },
]

const blogReadTimeUnitByLanguage = {
  ja: '分で読めます',
  ko: '분 읽기',
  es: 'min de lectura',
  de: 'Min. Lesezeit',
  fr: 'min de lecture',
  pt: 'min de leitura',
  ar: 'دقائق قراءة',
  it: 'min di lettura',
  nl: 'min leestijd',
  pl: 'min czytania',
  tr: 'dk okuma',
  id: 'menit baca',
  th: 'นาทีในการอ่าน',
  vi: 'phút đọc',
  ms: 'min bacaan',
  'zh-tw': '分鐘閱讀',
  ru: 'мин чтения',
}

function localizeBlogReadTime(readTime, language) {
  const minutes = `${readTime ?? ''}`.match(/\d+/)?.[0] ?? '5'
  const unit = blogReadTimeUnitByLanguage[language]
  return unit ? `${minutes} ${unit}` : translateOfflinePhrase(language, readTime)
}

function localizeBlogPostsForLanguage(posts, language) {
  return posts.map((post) => ({
    ...post,
    authorName: translateOfflinePhrase(language, post.authorName),
    authorRole: translateOfflinePhrase(language, post.authorRole),
    title: translateOfflinePhrase(language, post.title),
    excerpt: translateOfflinePhrase(language, post.excerpt),
    imageAlt: translateOfflinePhrase(language, post.imageAlt ?? post.title),
    readTime: localizeBlogReadTime(post.readTime ?? '5 min read', language),
    tags: (post.tags ?? []).map((tag) => translateOfflinePhrase(language, tag)),
    body: (post.body ?? []).map((paragraph) => translateOfflinePhrase(language, paragraph)),
  }))
}

function localizeBlogCategoryFiltersForLanguage(filters, language) {
  return filters.map((tab) => ({
    ...tab,
    label: translateOfflinePhrase(language, tab.label),
  }))
}

const {
  blogCategoryFiltersJa,
  blogCategoryFiltersKo,
  blogPostsJa,
  blogPostsKo,
} = buildBlogLocaleJaKo(blogPosts)

export const blogPostsByLanguage = {
  en: blogPosts,
  zh: blogPostsZh,
  ja: blogPostsJa,
  ko: blogPostsKo,
  ...Object.fromEntries(
    structuredContentLanguages.map((language) => [
      language,
      localizeBlogPostsForLanguage(language === 'zh-tw' ? blogPostsZh : blogPosts, language),
    ]),
  ),
}

export function resolveBlogPostsForLanguage(language, localizeFn) {
  const nativePosts =
    language === 'zh'
      ? blogPostsZh
      : language === 'ja'
        ? blogPostsJa
        : language === 'ko'
          ? blogPostsKo
          : language === 'zh-tw'
            ? blogPostsByLanguage['zh-tw']
            : blogPosts

  return nativePosts.map((post) => localizeBlogPostFields(post, language, localizeFn))
}

export const blogCategoryFiltersByLanguage = {
  en: blogCategoryFilters,
  zh: blogCategoryFiltersZh,
  ja: blogCategoryFiltersJa,
  ko: blogCategoryFiltersKo,
  ...Object.fromEntries(
    structuredContentLanguages.map((language) => [
      language,
      localizeBlogCategoryFiltersForLanguage(
        language === 'zh-tw' ? blogCategoryFiltersZh : blogCategoryFilters,
        language,
      ),
    ]),
  ),
}

export const encyclopediaCategoryDefinitions = [
  { id: 'all', labelKey: 'All Topics', labelZh: '全部词条', labelJa: 'すべてのトピック', labelKo: '전체 주제' },
  { id: 'overview', labelKey: 'Product Overview', labelZh: '产品概览', labelJa: '製品概要', labelKo: '제품 개요' },
  { id: 'ai', labelKey: 'AI Features', labelZh: 'AI 能力', labelJa: 'AI 機能', labelKo: 'AI 기능' },
  { id: 'getting-started', labelKey: 'Getting Started', labelZh: '新手入门', labelJa: 'はじめに', labelKo: '시작하기' },
  { id: 'account', labelKey: 'Account & Subscription', labelZh: '账号与订阅', labelJa: 'アカウントと契約', labelKo: '계정 및 구독' },
  { id: 'cloud', labelKey: 'Cloud & Sync', labelZh: '云与协作', labelJa: 'クラウドと同期', labelKo: '클라우드 및 동기화' },
  { id: 'security', labelKey: 'Security & Privacy', labelZh: '安全与隐私', labelJa: 'セキュリティとプライバシー', labelKo: '보안 및 개인정보' },
  { id: 'install', labelKey: 'Install & Setup', labelZh: '安装与部署', labelJa: 'インストールと設定', labelKo: '설치 및 설정' },
  { id: 'compatibility', labelKey: 'Compatibility', labelZh: '兼容性', labelJa: '互換性', labelKo: '호환성' },
  { id: 'faq', labelKey: 'FAQ', labelZh: '常见问题', labelJa: 'FAQ', labelKo: 'FAQ' },
]

export const encyclopediaCategoryBySlug = {
  accessibility: 'getting-started',
  'account-billing': 'account',
  'ai-assistant': 'ai',
  'ai-translate': 'ai',
  collaboration: 'cloud',
  'excel-templates': 'compatibility',
  'forms-surveys': 'cloud',
  'mobile-apps': 'install',
  'pdf-convert': 'compatibility',
  'pdf-edit': 'compatibility',
  'presentation-themes': 'compatibility',
  'smart-sheets': 'ai',
  'smart-slides': 'ai',
  'template-center': 'getting-started',
  'wps-365': 'overview',
  'wps-office-overview': 'overview',
  'wps-writer': 'overview',
  'wps-spreadsheets': 'overview',
  'wps-presentation': 'overview',
  'wps-pdf': 'overview',
  'wps-copilot': 'ai',
  'smart-docs-ai': 'ai',
  'smart-sheets-ai': 'ai',
  'ai-image-tools': 'ai',
  'install-setup': 'getting-started',
  'system-requirements': 'install',
  'account-login': 'account',
  'subscription-plans': 'account',
  'family-edition': 'account',
  'cloud-sync': 'cloud',
  'real-time-collaboration': 'cloud',
  'version-history': 'cloud',
  'security-privacy': 'security',
  'office-compatibility': 'compatibility',
  'pdf-compatibility': 'compatibility',
  'faq-account-billing': 'faq',
  'faq-files-formats': 'faq',
}

export const encyclopediaCategoryImageMap = {
  overview:
    'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1400&q=80',
  ai:
    'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1400&q=80',
  'getting-started':
    'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1400&q=80',
  account:
    'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1400&q=80',
  cloud:
    'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1400&q=80',
  security:
    'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1400&q=80',
  install:
    'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1400&q=80',
  compatibility:
    'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&w=1400&q=80',
  faq:
    'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1400&q=80',
}
