"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import * as ProjectAPI from "@/lib/project-api";

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    try {
      setLoading(true);
      const list = await ProjectAPI.fetchProjects();
      setProjects(list || []);
    } catch (err: any) {
      setError(err?.message || "加载失败");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function onDelete(id: string) {
    if (!confirm("确定要删除该项目吗？")) return;
    await ProjectAPI.deleteProject(id);
    await load();
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">项目管理</h1>
        <Link href="/admin/projects/new" className="rounded bg-indigo-600 px-3 py-1.5 text-sm text-white hover:bg-indigo-700">
          新建项目
        </Link>
      </div>

      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
      {loading ? (
        <p className="mt-6 text-gray-500">加载中…</p>
      ) : (
        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-3 py-2 text-left text-sm font-semibold text-gray-700">标题</th>
                <th className="px-3 py-2 text-left text-sm font-semibold text-gray-700">精选</th>
                <th className="px-3 py-2 text-left text-sm font-semibold text-gray-700">标签数</th>
                <th className="px-3 py-2 text-right text-sm font-semibold text-gray-700">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {projects.map((p) => (
                <tr key={p.id}>
                  <td className="px-3 py-2 text-sm">{p.title}</td>
                  <td className="px-3 py-2 text-sm">{p.featured ? "是" : "否"}</td>
                  <td className="px-3 py-2 text-sm">{(p.tags || []).length}</td>
                  <td className="px-3 py-2 text-right text-sm">
                    <Link href={`/admin/projects/edit/${p.id}`} className="mr-3 text-indigo-600 hover:underline">
                      编辑
                    </Link>
                    <button onClick={() => onDelete(p.id)} className="text-red-600 hover:underline">
                      删除
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}