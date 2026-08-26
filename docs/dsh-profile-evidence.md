# Disposable DSH Profile evidence

This record is an isolated acceptance result for `dsh-skills-manager` `0.1.1`.

- Checked: 2026-08-26 (Asia/Shanghai)
- DSH: `0.1.1-rc.2`
- Node.js: `v24.16.0`
- Host: Windows
- Profile: temporary `web` Profile under a temporary `DSH_HOME`; the real user Profile was not used

## Results

| Operation | Result | Observable evidence |
| --- | --- | --- |
| Install | PASS | `dsh plugin --profile web add link:.` completed; `dsh web --dump-config` contained exactly the plugin entry `skills-manager` and the patched `skill-filesystem` entry. |
| Start | PASS | `dsh web` booted and reported `http://127.0.0.1:3080`; an HTTP request to that address returned `200`. The process was then stopped with `Ctrl+C`. |
| Uninstall | PASS | `dsh plugin --profile web remove dsh-skills-manager` completed; a subsequent config dump contained no `skills-manager` entry. |

These results are disposable-Profile evidence only. They do not claim a real user Profile installation, a third-party security audit, or compatibility with DSH releases other than `0.1.1-rc.2`.
