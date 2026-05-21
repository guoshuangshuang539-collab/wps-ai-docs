export const ALL_DOC_LANGS = ['zh-cn', 'zh-tw', 'en-us', 'ja-jp', 'ko-kr', 'es-mx']
const ADMIN_TREE_STORE_KEY = 'WPS_DOC_TREE_V4'
const ADMIN_NODE_META_STORE_KEY = 'WPS_DOC_NODE_META_V4'

export function createDocsPathKey(pathParts = []) {
  return pathParts.filter(Boolean).join(' / ')
}

function safeReadJsonFromLocalStorage(storeKey, fallbackValue) {
  if (typeof window === 'undefined' || !window.localStorage) {
    return fallbackValue
  }
  try {
    const raw = window.localStorage.getItem(storeKey)
    if (!raw) {
      return fallbackValue
    }
    const parsed = JSON.parse(raw)
    return parsed ?? fallbackValue
  } catch {
    return fallbackValue
  }
}

function normalizeDocSlug(value = '') {
  const normalized = `${value}`
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
  return normalized || 'doc'
}

function getRouteSlugFromUrl(url = '') {
  const text = `${url}`.trim()
  if (!text) {
    return ''
  }
  const match = text.match(/\/docs\/[^/]+\/([^/?#]+)\/?$/i)
  return match?.[1] ?? ''
}

function collectAdminTreePaths(treeNodes = [], parentPath = [], output = new Map()) {
  treeNodes.forEach((node) => {
    const title = `${node?.title ?? ''}`.trim()
    if (!title || !node?.id) {
      return
    }
    const pathParts = [...parentPath, title]
    output.set(node.id, pathParts)
    if (Array.isArray(node.children) && node.children.length) {
      collectAdminTreePaths(node.children, pathParts, output)
    }
  })
  return output
}

function pickPublishedHelpContent(helpContent = {}, publishedLangs = []) {
  const next = {}
  publishedLangs.forEach((langCode) => {
    const content = `${helpContent?.[langCode] ?? ''}`.trim()
    if (content) {
      next[langCode] = content
    }
  })
  return next
}

function loadAdminPublishedMetaEntries(staticMap) {
  const adminTree = safeReadJsonFromLocalStorage(ADMIN_TREE_STORE_KEY, [])
  const adminNodeMeta = safeReadJsonFromLocalStorage(ADMIN_NODE_META_STORE_KEY, {})
  if (!Array.isArray(adminTree) || !adminTree.length || !adminNodeMeta || typeof adminNodeMeta !== 'object') {
    return []
  }

  const idPathMap = collectAdminTreePaths(adminTree)
  const entries = []

  Object.entries(adminNodeMeta).forEach(([nodeId, rawMeta]) => {
    const pathParts = idPathMap.get(nodeId)
    if (!pathParts || pathParts.length < 2) {
      return
    }
    const publishedLangs = Array.isArray(rawMeta?.publishedLangs)
      ? rawMeta.publishedLangs.filter((langCode) => ALL_DOC_LANGS.includes(langCode))
      : []
    if (!publishedLangs.length) {
      return
    }
    const helpContent = pickPublishedHelpContent(rawMeta?.helpContent ?? {}, publishedLangs)
    if (!Object.keys(helpContent).length) {
      return
    }

    const pathKey = createDocsPathKey(pathParts)
    const staticEntry = staticMap[pathKey]
    const routeSlug =
      staticEntry?.routeSlug
      || getRouteSlugFromUrl(rawMeta?.url)
      || normalizeDocSlug(pathParts[pathParts.length - 1])

    entries.push({
      pathParts,
      pathKey,
      routeSlug,
      helpContent,
      publishedLangs,
      source: 'docs-admin',
    })
  })

  return entries
}

const writerHelpContent = {
  'zh-cn': `# WPS 文字 帮助中心

> 适用平台：桌面版/Web 版/移动版 | 更新日期：2024 年 5 月 22 日

---

## 产品概述

WPS 文字（WPS Office Writer）是一款面向所有用户免费的功能强大文字处理器，旨在帮助用户轻松创建、编辑和分享专业文档。作为 Microsoft Word 的兼容替代方案，它提供无缝的文档处理体验，支持 Windows、Mac、Linux、Android 和 iOS 全平台。产品内置智能 AI 写作助手，可协助生成全文、润色语气及总结复杂文本，显著提升工作效率。WPS 文字兼容包括 .doc、.docx 在内的 15 种文件格式，确保文本、格式及布局在传输过程中保持完整。此外，用户可通过云平台跨设备同步文档，享受实时协作、版本历史追踪及超过 10 万款免费模板资源，满足从日常办公到创意写作的多样化需求。

## 获取客户端

### 获取桌面版

> **📥 获取方式**
> 前往 WPS Office 官网 [wps.com](https://www.wps.com) 下载并安装桌面客户端。

### 获取手机版

> **📥 获取方式**
> 在 App Store 或 Google Play 搜索「WPS Office」安装。

### 打开 Web 版

> **📥 获取方式**
> 直接访问 [WPS 官网](https://www.wps.com) 无需安装即可使用。

## 快速入门

3 步即可完成文档创建、编辑与分享任务。

### 前提条件
- 已安装客户端或已访问 Web 版
- 已登录 WPS 账号（用于云同步与协作）

### 第 1 步：创建或打开文档
启动 WPS 文字，选择新建空白文档或从本地/云端打开现有文件，支持 .doc、.docx 等多种格式。

### 第 2 步：编辑与 AI 辅助
输入内容或使用内置 AI 写作功能生成文章、润色 tone 及总结文本，利用海量模板快速排版。

### 第 3 步：保存与协作分享
文档自动同步至云端，可生成链接分享给同事，支持实时协作编辑及查看版本历史。

### 下一步
- [AI 智能写作](#ai-writing) — 以智能辅助革新您的工作流程
- [多格式兼容](#file-compatibility) — 确保文件在不同平台间无缝流转

## 核心功能

### AI 智能写作
WPS 文字集成了智能 AI 写作助手，不仅帮助格式化文档，还能主动协助生成全文、润色语气和总结复杂文本。无论您需要扩展思路还是精修内容，该功能确保以最小的努力获得专业结果，彻底改变您的工作流程。

### 多格式兼容
作为 Microsoft Word 的免费替代方案，WPS 文字兼容 15 种文件格式，包括 .doc、.docx、.docm、.dotm、.txt、.rtf 等。它可以轻松保留文本、标题、颜色、单元格及数字格式、布局和其他组件，确保文件在整个处理过程中保持完整。

### 云同步与协作
WPS 文字方便地在 PC、Mac、Linux、Android 和 iOS 云平台之间同步文档。您可以轻松与朋友和同事分享文档，同时享受实时协作功能。作为 WPS Office 免费套件的一部分，它允许您跟踪每个创意想法的编辑时间、版本历史和贡献者。

### 海量免费模板
WPS Office 提供超过 100,000 款精美模板，助您轻松提升文档质量。平台允许您下载免费且可编辑的模板，自定义引人注目的简历、信件和邀请函。

## 会员与定价

如需了解定价方案，请访问 [wps.com](https://www.wps.com) 或联系官方客服。

## 常见问题

### Q：WPS 文字是否兼容 Microsoft Word 文件？
A：是的，WPS 文字兼容包括 .doc 和 .docx 在内的 15 种文件格式，可轻松保留文本、格式及布局，确保文件完整。

### Q：可以在不同设备间同步文档吗？
A：可以，WPS 文字支持在 Windows、Mac、Linux、Android 和 iOS 云平台之间同步文档，方便随时随地访问。

### Q：使用 WPS 文字需要付费吗？
A：WPS Office Writer 是一款面向所有用户免费的功能强大文字处理器，提供免费版供用户使用，部分高级功能或模板可能涉及增值服务。

---

*如需进一步帮助，请访问 [WPS 官方帮助中心](https://support.wps.cn)*`,
  'zh-tw': `# WPS 文字 說明中心

> 適用平台：桌面版/Web 版/行動版 | 更新日期：2024 年 5 月 22 日

---

## 產品概述

WPS 文字（WPS Office Writer）是一款面向所有使用者免費的功能強大文字處理器，旨在協助使用者輕鬆建立、編輯和分享專業文件。作為 Microsoft Word 的相容替代方案，它提供無縫的文件處理體驗，支援 Windows、Mac、Linux、Android 和 iOS 全平台。產品內建智慧 AI 寫作助理，可協助生成全文、潤飾語氣及總結複雜文字，顯著提升工作效率。WPS 文字相容包括 .doc、.docx 在內的 15 種檔案格式，確保文字、格式及版面配置在傳輸過程中保持完整。此外，使用者可透過雲端平台跨裝置同步文件，享受即時協作、版本歷程追蹤及超過 10 萬款免費範本資源，滿足從日常辦公到創意寫作的多元需求。

## 取得客戶端

### 取得桌面版

> **📥 取得方式**
> 前往 WPS Office 官網 [wps.com](https://www.wps.com) 下載並安裝桌面客戶端。

### 取得手機版

> **📥 取得方式**
> 在 App Store 或 Google Play 搜尋「WPS Office」安裝。

### 開啟 Web 版

> **📥 取得方式**
> 直接訪問 [WPS 官網](https://www.wps.com) 無需安裝即可使用。

## 快速入門

3 步即可完成文件建立、編輯與分享任務。

### 前提條件
- 已安裝客戶端或已訪問 Web 版
- 已登入 WPS 帳號（用於雲端同步與協作）

### 第 1 步：建立或開啟文件
啟動 WPS 文字，選擇新建空白文件或從本機/雲端開啟現有檔案，支援 .doc、.docx 等多種格式。

### 第 2 步：編輯與 AI 輔助
輸入內容或使用內建 AI 寫作功能生成文章、潤飾語氣及總結文字，利用海量範本快速排版。

### 第 3 步：儲存與協作分享
文件自動同步至雲端，可生成連結分享給同事，支援即時協作編輯及查看版本歷程。

### 下一步
- [AI 智慧寫作](#ai-writing) — 以智慧輔助革新您的工作流程
- [多格式相容](#file-compatibility) — 確保檔案在不同平台間無縫流轉

## 核心功能

### AI 智慧寫作
WPS 文字整合了智慧 AI 寫作助理，不僅協助格式化文件，還能主動協助生成全文、潤飾語氣和總結複雜文字。無論您需要擴展思路還是精修內容，該功能確保以最小的努力獲得專業成果，徹底改變您的工作流程。

### 多格式相容
作為 Microsoft Word 的免費替代方案，WPS 文字相容 15 種檔案格式，包括 .doc、.docx、.docm、.dotm、.txt、.rtf 等。它可以輕鬆保留文字、標題、顏色、儲存格及數字格式、版面配置和其他元件，確保檔案在整個處理過程中保持完整。

### 雲端同步與協作
WPS 文字方便地在 PC、Mac、Linux、Android 和 iOS 雲端平台之間同步文件。您可以輕鬆與朋友和同事分享文件，同時享受即時協作功能。作為 WPS Office 免費套件的一部分，它允許您追蹤每個創意想法的編輯時間、版本歷程和貢獻者。

### 海量免費範本
WPS Office 提供超過 100,000 款精美範本，助您輕鬆提升文件品質。平台允許您下載免費且可編輯的範本，自訂引人注目的履歷、信件和邀請函。

## 會員與定價

如需了解定價方案，請訪問 [wps.com](https://www.wps.com) 或聯繫官方客服。

## 常見問題

### Q：WPS 文字是否相容 Microsoft Word 檔案？
A：是的，WPS 文字相容包括 .doc 和 .docx 在內的 15 種檔案格式，可輕鬆保留文字、格式及版面配置，確保檔案完整。

### Q：可以在不同裝置間同步文件嗎？
A：可以，WPS 文字支援在 Windows、Mac、Linux、Android 和 iOS 雲端平台之間同步文件，方便隨時隨地存取。

### Q：使用 WPS 文字需要付費嗎？
A：WPS Office Writer 是一款面向所有使用者免費的功能強大文字處理器，提供免費版供使用者使用，部分進階功能或範本可能涉及增值服務。

---

*如需進一步協助，請訪問 [WPS 官方說明中心](https://support.wps.cn)*`,
  'en-us': `# WPS Writer Help Center

> Supported Platforms: Desktop / Web / Mobile | Last Updated: May 22, 2024

---

## Product Overview

WPS Writer (WPS Office Writer) is a powerful, free-for-all-users word processor designed to help users easily create, edit, and share professional documents. As a compatible alternative to Microsoft Word, it provides a seamless document processing experience with support for Windows, Mac, Linux, Android, and iOS across all platforms. The product features a built-in intelligent AI writing assistant that can help generate full documents, polish tone, and summarize complex text, significantly boosting productivity. WPS Writer is compatible with 15 file formats, including .doc and .docx, ensuring that text, formatting, and layout remain intact during transfer. Additionally, users can sync documents across devices via the cloud platform, enjoying real-time collaboration, version history tracking, and access to over 100,000 free templates to meet diverse needs from daily office work to creative writing.

## Get the Client

### Get the Desktop Version

> **📥 How to Get**
> Visit the WPS Office official website at [wps.com](https://www.wps.com) to download and install the desktop client.

### Get the Mobile Version

> **📥 How to Get**
> Search for "WPS Office" on the App Store or Google Play to install.

### Open the Web Version

> **📥 How to Get**
> Visit the [WPS Website](https://www.wps.com) directly — no installation required.

## Quick Start

Complete document creation, editing, and sharing in just 3 steps.

### Prerequisites
- Client installed or Web version accessed
- Logged into your WPS account (for cloud sync and collaboration)

### Step 1: Create or Open a Document
Launch WPS Writer, choose to create a new blank document or open an existing file from local storage or the cloud, supporting .doc, .docx, and many other formats.

### Step 2: Edit with AI Assistance
Enter content or use the built-in AI writing feature to generate articles, polish tone, and summarize text, and leverage a vast library of templates for quick formatting.

### Step 3: Save and Share for Collaboration
Documents automatically sync to the cloud. Generate a link to share with colleagues, supporting real-time collaborative editing and version history viewing.

### Next Steps
- [AI Smart Writing](#ai-writing) — revolutionize your workflow with smart assistance
- [Multi-Format Compatibility](#file-compatibility) — ensure seamless file transfer across platforms

## Core Features

### AI Smart Writing
WPS Writer integrates an intelligent AI writing assistant that not only helps format documents but also actively assists in generating full articles, polishing tone, and summarizing complex text. Whether you need to expand ideas or refine content, this feature ensures professional results with minimal effort, completely transforming your workflow.

### Multi-Format Compatibility
As a free alternative to Microsoft Word, WPS Writer is compatible with 15 file formats, including .doc, .docx, .docm, .dotm, .txt, .rtf, and more. It effortlessly preserves text, headings, colors, cell and number formatting, layout, and other components, ensuring files remain intact throughout the process.

### Cloud Sync and Collaboration
WPS Writer conveniently syncs documents across PC, Mac, Linux, Android, and iOS cloud platforms. You can easily share documents with friends and colleagues while enjoying real-time collaboration. As part of the free WPS Office suite, it allows you to track editing time, version history, and contributors for every creative idea.

### Massive Free Templates
WPS Office offers over 100,000 beautifully designed templates to help you elevate document quality without hassle. As a versatile free document writer, the platform allows you to download free, editable templates to customize eye-catching resumes, letters, and invitations.

## Membership and Pricing

For pricing plans, visit [wps.com](https://www.wps.com) or contact official customer support.

## Frequently Asked Questions

### Q: Is WPS Writer compatible with Microsoft Word files?
A: Yes, WPS Writer is compatible with 15 file formats including .doc and .docx, effortlessly preserving text, formatting, and layout to ensure file integrity.

### Q: Can I sync documents across different devices?
A: Yes, WPS Writer supports syncing documents across Windows, Mac, Linux, Android, and iOS cloud platforms, making it convenient to access anytime, anywhere.

### Q: Do I need to pay to use WPS Writer?
A: WPS Office Writer is a powerful word processor that is free for all users, offering a free edition for use. Some advanced features or templates may involve value-added services.

---

*For further assistance, visit the [WPS Official Help Center](https://support.wps.cn)*`,
  'ja-jp': `# WPS Writer ヘルプセンター

> 対応プラットフォーム：デスクトップ版 / Web 版 / モバイル版 | 更新日：2024年5月22日

---

## 製品概要

WPS Writer（WPS Office Writer）は、すべてのユーザーに無料で提供されている高機能なワードプロセッサーです。プロフェッショナルな文書を簡単に作成・編集・共有できるよう設計されています。Microsoft Word の互換代替品として、Windows、Mac、Linux、Android、iOS のすべてのプラットフォームでシームレスな文書処理体験を提供します。製品には AI 搭載のスマートライティングアシスタントが内蔵されており、文章全体の生成、トーンの調整、複雑なテキストの要約を支援し、作業効率を大幅に向上させます。WPS Writer は .doc、.docx を含む 15 種類のファイル形式に対応し、転送時のテキスト・書式・レイアウトを確実に保持します。さらに、クラウドプラットフォームを通じてデバイス間でドキュメントを同期でき、リアルタイム共同編集、バージョン履歴の追跡、10 万件以上の無料テンプレートを活用できます。

## クライアントの入手

### デスクトップ版の入手

> **📥 入手方法**
> WPS Office 公式サイト [wps.com](https://www.wps.com) からデスクトップクライアントをダウンロードしてインストールしてください。

### モバイル版の入手

> **📥 入手方法**
> App Store または Google Play で「WPS Office」を検索してインストールしてください。

### Web 版を開く

> **📥 入手方法**
> [WPS 公式サイト](https://www.wps.com) に直接アクセスするだけで、インストール不要で使用できます。

## クイックスタート

3 ステップで文書の作成・編集・共有が完了します。

### 前提条件
- クライアントがインストール済み、または Web 版にアクセス済み
- WPS アカウントにログイン済み（クラウド同期と共同作業に必要）

### ステップ 1：文書の作成または開く
WPS Writer を起動し、新しい空白文書を作成するか、ローカル/クラウドから既存のファイル（.doc、.docx などの多様な形式に対応）を開きます。

### ステップ 2：編集と AI サポート
コンテンツを入力するか、内蔵の AI ライティング機能を使用して記事を生成したり、トーンを調整したり、テキストを要約したりして、豊富なテンプレートで素早くレイアウトを整えます。

### ステップ 3：保存と共同作業のための共有
文書はクラウドに自動同期されます。同僚と共有するためのリンクを生成でき、リアルタイム共同編集やバージョン履歴の確認をサポートします。

### 次のステップ
- [AI スマートライティング](#ai-writing) — スマートなサポートでワークフローを革新
- [マルチフォーマット互換性](#file-compatibility) — プラットフォーム間でのシームレスなファイル転送を確保

## 主な機能

### AI スマートライティング
WPS Writer には、文書のフォーマットを支援するだけでなく、文章全体の生成、トーンの調整、複雑なテキストの要約を積極的に支援するインテリジェント AI ライティングアシスタントが統合されています。アイデアを広げたりコンテンツを磨いたりする際に、最小限の労力でプロフェッショナルな結果を保証し、ワークフローを根本から変革します。

### マルチフォーマット互換性
Microsoft Word の無料代替品として、WPS Writer は .doc、.docx、.docm、.dotm、.txt、.rtf などを含む 15 種類のファイル形式に対応しています。テキスト、見出し、色、セルおよび数値の書式、レイアウト、その他のコンポーネントを難なく保持し、処理全体を通じてファイルの完全性を確保します。

### クラウド同期と共同作業
WPS Writer は、PC、Mac、Linux、Android、iOS のクラウドプラットフォーム間でドキュメントを便利に同期します。友人や同僚と簡単にドキュメントを共有し、リアルタイムでの共同作業を楽しめます。WPS Office の無料スイートの一部として、あらゆるクリエイティブなアイデアの編集時間、バージョン履歴、貢献者を追跡できます。

### 豊富な無料テンプレート
WPS Office は 100,000 件以上の美しいテンプレートを提供し、手間なく文書の品質向上を支援します。汎用性の高い無料文書作成ツールとして、印象的な履歴書、手紙、招待状をカスタマイズするための無料編集可能なテンプレートをダウンロードできます。

## メンバーシップと価格

料金プランについては、[wps.com](https://www.wps.com) をご覧になるか、公式カスタマーサポートにお問い合わせください。

## よくある質問

### Q：WPS Writer は Microsoft Word のファイルと互換性がありますか？
A：はい、WPS Writer は .doc と .docx を含む 15 種類のファイル形式に対応しており、テキスト・書式・レイアウトを難なく保持し、ファイルの完全性を確保します。

### Q：異なるデバイス間でドキュメントを同期できますか？
A：はい、WPS Writer は Windows、Mac、Linux、Android、iOS のクラウドプラットフォーム間でのドキュメント同期をサポートしており、いつでもどこでも便利にアクセスできます。

### Q：WPS Writer の使用には料金がかかりますか？
A：WPS Office Writer はすべてのユーザーに無料で提供されている高機能なワードプロセッサーです。無料版を提供しており、一部の高度な機能やテンプレートには付加価値サービスが含まれる場合があります。

---

*さらなるサポートについては、[WPS 公式ヘルプセンター](https://support.wps.cn) をご覧ください*`,
  'ko-kr': `# WPS Writer 도움말 센터

> 지원 플랫폼: 데스크톱 / 웹 / 모바일 | 업데이트 날짜: 2024년 5월 22일

---

## 제품 개요

WPS Writer(WPS Office Writer)는 모든 사용자에게 무료로 제공되는 강력한 워드 프로세서로, 전문 문서를 쉽게 만들고 편집하고 공유할 수 있도록 설계되었습니다. Microsoft Word의 호환 대안으로서 Windows, Mac, Linux, Android, iOS 모든 플랫폼에서 원활한 문서 처리 경험을 제공합니다. 내장된 지능형 AI 작성 보조 도구가 전체 문서 생성, 톤 조정, 복잡한 텍스트 요약을 지원하여 업무 효율성을 크게 향상시킵니다. WPS Writer는 .doc, .docx를 포함한 15가지 파일 형식과 호환되어 전송 중에도 텍스트, 서식, 레이아웃을 완벽하게 보존합니다. 또한 클라우드 플랫폼을 통해 기기 간 문서를 동기화하고 실시간 협업, 버전 기록 추적, 10만 개 이상의 무료 템플릿을 즐겨 일상 업무부터 창의적인 글쓰기까지 다양한 요구를 충족할 수 있습니다.

## 클라이언트 받기

### 데스크톱 버전 받기

> **📥 받는 방법**
> WPS Office 공식 웹사이트 [wps.com](https://www.wps.com)에서 데스크톱 클라이언트를 다운로드하여 설치하세요.

### 모바일 버전 받기

> **📥 받는 방법**
> App Store 또는 Google Play에서 「WPS Office」를 검색하여 설치하세요.

### 웹 버전 열기

> **📥 받는 방법**
> [WPS 공식 웹사이트](https://www.wps.com)에 직접 접속하면 설치 없이 사용할 수 있습니다.

## 빠른 시작

3단계로 문서 생성, 편집 및 공유 작업을 완료할 수 있습니다.

### 사전 조건
- 클라이언트가 설치되었거나 웹 버전에 접속된 상태
- WPS 계정에 로그인된 상태 (클라우드 동기화 및 협업에 필요)

### 1단계: 문서 생성 또는 열기
WPS Writer를 실행하고 새 빈 문서를 만들거나 로컬/클라우드에서 .doc, .docx 등 다양한 형식의 기존 파일을 엽니다.

### 2단계: 편집 및 AI 지원
내용을 입력하거나 내장된 AI 작성 기능을 사용하여 기사를 생성하고 톤을 조정하고 텍스트를 요약하며, 풍부한 템플릿으로 빠르게 레이아웃을 구성합니다.

### 3단계: 저장 및 협업 공유
문서는 클라우드에 자동으로 동기화됩니다. 동료와 공유할 링크를 생성할 수 있으며 실시간 협업 편집과 버전 기록 확인을 지원합니다.

### 다음 단계
- [AI 스마트 작성](#ai-writing) — 스마트 지원으로 워크플로우를 혁신
- [다중 형식 호환성](#file-compatibility) — 플랫폼 간 원활한 파일 전송 보장

## 핵심 기능

### AI 스마트 작성
WPS Writer에는 문서 서식 지원뿐만 아니라 전체 문서 생성, 톤 조정, 복잡한 텍스트 요약을 적극적으로 지원하는 지능형 AI 작성 보조 도구가 통합되어 있습니다. 아이디어를 확장하거나 내용을 다듬을 때, 이 기능은 최소한의 노력으로 전문적인 결과를 보장하여 워크플로우를 근본적으로 변화시킵니다.

### 다중 형식 호환성
Microsoft Word의 무료 대안으로서 WPS Writer는 .doc, .docx, .docm, .dotm, .txt, .rtf 등을 포함한 15가지 파일 형식과 호환됩니다. 텍스트, 제목, 색상, 셀 및 숫자 서식, 레이아웃 및 기타 구성 요소를 손쉽게 보존하여 처리 전반에 걸쳐 파일 완전성을 보장합니다.

### 클라우드 동기화 및 협업
WPS Writer는 PC, Mac, Linux, Android, iOS 클라우드 플랫폼 간에 편리하게 문서를 동기화합니다. 친구 및 동료와 쉽게 문서를 공유하면서 실시간 협업 기능을 즐길 수 있습니다. WPS Office 무료 제품군의 일부로서 모든 창의적인 아이디어의 편집 시간, 버전 기록 및 기여자를 추적할 수 있습니다.

### 대규모 무료 템플릿
WPS Office는 번거로움 없이 문서 품질을 향상시킬 수 있도록 100,000개 이상의 아름다운 템플릿을 제공합니다. 다목적 무료 문서 작성 도구로서 플랫폼은 눈길을 끄는 이력서, 편지, 초대장을 맞춤 설정하기 위한 무료 편집 가능한 템플릿을 다운로드할 수 있게 해줍니다.

## 멤버십 및 가격

가격 플랜에 대해서는 [wps.com](https://www.wps.com)을 방문하거나 공식 고객 지원에 문의하세요.

## 자주 묻는 질문

### Q: WPS Writer는 Microsoft Word 파일과 호환되나요?
A: 예, WPS Writer는 .doc 및 .docx를 포함한 15가지 파일 형식과 호환되어 텍스트, 서식, 레이아웃을 손쉽게 보존하여 파일 완전성을 보장합니다.

### Q: 다른 기기 간에 문서를 동기화할 수 있나요?
A: 예, WPS Writer는 Windows, Mac, Linux, Android, iOS 클라우드 플랫폼 간의 문서 동기화를 지원하여 언제 어디서나 편리하게 접근할 수 있습니다.

### Q: WPS Writer를 사용하려면 비용이 드나요?
A: WPS Office Writer는 모든 사용자에게 무료로 제공되는 강력한 워드 프로세서로, 무료 버전을 제공합니다. 일부 고급 기능이나 템플릿에는 부가 서비스가 포함될 수 있습니다.

---

*추가 도움이 필요하면 [WPS 공식 도움말 센터](https://support.wps.cn)를 방문하세요*`,
  'es-mx': `# Centro de Ayuda de WPS Writer

> Plataformas compatibles: Escritorio / Web / Movil | Fecha de actualizacion: 22 de mayo de 2024

---

## Descripcion del producto

WPS Writer (WPS Office Writer) es un procesador de texto potente y gratuito para todos los usuarios, disenado para ayudarlos a crear, editar y compartir documentos profesionales facilmente. Como alternativa compatible a Microsoft Word, ofrece una experiencia de procesamiento de documentos sin interrupciones, con soporte para Windows, Mac, Linux, Android e iOS en todas las plataformas. El producto incluye un asistente de escritura inteligente con IA integrado que puede ayudar a generar documentos completos, pulir el tono y resumir textos complejos, mejorando significativamente la productividad. WPS Writer es compatible con 15 formatos de archivo, incluidos .doc y .docx, garantizando que el texto, el formato y el diseno se mantengan intactos durante la transferencia. Ademas, los usuarios pueden sincronizar documentos entre dispositivos a traves de la plataforma en la nube, disfrutando de colaboracion en tiempo real, seguimiento del historial de versiones y acceso a mas de 100,000 plantillas gratuitas.

## Obtener el cliente

### Obtener la version de escritorio

> **📥 Como obtenerlo**
> Visita el sitio web oficial de WPS Office en [wps.com](https://www.wps.com) para descargar e instalar el cliente de escritorio.

### Obtener la version movil

> **📥 Como obtenerlo**
> Busca «WPS Office» en App Store o Google Play para instalarlo.

### Abrir la version web

> **📥 Como obtenerlo**
> Visita directamente el [sitio web oficial de WPS](https://www.wps.com) sin necesidad de instalacion.

## Inicio rapido

Completa las tareas de creacion, edicion y uso compartido de documentos en solo 3 pasos.

### Requisitos previos
- Cliente instalado o version web accedida
- Sesion iniciada en la cuenta de WPS (para sincronizacion en la nube y colaboracion)

### Paso 1: Crear o abrir un documento
Inicia WPS Writer, elige crear un nuevo documento en blanco o abre un archivo existente desde el almacenamiento local o la nube, con soporte para .doc, .docx y muchos otros formatos.

### Paso 2: Editar con asistencia de IA
Ingresa contenido o usa la funcion de escritura IA integrada para generar articulos, pulir el tono y resumir texto, y utiliza una amplia biblioteca de plantillas para un formato rapido.

### Paso 3: Guardar y compartir para colaborar
Los documentos se sincronizan automaticamente con la nube. Puedes generar un enlace para compartir con colegas, con soporte para edicion colaborativa en tiempo real y visualizacion del historial de versiones.

### Proximos pasos
- [Escritura inteligente con IA](#ai-writing) — revoluciona tu flujo de trabajo con asistencia inteligente
- [Compatibilidad con multiples formatos](#file-compatibility) — garantiza la transferencia fluida de archivos entre plataformas

## Funciones principales

### Escritura inteligente con IA
WPS Writer integra un asistente de escritura inteligente con IA que no solo ayuda a formatear documentos, sino que tambien asiste activamente en la generacion de articulos completos, el ajuste del tono y el resumen de textos complejos. Ya sea que necesites expandir ideas o refinar contenido, esta funcion garantiza resultados profesionales con el minimo esfuerzo, transformando completamente tu flujo de trabajo.

### Compatibilidad con multiples formatos
Como alternativa gratuita a Microsoft Word, WPS Writer es compatible con 15 formatos de archivo, incluidos .doc, .docx, .docm, .dotm, .txt, .rtf y mas. Conserva sin esfuerzo el texto, los encabezados, los colores, el formato de celdas y numeros, el diseno y otros componentes, garantizando la integridad de los archivos durante todo el proceso.

### Sincronizacion en la nube y colaboracion
WPS Writer sincroniza documentos de forma conveniente entre plataformas en la nube de PC, Mac, Linux, Android e iOS. Puedes compartir documentos facilmente con amigos y colegas mientras disfrutas de la funcion de colaboracion en tiempo real. Como parte de la suite gratuita de WPS Office, te permite rastrear el tiempo de edicion, el historial de versiones y los colaboradores para cada idea creativa.

### Plantillas gratuitas masivas
WPS Office ofrece mas de 100,000 plantillas disenadas para ayudarte a mejorar la calidad de los documentos sin complicaciones. Como procesador de documentos gratuito versatil, la plataforma te permite descargar plantillas gratuitas y editables para personalizar resumenes, cartas e invitaciones llamativos.

## Membresia y precios

Para conocer los planes de precios, visita [wps.com](https://www.wps.com) o contacta al soporte oficial al cliente.

## Preguntas frecuentes

### P: ¿WPS Writer es compatible con archivos de Microsoft Word?
R: Si, WPS Writer es compatible con 15 formatos de archivo, incluidos .doc y .docx, conservando sin esfuerzo el texto, el formato y el diseno para garantizar la integridad del archivo.

### P: ¿Puedo sincronizar documentos entre diferentes dispositivos?
R: Si, WPS Writer admite la sincronizacion de documentos entre plataformas en la nube de Windows, Mac, Linux, Android e iOS, lo que facilita el acceso en cualquier momento y lugar.

### P: ¿Necesito pagar para usar WPS Writer?
R: WPS Office Writer es un procesador de texto potente y gratuito para todos los usuarios, que ofrece una edicion gratuita. Algunas funciones avanzadas o plantillas pueden implicar servicios de valor anadido.

---

*Para obtener mas ayuda, visita el [Centro de Ayuda oficial de WPS](https://support.wps.cn)*`,
}

const zhOnlyPublishedLangs = ['zh-cn']

function buildZhHelpArticle({
  title,
  summary,
  quickStartIntro,
  steps,
  features,
  faq,
  tips = [],
  updated = '2026 年 5 月 16 日',
  platforms = '桌面版/Web 版/移动版',
}) {
  return `# ${title}

> 适用平台：${platforms} | 更新日期：${updated}

---

## 产品概述

${summary}

## 快速入门

${quickStartIntro}

${steps.map((step, index) => `### 第 ${index + 1} 步：${step.title}
${step.body}`).join('\n\n')}

## 核心能力

${features.map((feature) => `### ${feature.title}
${feature.body}`).join('\n\n')}

${tips.length ? `## 使用建议

${tips.map((tip) => `- ${tip}`).join('\n')}

` : ''}## 常见问题

${faq.map((item) => `### Q：${item.q}
A：${item.a}`).join('\n\n')}

---

*如需进一步帮助，请继续浏览文档中心中的相关栏目。*`
}

function createZhOnlyHelpContent(config) {
  return {
    'zh-cn': buildZhHelpArticle(config),
  }
}

function createInternalDocEntry(pathParts, routeSlug, helpContent, publishedLangs = zhOnlyPublishedLangs) {
  return {
    pathParts,
    routeSlug,
    helpContent,
    publishedLangs: [...publishedLangs],
  }
}

const pptHelpContent = createZhOnlyHelpContent({
  title: 'AI PPT 快速上手',
  summary:
    'AI PPT 文档聚合了来源项目中与演示生成相关的说明内容，适合从主题输入、文档转大纲到生成完整演示文稿的入门场景。你可以从一个标题、几段文本，或现有文档出发，快速生成风格统一的 PPT 初稿。',
  quickStartIntro: '按照下面 3 步即可从想法到演示成稿。',
  steps: [
    {
      title: '输入主题或导入现有内容',
      body:
        '在 AI PPT 中输入主题、演讲目标，或者导入 Word / PDF / 现有文档内容，系统会自动抽取核心信息并生成结构化大纲。',
    },
    {
      title: '选择风格并生成页面',
      body:
        '根据场景选择商业汇报、教学演示、路演提案等风格后，系统会自动生成封面、目录、内容页和结尾页。',
    },
    {
      title: '细化页面并导出',
      body:
        '对单页文案、图示和配色进行微调后，即可继续编辑、导出 PPT 或转为 PDF，满足汇报和分享场景。',
    },
  ],
  features: [
    {
      title: '从文档到演示一键生成',
      body: '可直接基于现有文档内容生成演示结构，减少手工拆页和排版的时间成本。',
    },
    {
      title: '模板与主题自动统一',
      body: '自动套用统一版式、字体和配色，让生成结果更接近正式对外展示的演示质量。',
    },
    {
      title: '适合新手快速起稿',
      body: '即使没有完整的大纲，也能先生成可编辑草稿，再逐页打磨内容。',
    },
  ],
  tips: [
    '先明确目标受众和汇报时长，再决定生成页数。',
    '如果已有 Word 或 PDF 材料，优先导入原文以提升结构准确度。',
    '生成后建议重点检查目录、数据页和结论页。',
  ],
  faq: [
    {
      q: '没有现成大纲也能生成 PPT 吗？',
      a: '可以，只需提供主题、用途或几个关键点，系统会先帮你补齐基础结构。',
    },
    {
      q: '生成后的页面可以继续编辑吗？',
      a: '可以，生成后的内容仍可逐页修改文字、图片、布局和主题风格。',
    },
    {
      q: '适合哪些场景？',
      a: '适合工作汇报、教学课件、项目提案、营销方案和产品介绍等常见演示场景。',
    },
  ],
})

const sheetHelpContent = createZhOnlyHelpContent({
  title: 'AI 表格快速上手',
  summary:
    'AI 表格文档对应来源项目中的 AI Excel / 公式与数据分析能力，适合需要快速建表、生成公式、分析数据和整理结果的办公场景。它可以帮助你从自然语言需求出发，把复杂表格操作变成更直接的问答和生成流程。',
  quickStartIntro: '按照下面 3 步即可完成常见表格任务。',
  steps: [
    {
      title: '准备数据或描述需求',
      body:
        '先导入已有数据表，或直接用自然语言说明你想完成的任务，例如“统计每月销售额”“生成 VLOOKUP 公式”。',
    },
    {
      title: '让 AI 生成公式或分析结果',
      body:
        '系统会根据表头、字段关系和操作意图，自动生成公式、筛选方案、图表建议或分析结论。',
    },
    {
      title: '校验并应用结果',
      body:
        '将 AI 生成的公式、图表或结构应用到工作表中，再结合业务口径做最终校验和调整。',
    },
  ],
  features: [
    {
      title: '自然语言生成公式',
      body: '无需死记复杂函数，也能快速得到查找、汇总、条件判断等常见公式。',
    },
    {
      title: '数据分析更高效',
      body: '可根据现有数据自动给出趋势、异常、对比和图表建议，缩短分析时间。',
    },
    {
      title: '适合高频办公场景',
      body: '预算表、销售报表、运营台账和统计分析等场景都可以直接套用。',
    },
  ],
  tips: [
    '先保证字段命名清晰，AI 更容易理解你的数据结构。',
    '复杂分析建议拆成几个问题逐步提问，而不是一次写太多要求。',
    '应用生成公式后，先抽样核对关键结果。',
  ],
  faq: [
    {
      q: 'AI 可以直接帮我写 Excel 公式吗？',
      a: '可以，你只需要描述目标或业务规则，系统会生成对应函数或公式组合。',
    },
    {
      q: '能处理已有表格数据吗？',
      a: '可以，基于现有字段和数据内容，AI 可以继续做分析、筛选和计算建议。',
    },
    {
      q: '适合新手吗？',
      a: '适合。即使不熟悉函数，也可以先用自然语言得到可用结果，再逐步学习公式逻辑。',
    },
  ],
})

const editConvertHelpContent = createZhOnlyHelpContent({
  title: '编辑转化快速上手',
  summary:
    '编辑转化文档对应来源项目中 PDF 与 Office 文件之间的转换、编辑、压缩和导出说明，适合“先处理内容，再转换格式”的日常高频场景。无论是 PDF 转 Word、Word 转 PDF，还是压缩、拆分和合并，都可以在同一工作流中完成。',
  quickStartIntro: '按照下面 3 步即可完成常见编辑与转换任务。',
  steps: [
    {
      title: '导入源文件',
      body:
        '将 PDF、Word、Excel、PPT 或图片文件上传到对应入口，系统会自动识别文件类型并匹配处理能力。',
    },
    {
      title: '选择转换或编辑方式',
      body:
        '根据目标选择“转 Word”“转 PDF”“压缩”“拆分”“合并”等操作，必要时可先进行页级编辑或内容调整。',
    },
    {
      title: '下载并复核结果',
      body:
        '生成结果后下载文件，并重点检查版式、页码、表格和图片是否与预期一致。',
    },
  ],
  features: [
    {
      title: '多格式互转',
      body: '支持 PDF 与 Word、Excel、PPT、图片等格式之间的互相转换，满足常见办公需求。',
    },
    {
      title: '编辑后再导出',
      body: '可先处理页面、文本或内容结构，再导出目标格式，减少来回修改的次数。',
    },
    {
      title: '适合批量和高频使用',
      body: '对于合并、拆分、压缩等重复性操作，能显著提升效率。',
    },
  ],
  tips: [
    '扫描件建议先做识别或 OCR，再进行编辑和转换。',
    '需要保留版式时，优先选择对应的专用转换入口。',
    '批量处理前先抽样验证一份结果。',
  ],
  faq: [
    {
      q: 'PDF 转 Word 会保留原排版吗？',
      a: '大多数常见场景可以尽量保留原排版，但复杂页面仍建议导出后做一次人工复核。',
    },
    {
      q: '转换前可以先编辑页面吗？',
      a: '可以，部分场景支持先做页级处理，再输出目标格式。',
    },
    {
      q: '适合哪些文件？',
      a: '适合合同、报告、课件、报表和图片材料等需要跨格式流转的办公文件。',
    },
  ],
})

const smartDocHelpContent = createZhOnlyHelpContent({
  title: '智能文档使用说明',
  summary:
    '智能文档聚焦于“基于现有文档继续生成”的工作方式，适合写作扩展、改写润色、内容总结、问答提取和大纲整理等场景。来源项目中的 AI Writer、AI 文档和文档问答等能力，都可以归到这一类工作流中。',
  quickStartIntro: '按照下面 3 步即可开始使用智能文档。',
  steps: [
    {
      title: '准备原文或任务目标',
      body: '你可以直接粘贴文本，也可以基于已有文档提出“总结、改写、扩写、提取要点”等目标。',
    },
    {
      title: '选择 AI 处理方式',
      body: '按需使用续写、润色、问答、提炼摘要或生成大纲等能力，让 AI 基于上下文继续处理。',
    },
    {
      title: '合并结果并继续编辑',
      body: '将生成结果插回文档后，按语气、结构和事实准确性做最终确认，再继续协作或分享。',
    },
  ],
  features: [
    {
      title: '文档级上下文理解',
      body: 'AI 不只处理一句话，而是能围绕整段内容或整篇文档继续生成。',
    },
    {
      title: '适合从草稿到定稿',
      body: '既适合快速起稿，也适合在已有文本基础上做润色、重写和总结。',
    },
    {
      title: '问答与提取更直接',
      body: '面对长文档时，可以直接提问重点信息，而不必逐段手动查找。',
    },
  ],
  tips: [
    '先给出清晰目标，例如“更正式”“压缩到 200 字”“提取 3 个结论”。',
    '涉及事实和数据时，建议人工核对生成结果。',
    '重要文档建议保留原稿与 AI 版本，方便比较差异。',
  ],
  faq: [
    {
      q: '适合处理长文档吗？',
      a: '适合，尤其适合总结、问答和结构梳理类任务。',
    },
    {
      q: '可以只改写某一段吗？',
      a: '可以，支持按选区、段落或整篇内容分别处理。',
    },
    {
      q: '适合哪些类型的写作？',
      a: '适合报告、邮件、方案、会议纪要、营销文案和教学材料等多数文本场景。',
    },
  ],
})

const smartSheetHelpContent = createZhOnlyHelpContent({
  title: '智能表格使用说明',
  summary:
    '智能表格是在传统表格能力上叠加 AI 助手后的工作方式，适合快速建表、批量分析、字段解释、公式生成和结果复盘等场景。它强调的是“让 AI 读懂你的表格，再给出可执行结果”。',
  quickStartIntro: '按照下面 3 步即可开始使用智能表格。',
  steps: [
    {
      title: '导入或创建工作表',
      body: '先准备字段清晰的数据表，或让 AI 根据你的描述直接生成基础表结构。',
    },
    {
      title: '用自然语言发起任务',
      body: '可以提出“生成公式”“找出异常”“汇总趋势”“按条件筛选”等需求，AI 会返回对应结果。',
    },
    {
      title: '应用并验证输出',
      body: '将 AI 输出应用到表格中，并结合业务规则对关键数据做抽样验证。',
    },
  ],
  features: [
    {
      title: '从问题直接到结果',
      body: '省去查函数、写条件和反复试错的过程，用自然语言更快得到答案。',
    },
    {
      title: '支持分析与解释',
      body: '不仅给出结果，还可解释公式逻辑、字段关系和分析原因。',
    },
    {
      title: '更适合复杂表格协作',
      body: '面对多人维护或结构复杂的表格时，能更快定位字段和操作方式。',
    },
  ],
  tips: [
    '复杂任务最好拆成“清洗数据”“生成公式”“做分析”三步。',
    '字段命名尽量避免歧义，如“日期”“金额”“负责人”等。',
    '对外汇报前，建议人工确认核心口径与图表结论。',
  ],
  faq: [
    {
      q: '和普通表格有什么区别？',
      a: '普通表格主要靠手工操作，智能表格则支持通过自然语言直接完成更多复杂任务。',
    },
    {
      q: '能处理已有历史表吗？',
      a: '可以，尤其适合在现有业务表基础上补充分析、生成公式和解释结果。',
    },
    {
      q: '适合哪些岗位？',
      a: '运营、财务、销售、人事和项目管理等需要高频处理数据的岗位都适合。',
    },
  ],
})

const smartFormHelpContent = createZhOnlyHelpContent({
  title: '智能表单使用说明',
  summary:
    '智能表单适合快速创建问卷、登记表、收集单和内部审批表单，并在此基础上结合 AI 生成题目、优化提问逻辑和整理回收结果。它更关注“信息采集流程”的效率和准确性。',
  quickStartIntro: '按照下面 3 步即可完成一个基础表单。',
  steps: [
    {
      title: '确定收集目标',
      body: '先明确你需要收集什么信息，例如报名信息、客户线索、活动反馈或内部审批数据。',
    },
    {
      title: '生成题目与逻辑',
      body: '使用 AI 快速生成字段、问题说明和跳转逻辑，再根据实际流程调整必填项和校验规则。',
    },
    {
      title: '发布并整理结果',
      body: '发布表单后收集填写结果，并将数据自动汇总到表格或统计视图中继续分析。',
    },
  ],
  features: [
    {
      title: '适合快速搭建信息采集流程',
      body: '从字段设计到填写发布都可以在较短时间内完成。',
    },
    {
      title: '支持逻辑与校验',
      body: '可以设置必填、条件分支和基础规则，减少无效提交。',
    },
    {
      title: '结果可继续分析',
      body: '回收后的数据可继续沉淀到表格或其他统计流程中使用。',
    },
  ],
  tips: [
    '问题越清晰，回收数据越好用。',
    '正式发布前先自测一轮完整填写流程。',
    '需要统计分析时，提前规划字段格式。',
  ],
  faq: [
    {
      q: '适合做问卷吗？',
      a: '适合，尤其适合报名、登记、反馈和基础审批类表单场景。',
    },
    {
      q: '能自动汇总结果吗？',
      a: '可以，表单结果可进一步汇总到表格或视图中分析。',
    },
    {
      q: 'AI 能帮我设计题目吗？',
      a: '可以，AI 可以先给出一版字段和题目结构，再由你根据业务需求调整。',
    },
  ],
})

const multidimHelpContent = createZhOnlyHelpContent({
  title: '多维表格使用说明',
  summary:
    '多维表格适合处理结构化协作数据，例如项目任务、客户信息、内容排期和资产台账。相比普通表格，它更强调字段建模、视图切换、多人协作与流程自动化，是文档中心里偏“管理型”的数据工具。',
  quickStartIntro: '按照下面 3 步即可搭建一个基础多维表格。',
  steps: [
    {
      title: '设计字段结构',
      body: '先定义主表和字段类型，例如文本、日期、成员、状态、附件和关联记录等。',
    },
    {
      title: '创建视图与协作规则',
      body: '根据角色创建筛选视图、看板或分组视图，并配置权限、负责人和状态流转规则。',
    },
    {
      title: '沉淀数据并自动化流转',
      body: '随着记录持续进入，多维表格可以成为团队共享的数据底座，再叠加提醒、自动化和统计逻辑。',
    },
  ],
  features: [
    {
      title: '比普通表格更适合协作管理',
      body: '不仅能存数据，还能围绕状态、负责人和流程做组织。',
    },
    {
      title: '多视图适应不同角色',
      body: '同一份数据可按项目、部门或阶段切换不同视图，减少重复维护。',
    },
    {
      title: '适合持续积累业务数据',
      body: '长期使用时更容易沉淀结构化信息并形成统一管理入口。',
    },
  ],
  tips: [
    '先把字段设计清楚，再开始批量录入。',
    '视图命名建议按团队或场景统一规则。',
    '如果后续要自动化，字段结构尽量在前期就稳定下来。',
  ],
  faq: [
    {
      q: '适合用来做项目管理吗？',
      a: '适合，尤其适合任务、进度、负责人和阶段状态都需要结构化管理的项目场景。',
    },
    {
      q: '和普通表格相比优势是什么？',
      a: '更适合多人协作、视图管理、权限控制和流程化使用，而不只是静态数据记录。',
    },
    {
      q: '适合哪些团队？',
      a: '运营、项目、市场、HR、销售和内容团队都很适合使用多维表格沉淀流程数据。',
    },
  ],
})

const aiSlidesHelpContent = createZhOnlyHelpContent({
  title: 'AI Slides 使用说明',
  summary:
    'AI Slides 是来源项目中演示能力的统一入口，覆盖大纲生成、主题排版、单页补充、脑图转幻灯片和演讲视频等相关流程。适合把“想法、文本、文档”快速变成可展示的页面结构。',
  quickStartIntro: '按照下面 3 步即可从内容输入到可展示页面。',
  steps: [
    {
      title: '准备主题或原始内容',
      body: '你可以提供一个主题、导入文档，或直接给出脑图、提纲和关键点。',
    },
    {
      title: '生成结构与页面',
      body: 'AI Slides 会先整理结构，再自动生成页面层级、文案主次和推荐视觉排版。',
    },
    {
      title: '补充细节并完成输出',
      body: '继续调整内容层次、配图和风格后，即可用于演示、汇报或继续导出。',
    },
  ],
  features: [
    {
      title: '覆盖从大纲到成稿的完整链路',
      body: '不只是生成一页，而是支持围绕整套演示内容做持续补充和迭代。',
    },
    {
      title: '适合复杂场景的内容重组',
      body: '面对长文档、脑图和零散素材时，可以更快整理成适合演示的结构。',
    },
    {
      title: '和 AI PPT 互补',
      body: 'AI PPT 更偏快速成稿，AI Slides 更偏围绕演示工作流做持续扩展。',
    },
  ],
  faq: [
    {
      q: '和 AI PPT 有什么区别？',
      a: '两者都能做演示生成，但 AI Slides 更强调围绕演示工作流的扩展能力和内容重组。',
    },
    {
      q: '可以基于脑图生成吗？',
      a: '可以，AI Slides 适合从提纲、脑图或结构化要点快速生成页面。',
    },
    {
      q: '适合哪些场景？',
      a: '适合路演、培训、教学、方案汇报和需要快速组织展示逻辑的场景。',
    },
  ],
})

const resumeHelpContent = createZhOnlyHelpContent({
  title: '简历中心使用说明',
  summary:
    '简历中心适合快速选择模板、生成简历内容、优化措辞并导出成适合投递的版本。来源项目中的简历模板能力和相关文案生成能力，都可以在这里理解为“从模板到内容”的一体化流程。',
  quickStartIntro: '按照下面 3 步即可完成一份基础简历。',
  steps: [
    {
      title: '选择模板或职位方向',
      body: '先根据岗位类型、资历阶段和风格偏好选择模板，例如校招、技术岗、管理岗或创意岗位。',
    },
    {
      title: '填写经历并优化内容',
      body: '输入教育背景、项目经历和工作成果后，可使用 AI 对描述进行精炼、强化和结构化处理。',
    },
    {
      title: '导出并复核投递版本',
      body: '完成版式和内容确认后，导出可投递版本，并根据岗位要求做定制化微调。',
    },
  ],
  features: [
    {
      title: '模板与内容同步优化',
      body: '不仅提供版式模板，也支持对经历描述和亮点表达做进一步打磨。',
    },
    {
      title: '适合不同求职阶段',
      body: '无论是应届生、转岗、晋升或高阶岗位申请，都可以先从模板开始快速成稿。',
    },
    {
      title: '导出和分享更方便',
      body: '完成后可以继续导出、复用和按岗位定制不同版本。',
    },
  ],
  faq: [
    {
      q: '没有现成简历也能开始吗？',
      a: '可以，先选模板，再逐步填写基础信息和经历即可。',
    },
    {
      q: 'AI 可以帮我润色经历描述吗？',
      a: '可以，尤其适合把普通叙述改成更清晰、更结果导向的表达。',
    },
    {
      q: '适合哪些岗位？',
      a: '适合大多数通用岗位，同时也能基于不同模板覆盖校招、技术、产品、运营和管理岗等场景。',
    },
  ],
})

const aiPdfHelpContent = createZhOnlyHelpContent({
  title: 'AI PDF 使用说明',
  summary:
    'AI PDF 聚焦于基于 PDF 内容继续理解、提取与处理的工作方式，适合长文总结、问答检索、翻译和印前优化等场景。它和传统 PDF 编辑、转换能力不同，更强调“读懂内容后继续处理”。',
  quickStartIntro: '按照下面 3 步即可开始使用 AI PDF。',
  steps: [
    {
      title: '上传或打开 PDF',
      body: '先准备需要处理的 PDF 文件，尤其适合论文、合同、报告和较长篇幅的阅读材料。',
    },
    {
      title: '选择 AI 任务',
      body: '可以围绕全文总结、重点问答、双语翻译或内容提取等目标发起任务。',
    },
    {
      title: '整理结果并继续应用',
      body: '将摘要、问答结果或提取信息继续用于阅读、汇报、复盘或后续编辑流程。',
    },
  ],
  features: [
    {
      title: '适合长文阅读场景',
      body: '面对页数较多的 PDF，可以更快定位重点内容。',
    },
    {
      title: '支持问答与总结',
      body: '不必逐页翻找，直接围绕目标问题提取信息即可。',
    },
    {
      title: '可与传统 PDF 流程结合',
      body: '理解内容后，仍可继续配合转换、编辑和导出能力完成完整流程。',
    },
  ],
  faq: [
    {
      q: '适合读论文和合同吗？',
      a: '适合，这类长文档通常最适合先总结、问答再继续深读。',
    },
    {
      q: '和普通 PDF 编辑有什么区别？',
      a: '普通编辑偏页面和内容改动，AI PDF 更偏基于全文内容的理解、提炼和交互。',
    },
    {
      q: '翻译后还能继续编辑吗？',
      a: '可以，AI 结果可作为后续编辑、汇报和沟通的基础材料。',
    },
  ],
})

const staticMetaEntries = [
  createInternalDocEntry(['新手入门', '文档'], 'writer', writerHelpContent, ALL_DOC_LANGS),
  createInternalDocEntry(['新手入门', 'PPT'], 'ppt', pptHelpContent),
  createInternalDocEntry(['新手入门', '表格'], 'sheet', sheetHelpContent),
  createInternalDocEntry(['新手入门', '编辑转化'], 'edit-convert', editConvertHelpContent),
  createInternalDocEntry(['新手入门', '智能文档'], 'smart-doc', smartDocHelpContent),
  createInternalDocEntry(['新手入门', '智能表格'], 'smart-sheet', smartSheetHelpContent),
  createInternalDocEntry(['新手入门', '智能表单'], 'smart-form', smartFormHelpContent),
  createInternalDocEntry(['新手入门', '多维表格'], 'multidim', multidimHelpContent),
  createInternalDocEntry(['新手入门', 'AI slides'], 'ai-slides', aiSlidesHelpContent),
  createInternalDocEntry(['新手入门', '简历'], 'resume', resumeHelpContent),
  createInternalDocEntry(['文档', 'AI 文档'], 'ai-doc', smartDocHelpContent),
  createInternalDocEntry(['演示', 'AI 演示'], 'ai-presentation', pptHelpContent),
  createInternalDocEntry(['表格', 'AI 表格'], 'ai-sheet', sheetHelpContent),
  createInternalDocEntry(['PDF', 'AI PDF'], 'ai-pdf', aiPdfHelpContent),
  createInternalDocEntry(['智能文档', '智能文档'], 'smart-doc', smartDocHelpContent),
  createInternalDocEntry(['智能表格', '智能表格'], 'smart-sheet', smartSheetHelpContent),
  createInternalDocEntry(['智能表单', '智能表单'], 'smart-form', smartFormHelpContent),
  createInternalDocEntry(['多维表格', '多维表格'], 'multidim', multidimHelpContent),
  createInternalDocEntry(['AI Slides', 'AI Slides'], 'ai-slides', aiSlidesHelpContent),
  createInternalDocEntry(['简历', '简历'], 'resume', resumeHelpContent),
  createInternalDocEntry(['WPS AI 工具', 'AI 写作'], 'ai-writing', smartDocHelpContent),
  createInternalDocEntry(['WPS AI 工具', 'AI 表格'], 'ai-sheets', smartSheetHelpContent),
  createInternalDocEntry(['WPS AI 工具', 'AI PDF'], 'ai-pdf', aiPdfHelpContent),
  createInternalDocEntry(['WPS AI 工具', 'AI PPT'], 'ai-ppt', pptHelpContent),
]

export function buildDocsStaticMetaMap() {
  const staticMap = Object.fromEntries(
    staticMetaEntries.map((entry) => {
      const pathKey = createDocsPathKey(entry.pathParts)
      return [
        pathKey,
        {
          ...entry,
          pathKey,
        },
      ]
    }),
  )

  // Overlay docs-admin published content onto static meta entries.
  // This re-links deployed backend content with docs detail pages.
  const adminEntries = loadAdminPublishedMetaEntries(staticMap)
  adminEntries.forEach((entry) => {
    const previous = staticMap[entry.pathKey]
    staticMap[entry.pathKey] = {
      ...(previous ?? {}),
      ...entry,
      pathKey: entry.pathKey,
    }
  })

  return staticMap
}
