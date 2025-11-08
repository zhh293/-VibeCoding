const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

function calculateReadTime(content) {
  const wordsPerMinute = 200
  const words = content.split(/\s+/).length
  const minutes = Math.ceil(words / wordsPerMinute)
  return `${minutes} 分钟`
}

function generateSlug(title) {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

async function main() {
  // Seed blog posts (idempotent)
  const count = await prisma.blogPost.count()
  const samples = [
    {
      title: '深入理解 React 18 并发特性',
      excerpt: '探索 React 18 的并发渲染、Suspense 和自动批处理等新特性，以及如何在实际项目中应用这些功能。',
      content: `# 深入理解 React 18 并发特性\n\nReact 18 引入了许多令人兴奋的新特性，其中最重要的是并发特性。这些特性让 React 应用能够更好地处理大量更新，提供更流畅的用户体验。\n\n## 什么是并发特性？\n\n并发特性是 React 18 的核心改进，它允许 React 中断、暂停、恢复或放弃工作。这意味着 React 可以在处理高优先级更新的同时，暂停低优先级的更新。\n\n## 主要特性\n\n### 1. 自动批处理 (Automatic Batching)\n\n在 React 18 之前，React 只在事件处理器中批处理更新。现在，React 会在所有情况下自动批处理更新。\n\n\`\`\`jsx\n// React 17 中，这些更新会触发两次渲染\nsetTimeout(() => {\n  setCount(c => c + 1);\n  setFlag(f => !f);\n  // React 17 会渲染两次，每次状态更新一次\n}, 1000);\n\n// React 18 中，这些更新会被批处理\nsetTimeout(() => {\n  setCount(c => c + 1);\n  setFlag(f => !f);\n  // React 18 只会渲染一次\n}, 1000);\n\n\`\`\`\n\n### 2. 并发渲染 (Concurrent Rendering)\n\n并发渲染允许 React 在渲染过程中中断工作，处理更高优先级的更新。\n\n\`\`\`jsx\nimport { startTransition } from 'react';\n\n// 高优先级更新\nsetInputValue(input);\n\n// 低优先级更新\nstartTransition(() => {\n  setSearchResults(data);\n});\n\n\`\`\`\n\n### 3. Suspense 改进\n\nReact 18 改进了 Suspense 的行为，现在可以在服务端渲染中使用。`,
      tags: ['React', 'JavaScript', '前端'],
      featured: true,
    },
    {
      title: 'Next.js 14 新特性详解',
      excerpt: '全面解析 Next.js 14 的 App Router、Server Components 和性能优化等新功能。',
      content: `# Next.js 14 新特性详解\n\nNext.js 14 带来了许多令人兴奋的新特性和改进，包括更好的性能、更简单的开发体验和更强大的功能。`,
      tags: ['Next.js', 'React', '全栈'],
      featured: true,
    },
  ]
  if (count === 0) {
    for (const s of samples) {
      await prisma.blogPost.create({
        data: {
          title: s.title,
          excerpt: s.excerpt,
          content: s.content,
          date: new Date('2024-01-15'),
          readTime: calculateReadTime(s.content),
          tags: s.tags,
          featured: s.featured,
          slug: generateSlug(s.title),
        },
      })
    }
    console.log('Seeded blog posts')
  } else {
    console.log('Seed skipped: posts already exist')
  }

  // Seed projects (idempotent)
  const projectCount = await prisma.project.count()
  if (projectCount === 0) {
    await prisma.project.createMany({
      data: [
        {
          title: '现代化电商平台',
          description:
            '基于 Next.js 和 TypeScript 构建的全栈电商应用，集成支付、订单管理、库存系统等模块。',
          tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'MongoDB', 'Stripe'],
          github: 'https://github.com/example/ecommerce',
          demo: 'https://demo.example.com/ecommerce',
          featured: true,
          slug: generateSlug('现代化电商平台'),
        },
        {
          title: '实时聊天应用',
          description:
            '使用 Socket.io 和 React 构建的实时聊天应用，支持群聊、私聊、文件分享等功能。',
          tags: ['React', 'Socket.io', 'Node.js', 'Express', 'MongoDB'],
          github: 'https://github.com/example/chatapp',
          demo: 'https://demo.example.com/chat',
          featured: true,
          slug: generateSlug('实时聊天应用'),
        },
        {
          title: '任务管理工具',
          description:
            '类似 Trello 的任务管理工具，支持拖拽、标签、标记、筛选、统计等功能。',
          tags: ['React', 'Redux', 'Material-UI'],
          github: 'https://github.com/example/tasks',
          demo: 'https://demo.example.com/tasks',
          featured: false,
          slug: generateSlug('任务管理工具'),
        },
        {
          title: '天气应用',
          description:
            '美观的天气应用，支持城市搜索、天气预报、空气质量、历史数据等功能。',
          tags: ['Vue.js', 'Vite', 'OpenWeather API'],
          github: 'https://github.com/example/weather',
          demo: 'https://demo.example.com/weather',
          featured: false,
          slug: generateSlug('天气应用'),
        },
        {
          title: '博客系统',
          description:
            '个人博客系统，支持 Markdown 编辑器、评论系统、SEO 优化等。',
          tags: ['Next.js', 'MDX', 'Contentful'],
          github: 'https://github.com/example/blog',
          demo: 'https://demo.example.com/blog',
          featured: false,
          slug: generateSlug('博客系统'),
        },
      ],
    })
    console.log('Seeded sample projects')
  } else {
    console.log('Seed skipped: projects already exist')
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })