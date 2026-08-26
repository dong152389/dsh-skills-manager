# dsh-skills-manager

DeepSeek Harness 的 Skills 目录管理插件。它把当前 DSH 的 `skills` registry 放进一个设置页：按工作区发现技能、搜索技能、查看来源与正文，并在发现不完整或外部文件刚刚变化时手动刷新。

## 功能

- **工作区范围**：最近工作区、任意已登记工作区，或全部全局技能。
- **目录检索**：按名称、描述、provider 与 source 即时过滤。
- **详情检查器**：显示 invocation 能力、来源、资源基目录、文件路径与完整 Markdown 正文。
- **资源目录**：从设置页直接打开当前项目或用户级的 `.agents/skills` / `.dsh/skills` 目录，Skill 文件在资源目录中维护。
- **启用/禁用**：分别控制模型调用和用户调用；开关会更新 Skill 文件中的 `disable-model-invocation` / `user-invocable` 字段，并自动刷新目录。
- **可编辑边界**：registry 本身仍是只读运行时数据；只有项目、用户和 custom 文件来源可修改，bundled/runtime 等只读来源会禁用操作。
- **深浅色主题**：只使用 DSH 的主题变量，设置页保持与宿主视觉一致。

## 本地开发

在仓库根目录执行：

```powershell
npm run build
dsh plugin --profile web add link:.
```

`link:.` 会把当前包链接进 `~/.dsh/profiles/web`，并通过 `cordis.patch.yml` 自动加入 Web profile。安装或更新后需要重启正在运行的 `dsh web`，然后刷新 `http://127.0.0.1:3080`。

如果 profile 里已经存在同名包，先移除再重新链接：

```powershell
dsh plugin --profile web remove dsh-skills-manager
dsh plugin --profile web add link:.
```

## 目录结构

```text
src/host.js       # Host：读取 skills Service，注册 skillsManager Typert Remote 服务
src/client.js     # Client：设置页 UI 源码（由 build 脚本包成 lazy-CJS）
lib/index.js      # Host 正式入口
lib/client.js     # Web 正式入口
cordis.patch.yml  # Profile bundle 挂载声明（同时启用 skill-filesystem 全局发现）
scripts/build.mjs # 生成两个 lib 文件
```

## 验证

重启 Web profile 后打开 `http://127.0.0.1:3080`，进入「设置 → Skills」即可看到目录面板；配置树可通过以下命令确认：

```powershell
dsh web --dump-config | findstr /i "skills-manager skill-filesystem"
```

Skill 文件需要以 `---` 开始的 YAML frontmatter，并至少包含 kebab-case 的 `name` 与非空 `description`。
