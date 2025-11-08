"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import * as ProjectAPI from "@/lib/project-api";

export default function EditProjectPage() {
  const router = useRouter();
  const params = useParams();
  const id = (params as { id: string })?.id;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tagsInput, setTagsInput] = useState("");
  const [github, setGithub] = useState("");
  const [demo, setDemo] = useState("");
  const [featured, setFeatured] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const p = await ProjectAPI.fetchProjectById(id);
        setTitle(p?.title || "");
        setDescription(p?.description || "");
        setTagsInput((p?.tags || []).join(", "));
        setGithub(p?.github || "");
        setDemo(p?.demo || "");
        setFeatured(!!p?.featured);
      } catch (err: any) {
        setError(err?.message || "加载失败");
      } finally {
        setLoading(false);
      }
    }
    if (id) load();
  }, [id]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      setSaving(true);
      setError(null);
      const tags = tagsInput
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);
      await ProjectAPI.updateProject(id, {
        title,
        description,
        tags,
        github: github || undefined,
        demo: demo || undefined,
        featured,
      });
      router.push("/admin/projects");
    } catch (err: any) {
      setError(err?.message || "保存失败");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="text-xl font-bold">编辑项目</h1>
      {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
      {loading ? (
        <p className="mt-6 text-gray-500">加载中…</p>
      ) : (
        <form onSubmit={onSubmit} className="mt-6 space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700">标题</label>
            <input
              className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">描述</label>
            <textarea
              className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">标签（逗号分隔）</label>
            <input
              className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">GitHub 链接</label>
              <input
                className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm"
              value={github}
              onChange={(e) => setGithub(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">演示链接</label>
              <input
                className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm"
              value={demo}
              onChange={(e) => setDemo(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <input id="featured" type="checkbox" checked={featured} onChange={(e) => setFeatured(e.target.checked)} />
            <label htmlFor="featured" className="text-sm text-gray-700">
              设为精选
            </label>
          </div>
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={saving}
              className="rounded bg-indigo-600 px-4 py-2 text-sm text-white hover:bg-indigo-700 disabled:opacity-50"
            >
              {saving ? "保存中…" : "保存"}
            </button>
            <button type="button" onClick={() => router.push("/admin/projects")} className="rounded border px-4 py-2 text-sm">
              取消
            </button>
          </div>
        </form>
      )}
    </div>
  );
}