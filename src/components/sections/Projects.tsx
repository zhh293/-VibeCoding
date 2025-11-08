"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ExternalLink, Github, Eye } from "lucide-react";
import * as ProjectAPI from "@/lib/project-api";

// 旧的静态列表组件已移除，下面为新的动态数据组件

export default function Projects() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const [projects, setProjects] = useState<ProjectAPI.Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let cancelled = false;
        async function load() {
            try {
                setLoading(true);
                const list = await ProjectAPI.fetchProjects();
                if (!cancelled) setProjects(list || []);
            } catch (e: any) {
                if (!cancelled) setError(e?.message || "加载项目失败");
            } finally {
                if (!cancelled) setLoading(false);
            }
        }
        load();
        return () => { cancelled = true };
    }, []);

    const featuredProjects = useMemo(() => projects.filter(p => p.featured), [projects]);
    const otherProjects = useMemo(() => projects.filter(p => !p.featured), [projects]);

    return (
        <section ref={ref} className="section-padding bg-white">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                        精选项目
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        以下是我参与开发的一些代表性项目，展示了我的技术能力和创新思维
                    </p>
                </motion.div>

                {/* 精选项目 */}
                <div className="grid lg:grid-cols-2 gap-8 mb-16">
                    {loading && (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div className="h-48 rounded-xl bg-gray-100 animate-pulse" />
                            <div className="h-48 rounded-xl bg-gray-100 animate-pulse" />
                        </div>
                    )}
                    {!loading && featuredProjects.length === 0 && (
                        <div className="text-gray-500">暂无精选项目</div>
                    )}
                    {!loading && featuredProjects.map((project, index) => (
                        <motion.div
                            key={project.title}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            className="group"
                        >
                            <div className="card overflow-hidden hover:shadow-xl transition-all duration-300">
                                {/* 项目图片 */}
                                <div className="relative overflow-hidden rounded-t-xl">
                                    <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                                        <div className="text-6xl font-bold gradient-text opacity-50">
                                            {project.title.charAt(0)}
                                        </div>
                                    </div>
                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
                                        <a
                                            href={project.github || undefined}
                                            className="p-3 bg-white rounded-full hover:scale-110 transition-transform"
                                            aria-label="查看源码"
                                        >
                                            <Github className="w-5 h-5 text-gray-700" />
                                        </a>
                                        <a
                                            href={project.demo || undefined}
                                            className="p-3 bg-white rounded-full hover:scale-110 transition-transform"
                                            aria-label="查看演示"
                                        >
                                            <ExternalLink className="w-5 h-5 text-gray-700" />
                                        </a>
                                    </div>
                                </div>

                                {/* 项目内容 */}
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
                                        {project.title}
                                    </h3>
                                    <p className="text-gray-600 mb-4 leading-relaxed">
                                        {project.description}
                                    </p>

                                    {/* 技术标签 */}
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {(project.tags || []).map((tag) => (
                                            <span
                                                key={tag}
                                                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-primary/10 hover:text-primary transition-colors"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    {/* 操作按钮 */}
                                    <div className="flex space-x-4">
                                        <a
                                            href={project.github || undefined}
                                            className="flex items-center text-sm font-medium text-gray-700 hover:text-primary transition-colors"
                                        >
                                            <Github className="w-4 h-4 mr-2" />
                                            源码
                                        </a>
                                        <a
                                            href={project.demo || undefined}
                                            className="flex items-center text-sm font-medium text-gray-700 hover:text-primary transition-colors"
                                        >
                                            <Eye className="w-4 h-4 mr-2" />
                                            演示
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* 其他项目 */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
                        更多项目
                    </h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {loading && (
                            <>
                                <div className="h-40 rounded-lg bg-gray-100 animate-pulse" />
                                <div className="h-40 rounded-lg bg-gray-100 animate-pulse" />
                                <div className="h-40 rounded-lg bg-gray-100 animate-pulse" />
                            </>
                        )}
                        {!loading && otherProjects.length === 0 && (
                            <div className="text-gray-500">暂无更多项目</div>
                        )}
                        {!loading && otherProjects.map((project, index) => (
                            <motion.div
                                key={project.title}
                                initial={{ opacity: 0, y: 30 }}
                                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                                className="group"
                            >
                                <div className="card hover:shadow-lg transition-all duration-300 group-hover:-translate-y-1">
                                    {/* 项目图片 */}
                                    <div className="relative overflow-hidden rounded-t-lg mb-4">
                                        <div className="aspect-video bg-gradient-to-br from-secondary/20 to-accent/20 flex items-center justify-center">
                                            <div className="text-4xl font-bold text-secondary opacity-50">
                                                {project.title.charAt(0)}
                                            </div>
                                        </div>
                                    </div>

                                    {/* 项目内容 */}
                                    <div>
                                        <h4 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                                            {project.title}
                                        </h4>
                                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                                            {project.description}
                                        </p>

                                        {/* 技术标签 */}
                                        <div className="flex flex-wrap gap-1 mb-3">
                                            {(project.tags || []).slice(0, 3).map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                            {(project.tags || []).length > 3 && (
                                                <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                                                    +{(project.tags || []).length - 3}
                                                </span>
                                            )}
                                        </div>

                                        {/* 操作按钮 */}
                                        <div className="flex space-x-3">
                                            <a
                                                href={project.github || undefined}
                                                className="flex items-center text-xs text-gray-500 hover:text-primary transition-colors"
                                            >
                                                <Github className="w-3 h-3 mr-1" />
                                                源码
                                            </a>
                                            <a
                                                href={project.demo || undefined}
                                                className="flex items-center text-xs text-gray-500 hover:text-primary transition-colors"
                                            >
                                                <ExternalLink className="w-3 h-3 mr-1" />
                                                演示
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* 查看更多按钮 */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.8, delay: 1 }}
                    className="text-center mt-12"
                >
                    <button className="btn-primary group">
                        查看更多项目
                        <ExternalLink className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                </motion.div>
            </div>
        </section>
    )
}

