# 个人博客项目

基于完整项目文档开发的现代化个人博客系统，集内容管理、社交互动、个人品牌展示于一体。

## ✨ 项目特色

- 🎨 **现代化设计** - 采用最新的设计趋势和动画效果
- ⚡ **高性能** - 基于 Next.js 14 和 React 18 构建
- 📱 **响应式** - 完美适配所有设备尺寸
- 🎯 **SEO 优化** - 搜索引擎友好的结构
- 🚀 **快速加载** - 优化的图片和代码分割
- 🎭 **动画效果** - 流畅的页面转场和交互动画

## 🛠️ 技术栈

### 前端框架
- **Next.js 14** - React 全栈框架
- **TypeScript** - 类型安全
- **Tailwind CSS** - 原子化 CSS 框架
- **Framer Motion** - 动画库
- **Three.js** - 3D 效果

### 内容管理
- **MDX** - Markdown + JSX 混合内容
- **Contentlayer** - 类型安全的内容管理
- **Gray-matter** - Front-matter 解析

### UI 组件
- **Radix UI** - 无障碍组件基础
- **Lucide React** - 图标库
- **React Hook Form** - 表单管理

## 📁 项目结构

```
个人博客/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── globals.css        # 全局样式
│   │   ├── layout.tsx         # 根布局
│   │   └── page.tsx           # 首页
│   ├── components/            # 可复用组件
│   │   └── sections/          # 页面区块组件
│   │       ├── Hero.tsx       # 英雄区域
│   │       ├── About.tsx      # 关于我
│   │       ├── Skills.tsx     # 技能展示
│   │       ├── Projects.tsx   # 项目展示
│   │       ├── Blog.tsx       # 博客列表
│   │       └── Contact.tsx    # 联系我
│   ├── content/              # 内容文件
│   │   └── blog/             # 博客文章
│   ├── lib/                  # 工具函数
│   │   ├── utils.ts          # 通用工具
│   │   └── animations.ts     # 动画配置
│   └── styles/               # 样式文件
├── public/                   # 静态资源
│   ├── images/              # 图片资源
│   ├── icons/               # 图标文件
│   └── assets/              # 其他资源
├── package.json             # 依赖管理
├── next.config.js           # Next.js 配置
├── tailwind.config.js       # Tailwind 配置
└── tsconfig.json            # TypeScript 配置
```

## 🚀 快速开始

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看项目。

### 构建生产版本

```bash
npm run build
npm start
```

## 📝 功能模块

### 1. 首页展示模块
- 3D 背景动画 + 个人介绍
- 动态技能条和项目卡片
- 最新文章瀑布流展示
- 访客统计和社交链接

### 2. 文章管理模块
- 网格/列表视图切换
- 分类筛选和标签系统
- 全文搜索和智能建议
- 多种排序选项

### 3. 文章详情模块
- 阅读进度和侧边导航
- 自动生成文章目录
- 代码高亮和数学公式
- 图片放大和分享功能

### 4. 交互功能模块
- 评论系统集成
- 点赞收藏功能
- 阅读时间预估
- 相关文章推荐

### 5. 个人展示模块
- 个人介绍和经历时间线
- 作品集和项目详情
- 可视化技能展示
- 简历下载和联系方式

### 6. 视觉特效模块
- 流畅的页面转场动画
- 滚动触发的元素动画
- 自定义鼠标光标效果
- 粒子背景和主题切换

## 🎨 设计规范

### 色彩系统
- **主色调**: 靛蓝色 (#6366f1)
- **辅助色**: 琥珀色 (#f59e0b)
- **强调色**: 粉红色 (#ec4899)

### 字体系统
- **主字体**: Inter (现代无衬线字体)
- **代码字体**: JetBrains Mono (等宽字体)
- **中文字体**: PingFang SC, Noto Sans SC

### 动画规范
- **缓动函数**: cubic-bezier(0.4, 0, 0.2, 1)
- **持续时间**: 200ms-800ms
- **延迟**: 50ms-200ms

## 📊 性能优化

- **图片优化**: Next.js Image 组件 + WebP 格式
- **代码分割**: 动态导入和路由级分割
- **缓存策略**: 静态资源长期缓存
- **性能指标**: LCP < 2.5s, FID < 100ms, CLS < 0.1

## 🔍 SEO 优化

- **技术 SEO**: 语义化 HTML + Meta 标签优化
- **内容 SEO**: 关键词优化 + 内部链接建设
- **用户体验**: 移动端友好 + 可访问性优化

## 📱 响应式设计

- **移动端**: < 640px
- **平板端**: 641px - 1024px
- **桌面端**: 1025px - 1439px
- **大屏端**: > 1440px

## 🚀 部署

项目已配置 Vercel 部署，支持自动部署和预览。

### 环境变量

```env
NEXT_PUBLIC_SITE_URL=https://your-blog.com
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
GITHUB_TOKEN=your_github_token
```

## 📚 内容管理

### 创建新文章

1. 在 `src/content/blog/` 下创建 MDX 文件
2. 添加 front-matter 元数据
3. 使用 Markdown 语法编写内容
4. 在需要的地方使用 React 组件

### 文章元数据

```yaml
---
title: '文章标题'
excerpt: '文章摘要'
date: '2024-01-01'
tags: ['标签1', '标签2']
readTime: '5 分钟'
featured: true
---
```

## 🤝 贡献

欢迎提交 Issue 和 Pull Request 来改进项目。

## 📄 许可证

MIT License

## 📞 联系方式

- 邮箱: your@email.com
- GitHub: [@yourusername](https://github.com/yourusername)
- 网站: [https://your-blog.com](https://your-blog.com)

---

⭐ 如果这个项目对你有帮助，请给它一个星标！