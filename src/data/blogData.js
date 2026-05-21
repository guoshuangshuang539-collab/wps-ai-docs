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
  { id: 'featured', label: 'Featured' },
  { id: 'all', label: 'All' },
  { id: 'product-updates', label: 'Product Updates' },
  { id: 'industry-trends', label: 'Industry Trends' },
  { id: 'customer-stories', label: 'Customer Stories' },
  { id: 'viewpoints', label: 'Expert Insights' },
  { id: 'events', label: 'Events' },
]

const blogCategoryFiltersZh = [
  { id: 'featured', label: '精选' },
  { id: 'all', label: '全部' },
  { id: 'product-updates', label: '产品更新' },
  { id: 'industry-trends', label: '行业趋势' },
  { id: 'customer-stories', label: '客户案例' },
  { id: 'viewpoints', label: '专家洞察' },
  { id: 'events', label: '活动' },
]

const blogPosts = [
  {
    slug: 'wps-copilot-redefine-work',
    featured: true,
    category: 'product-updates',
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
    category: 'product-updates',
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
    category: 'product-updates',
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
    category: 'product-updates',
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
    category: 'viewpoints',
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
    category: 'customer-stories',
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
    category: 'events',
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
    category: 'product-updates',
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
  {
    slug: 'ai-workplace-trends-2026',
    featured: false,
    category: 'industry-trends',
    date: '2026-05-16',
    authorName: 'WPS Research Desk',
    authorRole: 'Industry Analyst',
    title: 'AI workplace trends in 2026: efficiency, collaboration, and measurable output',
    excerpt:
      'A practical look at how teams are using AI to reduce rework, speed decision-making, and improve cross-functional collaboration.',
    readTime: '6 min read',
    tags: ['AI Workplace', 'Efficiency', 'Collaboration'],
    image:
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1400&q=80',
    imageAlt: 'AI workplace trends',
    body: [
      'AI adoption in office environments has moved from experimental pilots to daily workflows. Teams now expect AI to draft, summarize, and structure information directly inside productivity apps.',
      'The strongest gains are not from one-click generation, but from reducing handoff friction: fewer status meetings, clearer documentation, and faster alignment between product, operations, and finance.',
      'Organizations with clear governance see better outcomes. They define where AI can assist, where human review is mandatory, and how output quality is measured.',
      'For global teams, multilingual AI support is becoming a baseline capability because it shortens communication loops across regions and improves execution consistency.',
    ],
  },
  {
    slug: 'wps-quarterly-product-update-q2',
    featured: false,
    category: 'product-updates',
    date: '2026-05-14',
    authorName: 'WPS Product Office',
    authorRole: 'Release Program Team',
    title: 'WPS Q2 product update: key releases, roadmap signals, and what to use now',
    excerpt:
      'A concise interpretation of this quarter’s updates across Writer, PDF, Slides, and cloud collaboration - plus what is next on the roadmap.',
    readTime: '5 min read',
    tags: ['Product Update', 'Roadmap', 'Release Notes'],
    image:
      'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1400&q=80',
    imageAlt: 'Product update roadmap briefing',
    body: [
      'This quarter focused on workflow continuity: AI suggestions are now more context-aware across long documents, and collaboration latency was reduced in high-concurrency sessions.',
      'For PDF users, summary quality and citation reliability improved, especially on scanned files. For presentation users, smart layout consistency now performs better on mixed language decks.',
      'Roadmap signals for next quarter include deeper template intelligence, enterprise policy controls for AI usage, and richer analytics for team-level adoption.',
      'Teams can prioritize immediate value by enabling shared templates, document review checkpoints, and role-based permissions before scaling broader automation.',
    ],
  },
  {
    slug: 'manufacturing-team-roi-with-wps-ai',
    featured: false,
    category: 'customer-stories',
    date: '2026-05-10',
    authorName: 'WPS Customer Success',
    authorRole: 'Industry Solutions',
    title: 'Customer case: how a manufacturing team improved ROI with WPS AI workflows',
    excerpt:
      'A real-world case on standardizing reporting and reducing manual document processing time by combining templates, AI rewrite, and PDF automation.',
    readTime: '7 min read',
    tags: ['Customer Story', 'ROI', 'Best Practice'],
    image:
      'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1400&q=80',
    imageAlt: 'Manufacturing team ROI case',
    body: [
      'The operations team handled weekly reports from 12 factories with inconsistent formats and delayed handovers. Manual consolidation caused frequent rework and slow management reviews.',
      'They introduced standardized WPS templates, AI-assisted rewriting for summary sections, and automated PDF packaging for leadership distribution.',
      'Within two months, average report preparation time dropped by 43%, document error corrections dropped by 37%, and cross-team review cycles became more predictable.',
      'The most transferable lesson was to start with one repeatable workflow, define quality gates, and only then scale to additional departments.',
    ],
  },
  {
    slug: 'ai-methodology-human-in-the-loop',
    featured: false,
    category: 'viewpoints',
    date: '2026-05-08',
    authorName: 'WPS Strategy Lab',
    authorRole: 'Product Methodology',
    title: 'Methodology perspective: human-in-the-loop is the key to reliable AI productivity',
    excerpt:
      'Comparative evaluation of three AI working models and why review checkpoints outperform fully automated output in real teams.',
    readTime: '6 min read',
    tags: ['Methodology', 'Evaluation', 'Expert View'],
    image:
      'https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=1400&q=80',
    imageAlt: 'Methodology and expert perspective',
    body: [
      'Teams typically choose between manual-first, AI-first, and human-in-the-loop models. In practice, the third model delivers the best balance of speed and quality.',
      'AI-first can increase draft speed, but without review checkpoints, factual risk and style inconsistency rise quickly in external-facing materials.',
      'Human-in-the-loop keeps the efficiency gain while preserving accountability. Review owners validate claims, tone, and policy compliance before publication.',
      'The recommendation is to design workflows around decision points, not around tools. AI should accelerate execution, while humans retain final judgment on business-critical output.',
    ],
  },
  {
    slug: 'wps-ai-launch-day-highlights',
    featured: false,
    category: 'events',
    date: '2026-05-06',
    authorName: 'WPS Newsroom',
    authorRole: 'Events & Communications',
    title: 'Event highlights: WPS AI launch day, whitepaper release, and key reports',
    excerpt:
      'A recap of launch announcements, the latest whitepaper, and practical benchmarks shared with customers and partners.',
    readTime: '4 min read',
    tags: ['Event', 'Whitepaper', 'Report'],
    image:
      'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1400&q=80',
    imageAlt: 'Launch event and whitepaper report',
    body: [
      'At launch day, WPS presented a unified AI workflow strategy spanning writing, spreadsheets, presentations, and PDF processing.',
      'The newly released whitepaper summarizes implementation patterns, governance recommendations, and deployment paths for different organization sizes.',
      'A companion benchmark report compares baseline productivity metrics before and after AI-enabled workflow standardization.',
      'For teams evaluating adoption, these materials provide a practical framework to prioritize use cases, estimate impact, and avoid common rollout risks.',
    ],
  },
  {
    slug: 'workflow-trend-ai-approval-loop',
    featured: false,
    category: 'industry-trends',
    date: '2026-05-03',
    authorName: 'WPS Research Desk',
    authorRole: 'Trend Analyst',
    title: 'AI workflow trend: why approval loops are becoming the new productivity baseline',
    excerpt: 'More teams are standardizing AI-assisted drafting with human approval loops to keep speed and quality in balance.',
    readTime: '5 min read',
    tags: ['AI Workflow', 'Approval Loop', 'Efficiency'],
    image:
      'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1400&q=80',
    imageAlt: 'AI workflow approval loop trend',
    body: [
      'Fast drafting without quality controls creates hidden downstream cost. Approval loops are becoming the practical answer.',
      'Teams now combine AI generation, reviewer checkpoints, and final owner sign-off to reduce back-and-forth edits.',
      'This model improves cycle time while keeping accountability clear across product, marketing, and operations.',
    ],
  },
  {
    slug: 'product-update-writer-ai-rewrite-v3',
    featured: false,
    category: 'product-updates',
    date: '2026-05-02',
    authorName: 'Writer Team',
    authorRole: 'Product Manager',
    title: 'Product update: Writer AI Rewrite v3 improves tone control and consistency',
    excerpt: 'The new rewrite engine adds tone presets, stricter format retention, and better long-paragraph stability.',
    readTime: '4 min read',
    tags: ['Product Update', 'Writer', 'AI Rewrite'],
    image:
      'https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?auto=format&fit=crop&w=1400&q=80',
    imageAlt: 'Writer AI Rewrite update',
    body: [
      'Rewrite v3 introduces explicit tone modes for executive, neutral, and customer-facing writing.',
      'Paragraph structure is preserved better in bilingual documents, reducing manual correction after generation.',
      'Teams can now save approved rewrite styles as reusable presets for recurring communication scenarios.',
    ],
  },
  {
    slug: 'customer-story-retail-ops-automation',
    featured: false,
    category: 'customer-stories',
    date: '2026-04-30',
    authorName: 'WPS Customer Success',
    authorRole: 'Solution Architect',
    title: 'Customer story: retail operations team cuts report turnaround by 50%',
    excerpt: 'A regional retail group used templates, AI summaries, and shared dashboards to accelerate weekly reporting.',
    readTime: '6 min read',
    tags: ['Customer Story', 'Retail', 'Best Practice'],
    image:
      'https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=1400&q=80',
    imageAlt: 'Retail team customer story',
    body: [
      'Before standardization, each store submitted reports in different structures, creating heavy consolidation work.',
      'The team implemented shared templates and AI summary cards for quick management review.',
      'Turnaround time was halved and data interpretation became more consistent across regions.',
    ],
  },
  {
    slug: 'expert-insight-ai-content-governance',
    featured: false,
    category: 'viewpoints',
    date: '2026-04-28',
    authorName: 'WPS Strategy Lab',
    authorRole: 'Governance Research',
    title: 'Expert insight: AI content governance should start from output standards, not tools',
    excerpt: 'The most stable teams define quality gates and approval roles first, then map tools into that framework.',
    readTime: '5 min read',
    tags: ['Expert Insights', 'Governance', 'Methodology'],
    image:
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1400&q=80',
    imageAlt: 'Expert insights on governance',
    body: [
      'Tool-first rollout often leads to inconsistent quality because each team invents its own review rules.',
      'Output standards should define factual verification, tone consistency, and formatting compliance.',
      'Once standards are explicit, automation becomes easier to scale across teams and regions.',
    ],
  },
  {
    slug: 'event-recap-apac-ai-office-summit',
    featured: false,
    category: 'events',
    date: '2026-04-26',
    authorName: 'WPS Newsroom',
    authorRole: 'Event Team',
    title: 'Event recap: APAC AI Office Summit and implementation playbook release',
    excerpt: 'Highlights from customer sessions, benchmark disclosures, and the release of a new implementation playbook.',
    readTime: '4 min read',
    tags: ['Event', 'Summit', 'Playbook'],
    image:
      'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=1400&q=80',
    imageAlt: 'APAC summit event recap',
    body: [
      'The summit focused on practical implementation cases from finance, healthcare, and manufacturing organizations.',
      'Speakers shared adoption metrics and governance models that improved delivery quality in multi-team environments.',
      'A downloadable playbook now summarizes phased rollout steps and KPI tracking templates.',
    ],
  },
]

const blogPostsZh = [
  {
    slug: 'wps-copilot-redefine-work',
    featured: true,
    category: 'product-updates',
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
    category: 'product-updates',
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
    category: 'product-updates',
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
    category: 'product-updates',
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
    category: 'viewpoints',
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
    category: 'customer-stories',
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
    category: 'events',
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
    category: 'product-updates',
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
  {
    slug: 'ai-workplace-trends-2026',
    featured: false,
    category: 'industry-trends',
    date: '2026-05-16',
    authorName: 'WPS 研究团队',
    authorRole: '行业分析师',
    title: '2026 AI 办公趋势：效率、协作与可量化产出',
    excerpt: '从真实团队实践出发，解读 AI 如何减少返工、加速决策，并提升跨部门协作效率。',
    readTime: '6 分钟阅读',
    tags: ['AI 办公', '效率提升', '协作'],
    image:
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1400&q=80',
    imageAlt: 'AI 办公趋势',
    body: [
      '办公场景中的 AI 应用已经从“试点实验”进入“日常工作流”。团队更关注 AI 是否能直接在文档、表格、演示中落地价值。',
      '最显著的收益并非来自单次内容生成，而是来自协作链路的摩擦降低：状态同步更快、文档表达更清晰、跨职能协同更顺畅。',
      '效果更好的组织通常会先建立治理边界：哪些任务可由 AI 辅助，哪些环节必须人工复核，以及如何衡量输出质量。',
      '对全球化团队而言，多语言能力已成为基础设施，它直接影响跨区域沟通效率与执行一致性。',
    ],
  },
  {
    slug: 'wps-quarterly-product-update-q2',
    featured: false,
    category: 'product-updates',
    date: '2026-05-14',
    authorName: 'WPS 产品办公室',
    authorRole: '版本发布项目组',
    title: 'WPS Q2 产品更新解读：版本亮点、路线信号与落地建议',
    excerpt: '聚焦本季度 Writer、PDF、演示与云协作更新，并解读下一阶段产品路线重点。',
    readTime: '5 分钟阅读',
    tags: ['产品更新', '路线图', '版本解读'],
    image:
      'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1400&q=80',
    imageAlt: '产品更新与路线图',
    body: [
      '本季度更新重点围绕“工作流连续性”：长文档上下文理解更稳定，多人高并发协同场景的延迟进一步下降。',
      'PDF 能力方面，摘要与引用可靠性持续提升，扫描件处理效果更稳；演示场景中，多语言内容的版式一致性也得到优化。',
      '从路线信号看，下一阶段会加强模板智能化推荐、企业级 AI 策略管理，以及团队采用效果分析能力。',
      '对业务团队来说，建议优先落地共享模板、评审检查点和角色权限，再逐步扩展自动化范围。',
    ],
  },
  {
    slug: 'manufacturing-team-roi-with-wps-ai',
    featured: false,
    category: 'customer-stories',
    date: '2026-05-10',
    authorName: 'WPS 客户成功团队',
    authorRole: '行业解决方案',
    title: '客户案例：制造业团队如何通过 WPS AI 提升 ROI',
    excerpt: '通过模板标准化、AI 改写与 PDF 自动化，该团队显著缩短周报处理周期并降低返工成本。',
    readTime: '7 分钟阅读',
    tags: ['客户案例', 'ROI', '最佳实践'],
    image:
      'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1400&q=80',
    imageAlt: '制造业客户 ROI 案例',
    body: [
      '该运营团队每周需要汇总 12 家工厂的数据报告，长期面临格式不统一、交付延迟与反复返工的问题。',
      '项目组先统一 WPS 模板，再用 AI 改写补齐摘要段落，同时将领导汇报包自动生成为标准 PDF。',
      '两个月后，平均报告准备时长下降 43%，文档错误修订量下降 37%，跨团队评审节奏更可控。',
      '可复用经验是：先选择一个高频、可重复流程打样，定义质量检查点后再复制到其他部门。',
    ],
  },
  {
    slug: 'ai-methodology-human-in-the-loop',
    featured: false,
    category: 'viewpoints',
    date: '2026-05-08',
    authorName: 'WPS 策略实验室',
    authorRole: '产品方法论研究',
    title: '观点：Human-in-the-loop 才是可落地的 AI 办公方法论',
    excerpt: '对比三种 AI 工作模式后发现，设置人工复核检查点比“全自动生成”更稳健。',
    readTime: '6 分钟阅读',
    tags: ['方法论', '评测对比', '专家观点'],
    image:
      'https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=1400&q=80',
    imageAlt: '方法论与专家观点',
    body: [
      '团队常见的三种模式是：纯人工、AI 优先、人机协同。实际落地中，人机协同在效率与质量间更均衡。',
      'AI 优先可以提升初稿速度，但如果缺少复核节点，面向外部发布的内容更容易出现事实风险和风格漂移。',
      '在人机协同模型中，责任人会对关键结论、语气和合规项进行最终确认，既保留效率红利，也保留业务可控性。',
      '建议将流程设计的核心放在“决策检查点”，而不是“工具堆叠”，让 AI 提速、人来负责关键判断。',
    ],
  },
  {
    slug: 'wps-ai-launch-day-highlights',
    featured: false,
    category: 'events',
    date: '2026-05-06',
    authorName: 'WPS 新闻中心',
    authorRole: '活动与传播',
    title: '活动回顾：WPS AI 发布会、白皮书与行业报告亮点',
    excerpt: '梳理发布会核心信息、白皮书关键结论与评估报告，帮助团队快速判断应用优先级。',
    readTime: '4 分钟阅读',
    tags: ['发布会', '白皮书', '行业报告'],
    image:
      'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1400&q=80',
    imageAlt: '发布会与白皮书报告',
    body: [
      '在发布会中，WPS 展示了覆盖写作、表格、演示与 PDF 的一体化 AI 工作流策略。',
      '同步发布的白皮书给出了不同规模组织的实施路径、治理建议和落地优先级框架。',
      '配套评估报告对比了启用前后关键效率指标，为企业制定 ROI 目标提供参考。',
      '对于正在评估引入节奏的团队，这些资料可用于确定试点场景、评估收益并规避常见上线风险。',
    ],
  },
  {
    slug: 'workflow-trend-ai-approval-loop',
    featured: false,
    category: 'industry-trends',
    date: '2026-05-03',
    authorName: 'WPS 研究团队',
    authorRole: '趋势分析师',
    title: '趋势观察：AI 工作流中的“审批闭环”正成为效率新基线',
    excerpt: '越来越多团队采用“AI 生成 + 人工审批”模式，在提速同时保持内容质量稳定。',
    readTime: '5 分钟阅读',
    tags: ['AI 工作流', '审批闭环', '效率'],
    image:
      'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1400&q=80',
    imageAlt: 'AI 工作流审批闭环趋势',
    body: [
      '仅追求生成速度会把问题后移到评审阶段，导致隐性返工成本上升。',
      '通过设置审批闭环，团队可在生成后快速完成事实核验与表达校准。',
      '这种模式已在产品、市场与运营协作中成为更稳妥的效率方案。',
    ],
  },
  {
    slug: 'product-update-writer-ai-rewrite-v3',
    featured: false,
    category: 'product-updates',
    date: '2026-05-02',
    authorName: 'Writer 团队',
    authorRole: '产品经理',
    title: '产品更新：Writer AI 改写 v3，语气控制与一致性显著提升',
    excerpt: '新版改写引擎新增语气预设、版式保留能力和长段稳定性优化。',
    readTime: '4 分钟阅读',
    tags: ['产品更新', 'Writer', 'AI 改写'],
    image:
      'https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?auto=format&fit=crop&w=1400&q=80',
    imageAlt: 'Writer AI 改写更新',
    body: [
      'v3 增加了商务正式、中性表达、客户沟通等语气模式，便于场景化输出。',
      '在双语与长文场景中，段落结构保留更稳定，后期人工修订量明显下降。',
      '团队可将通过审核的改写风格固化为预设，复用于高频沟通任务。',
    ],
  },
  {
    slug: 'customer-story-retail-ops-automation',
    featured: false,
    category: 'customer-stories',
    date: '2026-04-30',
    authorName: 'WPS 客户成功团队',
    authorRole: '方案架构师',
    title: '客户案例：零售运营团队将周报交付周期缩短 50%',
    excerpt: '通过模板标准化、AI 摘要与共享看板，区域零售团队实现周报提速与口径统一。',
    readTime: '6 分钟阅读',
    tags: ['客户案例', '零售', '最佳实践'],
    image:
      'https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=1400&q=80',
    imageAlt: '零售客户案例',
    body: [
      '项目启动前，各门店报表结构不一致，汇总流程依赖大量人工整合。',
      '团队上线统一模板与 AI 摘要卡片后，管理层可更快读取关键结论。',
      '最终交付周期缩短约一半，跨区域数据解释口径也更一致。',
    ],
  },
  {
    slug: 'expert-insight-ai-content-governance',
    featured: false,
    category: 'viewpoints',
    date: '2026-04-28',
    authorName: 'WPS 策略实验室',
    authorRole: '治理研究',
    title: '专家洞察：AI 内容治理应从“输出标准”而非“工具清单”开始',
    excerpt: '稳定落地的团队普遍先定义质量检查点与审批角色，再决定工具组合。',
    readTime: '5 分钟阅读',
    tags: ['专家洞察', '治理', '方法论'],
    image:
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1400&q=80',
    imageAlt: '专家洞察与治理',
    body: [
      '工具优先的上线方式往往导致各团队各自定义标准，结果质量波动较大。',
      '更稳的做法是先明确事实核验、语气一致性与格式合规等输出标准。',
      '当标准稳定后，自动化能力才更容易跨团队复制并持续迭代。',
    ],
  },
  {
    slug: 'event-recap-apac-ai-office-summit',
    featured: false,
    category: 'events',
    date: '2026-04-26',
    authorName: 'WPS 新闻中心',
    authorRole: '活动团队',
    title: '活动回顾：APAC AI 办公峰会与实施手册发布',
    excerpt: '汇总客户分享、行业基准与落地手册发布要点，便于团队快速对照执行。',
    readTime: '4 分钟阅读',
    tags: ['活动', '峰会', '实施手册'],
    image:
      'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=1400&q=80',
    imageAlt: 'APAC 峰会活动回顾',
    body: [
      '本次峰会聚焦金融、医疗、制造等行业的 AI 办公落地案例。',
      '嘉宾分享了提升交付质量的治理策略与可量化采用指标。',
      '同步发布的实施手册提供了分阶段上线步骤和 KPI 跟踪模板。',
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
  { id: 'terminology', labelKey: 'Terminology', labelZh: '术语定义', labelJa: '用語定義', labelKo: '용어 정의' },
  { id: 'comparison', labelKey: 'Concept Comparison', labelZh: '概念对比', labelJa: '概念比較', labelKo: '개념 비교' },
  { id: 'principles', labelKey: 'Principles', labelZh: '原理浅析', labelJa: '原理解説', labelKo: '원리 해설' },
  { id: 'boundaries', labelKey: 'Boundaries & Pitfalls', labelZh: '使用边界与误区', labelJa: '利用境界と注意点', labelKo: '사용 경계와 주의점' },
  { id: 'learning-path', labelKey: 'Learning Path', labelZh: '关联学习路径', labelJa: '学習パス', labelKo: '학습 경로' },
  { id: 'model-capabilities', labelKey: 'Model Capabilities', labelZh: '模型能力', labelJa: 'モデル能力', labelKo: '모델 역량' },
  { id: 'prompt-strategies', labelKey: 'Prompt Strategies', labelZh: '提示策略', labelJa: 'プロンプト戦略', labelKo: '프롬프트 전략' },
  { id: 'workflow-design', labelKey: 'Workflow Design', labelZh: '流程设计', labelJa: 'ワークフロー設計', labelKo: '워크플로 설계' },
  { id: 'quality-evaluation', labelKey: 'Quality Evaluation', labelZh: '质量评估', labelJa: '品質評価', labelKo: '품질 평가' },
]

export const encyclopediaCategoryBySlug = {
  accessibility: 'principles',
  'account-billing': 'principles',
  ocr: 'terminology',
  'prompt-engineering': 'terminology',
  'context-window': 'terminology',
  hallucination: 'terminology',
  'few-shot-prompting': 'principles',
  'rag-retrieval-augmented-generation': 'principles',
  'e-signature-vs-digital-signature': 'comparison',
  'docx-vs-pdf': 'comparison',
  'ai-adoption-principles': 'principles',
  'ai-boundaries-misuse': 'boundaries',
  'ai-learning-path': 'learning-path',
  collaboration: 'principles',
  'excel-templates': 'learning-path',
  'forms-surveys': 'learning-path',
  'mobile-apps': 'learning-path',
  'pdf-convert': 'comparison',
  'pdf-edit': 'comparison',
  'presentation-themes': 'learning-path',
  'system-requirements': 'boundaries',
  'account-login': 'boundaries',
  'subscription-plans': 'boundaries',
  'family-edition': 'boundaries',
  'cloud-sync': 'principles',
  'real-time-collaboration': 'principles',
  'version-history': 'principles',
  'security-privacy': 'boundaries',
  'office-compatibility': 'comparison',
  'pdf-compatibility': 'comparison',
  'faq-account-billing': 'boundaries',
  'faq-files-formats': 'boundaries',
}

export const encyclopediaCategoryImageMap = {
  terminology:
    'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1400&q=80',
  comparison:
    'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1400&q=80',
  principles:
    'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1400&q=80',
  boundaries:
    'https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=1400&q=80',
  'learning-path':
    'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1400&q=80',
  'model-capabilities':
    'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=80',
  'prompt-strategies':
    'https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=1400&q=80',
  'workflow-design':
    'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1400&q=80',
  'quality-evaluation':
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1400&q=80',
}
