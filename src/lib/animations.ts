import { Variants } from 'framer-motion'

// 页面转场动画
export const pageVariants: Variants = {
    initial: {
        opacity: 0,
        y: 20,
    },
    in: {
        opacity: 1,
        y: 0,
    },
    out: {
        opacity: 0,
        y: -20,
    },
}

export const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.5,
}

// 淡入动画
export const fadeInUp: Variants = {
    initial: {
        opacity: 0,
        y: 30,
    },
    animate: {
        opacity: 1,
        y: 0,
    },
    exit: {
        opacity: 0,
        y: -30,
    },
}

// 淡入左滑动画
export const fadeInLeft: Variants = {
    initial: {
        opacity: 0,
        x: -30,
    },
    animate: {
        opacity: 1,
        x: 0,
    },
    exit: {
        opacity: 0,
        x: 30,
    },
}

// 淡入右滑动画
export const fadeInRight: Variants = {
    initial: {
        opacity: 0,
        x: 30,
    },
    animate: {
        opacity: 1,
        x: 0,
    },
    exit: {
        opacity: 0,
        x: -30,
    },
}

// 缩放动画
export const scaleIn: Variants = {
    initial: {
        opacity: 0,
        scale: 0.8,
    },
    animate: {
        opacity: 1,
        scale: 1,
    },
    exit: {
        opacity: 0,
        scale: 0.8,
    },
}

// 弹跳动画
export const bounceIn: Variants = {
    initial: {
        opacity: 0,
        scale: 0.3,
    },
    animate: {
        opacity: 1,
        scale: 1,
        transition: {
            type: 'spring',
            stiffness: 300,
            damping: 20,
        },
    },
    exit: {
        opacity: 0,
        scale: 0.3,
    },
}

// 旋转动画
export const rotateIn: Variants = {
    initial: {
        opacity: 0,
        rotate: -180,
    },
    animate: {
        opacity: 1,
        rotate: 0,
    },
    exit: {
        opacity: 0,
        rotate: 180,
    },
}

// 滑入动画（从下往上）
export const slideInUp: Variants = {
    initial: {
        opacity: 0,
        y: 50,
    },
    animate: {
        opacity: 1,
        y: 0,
    },
    exit: {
        opacity: 0,
        y: 50,
    },
}

// 滑入动画（从上往下）
export const slideInDown: Variants = {
    initial: {
        opacity: 0,
        y: -50,
    },
    animate: {
        opacity: 1,
        y: 0,
    },
    exit: {
        opacity: 0,
        y: -50,
    },
}

// 容器动画（用于子元素延迟）
export const containerVariants: Variants = {
    initial: {
        opacity: 0,
    },
    animate: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
    exit: {
        opacity: 0,
    },
}

// 子元素动画
export const itemVariants: Variants = {
    initial: {
        opacity: 0,
        y: 20,
    },
    animate: {
        opacity: 1,
        y: 0,
    },
    exit: {
        opacity: 0,
        y: -20,
    },
}

// 悬停动画
export const hoverScale = {
    scale: 1.05,
    transition: {
        type: 'spring',
        stiffness: 300,
        damping: 20,
    },
}

// 点击动画
export const tapScale = {
    scale: 0.95,
}

// 浮动动画
export const float = {
    y: [0, -10, 0],
    transition: {
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
    },
}

// 脉冲动画
export const pulse = {
    scale: [1, 1.1, 1],
    transition: {
        duration: 1,
        repeat: Infinity,
        ease: 'easeInOut',
    },
}

// 摇摆动画
export const shake = {
    x: [0, -10, 10, -10, 10, 0],
    transition: {
        duration: 0.5,
    },
}

// 渐显动画
export const fadeIn: Variants = {
    initial: {
        opacity: 0,
    },
    animate: {
        opacity: 1,
    },
    exit: {
        opacity: 0,
    },
}

// 渐显动画（带延迟）
export const fadeInWithDelay = (delay: number = 0): Variants => ({
    initial: {
        opacity: 0,
    },
    animate: {
        opacity: 1,
        transition: {
            delay,
        },
    },
    exit: {
        opacity: 0,
    },
})

// 打字机效果
export const typewriter = {
    width: '100%',
    transition: {
        duration: 2,
        ease: 'linear',
    },
}

// 进度条动画
export const progressBar = (progress: number) => ({
    width: `${progress}%`,
    transition: {
        duration: 0.8,
        ease: 'easeOut',
    },
})

// 卡片悬停效果
export const cardHover = {
    y: -5,
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    transition: {
        type: 'spring',
        stiffness: 300,
        damping: 20,
    },
}

// 按钮点击效果
export const buttonTap = {
    scale: 0.98,
    transition: {
        type: 'spring',
        stiffness: 400,
        damping: 17,
    },
}

// 图标旋转效果
export const iconRotate = {
    rotate: 360,
    transition: {
        duration: 0.5,
        ease: 'easeInOut',
    },
}

// 文字打字机效果
export const textReveal = {
    width: '100%',
    transition: {
        duration: 1.5,
        ease: 'easeInOut',
    },
}

// 图片加载效果
export const imageLoad = {
    opacity: [0, 1],
    scale: [1.1, 1],
    transition: {
        duration: 0.6,
        ease: 'easeOut',
    },
}

// 列表项动画
export const listItemVariants: Variants = {
    initial: {
        opacity: 0,
        x: -20,
    },
    animate: (i: number) => ({
        opacity: 1,
        x: 0,
        transition: {
            delay: i * 0.1,
        },
    }),
    exit: {
        opacity: 0,
        x: 20,
    },
}

// 网格动画
export const gridVariants: Variants = {
    initial: {
        opacity: 0,
    },
    animate: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
}

// 网格项动画
export const gridItemVariants: Variants = {
    initial: {
        opacity: 0,
        scale: 0.8,
    },
    animate: {
        opacity: 1,
        scale: 1,
    },
    exit: {
        opacity: 0,
        scale: 0.8,
    },
}

