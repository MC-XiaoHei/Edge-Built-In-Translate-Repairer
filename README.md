# Edge Built-in Translate Repairer (edge-built-in-translate-repairer)

修复了Edge内置翻译导致的`<code>`块中内容被移动到段尾的问题

**尚未完成**

## 修复原理

Edge在翻译`<div>`等块级元素中的文字时，会把`<code>`块中的内容移动到段尾，但如果将文字包裹在`<span>`中，就不会出现这个问题。

**重要：必须分开包裹！不能把`<code>`块作为`<span>`块的直接子元素！**

## 怎么发现的？

某天，我在读某英文文档时候，突然发现，加粗的段落中的代码块没有被移动到段尾，而是保持在原处，进一步实验发现`<span>`块也可以实现同样的效果，故有了这个插件。
