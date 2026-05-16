const localeToContentLanguageMap = {
  'en-us': 'en',
  'es-es': 'es',
  'de-de': 'de',
  'fr-fr': 'fr',
  'ja-jp': 'ja',
  'ko-kr': 'ko',
  'pt-br': 'pt',
  'ar-sa': 'ar',
  'it-it': 'it',
  'nl-nl': 'nl',
  'pl-pl': 'pl',
  'tr-tr': 'tr',
  'id-id': 'id',
  'th-th': 'th',
  'vi-vn': 'vi',
  'ms-my': 'ms',
  'zh-cn': 'zh',
  'zh-tw': 'zh-tw',
  'ru-ru': 'ru',
}

const contentLanguageFallbackMap = {
  es: 'en',
  de: 'en',
  fr: 'en',
  ja: 'en',
  ko: 'en',
  pt: 'en',
  ar: 'en',
  it: 'en',
  nl: 'en',
  pl: 'en',
  tr: 'en',
  id: 'en',
  th: 'en',
  vi: 'en',
  ms: 'en',
  'zh-tw': 'zh',
  ru: 'en',
}

function withContentLanguageAliases(source) {
  const entries = Object.entries(contentLanguageFallbackMap).map(([language, fallbackLanguage]) => [
    language,
    source[fallbackLanguage] ?? source.en,
  ])
  return {
    ...source,
    ...Object.fromEntries(entries),
  }
}

export function resolveContentLanguage(locale = 'en-us') {
  const normalized = `${locale}`.toLowerCase().replace(/_/g, '-')
  const mapped = localeToContentLanguageMap[normalized]
  if (mapped) {
    return mapped
  }
  if (normalized.startsWith('zh')) {
    return 'zh'
  }
  return normalized.split('-')[0] || 'en'
}

const docsQuickTabsEn = [
  'Getting Started',
  'Writer',
  'Presentation',
  'Spreadsheet',
  'PDF',
  'Smart Docs',
  'Smart Sheets',
  'Smart Forms',
  'Multidim Tables',
  'AI Slides',
  'Resume',
  'WPS Image',
  'Personal Knowledge Base',
  'WPS Captalk',
  'WPS AI Tools',
  'Key Features',
  'Assets & Beautify',
  'Online Tools',
  'Use Cases',
  'Help & Support',
]

const docsSectionSlugMapEn = {
  'Getting Started': 'getting-started',
  Writer: 'writer',
  Presentation: 'presentation',
  Spreadsheet: 'spreadsheet',
  PDF: 'pdf',
  'Smart Docs': 'smart-doc',
  'Smart Sheets': 'smart-sheet',
  'Smart Forms': 'smart-form',
  'Multidim Tables': 'multidim',
  'AI Slides': 'ai-slides',
  Resume: 'resume',
  'WPS Image': 'wps-image',
  'Personal Knowledge Base': 'knowledge-base',
  'WPS Captalk': 'captalk',
  'WPS AI Tools': 'wps-ai',
  'Key Features': 'features',
  'Assets & Beautify': 'materials',
  'Online Tools': 'online-tools',
  'Use Cases': 'use-cases',
  'Help & Support': 'help',
}

const docsCatalogSectionsEn = [
  { title: 'Getting Started', groups: ['Product overview', 'Install and setup', 'Account and permissions', 'Frequently asked questions'] },
  { title: 'Writer', groups: ['AI Writer', 'Formatting and layout', 'Collaboration and comments', 'Translation and proofreading', 'Export and printing'] },
  { title: 'Presentation', groups: ['AI Slides', 'Theme and master slides', 'Animations and transitions', 'Speaker notes', 'Export to video and PDF'] },
  { title: 'Spreadsheet', groups: ['Smart Sheets', 'Formulas and functions', 'Pivot tables', 'Charts and dashboards', 'Data import and cleanup'] },
  { title: 'PDF', groups: ['Format conversion', 'Page editing', 'Annotations and signatures', 'OCR and text extraction', 'AI PDF workflows'] },
  { title: 'Smart Docs', groups: ['Smart drafting', 'Context-aware rewriting', 'Document summarization', 'Tone adaptation'] },
  { title: 'Smart Sheets', groups: ['Natural language formulas', 'Data analysis suggestions', 'Chart generation', 'Audit and explanation'] },
  { title: 'Smart Forms', groups: ['Form creation', 'Question logic', 'Response collaboration', 'Export responses to sheets'] },
  { title: 'Multidim Tables', groups: ['Table structures', 'Views and filters', 'Permissions and workflows', 'Automation hooks'] },
  { title: 'AI Slides', groups: ['Outline generation', 'Auto layout', 'Slide rewriting', 'Speaker note assistance'] },
  { title: 'Resume', groups: ['Resume templates', 'Cover letter templates', 'Content polishing', 'Export and sharing'] },
  { title: 'WPS Image', groups: ['Image enhancement', 'Background removal', 'Format conversion', 'Image compression'] },
  { title: 'Personal Knowledge Base', groups: ['Collection and indexing', 'Search and retrieval', 'Knowledge organization', 'Content reuse'] },
  { title: 'WPS Captalk', groups: ['Speech-to-text', 'Meeting notes', 'Summary extraction', 'Action item tracking'] },
  { title: 'WPS AI Tools', groups: ['AI writing toolkit', 'AI presentation toolkit', 'AI image toolkit', 'AI research toolkit'] },
  { title: 'Key Features', groups: ['Cloud sync', 'Cross-device editing', 'Version history', 'Security and privacy'] },
  { title: 'Assets & Beautify', groups: ['Template assets', 'Icons and illustrations', 'Brand materials', 'Visual consistency'] },
  { title: 'Online Tools', groups: ['File conversion', 'Compression and optimization', 'Document utilities', 'Social media tools'] },
  { title: 'Use Cases', groups: ['Students and education', 'Workplace productivity', 'Content creation', 'Team collaboration'] },
  { title: 'Help & Support', groups: ['Release notes', 'FAQ and troubleshooting', 'Submit a ticket', 'Contact support'] },
]

export const docsEnglishContent = {
  ui: {
    heroTitle: 'WPS Docs Center',
    searchSrOnly: 'Search documentation',
    heroSearchPlaceholder: 'Search docs by keyword',
    heroSearchButton: 'Search',
    sidebarSearchPlaceholder: 'Search in directory',
    directoryTitle: 'Directory',
    faqTitle: 'Frequently asked questions',
    backToTopAriaLabel: 'Back to top',
  },
  quickTabs: docsQuickTabsEn,
  jumpCards: [
    { title: 'Product Intro', sub: 'Positioning and installation guide', section: 'Getting Started' },
    { title: 'Plans & Billing', sub: 'Plan tiers and feature comparison', section: 'Getting Started' },
    { title: 'Learning Center', sub: 'Video tutorials for typical tasks', section: 'Writer' },
    { title: 'Community Hub', sub: 'Discuss and exchange with users', section: 'PDF' },
    { title: 'Template Center', sub: 'Explore downloadable templates', section: 'Resume' },
  ],
  sectionSlugMap: docsSectionSlugMapEn,
  catalogSections: docsCatalogSectionsEn,
  faqItems: [
    {
      title: 'How do I choose the right WPS plan?',
      desc: 'Compare Free, Pro, and Team plans by AI usage limits, collaboration features, and admin controls.',
    },
    {
      title: 'Can I import Microsoft Office files?',
      desc: 'Yes. WPS supports DOCX, XLSX, PPTX, and common PDF workflows with high compatibility.',
    },
    {
      title: 'How do I report a bug with reproducible steps?',
      desc: 'Collect app version, platform details, and operation steps, then submit a ticket in Help & Support.',
    },
    {
      title: 'Where can I learn AI features quickly?',
      desc: 'Start with Smart Docs, Smart Sheets, and AI Slides sections for beginner workflows and examples.',
    },
    {
      title: 'How can teams standardize templates and styles?',
      desc: 'Use shared template libraries, naming rules, and brand assets to enforce consistent output.',
    },
  ],
  sectionMarkersMap: {},
}

export const docsUiByLanguage = withContentLanguageAliases({
  en: docsEnglishContent.ui,
  zh: {
    heroTitle: 'WPS 文档中心',
    searchSrOnly: '文档搜索',
    heroSearchPlaceholder: '请输入关键词搜索产品文档',
    heroSearchButton: '搜索',
    sidebarSearchPlaceholder: '在目录中搜索',
    directoryTitle: '文档目录',
    faqTitle: '常见问题 FAQ',
    backToTopAriaLabel: '回到顶部',
  },
})

export const answersForumFilterSectionsEn = [
  {
    title: 'Content',
    options: [
      { key: 'all', label: 'All questions', active: true },
      { key: 'no-answer', label: 'No answers' },
      { key: 'has-answer', label: 'Has answers' },
      { key: 'no-answer-or-comments', label: 'No answers or comments' },
      { key: 'accepted-answer', label: 'Accepted answers' },
      { key: 'recommended-answer', label: 'Recommended answers' },
    ],
  },
]

export const answersForumQuestionItemsEn = [
  {
    badge: 'Official Reply',
    title: '',
    excerpt: '',
    topic: '',
    replies: 6,
    votes: 23,
    author: 'WPS Support Engineer · Lina',
    updatedAt: 'Today 14:38',
  },
  {
    badge: 'Accepted',
    title: '',
    excerpt: '',
    topic: '',
    replies: 4,
    votes: 17,
    author: 'Community Moderator · Kevin',
    updatedAt: 'Today 11:24',
  },
  {
    badge: 'Popular',
    title: '',
    excerpt: '',
    topic: '',
    replies: 3,
    votes: 31,
    author: 'Product Consultant · Amber',
    updatedAt: 'Yesterday 20:57',
  },
  {
    badge: '',
    title: '',
    excerpt: '',
    topic: '',
    replies: 2,
    votes: 9,
    author: 'Enterprise User · Ning Wang',
    updatedAt: 'Yesterday 17:05',
  },
  {
    badge: 'Official Reply',
    title: '',
    excerpt: '',
    topic: '',
    replies: 8,
    votes: 28,
    author: 'AI Product Manager · Iris',
    updatedAt: 'Yesterday 10:43',
  },
  {
    badge: '',
    title: '',
    excerpt: '',
    topic: '',
    replies: 5,
    votes: 14,
    author: 'Operations Specialist · Mia',
    updatedAt: '05-13 18:19',
  },
]

export const answersForumTemplatesByLanguage = withContentLanguageAliases({
  en: {
    titleTemplates: [
      'what should I check first when layouts break after batch processing?',
      'how can we reduce version conflicts in multi-user collaboration?',
      'why does exported output differ from the editing view?',
      'how do we keep rendering consistent across platforms?',
      'what reusable workflow can standardize repeated tasks?',
      'how can we balance AI efficiency with controllable outcomes?',
    ],
    excerptTemplates: [
      'In {topic} workflows, we often hit “looks fine locally but broken online”. We need a reliable troubleshooting order to reproduce and isolate root causes.',
      'Multiple roles edit the same files in {topic} and versions keep overwriting each other. Looking for a clear collaboration guideline to reduce rework.',
      'The same file behaves differently between editing mode and exported output, especially in paragraphs, charts, or comments. Which settings should we verify first?',
      'There are visible differences when opening the same file on Windows and macOS. How should we configure {topic} for consistent delivery?',
      'We want to turn frequent tasks into reusable operation templates for faster onboarding. Which {topic} steps should be standardized first?',
      'AI improves speed, but we still need outcome control. In {topic} workflows, what checkpoints help keep quality stable?',
    ],
    topicTags: ['Basics', 'Collaboration', 'Export & Compatibility', 'Cross-platform', 'Workflow Templates', 'AI Practice'],
  },
  zh: {
    titleTemplates: [
      '批量处理后样式错位，应该先检查哪些设置？',
      '多人协作下版本冲突频发，推荐怎样的流程？',
      '导出结果与编辑页不一致，这类问题如何排查？',
      '跨平台打开后显示差异明显，如何保证一致性？',
      '想把重复步骤标准化，有没有可复用的实践方案？',
      '接入 AI 辅助后，如何平衡效率与结果可控性？',
    ],
    excerptTemplates: [
      '在 {topic} 场景下，团队经常会遇到“本地正常、线上错位”的情况，想要一套可以稳定复现和定位问题的排查顺序。',
      '目前我们在使用 {topic} 时由多个角色共同编辑，版本来回覆盖。希望建立一条明确的协作规范，减少返工成本。',
      '同一个文件在编辑态与导出态表现不同，尤其是段落、图表或批注部分。希望知道优先检查的关键选项。',
      'Windows 与 macOS 打开同一份内容时会有细节差异，想了解在 {topic} 里该如何配置，避免交付前反复校对。',
      '团队希望把常见任务沉淀为操作模板，提升新人上手速度。请问在 {topic} 方向有哪些值得先固化的步骤？',
      '引入 AI 后效率提升明显，但也担心结果不可控。想知道在 {topic} 工作流里，怎样设置检查点更稳妥。',
    ],
    topicTags: ['基础使用', '协作规范', '导出与兼容', '跨端一致性', '流程模板', 'AI 实践'],
  },
})

export const answersUiByLanguage = withContentLanguageAliases({
  en: {
    heroKicker: 'WPS AI Community',
    heroTitle: 'What do you need help with today?',
    heroDescription:
      'Explore verified tips from the community and support engineers, or search existing questions before posting a new one.',
    heroSearchPlaceholder: 'Search topics, feature names, or error codes',
    heroSearchButton: 'Search',
    popularTitle: 'Popular Products & Categories',
    howToTitle: 'How to use Answers effectively',
    howToDescription: 'A few simple habits help you get faster and more accurate replies.',
    stepLabel: 'Step',
    communitiesTitle: 'Other WPS Communities',
    communitiesDescription: 'Join specialized spaces to discuss roadmap ideas and advanced workflows.',
    forumBackHome: '← Back to Answers Home',
    forumKicker: 'WPS AI Answers',
    forumTitleSuffix: 'Community',
    forumIntroPrefix: 'This topic focuses on',
    forumIntroConnector: ', and the question list and filters are organized around',
    forumIntroSuffix: 'workflows, collaboration patterns, and troubleshooting scenarios.',
    forumFiltersTitle: 'Filters',
    forumSummaryMiddle: 'questions related to',
    forumSortLabel: 'Sort by: Recently updated ▾',
    forumRepliesLabel: 'Replies',
    forumVotesLabel: 'Votes',
    forumUpdatedPrefix: 'Updated',
  },
  zh: {
    heroKicker: 'WPS AI Community',
    heroTitle: '今天你需要什么帮助？',
    heroDescription: '浏览来自社区与支持工程师的经验建议，或先搜索已有问题，再发布新提问。',
    heroSearchPlaceholder: '搜索主题、功能名或错误码',
    heroSearchButton: '搜索',
    popularTitle: '热门产品与分类',
    howToTitle: '如何更高效地使用 Answers',
    howToDescription: '保持几个简单习惯，可以更快拿到更准确的回复。',
    stepLabel: '步骤',
    communitiesTitle: '其他 WPS 社区',
    communitiesDescription: '加入专题社区，讨论路线图想法与进阶工作流实践。',
    forumBackHome: '← 返回 Answers 首页',
    forumKicker: 'WPS AI Answers',
    forumTitleSuffix: '问答社区',
    forumIntroPrefix: '当前主题聚焦于',
    forumIntroConnector: '方向，问题列表与筛选项都围绕',
    forumIntroSuffix: '的典型使用场景、协作流程和故障排查展开。',
    forumFiltersTitle: '筛选器',
    forumSummaryMiddle: '个问题与',
    forumSortLabel: '排序依据：已更新 ▾',
    forumRepliesLabel: '回答',
    forumVotesLabel: '赞同',
    forumUpdatedPrefix: '更新于',
  },
})
