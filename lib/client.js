window.__ModuleLoader__.load({
  id: 'dsh-skills-manager',
  factory: (require) => {
    var module = { exports: {} };
    var exports = module.exports;
    Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
    const React = require('react');
const h = (type, props, ...children) => React.createElement(type, props, ...children);

const css = String.raw`
.skm-panel {
  --skm-accent: var(--dsw-alias-brand-primary, #5b5ce2);
  --skm-bg: var(--dsw-alias-bg-layer-1, #ffffff);
  --skm-bg-raised: var(--dsw-alias-bg-layer-2, #f5f6fa);
  --skm-border: var(--dsw-alias-border-l1, rgba(34, 39, 57, 0.12));
  --skm-border-strong: var(--dsw-alias-border-l2, rgba(34, 39, 57, 0.2));
  --skm-text: var(--dsw-alias-label-primary, #202331);
  --skm-muted: var(--dsw-alias-label-secondary, #6c7182);
  --skm-danger: var(--dsw-alias-state-error-primary, #d1495b);
  box-sizing: border-box;
  width: min(100%, 940px);
  color: var(--skm-text);
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Microsoft YaHei", sans-serif;
  font-size: 13px;
  line-height: 1.5;
  padding: 6px 2px 28px;
}
.skm-panel *, .skm-panel *::before, .skm-panel *::after { box-sizing: border-box; }
.skm-panel button, .skm-panel input, .skm-panel select { font: inherit; }
.skm-panel button { color: inherit; }
.skm-panel button:focus-visible,
.skm-listButton:focus-visible,
.skm-selectTrigger:focus-visible {
  outline: none;
  border-color: var(--skm-accent);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--skm-accent) 18%, transparent);
}
.skm-panel input:focus,
.skm-panel input:focus-visible,
.skm-panel select:focus,
.skm-panel select:focus-visible {
  outline: none;
}
.skm-head {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 24px;
  padding: 4px 0 20px;
  border-bottom: 1px solid var(--skm-border);
}
.skm-kicker {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--skm-accent);
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: .14em;
  line-height: 1;
  text-transform: uppercase;
}
.skm-kicker::before {
  content: "";
  display: inline-block;
  width: 24px;
  height: 3px;
  border-radius: 2px;
  background: var(--skm-accent);
}
.skm-title {
  margin: 10px 0 4px;
  font-size: clamp(22px, 3vw, 30px);
  font-weight: 760;
  letter-spacing: -.045em;
  line-height: 1.05;
}
.skm-intro {
  max-width: 620px;
  margin: 0;
  color: var(--skm-muted);
  font-size: 12px;
  line-height: 1.65;
}
.skm-headMark {
  display: grid;
  place-items: center;
  align-self: start;
  width: 62px;
  height: 62px;
  border: 1px solid var(--skm-border-strong);
  border-radius: 18px 18px 18px 4px;
  color: var(--skm-accent);
  background: var(--skm-bg-raised);
  font-family: Georgia, serif;
  font-size: 31px;
  line-height: 1;
  transform: rotate(-5deg);
}
.skm-stats {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 8px;
  padding: 14px 0;
}
.skm-stat {
  min-width: 0;
  padding: 10px 12px;
  border-left: 2px solid var(--skm-border-strong);
  background: color-mix(in srgb, var(--skm-bg-raised) 74%, transparent);
}
.skm-stat:first-child { border-left-color: var(--skm-accent); }
.skm-statValue {
  display: block;
  overflow: hidden;
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 18px;
  font-weight: 760;
  letter-spacing: -.05em;
  line-height: 1.1;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.skm-statLabel {
  display: block;
  margin-top: 4px;
  color: var(--skm-muted);
  font-size: 10px;
  letter-spacing: .04em;
  text-transform: uppercase;
}
.skm-toolbar {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 10px;
  border: 1px solid var(--skm-border);
  border-radius: 12px;
  background: var(--skm-bg);
}
.skm-toolbarRow {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
}
.skm-searchBox {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 170px;
  flex: 1 1 200px;
  height: 36px;
  padding: 0 8px 0 11px;
  border: 1px solid var(--skm-border);
  border-radius: 8px;
  background: var(--skm-bg-raised);
  transition: border-color .16s ease, background .16s ease, box-shadow .16s ease;
}
.skm-searchBox:hover {
  border-color: var(--skm-border-strong);
}
.skm-searchBox:focus-within {
  border-color: var(--skm-accent);
  background: var(--skm-bg);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--skm-accent) 15%, transparent);
}
.skm-searchIcon {
  flex: 0 0 auto;
  color: var(--skm-muted);
  transition: color .16s ease;
}
.skm-searchBox:focus-within .skm-searchIcon {
  color: var(--skm-accent);
}
.skm-searchInput {
  flex: 1;
  min-width: 0;
  height: 100%;
  padding: 0;
  border: 0 !important;
  outline: 0 !important;
  box-shadow: none !important;
  color: var(--skm-text);
  background: transparent;
  font: inherit;
  font-size: 12.5px;
}
.skm-searchInput::placeholder {
  color: var(--skm-muted);
  opacity: .8;
}
.skm-searchClear {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  width: 18px;
  height: 18px;
  padding: 0;
  border: 0;
  border-radius: 50%;
  color: var(--skm-muted);
  background: color-mix(in srgb, var(--skm-muted) 16%, transparent);
  cursor: pointer;
  transition: background .14s ease, color .14s ease;
}
.skm-searchClear:hover {
  color: var(--skm-text);
  background: color-mix(in srgb, var(--skm-muted) 30%, transparent);
}
.skm-select {
  position: relative;
  display: inline-flex;
  flex-direction: column;
  min-width: 0;
}
.skm-selectTrigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  width: 100%;
  height: 36px;
  padding: 0 10px 0 12px;
  border: 1px solid var(--skm-border);
  border-radius: 8px;
  background: var(--skm-bg-raised);
  color: var(--skm-text);
  font: inherit;
  font-size: 12px;
  line-height: 1;
  cursor: pointer;
  user-select: none;
  transition: border-color .16s ease, background .16s ease, box-shadow .16s ease;
}
.skm-selectTrigger:hover {
  border-color: var(--skm-border-strong);
  background: color-mix(in srgb, var(--skm-bg-raised) 75%, var(--skm-bg));
}
.skm-selectOpen .skm-selectTrigger,
.skm-selectTrigger:focus-visible {
  border-color: var(--skm-accent);
  background: var(--skm-bg);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--skm-accent) 15%, transparent);
  outline: none;
}
.skm-selectLabel {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: left;
}
.skm-selectChevron {
  flex: 0 0 auto;
  color: var(--skm-muted);
  transition: transform .18s ease, color .18s ease;
}
.skm-selectOpen .skm-selectChevron {
  transform: rotate(180deg);
  color: var(--skm-accent);
}
.skm-selectMenu {
  position: absolute;
  top: calc(100% + 5px);
  left: 0;
  min-width: 100%;
  width: max-content;
  max-width: 320px;
  max-height: 240px;
  overflow-y: auto;
  overflow-x: hidden;
  z-index: 120;
  padding: 4px;
  border: 1px solid var(--skm-border-strong);
  border-radius: 10px;
  background: var(--skm-bg);
  box-shadow: 0 10px 28px -4px rgba(0, 0, 0, .14), 0 2px 6px rgba(0, 0, 0, .06);
  animation: skm-popIn .12s cubic-bezier(0.16, 1, 0.3, 1);
  scrollbar-width: thin;
  scrollbar-color: var(--skm-border-strong) transparent;
}
.skm-selectMenuRight {
  left: auto;
  right: 0;
}
.skm-selectHint {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 9px;
  margin-bottom: 4px;
  border-bottom: 1px solid var(--skm-border);
  border-radius: 6px;
  background: color-mix(in srgb, var(--skm-accent) 9%, var(--skm-bg-raised));
  color: var(--skm-text);
  font-size: 11px;
  line-height: 1.35;
  user-select: none;
  font-weight: 500;
}
.skm-selectHintIcon {
  flex: 0 0 auto;
  font-size: 12px;
}
@keyframes skm-popIn {
  from { opacity: 0; transform: translateY(-4px) scale(0.98); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}
.skm-selectOption {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  width: 100%;
  padding: 7px 10px;
  border: 0;
  border-radius: 6px;
  background: transparent;
  color: var(--skm-text);
  font: inherit;
  font-size: 12px;
  line-height: 1.4;
  cursor: pointer;
  text-align: left;
  transition: background .12s ease, color .12s ease;
}
.skm-selectOption:hover,
.skm-selectOption:focus-visible {
  background: var(--skm-bg-raised);
  outline: none;
}
.skm-selectOptionSelected {
  background: color-mix(in srgb, var(--skm-accent) 10%, var(--skm-bg));
  color: var(--skm-accent);
  font-weight: 600;
}
.skm-selectOptionText {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.skm-selectOptionCheck {
  flex: 0 0 auto;
  color: var(--skm-accent);
}
.skm-selectOptionCount {
  flex: 0 0 auto;
  color: var(--skm-muted);
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 11px;
}
.skm-selectOptionSelected .skm-selectOptionCount {
  color: var(--skm-accent);
  opacity: .85;
}
.skm-toolbarMeta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px 10px;
  padding-top: 6px;
  border-top: 1px solid var(--skm-border);
  font-size: 11px;
}
.skm-metaCount {
  color: var(--skm-muted);
}
.skm-metaCount strong {
  color: var(--skm-text);
  font-weight: 700;
}
.skm-metaChip {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 2px 7px;
  border: 1px solid var(--skm-border);
  border-radius: 4px;
  background: var(--skm-bg-raised);
  color: var(--skm-text);
  font-size: 11px;
  line-height: 1.3;
}
.skm-metaChipRemove {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: 0;
  background: transparent;
  color: var(--skm-muted);
  cursor: pointer;
  font-size: 12px;
  line-height: 1;
}
.skm-metaChipRemove:hover {
  color: var(--skm-danger);
}
.skm-metaReset {
  margin-left: auto;
  padding: 0;
  border: 0;
  background: transparent;
  color: var(--skm-accent);
  cursor: pointer;
  font-size: 11px;
  text-decoration: underline;
  text-underline-offset: 2px;
}
.skm-metaReset:hover {
  opacity: .8;
}
.skm-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  min-height: 36px;
  padding: 0 13px;
  border: 1px solid var(--skm-border-strong);
  border-radius: 8px;
  color: var(--skm-text);
  background: var(--skm-bg);
  cursor: pointer;
  transition: border-color .16s ease, background .16s ease, transform .16s ease;
}
.skm-button:hover:not(:disabled) { border-color: var(--skm-accent); background: var(--skm-bg-raised); }
.skm-button:active:not(:disabled) { transform: translateY(1px); }
.skm-button:disabled { opacity: .56; cursor: not-allowed; }
.skm-buttonAccent { border-color: var(--skm-accent); color: var(--skm-accent); }
.skm-buttonIcon { display: inline-flex; align-items: center; justify-content: center; flex: 0 0 auto; }
.skm-splitButton {
  position: relative;
  display: inline-flex;
  align-items: stretch;
  height: 36px;
  flex: 0 0 auto;
}
.skm-splitButtonMain {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  height: 100%;
  padding: 0 11px 0 13px;
  border: 1px solid var(--skm-accent);
  border-right: 0;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  color: var(--skm-accent);
  background: var(--skm-bg);
  cursor: pointer;
  white-space: nowrap;
  font: inherit;
  font-size: 12px;
  transition: border-color .16s ease, background .16s ease, transform .16s ease;
}
.skm-splitButtonMain:hover:not(:disabled) {
  background: var(--skm-bg-raised);
}
.skm-splitButtonMain:active:not(:disabled) {
  transform: translateY(1px);
}
.skm-splitButtonMain:disabled {
  opacity: .56;
  cursor: not-allowed;
}
.skm-splitButtonArrow {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 100%;
  padding: 0;
  border: 1px solid var(--skm-accent);
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  color: var(--skm-accent);
  background: var(--skm-bg);
  cursor: pointer;
  position: relative;
  font: inherit;
  transition: border-color .16s ease, background .16s ease;
}
.skm-splitButtonArrow::before {
  content: "";
  position: absolute;
  left: 0;
  top: 7px;
  bottom: 7px;
  width: 1px;
  background: color-mix(in srgb, var(--skm-accent) 30%, transparent);
}
.skm-splitButtonArrow:hover:not(:disabled),
.skm-splitButtonArrowOpen {
  background: var(--skm-bg-raised);
}
.skm-splitButtonArrow:active:not(:disabled) {
  transform: translateY(1px);
}
.skm-splitButtonArrow:disabled {
  opacity: .56;
  cursor: not-allowed;
}
.skm-splitButtonChevron {
  transition: transform .18s ease;
}
.skm-splitButtonArrowOpen .skm-splitButtonChevron {
  transform: rotate(180deg);
}
.skm-splitButtonMenu {
  position: absolute;
  top: calc(100% + 5px);
  right: 0;
  min-width: 130px;
  z-index: 130;
  padding: 4px;
  border: 1px solid var(--skm-border-strong);
  border-radius: 8px;
  background: var(--skm-bg);
  box-shadow: 0 10px 28px -4px rgba(0, 0, 0, .14), 0 2px 6px rgba(0, 0, 0, .06);
  animation: skm-popIn .12s cubic-bezier(0.16, 1, 0.3, 1);
}
.skm-splitButtonItem {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 7px 10px;
  border: 0;
  border-radius: 6px;
  background: transparent;
  color: var(--skm-text);
  font: inherit;
  font-size: 12px;
  cursor: pointer;
  text-align: left;
  transition: background .12s ease, color .12s ease;
}
.skm-splitButtonItem:hover,
.skm-splitButtonItem:focus-visible {
  background: var(--skm-bg-raised);
  color: var(--skm-accent);
  outline: none;
}
@keyframes skm-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
.skm-spin { animation: skm-spin 0.85s linear infinite; }
.skm-status {
  min-height: 20px;
  margin: 8px 2px 0;
  color: var(--skm-muted);
  font-size: 11px;
}
.skm-statusError { color: var(--skm-danger); }
.skm-statusSuccess { color: var(--skm-success, #2f8a68); }
.skm-workbench {
  display: grid;
  grid-template-columns: minmax(230px, .72fr) minmax(0, 1.28fr);
  min-height: 390px;
  margin-top: 8px;
  overflow: hidden;
  border: 1px solid var(--skm-border);
  border-radius: 12px;
  background: var(--skm-bg);
}
.skm-listPane {
  min-width: 0;
  border-right: 1px solid var(--skm-border);
  background: color-mix(in srgb, var(--skm-bg-raised) 42%, var(--skm-bg));
}
.skm-paneHead {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
  padding: 14px 14px 10px;
  border-bottom: 1px solid var(--skm-border);
}
.skm-paneTitle {
  margin: 0;
  font-size: 11px;
  font-weight: 760;
  letter-spacing: .1em;
  text-transform: uppercase;
}
.skm-paneCount {
  color: var(--skm-muted);
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 11px;
}
.skm-list {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 8px;
}
.skm-listButton {
  position: relative;
  display: block;
  width: 100%;
  padding: 10px 11px 10px 13px;
  border: 1px solid transparent;
  border-radius: 8px;
  text-align: left;
  background: transparent;
  cursor: pointer;
}
.skm-listButton:hover { background: var(--skm-bg-raised); }
.skm-listButtonActive {
  border-color: var(--skm-border-strong);
  background: var(--skm-bg);
  box-shadow: 0 3px 12px rgba(0, 0, 0, .04);
}
.skm-listButtonActive::before {
  content: "";
  position: absolute;
  top: 9px;
  bottom: 9px;
  left: 3px;
  width: 2px;
  border-radius: 2px;
  background: var(--skm-accent);
}
.skm-skillName {
  display: block;
  overflow: hidden;
  color: var(--skm-text);
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 12px;
  font-weight: 700;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.skm-skillDescription {
  display: -webkit-box;
  overflow: hidden;
  margin-top: 4px;
  color: var(--skm-muted);
  font-size: 11px;
  line-height: 1.45;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
.skm-listMeta, .skm-tagRow {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  align-items: center;
}
.skm-listMeta { margin-top: 7px; }
.skm-tag {
  display: inline-flex;
  align-items: center;
  max-width: 100%;
  padding: 2px 6px;
  overflow: hidden;
  border: 1px solid var(--skm-border);
  border-radius: 4px;
  color: var(--skm-muted);
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 9px;
  line-height: 1.25;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.skm-tagAccent { border-color: color-mix(in srgb, var(--skm-accent) 40%, var(--skm-border)); color: var(--skm-accent); }
.skm-tagProject { border-color: color-mix(in srgb, var(--skm-accent) 40%, var(--skm-border)); color: var(--skm-accent); }
.skm-tagGlobal { border-color: color-mix(in srgb, #2f8a68 42%, var(--skm-border)); color: var(--skm-success, #2f8a68); }
.skm-tagDisabled { border-color: color-mix(in srgb, var(--skm-danger) 36%, var(--skm-border)); color: var(--skm-danger); }
.skm-empty {
  padding: 28px 16px;
  color: var(--skm-muted);
  font-size: 12px;
  text-align: center;
}
.skm-empty strong { display: block; margin-bottom: 5px; color: var(--skm-text); font-size: 13px; }
.skm-detailPane { min-width: 0; }
.skm-detail {
  padding: 20px 22px 24px;
}
.skm-detailEyebrow {
  color: var(--skm-accent);
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: .12em;
  text-transform: uppercase;
}
.skm-detailTitle {
  margin: 8px 0 6px;
  overflow-wrap: anywhere;
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: clamp(19px, 3vw, 26px);
  font-weight: 760;
  letter-spacing: -.045em;
  line-height: 1.15;
}
.skm-detailDescription {
  max-width: 650px;
  margin: 0;
  color: var(--skm-muted);
  font-size: 13px;
  line-height: 1.65;
}
.skm-detailMeta {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;
  margin-top: 18px;
  padding: 10px;
  border: 1px solid var(--skm-border);
  border-radius: 8px;
  background: color-mix(in srgb, var(--skm-bg-raised) 66%, transparent);
}
.skm-controlPanel {
  margin-top: 18px;
  padding: 12px;
  border: 1px solid var(--skm-border);
  border-radius: 8px;
  background: color-mix(in srgb, var(--skm-bg-raised) 48%, transparent);
}
.skm-controlPanel .skm-sectionLabel { margin-bottom: 4px; }
.skm-controlHint {
  display: block;
  margin: 0 0 10px;
  color: var(--skm-muted);
  font-size: 10px;
  line-height: 1.5;
}
.skm-toggleList { display: grid; gap: 6px; }
.skm-toggleRow {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  padding: 8px 0;
  border-top: 1px solid var(--skm-border);
}
.skm-toggleCopy { min-width: 0; }
.skm-toggleLabel { display: block; font-size: 12px; font-weight: 700; }
.skm-toggleDescription { display: block; margin-top: 2px; color: var(--skm-muted); font-size: 10px; }
.skm-toggleState { display: block; margin-top: 3px; color: var(--skm-muted); font-size: 10px; }
.skm-toggleButton {
  position: relative;
  flex: 0 0 auto;
  width: 42px;
  height: 24px;
  padding: 2px;
  border: 1px solid var(--skm-border-strong);
  border-radius: 999px;
  background: var(--skm-bg);
  cursor: pointer;
  transition: background .16s ease, border-color .16s ease;
}
.skm-toggleButton::after {
  content: "";
  display: block;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: var(--skm-muted);
  transition: transform .16s ease, background .16s ease;
}
.skm-toggleButtonOn { border-color: var(--skm-accent); background: color-mix(in srgb, var(--skm-accent) 12%, var(--skm-bg)); }
.skm-toggleButtonOn::after { transform: translateX(17px); background: var(--skm-accent); }
.skm-toggleButton:disabled { opacity: .56; cursor: not-allowed; }
.skm-metaItem { min-width: 0; }
.skm-metaLabel {
  display: block;
  margin-bottom: 2px;
  color: var(--skm-muted);
  font-size: 10px;
  letter-spacing: .08em;
  text-transform: uppercase;
}
.skm-metaValue {
  display: block;
  overflow: hidden;
  color: var(--skm-text);
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 11px;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.skm-detailSection { margin-top: 21px; }
.skm-sectionLabel {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0 0 8px;
  color: var(--skm-muted);
  font-size: 10px;
  font-weight: 760;
  letter-spacing: .1em;
  text-transform: uppercase;
}
.skm-sectionLabel::after {
  content: "";
  flex: 1;
  height: 1px;
  background: var(--skm-border);
}
.skm-when {
  margin: 0;
  padding: 10px 12px;
  border-left: 2px solid var(--skm-accent);
  color: var(--skm-text);
  background: color-mix(in srgb, var(--skm-accent) 8%, var(--skm-bg));
  font-size: 12px;
  line-height: 1.6;
}
.skm-body {
  max-height: 360px;
  margin: 0;
  padding: 14px;
  overflow: auto;
  border: 1px solid var(--skm-border);
  border-radius: 8px;
  color: var(--skm-text);
  background: color-mix(in srgb, var(--skm-bg-raised) 66%, var(--skm-bg));
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 11px;
  line-height: 1.7;
  white-space: pre-wrap;
  overflow-wrap: anywhere;
}
.skm-skeleton {
  height: 52px;
  margin: 8px;
  border-radius: 8px;
  background: linear-gradient(90deg, var(--skm-bg-raised), color-mix(in srgb, var(--skm-bg-raised) 60%, var(--skm-bg)), var(--skm-bg-raised));
  background-size: 220% 100%;
  animation: skm-shimmer 1.35s ease-in-out infinite;
}
@keyframes skm-shimmer { from { background-position: 100% 0; } to { background-position: -100% 0; } }
@media (prefers-reduced-motion: reduce) { .skm-skeleton { animation: none; } .skm-button { transition: none; } }
@media (max-width: 720px) {
  .skm-head { grid-template-columns: 1fr; }
  .skm-headMark { display: none; }
  .skm-toolbarRow { flex-direction: column; align-items: stretch; }
  .skm-selectMenu { max-width: 100%; width: 100%; left: 0 !important; right: auto !important; }
  .skm-workbench { grid-template-columns: 1fr; }
  .skm-listPane { border-right: 0; border-bottom: 1px solid var(--skm-border); }
  .skm-list { max-height: 270px; overflow: auto; }
}
@media (max-width: 460px) {
  .skm-stats { grid-template-columns: 1fr; }
  .skm-detailMeta { grid-template-columns: 1fr; }
  .skm-detail { padding: 16px 14px 20px; }
}
`;

function errorText(error) {
  if (error && typeof error.message === 'string') return error.message;
  return typeof error === 'string' ? error : '请求失败，请稍后重试。';
}

function sourceLabel(source) {
  if (source === 'project-dsh' || source === 'project-agents') return '项目';
  if (source === 'user-dsh' || source === 'user-agents') return '全局';
  if (source === 'runtime') return '运行时';
  if (source === 'bundled') return '内置';
  if (source === 'custom') return '自定义';
  return source || '其他';
}

function scopeLabel(source) {
  if (source === 'project-dsh' || source === 'project-agents') return '项目';
  if (source === 'user-dsh' || source === 'user-agents') return '全局';
  if (source === 'custom') return '自定义';
  if (source === 'runtime') return '运行时';
  if (source === 'bundled') return '内置';
  return '其他';
}

function scopeClass(source) {
  if (source === 'project-dsh' || source === 'project-agents') return 'skm-tagProject';
  if (source === 'user-dsh' || source === 'user-agents') return 'skm-tagGlobal';
  return '';
}

function workspaceLabel(item) {
  if (!item || typeof item !== 'object') return '';
  return item.title || item.path || '';
}

function RefreshIcon({ spinning }) {
  return h('svg', {
    className: 'skm-buttonIcon' + (spinning ? ' skm-spin' : ''),
    width: 13,
    height: 13,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2.2,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': 'true',
  },
    h('path', { d: 'M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8' }),
    h('polyline', { points: '21 3 21 8 16 8' }),
  );
}

function FolderIcon() {
  return h('svg', {
    className: 'skm-buttonIcon',
    width: 13,
    height: 13,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2.2,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': 'true',
  },
    h('path', { d: 'M3 7.5A1.5 1.5 0 0 1 4.5 6h5l2 2h8A1.5 1.5 0 0 1 21 9.5v8A1.5 1.5 0 0 1 19.5 19h-15A1.5 1.5 0 0 1 3 17.5z' }),
    h('path', { d: 'M3 10h18' }),
  );
}

function readFileAsBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const bytes = new Uint8Array(reader.result);
        let binary = '';
        const len = bytes.byteLength;
        const chunkSize = 0x8000;
        for (let i = 0; i < len; i += chunkSize) {
          binary += String.fromCharCode.apply(null, bytes.subarray(i, Math.min(i + chunkSize, len)));
        }
        resolve(btoa(binary));
      } catch (err) {
        reject(err);
      }
    };
    reader.onerror = () => reject(reader.error || new Error('读取文件失败'));
    reader.readAsArrayBuffer(file);
  });
}

function UploadIcon({ spinning }) {
  if (spinning) {
    return h(RefreshIcon, { spinning: true });
  }
  return h('svg', {
    className: 'skm-buttonIcon',
    width: 13,
    height: 13,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2.2,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': 'true',
  },
    h('path', { d: 'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4' }),
    h('polyline', { points: '17 8 12 3 7 8' }),
    h('line', { x1: 12, y1: 3, x2: 12, y2: 15 }),
  );
}

function FileIcon() {
  return h('svg', {
    className: 'skm-buttonIcon',
    width: 13,
    height: 13,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2.2,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': 'true',
  },
    h('path', { d: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z' }),
    h('polyline', { points: '14 2 14 8 20 8' }),
  );
}

function UploadSplitButton({ uploading, onUploadFile, onUploadFolder }) {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const containerRef = React.useRef(null);

  React.useEffect(() => {
    if (!menuOpen) return undefined;
    const handlePointerDown = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [menuOpen]);

  return h('div', {
    ref: containerRef,
    className: 'skm-splitButton' + (menuOpen ? ' skm-splitButtonOpen' : ''),
  },
    h('button', {
      type: 'button',
      className: 'skm-splitButtonMain',
      disabled: uploading,
      onClick: () => {
        setMenuOpen(false);
        onUploadFile();
      },
      title: '上传文件（文件类型不限制）',
    },
      h(UploadIcon, { spinning: uploading }),
      uploading ? '上传中…' : '上传文件',
    ),
    h('button', {
      type: 'button',
      className: 'skm-splitButtonArrow' + (menuOpen ? ' skm-splitButtonArrowOpen' : ''),
      disabled: uploading,
      onClick: () => setMenuOpen((prev) => !prev),
      title: '更多上传选项（上传文件夹）',
      'aria-haspopup': 'menu',
      'aria-expanded': menuOpen,
      'aria-label': '展开上传选项菜单',
    },
      h('svg', {
        className: 'skm-splitButtonChevron',
        width: 12,
        height: 12,
        viewBox: '0 0 24 24',
        fill: 'none',
        stroke: 'currentColor',
        strokeWidth: 2.2,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        'aria-hidden': 'true',
      },
        h('polyline', { points: '6 9 12 15 18 9' }),
      ),
    ),
    menuOpen ? h('div', {
      className: 'skm-splitButtonMenu',
      role: 'menu',
    },
      h('button', {
        type: 'button',
        role: 'menuitem',
        className: 'skm-splitButtonItem',
        onClick: () => {
          setMenuOpen(false);
          onUploadFolder();
        },
      },
        h(FolderIcon),
        '上传文件夹',
      ),
      h('button', {
        type: 'button',
        role: 'menuitem',
        className: 'skm-splitButtonItem',
        onClick: () => {
          setMenuOpen(false);
          onUploadFile();
        },
      },
        h(FileIcon),
        '上传文件',
      ),
    ) : null,
  );
}

function SearchBox({ value, onChange, placeholder, ariaLabel }) {
  return h('div', { className: 'skm-searchBox' },
    h('svg', {
      className: 'skm-searchIcon',
      width: 14,
      height: 14,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      strokeWidth: 2.2,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      'aria-hidden': 'true',
    },
      h('circle', { cx: 11, cy: 11, r: 8 }),
      h('line', { x1: 21, y1: 21, x2: 16.65, y2: 16.65 }),
    ),
    h('input', {
      type: 'text',
      className: 'skm-searchInput',
      value,
      placeholder: placeholder || '搜索名称、描述或来源',
      'aria-label': ariaLabel || '搜索技能',
      onChange: (event) => onChange(event.target.value),
    }),
    value ? h('button', {
      type: 'button',
      className: 'skm-searchClear',
      'aria-label': '清除搜索内容',
      onClick: () => onChange(''),
    },
      h('svg', {
        width: 11,
        height: 11,
        viewBox: '0 0 24 24',
        fill: 'none',
        stroke: 'currentColor',
        strokeWidth: 2.4,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      },
        h('line', { x1: 18, y1: 6, x2: 6, y2: 18 }),
        h('line', { x1: 6, y1: 6, x2: 18, y2: 18 }),
      ),
    ) : null,
  );
}

function CustomSelect({ value, onChange, options, ariaLabel, alignRight, style, menuHint }) {
  const [open, setOpen] = React.useState(false);
  const rootRef = React.useRef(null);

  React.useEffect(() => {
    if (!open) return undefined;
    const onPointerDown = (event) => {
      if (rootRef.current && !rootRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  const selectedOption = options.find((opt) => opt.value === value);
  const currentLabel = selectedOption ? selectedOption.label : (options[0] ? options[0].label : '');

  return h('div', {
    ref: rootRef,
    className: 'skm-select' + (open ? ' skm-selectOpen' : ''),
    style,
  },
    h('button', {
      type: 'button',
      className: 'skm-selectTrigger',
      'aria-haspopup': 'listbox',
      'aria-expanded': open,
      'aria-label': ariaLabel,
      onClick: () => setOpen((prev) => !prev),
      onKeyDown: (event) => {
        if (event.key === 'ArrowDown' || event.key === 'ArrowUp' || event.key === ' ' || event.key === 'Enter') {
          event.preventDefault();
          setOpen((prev) => !prev);
        }
      },
    },
      h('span', { className: 'skm-selectLabel', title: currentLabel }, currentLabel),
      h('svg', {
        className: 'skm-selectChevron',
        width: 12,
        height: 12,
        viewBox: '0 0 24 24',
        fill: 'none',
        stroke: 'currentColor',
        strokeWidth: 2.2,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        'aria-hidden': 'true',
      },
        h('polyline', { points: '6 9 12 15 18 9' }),
      ),
    ),
    open ? h('div', {
      className: 'skm-selectMenu' + (alignRight ? ' skm-selectMenuRight' : ''),
      role: 'listbox',
      'aria-label': ariaLabel,
    },
      menuHint ? h('div', { className: 'skm-selectHint' },
        h('span', { className: 'skm-selectHintIcon', 'aria-hidden': 'true' }, '💡'),
        h('span', null, menuHint),
      ) : null,
      options.map((opt) => {
        const isSelected = opt.value === value;
        return h('button', {
          key: opt.value,
          type: 'button',
          role: 'option',
          'aria-selected': isSelected,
          className: 'skm-selectOption' + (isSelected ? ' skm-selectOptionSelected' : ''),
          onClick: () => {
            onChange(opt.value);
            setOpen(false);
          },
        },
          h('span', { className: 'skm-selectOptionText', title: opt.label }, opt.label),
          opt.count !== undefined ? h('span', { className: 'skm-selectOptionCount' }, String(opt.count)) : null,
          isSelected ? h('svg', {
            className: 'skm-selectOptionCheck',
            width: 13,
            height: 13,
            viewBox: '0 0 24 24',
            fill: 'none',
            stroke: 'currentColor',
            strokeWidth: 2.5,
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
            'aria-hidden': 'true',
          },
            h('polyline', { points: '20 6 9 17 4 12' }),
          ) : null,
        );
      }),
    ) : null,
  );
}

function Stat({ value, label }) {
  return h('div', { className: 'skm-stat' },
    h('span', { className: 'skm-statValue' }, value),
    h('span', { className: 'skm-statLabel' }, label),
  );
}

function SkillRow({ skill, active, onSelect }) {
  return h('button', {
    type: 'button',
    className: 'skm-listButton' + (active ? ' skm-listButtonActive' : ''),
    onClick: onSelect,
    'aria-pressed': active,
  },
    h('span', { className: 'skm-skillName' }, skill.name),
    h('span', { className: 'skm-skillDescription' }, skill.description || '暂无描述'),
    h('span', { className: 'skm-listMeta' },
      h('span', { className: 'skm-tag ' + scopeClass(skill.source) }, scopeLabel(skill.source)),
      h('span', { className: 'skm-tag' }, skill.provider || '未知提供方'),
      skill.invocation && !skill.invocation.modelInvocable ? h('span', { className: 'skm-tag skm-tagDisabled' }, '模型禁用') : null,
      skill.invocation && !skill.invocation.userInvocable ? h('span', { className: 'skm-tag skm-tagDisabled' }, '用户禁用') : null,
    ),
  );
}

function ToggleControl({ label, description, enabled, disabled, onChange }) {
  return h('div', { className: 'skm-toggleRow' },
    h('div', { className: 'skm-toggleCopy' },
      h('span', { className: 'skm-toggleLabel' }, label),
      h('span', { className: 'skm-toggleDescription' }, description),
      h('span', { className: 'skm-toggleState' }, enabled ? '已启用' : '已禁用'),
    ),
    h('button', {
      type: 'button',
      role: 'switch',
      className: 'skm-toggleButton' + (enabled ? ' skm-toggleButtonOn' : ''),
      'aria-checked': enabled,
      'aria-label': `${label}${enabled ? '已启用' : '已禁用'}`,
      disabled,
      onClick: () => onChange(!enabled),
    }),
  );
}

function Detail({ summary, detail, status, onToggle, mutationStatus }) {
  if (!summary) {
    return h('div', { className: 'skm-empty skm-detail' },
      h('strong', null, '选择一个技能'),
      '从左侧目录选择技能，查看它的来源、调用能力和正文。',
    );
  }
  if (status === 'loading') {
    return h('div', { className: 'skm-empty skm-detail' }, '正在读取技能正文…');
  }
  if (detail === null) {
    const message = typeof status === 'string' && status !== 'idle' && status !== 'ready'
      ? status
      : '无法加载该技能的正文。';
    return h('div', { className: 'skm-empty skm-detail' }, message);
  }
  const editable = Boolean(detail.path && ['project-dsh', 'project-agents', 'user-dsh', 'user-agents', 'custom'].indexOf(summary.source) !== -1);
  const saving = mutationStatus && mutationStatus.status === 'saving';
  const mutationError = mutationStatus && mutationStatus.status === 'error' ? mutationStatus.message : '';
  return h('article', { className: 'skm-detail' },
    h('div', { className: 'skm-detailEyebrow' }, '已选技能'),
    h('h3', { className: 'skm-detailTitle' }, summary.name),
    h('p', { className: 'skm-detailDescription' }, summary.description || '暂无描述'),
    h('div', { className: 'skm-tagRow', style: { marginTop: '12px' } },
      h('span', { className: 'skm-tag ' + scopeClass(summary.source) }, scopeLabel(summary.source)),
      h('span', { className: 'skm-tag' }, summary.provider || '未知提供方'),
      summary.invocation && summary.invocation.modelInvocable ? h('span', { className: 'skm-tag' }, '模型可用') : null,
      summary.invocation && summary.invocation.userInvocable ? h('span', { className: 'skm-tag' }, '用户可用') : null,
      summary.invocation && !summary.invocation.modelInvocable ? h('span', { className: 'skm-tag skm-tagDisabled' }, '模型禁用') : null,
      summary.invocation && !summary.invocation.userInvocable ? h('span', { className: 'skm-tag skm-tagDisabled' }, '用户禁用') : null,
    ),
    h('section', { className: 'skm-controlPanel' },
      h('h4', { className: 'skm-sectionLabel' }, '调用控制'),
      h('p', { className: 'skm-controlHint' }, editable ? '分别控制模型和用户界面是否可以调用此技能。' : '内置或运行时技能来自只读来源，不能在这里修改。'),
      h('div', { className: 'skm-toggleList' },
        h(ToggleControl, {
          label: '模型调用',
          description: '是否出现在模型可用的技能目录中',
          enabled: Boolean(summary.invocation && summary.invocation.modelInvocable),
          disabled: !editable || saving,
          onChange: (enabled) => onToggle('model', enabled),
        }),
        h(ToggleControl, {
          label: '用户调用',
          description: '是否允许用户侧命令或显式调用',
          enabled: Boolean(summary.invocation && summary.invocation.userInvocable),
          disabled: !editable || saving,
          onChange: (enabled) => onToggle('user', enabled),
        }),
      ),
      saving ? h('div', { className: 'skm-controlHint', style: { margin: '8px 0 0' } }, '正在保存…') : null,
      mutationError ? h('div', { className: 'skm-status skm-statusError', style: { margin: '8px 0 0' } }, mutationError) : null,
    ),
    h('div', { className: 'skm-detailMeta' },
      h('div', { className: 'skm-metaItem' },
        h('span', { className: 'skm-metaLabel' }, '提供方'),
        h('span', { className: 'skm-metaValue', title: summary.provider || '' }, summary.provider || '—'),
      ),
      h('div', { className: 'skm-metaItem' },
        h('span', { className: 'skm-metaLabel' }, '来源'),
        h('span', { className: 'skm-metaValue', title: summary.source || '' }, sourceLabel(summary.source)),
      ),
      detail.path ? h('div', { className: 'skm-metaItem', style: { gridColumn: '1 / -1' } },
        h('span', { className: 'skm-metaLabel' }, '文件路径'),
        h('span', { className: 'skm-metaValue', title: detail.path }, detail.path),
      ) : null,
      detail.resourceBase ? h('div', { className: 'skm-metaItem', style: { gridColumn: '1 / -1' } },
        h('span', { className: 'skm-metaLabel' }, '资源基目录'),
        h('span', { className: 'skm-metaValue', title: resourceValue(detail.resourceBase) }, resourceValue(detail.resourceBase)),
      ) : null,
    ),
    summary.whenToUse ? h('section', { className: 'skm-detailSection' },
      h('h4', { className: 'skm-sectionLabel' }, '适用场景'),
      h('p', { className: 'skm-when' }, summary.whenToUse),
    ) : null,
    h('section', { className: 'skm-detailSection' },
      h('h4', { className: 'skm-sectionLabel' }, '技能正文'),
      h('pre', { className: 'skm-body' }, detail.content || '此技能没有正文。'),
    ),
  );
}

function resourceValue(resource) {
  if (!resource || typeof resource !== 'object') return '';
  if (resource.kind === 'directory') return resource.path || '';
  if (resource.kind === 'url') return resource.url || '';
  return resource.description || resource.kind || '';
}

function SkillManagerSection(props) {
  const api = props.api;
  const workspaceState = typeof props.useWorkspaces === 'function'
    ? props.useWorkspaces((state) => state)
    : { items: [], recentWorkspaceId: undefined };
  const workspaceItems = Array.isArray(workspaceState && workspaceState.items) ? workspaceState.items : [];
  const recentWorkspace = workspaceItems.find((item) => item.workspaceId === workspaceState.recentWorkspaceId) || workspaceItems[0];
  const recentPath = recentWorkspace && typeof recentWorkspace.path === 'string' ? recentWorkspace.path : '';

  const [workspaceChoice, setWorkspaceChoice] = React.useState('__recent__');
  const [query, setQuery] = React.useState('');
  const [sourceFilter, setSourceFilter] = React.useState('all');
  const [refreshKey, setRefreshKey] = React.useState(0);
  const [selectedName, setSelectedName] = React.useState('');
  const [catalog, setCatalog] = React.useState({ status: 'loading', complete: true, skills: [], error: '' });
  const [detailStatus, setDetailStatus] = React.useState('idle');
  const [detail, setDetail] = React.useState(null);
  const [resourceTarget, setResourceTarget] = React.useState(recentPath ? 'project-agents' : 'user-agents');
  const [uploadStatus, setUploadStatus] = React.useState({ status: 'idle', message: '' });
  const [mutationStatus, setMutationStatus] = React.useState({ status: 'idle', message: '' });
  const fileInputRef = React.useRef(null);
  const folderInputRef = React.useRef(null);

  React.useEffect(() => {
    if (folderInputRef.current) {
      folderInputRef.current.setAttribute('webkitdirectory', '');
      folderInputRef.current.setAttribute('directory', '');
    }
  }, []);

  const effectiveCwd = workspaceChoice === '__recent__'
    ? recentPath
    : workspaceChoice === '__all__'
      ? ''
      : workspaceChoice;

  const resourceTargetOptions = effectiveCwd
    ? [
      { value: 'project-agents', label: '当前工作区 · .agents/skills（推荐 · 二选一）' },
      { value: 'project-dsh', label: '当前工作区 · .dsh/skills（二选一）' },
    ]
    : [
      { value: 'user-agents', label: '用户目录 · ~/.agents/skills（推荐 · 二选一）' },
      { value: 'user-dsh', label: '用户目录 · ~/.dsh/skills（二选一）' },
    ];

  React.useEffect(() => {
    if (!resourceTargetOptions.some((option) => option.value === resourceTarget)) {
      setResourceTarget(resourceTargetOptions[0].value);
    }
  }, [effectiveCwd]);

  React.useEffect(() => {
    let active = true;
    setCatalog((previous) => ({ ...previous, status: 'loading', error: '' }));
    const args = effectiveCwd ? { cwd: effectiveCwd } : {};
    api.catalog(args).then((result) => {
      if (!active) return;
      const skills = result && Array.isArray(result.skills) ? result.skills : [];
      setCatalog({ status: 'ready', complete: result ? result.complete === true : false, skills, error: '' });
      setSelectedName((current) => skills.some((skill) => skill.name === current) ? current : (skills[0] ? skills[0].name : ''));
    }).catch((error) => {
      if (!active) return;
      setCatalog({ status: 'error', complete: false, skills: [], error: errorText(error) });
      setSelectedName('');
    });
    return () => { active = false; };
  }, [effectiveCwd, refreshKey]);

  React.useEffect(() => {
    if (!selectedName) {
      setDetail(null);
      setDetailStatus('idle');
      return undefined;
    }
    let active = true;
    setDetail(null);
    setDetailStatus('loading');
    const args = effectiveCwd ? { name: selectedName, cwd: effectiveCwd } : { name: selectedName };
    api.detail(args).then((result) => {
      if (!active) return;
      setDetail(result || null);
      setDetailStatus(result ? 'ready' : 'error');
    }).catch((error) => {
      if (!active) return;
      setDetail(null);
      setDetailStatus(errorText(error));
    });
    return () => { active = false; };
  }, [selectedName, effectiveCwd, refreshKey]);

  const lowerQuery = query.trim().toLowerCase();
  const allSkills = catalog.skills;
  const sourceValues = [];
  allSkills.forEach((skill) => {
    if (skill.source && sourceValues.indexOf(skill.source) === -1) sourceValues.push(skill.source);
  });
  const filteredSkills = allSkills.filter((skill) => {
    if (sourceFilter !== 'all' && sourceLabel(skill.source) !== sourceFilter) return false;
    if (!lowerQuery) return true;
    const haystack = [skill.name, skill.description, skill.whenToUse, skill.source, skill.provider].join(' ').toLowerCase();
    return haystack.includes(lowerQuery);
  });
  const selectedSummary = allSkills.find((skill) => skill.name === selectedName);
  const completeLabel = catalog.status === 'error'
    ? '加载失败'
    : catalog.complete
      ? '发现完成'
      : '部分发现';
  const workspaceSelectValue = workspaceChoice;
  const workspaceOptions = [
    { value: '__recent__', label: recentWorkspace ? `最近工作区 · ${workspaceLabel(recentWorkspace)}` : '最近工作区（未设置）' },
    { value: '__all__', label: '全部全局技能' },
    ...workspaceItems.map((item) => ({ value: item.path, label: workspaceLabel(item) })),
  ];

  const sourceOptions = [
    { value: 'all', label: '全部来源', count: allSkills.length },
  ];
  const seenSources = new Set();
  sourceValues.forEach((source) => {
    const label = sourceLabel(source);
    if (!seenSources.has(label)) {
      seenSources.add(label);
      const count = allSkills.filter((s) => sourceLabel(s.source) === label).length;
      sourceOptions.push({ value: label, label, count });
    }
  });

  const handleUpload = async (fileList, isFolder, inputEl) => {
    const files = Array.from(fileList || []);
    if (inputEl) inputEl.value = '';
    if (files.length === 0) return;

    setUploadStatus({ status: 'uploading', message: isFolder ? '正在读取文件夹内容…' : '正在读取文件…' });

    try {
      const payloadFiles = await Promise.all(files.map(async (file) => {
        const content = await readFileAsBase64(file);
        const path = isFolder ? (file.webkitRelativePath || file.name) : file.name;
        return { path, content };
      }));

      setUploadStatus({ status: 'uploading', message: `正在上传 ${payloadFiles.length} 个文件…` });

      const BATCH_SIZE = 20;
      const BATCH_BYTES = 4 * 1024 * 1024;
      let currentBatch = [];
      let currentSize = 0;
      let totalUploaded = 0;
      let lastResult = null;

      for (const file of payloadFiles) {
        const size = file.content.length;
        if (currentBatch.length > 0 && (currentBatch.length >= BATCH_SIZE || currentSize + size > BATCH_BYTES)) {
          const res = await api.upload({
            target: resourceTarget,
            ...(effectiveCwd ? { cwd: effectiveCwd } : {}),
            files: currentBatch,
          });
          totalUploaded += (res && res.count) || currentBatch.length;
          lastResult = res;
          currentBatch = [];
          currentSize = 0;
        }
        currentBatch.push(file);
        currentSize += size;
      }

      if (currentBatch.length > 0) {
        const res = await api.upload({
          target: resourceTarget,
          ...(effectiveCwd ? { cwd: effectiveCwd } : {}),
          files: currentBatch,
        });
        totalUploaded += (res && res.count) || currentBatch.length;
        lastResult = res;
      }

      const destInfo = (lastResult && lastResult.targetDir) ? ` 至 ${lastResult.targetDir}` : '';
      setUploadStatus({
        status: 'success',
        message: `成功上传 ${totalUploaded} 个文件${destInfo}。`,
      });
      setRefreshKey((value) => value + 1);
      setTimeout(() => {
        setUploadStatus((previous) => previous.status === 'success' ? { status: 'idle', message: '' } : previous);
      }, 5000);
    } catch (error) {
      setUploadStatus({
        status: 'error',
        message: `上传失败：${errorText(error)}`,
      });
    }
  };

  const handleToggle = (field, enabled) => {
    if (!selectedName) return;
    setMutationStatus({ status: 'saving', message: '' });
    api.toggle({
      name: selectedName,
      field,
      enabled,
      ...(effectiveCwd ? { cwd: effectiveCwd } : {}),
    }).then((result) => {
      if (!result) throw new Error('技能已不存在，请刷新目录。');
      if (result.invocation) {
        setCatalog((previous) => Object.assign({}, previous, {
          skills: previous.skills.map((skill) => skill.name === selectedName
            ? Object.assign({}, skill, { invocation: result.invocation })
            : skill),
        }));
        setDetail((previous) => previous ? Object.assign({}, previous, { invocation: result.invocation }) : previous);
      }
      setMutationStatus({ status: 'success', message: '' });
      setRefreshKey((value) => value + 1);
    }).catch((error) => setMutationStatus({ status: 'error', message: errorText(error) }));
  };

  return h('section', { className: 'skm-panel' },
    h('style', { dangerouslySetInnerHTML: { __html: css } }),
    h('header', { className: 'skm-head' },
      h('div', null,
        h('div', { className: 'skm-kicker' }, '技能注册表 · 本地工作台'),
        h('h2', { className: 'skm-title' }, '技能'),
        h('p', { className: 'skm-intro' }, '把技能目录变成一张可检索的工作台：先选范围，再从来源、调用能力与正文判断该用哪一个。'),
      ),
      h('div', { className: 'skm-headMark', 'aria-hidden': 'true' }, '✦'),
    ),
    h('div', { className: 'skm-stats' },
      h(Stat, { value: String(allSkills.length), label: '已发现技能' }),
      h(Stat, { value: String(sourceValues.length), label: '来源数' }),
      h(Stat, { value: catalog.status === 'loading' ? '…' : completeLabel, label: '目录状态' }),
    ),
    h('div', { className: 'skm-toolbar' },
      h('div', { className: 'skm-toolbarRow' },
        h(SearchBox, {
          value: query,
          onChange: setQuery,
          placeholder: '搜索名称、描述或来源',
          ariaLabel: '搜索技能',
        }),
        h(CustomSelect, {
          value: workspaceSelectValue,
          onChange: setWorkspaceChoice,
          options: workspaceOptions,
          ariaLabel: '选择技能工作区范围',
          style: { flex: '0 1 250px', minWidth: '170px' },
        }),
        h(CustomSelect, {
          value: sourceFilter,
          onChange: setSourceFilter,
          options: sourceOptions,
          ariaLabel: '按来源筛选技能',
          alignRight: true,
          style: { flex: '0 1 150px', minWidth: '120px' },
        }),
        h(CustomSelect, {
          value: resourceTarget,
          onChange: setResourceTarget,
          options: resourceTargetOptions,
          ariaLabel: '选择目标技能目录（二选一即可）',
          alignRight: true,
          menuHint: '提示：二选一即可，均会自动生效',
          style: { flex: '0 1 270px', minWidth: '220px' },
        }),
        h('input', {
          ref: fileInputRef,
          type: 'file',
          multiple: true,
          style: { display: 'none' },
          onChange: (event) => handleUpload(event.target.files, false, event.target),
        }),
        h('input', {
          ref: folderInputRef,
          type: 'file',
          multiple: true,
          webkitdirectory: '',
          directory: '',
          style: { display: 'none' },
          onChange: (event) => handleUpload(event.target.files, true, event.target),
        }),
        h(UploadSplitButton, {
          uploading: uploadStatus.status === 'uploading',
          onUploadFile: () => fileInputRef.current && fileInputRef.current.click(),
          onUploadFolder: () => folderInputRef.current && folderInputRef.current.click(),
        }),
        h('button', {
          type: 'button',
          className: 'skm-button skm-buttonAccent',
          onClick: () => setRefreshKey((value) => value + 1),
          disabled: catalog.status === 'loading',
          title: '刷新技能目录',
        },
          h(RefreshIcon, { spinning: catalog.status === 'loading' }),
          '刷新',
        ),
      ),
      (query || sourceFilter !== 'all') ? h('div', { className: 'skm-toolbarMeta' },
        h('span', { className: 'skm-metaCount' },
          '筛选结果 ',
          h('strong', null, String(filteredSkills.length)),
          ` / ${allSkills.length}`,
        ),
        query ? h('span', { className: 'skm-metaChip' },
          `搜索: "${query}"`,
          h('button', {
            type: 'button',
            className: 'skm-metaChipRemove',
            onClick: () => setQuery(''),
            title: '清除关键词',
          }, '×'),
        ) : null,
        sourceFilter !== 'all' ? h('span', { className: 'skm-metaChip' },
          `来源: ${sourceFilter}`,
          h('button', {
            type: 'button',
            className: 'skm-metaChipRemove',
            onClick: () => setSourceFilter('all'),
            title: '清除来源筛选',
          }, '×'),
        ) : null,
        h('button', {
          type: 'button',
          className: 'skm-metaReset',
          onClick: () => { setQuery(''); setSourceFilter('all'); },
        }, '重置筛选'),
      ) : null,
    ),
    h('div', { className: 'skm-status' + (catalog.status === 'error' || typeof detailStatus === 'string' && detailStatus !== 'idle' && detailStatus !== 'loading' && detailStatus !== 'ready' ? ' skm-statusError' : '') , 'aria-live': 'polite' },
      catalog.status === 'error' ? `目录加载失败：${catalog.error}` : catalog.status === 'loading' ? '正在扫描技能目录…' : catalog.complete ? '目录已完成扫描；技能文件变更后可点击刷新。' : '目录扫描尚未完全收敛，当前结果可用但建议稍后刷新。',
    ),
    uploadStatus.status !== 'idle' ? h('div', {
      className: 'skm-status' + (uploadStatus.status === 'error' ? ' skm-statusError' : uploadStatus.status === 'success' ? ' skm-statusSuccess' : ''),
      'aria-live': 'polite',
    }, uploadStatus.message) : null,
    h('div', { className: 'skm-workbench' },
      h('div', { className: 'skm-listPane' },
        h('div', { className: 'skm-paneHead' },
          h('h3', { className: 'skm-paneTitle' }, '技能目录'),
          h('span', { className: 'skm-paneCount' },
            filteredSkills.length === allSkills.length
              ? String(filteredSkills.length).padStart(2, '0')
              : `${filteredSkills.length} / ${allSkills.length}`
          ),
        ),
        catalog.status === 'loading'
          ? h('div', null, h('div', { className: 'skm-skeleton' }), h('div', { className: 'skm-skeleton' }), h('div', { className: 'skm-skeleton' }))
          : filteredSkills.length === 0
            ? h('div', { className: 'skm-empty' },
              h('strong', null, allSkills.length === 0 ? '这里还没有技能' : '没有匹配项'),
              allSkills.length === 0 ? '检查当前工作区的 .dsh/skills 或 .agents/skills 目录。' : '换一个关键词或放宽来源筛选。',
            )
            : h('div', { className: 'skm-list', role: 'list' }, filteredSkills.map((skill) => h(SkillRow, {
              key: skill.name,
              skill,
              active: skill.name === selectedName,
              onSelect: () => setSelectedName(skill.name),
            }))),
      ),
      h('div', { className: 'skm-detailPane' }, h(Detail, {
        summary: selectedSummary,
        detail,
        status: detailStatus,
        mutationStatus,
        onToggle: handleToggle,
      })),
    ),
  );
}

function makeApi(ctx) {
  const connection = ctx.get('connection');
  const call = (method, args) => {
    if (connection === undefined || !connection.rpc || typeof connection.rpc.call !== 'function') {
      return Promise.reject(new Error('连接服务不可用'));
    }
    return connection.rpc.call('/api', 'skillsManager/' + method, { args: args || {} }, undefined).then((result) => {
      if (result && result.ok) return result.value;
      const message = result && result.error && result.error.message;
      throw new Error(message || '技能管理器请求失败');
    });
  };
  return {
    catalog: (payload) => call('catalog', { payload: payload || {} }),
    detail: (payload) => call('detail', { payload: payload || {} }),
    openFolder: (payload) => call('openFolder', { payload: payload || {} }),
    toggle: (payload) => call('toggle', { payload: payload || {} }),
    upload: (payload) => call('upload', { payload: payload || {} }),
  };
}

const navStyleId = 'dsh-skills-manager-nav-style';

const navCss = String.raw`
button:has([data-section-id="skills-manager"]) > svg:not(.skm-nav-toolbox-icon),
button[data-settings-section="skills-manager"] > svg:not(.skm-nav-toolbox-icon) {
  display: none !important;
}

button:has([data-section-id="skills-manager"]):not(:has(.skm-nav-toolbox-icon))::before,
button[data-settings-section="skills-manager"]:not(:has(.skm-nav-toolbox-icon))::before {
  content: "";
  display: inline-block;
  width: 16px;
  height: 16px;
  flex: none;
  background-color: currentColor;
  -webkit-mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16' fill='none' stroke='black' stroke-width='1.2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M5.5 3.5V2.2C5.5 1.54 6.04 1 6.7 1h2.6c.66 0 1.2.54 1.2 1.2v1.3'/%3E%3Crect x='1.5' y='3.5' width='13' height='10.5' rx='1.5'/%3E%3Cpath d='M1.5 7.5h13'/%3E%3Crect x='6.5' y='6.5' width='3' height='2' rx='0.4' fill='black' stroke='none'/%3E%3C/svg%3E") no-repeat center / contain;
  mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16' fill='none' stroke='black' stroke-width='1.2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M5.5 3.5V2.2C5.5 1.54 6.04 1 6.7 1h2.6c.66 0 1.2.54 1.2 1.2v1.3'/%3E%3Crect x='1.5' y='3.5' width='13' height='10.5' rx='1.5'/%3E%3Cpath d='M1.5 7.5h13'/%3E%3Crect x='6.5' y='6.5' width='3' height='2' rx='0.4' fill='black' stroke='none'/%3E%3C/svg%3E") no-repeat center / contain;
}

.skm-nav-toolbox-icon {
  width: 16px;
  height: 16px;
  flex: none;
  color: inherit;
}
`;

function ensureGlobalNavStyles() {
  if (typeof document === 'undefined') return;
  if (!document.getElementById(navStyleId)) {
    const tag = document.createElement('style');
    tag.id = navStyleId;
    tag.dataset.plugin = 'dsh-skills-manager';
    tag.textContent = navCss;
    document.head.appendChild(tag);
  }
}

ensureGlobalNavStyles();

function createToolboxSvgElement(originalSvg) {
  if (typeof document === 'undefined' || typeof DOMParser === 'undefined') return null;
  const parser = new DOMParser();
  const svgDoc = parser.parseFromString(
    '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg" class="skm-nav-toolbox-icon">' +
      '<path d="M5.5 3.5V2.2C5.5 1.54 6.04 1 6.7 1h2.6c.66 0 1.2.54 1.2 1.2v1.3"></path>' +
      '<rect x="1.5" y="3.5" width="13" height="10.5" rx="1.5"></rect>' +
      '<path d="M1.5 7.5h13"></path>' +
      '<rect x="6.5" y="6.5" width="3" height="2" rx="0.4" fill="currentColor" stroke="none"></rect>' +
    '</svg>',
    'image/svg+xml'
  );
  const el = document.importNode(svgDoc.documentElement, true);
  if (originalSvg) {
    const origClass = originalSvg.getAttribute('class');
    if (origClass) {
      el.setAttribute('class', 'skm-nav-toolbox-icon ' + origClass);
    }
  }
  el.style.width = '16px';
  el.style.height = '16px';
  el.style.flex = 'none';
  return el;
}

function SkillNavLabel() {
  const ref = React.useRef(null);

  React.useLayoutEffect(() => {
    ensureGlobalNavStyles();
    if (!ref.current) return;
    const btn = ref.current.closest('button');
    if (btn) {
      btn.setAttribute('data-settings-section', 'skills-manager');
      const originalSvg = btn.querySelector('svg:not(.skm-nav-toolbox-icon)');
      if (originalSvg && !btn.querySelector('.skm-nav-toolbox-icon')) {
        originalSvg.style.display = 'none';
        const toolboxSvg = createToolboxSvgElement(originalSvg);
        if (toolboxSvg) {
          btn.insertBefore(toolboxSvg, originalSvg);
        }
      }
    }
  }, []);

  return h('span', { ref, className: 'skm-nav-label-text', 'data-section-id': 'skills-manager' }, 'Skills');
}

function apply(ctx) {
  const slots = ctx.get('slots');
  if (slots === undefined) return;
  ensureGlobalNavStyles();
  const api = makeApi(ctx);
  ctx.effect(() => slots.inject('settings.section', () => slots.register({
    name: 'settings.section',
    id: 'skills-manager',
    order: 25,
    label: () => h(SkillNavLabel),
  }, (props) => h(SkillManagerSection, Object.assign({}, props, { api })))), 'dsh-skills-manager: settings section');
}

module.exports.apply = apply;
module.exports.inject = ['slots', 'connection'];

    return module.exports;
  }
});
