# @art_is_code/activeclass_js

A lightweight, intelligent JavaScript utility for handling navigation active states. Unlike standard scripts, it uses a **Tag-based logic** to manage complex hierarchies, multi-level menus, and dynamic content (AJAX) without ID conflicts.

## 🚀 Key Features
- **Tag-based Logic**: A single link can activate multiple UI elements simultaneously across the DOM.
- **AJAX Native**: Automatically monitors DOM changes using `MutationObserver`.
- **Anchor Support**: Full support for hash-based URLs (`#section`).
- **Context Injection**: Force active states on pages not present in the menu via "Ghost Elements".
- **Zero Dependencies**: Pure Vanilla JavaScript (ES6+).
- **Manual Refresh**: Public API to force state updates during manual URL changes (pushState).

---

## 🛠 Installation

```bash
npm install @art_is_code/activeclass_js
```
Alternatively, you can include it manually:
```html
<script type="module">
  import { active } from './path/to/activeclass_js.js';
  active();
</script>
```
## 💡 Usage Examples

1. **Basic Link**
The link gets the active class automatically if the URL matches.
```html
<a href="/about">About Us</a>
```
2. **Multi-level Hierarchy (The Tag System)**
Use data-ac-tags on the link to trigger other elements and data-ac-group on the targets.
```html
<li data-ac-group="category-elections">Elections</li>

<li>
    <a href="/elections/candidates" data-ac-tags="category-elections">
        Candidates List
    </a>
</li>
```
3. **Ghost Trigger (Context Injection)**
Force a specific context even if the page isn't in the menu (e.g., a hidden detail page) using a "ghost" element.
```html
<meta data-ac-force="category-elections, sidebar-group">
```
> **Pro Tip:** The `data-ac-force` attribute is tag-agnostic. You can use `<meta>`, `<span>`, `<div>`, or even `<template>` depending on your architectural needs.
## ⚙️ Configuration & API
Initialize the plugin in your JavaScript entry point:
```javascript
import { active } from './activeclass_js.js';

const ac = active({
    className: 'activecl',
    selector: 'a[href]:not([href=""])',
    observer: true
});
```
| Option | Default | Description |
| :--- | :--- | :--- |
| **className** | `'activecl'` | The CSS class added to active elements. |
| **selector** | `'a[href]:not([href=""])'` | Which links the plugin should monitor. |
| **observer** | `true` | Watch for DOM changes (AJAX support). |
If you update the URL manually (e.g., via AJAX or history.pushState), call the refresh method:
```javascript
ac.refresh();
```

## 📖 HTML Attributes Reference

| Attribute | Role | Description |
| :--- | :--- | :--- |
| `data-ac-tags` | **Trigger** | Comma-separated tags to activate when the link is active. |
| `data-ac-group` | **Target** | Identifies which group(s) the element belongs to. |
| `data-ac-force` | **Trigger** | Immediately activates the specified tags (useful for Ghost Elements). |
| `data-ac-query` | **Option** | Set to `"1"` to match URL including query strings. |
| `data-ac-exclude` | **Option** | Set to `"1"` to trigger tags without activating the link itself. |
### Public Methods

## 📜 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
MIT © Andrea D'Agostino (art is code)

