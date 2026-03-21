

---
title: artical2
description: learning for full-stack
date: 2026-03-21
tags: [全栈]
draft: true
---

# 全栈内容积累

## .astro语法

Astro 的语法是一种基于 HTML 的超集，专注于组件化开发，非常容易上手。它将 HTML、CSS 和 JavaScript（或 TypeScript）结合在同一个 `.astro` 文件中，通过“代码围栏”（`---`）进行逻辑处理，并支持 JSX 风格的动态表达式，实现服务器端渲染。

### Astro 语法核心组件

1. **[组件结构](https://www.google.com/search?q=%E7%BB%84%E4%BB%B6%E7%BB%93%E6%9E%84&rlz=1C1ONGR_enAU1078AU1078&oq=astro%E7%9A%84%E8%AF%AD%E6%B3%95%E6%98%AF%E4%BB%80%E4%B9%88&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIHCAEQABjvBTIHCAIQABjvBTIHCAMQABjvBTIHCAQQABjvBTIHCAUQABjvBdIBCDQ1MTRqMGo3qAIAsAIA&sourceid=chrome&ie=UTF-8&ved=2ahUKEwiFgpuQuLCTAxWkjK8BHSH_DCAQgK4QegQIAxAB) (`.astro` 文件)**
   Astro 组件文件由两部分组成，结构极其清晰：

   * **代码围栏 (`---`)** **：位于文件顶部，用于编写 JavaScript/TypeScript 逻辑（服务器端代码，不会发送到浏览器）。**
   * **模板区** **：位于代码围栏下方，是 HTML 模板，包含 HTML、CSS 和 JS 表达式。**

   astro

   ```
   ---
   // JavaScript 逻辑区 (服务器端)
   const title = 'Hello, Astro!';
   ---
   <!-- HTML 模板区 -->
   <h1>{title}</h1>
   ```
2. **[JSX 风格的表达式](https://www.google.com/search?q=JSX+%E9%A3%8E%E6%A0%BC%E7%9A%84%E8%A1%A8%E8%BE%BE%E5%BC%8F&rlz=1C1ONGR_enAU1078AU1078&oq=astro%E7%9A%84%E8%AF%AD%E6%B3%95%E6%98%AF%E4%BB%80%E4%B9%88&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIHCAEQABjvBTIHCAIQABjvBTIHCAMQABjvBTIHCAQQABjvBTIHCAUQABjvBdIBCDQ1MTRqMGo3qAIAsAIA&sourceid=chrome&ie=UTF-8&ved=2ahUKEwiFgpuQuLCTAxWkjK8BHSH_DCAQgK4QegQIAxAH)**
   在模板中，使用花括号 `{}` **插入 JavaScript 表达式，类似于 React 的 JSX。**

   * **动态属性** **：**`<img src={imageUrl} />`
   * **动态文本** **：**`<p>{description}</p>`
   * **动态标签** **：**`const Element = 'div'; <Element />`
3. **[CSS 作用域](https://www.google.com/search?q=CSS+%E4%BD%9C%E7%94%A8%E5%9F%9F&rlz=1C1ONGR_enAU1078AU1078&oq=astro%E7%9A%84%E8%AF%AD%E6%B3%95%E6%98%AF%E4%BB%80%E4%B9%88&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIHCAEQABjvBTIHCAIQABjvBTIHCAMQABjvBTIHCAQQABjvBTIHCAUQABjvBdIBCDQ1MTRqMGo3qAIAsAIA&sourceid=chrome&ie=UTF-8&ved=2ahUKEwiFgpuQuLCTAxWkjK8BHSH_DCAQgK4QegQIAxAM) (Scoped Styling)**
   Astro 组件中的 `<style>` **标签默认是****局部作用域**的。定义的 CSS 样式仅作用于该组件内的元素，无需额外配置，防止样式污染。
   astro

   ```
   <style>
     h1 { color: red; }
   </style>
   ```
4. **[组件导入与使用](https://www.google.com/search?q=%E7%BB%84%E4%BB%B6%E5%AF%BC%E5%85%A5%E4%B8%8E%E4%BD%BF%E7%94%A8&rlz=1C1ONGR_enAU1078AU1078&oq=astro%E7%9A%84%E8%AF%AD%E6%B3%95%E6%98%AF%E4%BB%80%E4%B9%88&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIHCAEQABjvBTIHCAIQABjvBTIHCAMQABjvBTIHCAQQABjvBTIHCAUQABjvBdIBCDQ1MTRqMGo3qAIAsAIA&sourceid=chrome&ie=UTF-8&ved=2ahUKEwiFgpuQuLCTAxWkjK8BHSH_DCAQgK4QegQIAxAQ)**
   可以像使用 HTML 标签一样导入并使用其他 Astro 组件。
   astro

   ```
   ---
   import Header from '../components/Header.astro';
   ---
   <Header />
   ```
5. **[Astro 对象与数据管理](https://www.google.com/search?q=Astro+%E5%AF%B9%E8%B1%A1%E4%B8%8E%E6%95%B0%E6%8D%AE%E7%AE%A1%E7%90%86&rlz=1C1ONGR_enAU1078AU1078&oq=astro%E7%9A%84%E8%AF%AD%E6%B3%95%E6%98%AF%E4%BB%80%E4%B9%88&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIHCAEQABjvBTIHCAIQABjvBTIHCAMQABjvBTIHCAQQABjvBTIHCAUQABjvBdIBCDQ1MTRqMGo3qAIAsAIA&sourceid=chrome&ie=UTF-8&ved=2ahUKEwiFgpuQuLCTAxWkjK8BHSH_DCAQgK4QegQIAxAU)**

   * **`Astro.props`** **：用于获取传入组件的参数。**
   * **`Astro.slots`** **：用于处理组件槽位。** ![docs.astro.build]()docs.astro.build** +5**

### 语法关键差异 (与 JSX 相比)

* **HTML 优先** **：支持标准的 HTML 属性（如** `class` **替代** `className`），无需自闭合所有标签。
* **指令使用** **：使用** `client:*` **指令控制组件在客户端的交互性（如** `client:load`）。

Astro 的设计目标是让熟悉 HTML 的开发者能以最快速度编写出高性能、组件化的网站

利用Wrangler建立数据库架构在cloudflare上
