# Security and permission boundary

`dsh-skills-manager` runs as a Host/Client plugin inside the DSH Web process. It is not a sandbox and inherits the operating-system permissions of that process. The plugin is intentionally kept local-only: it does not make network requests and does not collect or proxy credentials.

## Permission matrix

| Surface | Scope | Boundary and failure behavior |
| --- | --- | --- |
| Filesystem read | DSH Skills registry and selected project/user `skills` directories | Reads are delegated to DSH's `skills` service where possible. Missing directories are created under the selected scope. |
| Filesystem write | User-selected project/user `skills` directories only | Settings-page `toggle` writes through the DSH filesystem service with a per-operation `workspace-write` root limited to the target skill's containing directory, and uses a version precondition to reject concurrent edits. `upload` rejects traversal after path normalization; a failed batch can leave earlier files from the same batch. |
| Commands | System file manager only, on explicit `openFolder` request | Uses fixed executable names and argument arrays. No arbitrary shell command, command text, installer, or remote execution is accepted. |
| Environment | `DSH_HOME` and `DSH_AGENTS_HOME` path overrides | These variables select DSH/Agents roots only. The plugin does not read secrets, tokens, cookies, passwords, or credential stores. |
| Network | None in plugin runtime | No `fetch`, socket, remote API, telemetry, or external service is used by this package. Network may still be used by DSH's package installer and dependency resolver. |
| Profile lifecycle | None in plugin runtime | The Bundle Patch adds the plugin and enables `skill-filesystem`; installation, restart, removal, and rollback remain explicit DSH CLI operations. |

## Non-goals

- Do not modify DSH core packages or official component definitions.
- Do not read or return arbitrary files outside the selected Skills scope.
- Do not execute package lifecycle scripts, shell snippets, installers, or network downloads.
- Do not treat a successful static audit or disposable Profile run as an independent security audit.

The marketplace permission level should remain conservative (`high`/`user-reviewed` or `blocked`) because the Host can write local files and launch an operating-system file manager. Declaring this boundary does not turn those capabilities into `none`.

