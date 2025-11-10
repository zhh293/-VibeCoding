"use strict";

const path = require("path");
const fs = require("fs");
// dotenv 作为可选依赖：服务器未安装也不影响启动
let dotenv = null;
try {
  dotenv = require("dotenv");
} catch (_) {
  dotenv = null;
}

function parseEnvContent(content) {
  const result = {};
  const lines = String(content).split(/\r?\n/);
  for (const line of lines) {
    if (!line || /^\s*#/.test(line)) continue;
    const m = line.match(/^\s*([\w.-]+)\s*=\s*(.*)\s*$/);
    if (!m) continue;
    let val = m[2];
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    result[m[1]] = val;
  }
  return result;
}

function loadEnvFiles() {
  const files = [".env", ".env.production", ".env.production.local"]; // 后者优先
  for (const f of files) {
    const p = path.resolve(__dirname, f);
    if (fs.existsSync(p)) {
      const content = fs.readFileSync(p);
      const parsed = dotenv && dotenv.parse ? dotenv.parse(content) : parseEnvContent(content);
      for (const [k, v] of Object.entries(parsed)) {
        if (process.env[k] === undefined) process.env[k] = v;
      }
    }
  }
}

function normalizeEnv() {
  const net = require("net");
  process.env.NODE_ENV = process.env.NODE_ENV || "production";
  // 若已有 HOST 但不是有效 IP/localhost，则强制改为 0.0.0.0，避免 DNS 解析失败
  const currentHost = process.env.HOST;
  const isValidHost =
    currentHost === "localhost" || (typeof currentHost === "string" && net.isIP(currentHost) !== 0);
  process.env.HOST = isValidHost ? currentHost : "0.0.0.0";
  // 同步规范化 HOSTNAME，防止读取到不可解析的机器名（如 iZ*** 主机名）
  const currentHostname = process.env.HOSTNAME;
  const isValidHostname =
    currentHostname === "localhost" || (typeof currentHostname === "string" && net.isIP(currentHostname) !== 0);
  process.env.HOSTNAME = isValidHostname ? currentHostname : "0.0.0.0";
  process.env.PORT = process.env.PORT || "3000";

  const raw = process.env.DATABASE_URL;
  if (!raw || raw.startsWith("file:")) {
    let rel = raw ? raw.replace(/^file:/, "") : "prisma/dev.db";
    if (!path.isAbsolute(rel)) rel = path.resolve(__dirname, rel);
    process.env.DATABASE_URL = `file:${rel}`;
  }
}

function verifyArtifacts() {
  const serverJs = path.resolve(__dirname, ".next", "standalone", "server.js");
  if (!fs.existsSync(serverJs)) {
    console.error("未找到 .next/standalone/server.js；请先执行生产构建并启用 output: 'standalone'.");
    process.exit(1);
  }
  return serverJs;
}

function wireProcessHandlers() {
  process.on("uncaughtException", (err) => {
    console.error("[uncaughtException]", err);
  });
  process.on("unhandledRejection", (err) => {
    console.error("[unhandledRejection]", err);
  });
  process.on("SIGINT", () => {
    console.log("[signal] SIGINT received, exiting");
    process.exit(0);
  });
  process.on("SIGTERM", () => {
    console.log("[signal] SIGTERM received, exiting");
    process.exit(0);
  });
}

function startStandalone() {
  process.chdir(__dirname);
  loadEnvFiles();
  normalizeEnv();
  wireProcessHandlers();

  const serverJs = verifyArtifacts();
  console.log(
    `[bootstrap] NODE_ENV=${process.env.NODE_ENV} HOST=${process.env.HOST} HOSTNAME=${process.env.HOSTNAME} PORT=${process.env.PORT}`
  );
  console.log(`[bootstrap] DATABASE_URL=${process.env.DATABASE_URL}`);

  require(serverJs);
}

startStandalone();