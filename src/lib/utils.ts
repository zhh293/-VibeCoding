import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function formatDate(date: string | Date) {
    return new Intl.DateTimeFormat('zh-CN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }).format(new Date(date))
}

export function formatDateShort(date: string | Date) {
    return new Intl.DateTimeFormat('zh-CN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    }).format(new Date(date))
}

export function formatRelativeTime(date: string | Date) {
    const now = new Date()
    const targetDate = new Date(date)
    const diffInSeconds = Math.floor((now.getTime() - targetDate.getTime()) / 1000)

    if (diffInSeconds < 60) {
        return '刚刚'
    }

    const diffInMinutes = Math.floor(diffInSeconds / 60)
    if (diffInMinutes < 60) {
        return `${diffInMinutes} 分钟前`
    }

    const diffInHours = Math.floor(diffInMinutes / 60)
    if (diffInHours < 24) {
        return `${diffInHours} 小时前`
    }

    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays < 7) {
        return `${diffInDays} 天前`
    }

    const diffInWeeks = Math.floor(diffInDays / 7)
    if (diffInWeeks < 4) {
        return `${diffInWeeks} 周前`
    }

    const diffInMonths = Math.floor(diffInDays / 30)
    if (diffInMonths < 12) {
        return `${diffInMonths} 个月前`
    }

    const diffInYears = Math.floor(diffInDays / 365)
    return `${diffInYears} 年前`
}

export function calculateReadTime(content: string) {
    const wordsPerMinute = 200 // 中文阅读速度
    const words = content.trim().split(/\s+/).length
    const minutes = Math.ceil(words / wordsPerMinute)
    return `${minutes} 分钟`
}

export function slugify(text: string) {
    return text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '') // 移除特殊字符
        .replace(/[\s_-]+/g, '-') // 替换空格和下划线为连字符
        .replace(/^-+|-+$/g, '') // 移除首尾连字符
}

export function truncateText(text: string, maxLength: number) {
    if (text.length <= maxLength) return text
    return text.slice(0, maxLength).trim() + '...'
}

export function debounce<T extends (...args: any[]) => any>(
    func: T,
    wait: number
): (...args: Parameters<T>) => void {
    let timeout: NodeJS.Timeout
    return (...args: Parameters<T>) => {
        clearTimeout(timeout)
        timeout = setTimeout(() => func(...args), wait)
    }
}

export function throttle<T extends (...args: any[]) => any>(
    func: T,
    limit: number
): (...args: Parameters<T>) => void {
    let inThrottle: boolean
    return (...args: Parameters<T>) => {
        if (!inThrottle) {
            func(...args)
            inThrottle = true
            setTimeout(() => (inThrottle = false), limit)
        }
    }
}

export function generateId() {
    return Math.random().toString(36).substr(2, 9)
}

export function isValidEmail(email: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
}

export function isValidUrl(url: string) {
    try {
        new URL(url)
        return true
    } catch {
        return false
    }
}

export function getInitials(name: string) {
    return name
        .split(' ')
        .map(word => word.charAt(0))
        .join('')
        .toUpperCase()
        .slice(0, 2)
}

export function copyToClipboard(text: string) {
    if (navigator.clipboard) {
        return navigator.clipboard.writeText(text)
    } else {
        // 降级方案
        const textArea = document.createElement('textarea')
        textArea.value = text
        document.body.appendChild(textArea)
        textArea.focus()
        textArea.select()
        try {
            document.execCommand('copy')
        } catch (err) {
            console.error('复制失败:', err)
        }
        document.body.removeChild(textArea)
    }
}

export function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
}

export function scrollToElement(elementId: string) {
    const element = document.getElementById(elementId)
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
    }
}

