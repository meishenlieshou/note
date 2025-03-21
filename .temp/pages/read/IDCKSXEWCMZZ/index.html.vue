<template><div><p>83 Specific Ways to Improve Your TypeScript</p>
<p>-- Writen by Dan Vanderkam</p>
<h2 id="getting-to-know-typescript" tabindex="-1"><a class="header-anchor" href="#getting-to-know-typescript"><span>Getting to Know TypeScript</span></a></h2>
<p>TypeScript is a superset of JavaScript in a syntactic sense: so long as your JavaScript program doesn’t have any syntax errors then it is also a TypeScript program.</p>
<p>It’s quite likely that TypeScript’s type checker will flag some issues with your code. But this is an independent problem. TypeScript will still parse your code and emit JavaScript.</p>
<p><img src="@source/阅读/assets/IMG_1.png" alt="图片"></p>
<p>All JavaScript programs are TypeScript programs, but the converse is not true: there are TypeScript programs that are not JavaScript programs. This is because TypeScript adds additional syntax for specifying types.</p>
<p><img src="@source/阅读/assets/IMG_2.png" alt="图片"></p>
<p>One of the goals of TypeScript’s type system is to detect code that will throw an exception at runtime, without having to run your code. When you hear TypeScript described as a “static” type system, it refers to this ability. The type checker cannot always spot code that will throw exceptions, but it will try.</p>
<p><strong>Things to Remember</strong></p>
<ul>
<li>TypeScript is a superset of JavaScript: all JavaScript programs are syntactically valid TypeScript programs, but not all TypeScript programs are valid JavaScript programs.</li>
<li>TypeScript adds a static type system that models JavaScript’s runtime behavior and tries to spot code that will throw exceptions at runtime.</li>
<li>It is possible for code to pass the type checker but still throw at runtime.</li>
<li>TypeScript disallows some legal but questionable JavaScript constructs such as calling functions with the wrong number of arguments.</li>
<li>Type annotations tell TypeScript your intent and help it distinguish correct and incorrect code.</li>
</ul>
<h2 id="know-which-typescript-options-you-re-using" tabindex="-1"><a class="header-anchor" href="#know-which-typescript-options-you-re-using"><span>Know Which TypeScript Options You’re Using</span></a></h2>
<p>You can create typescript configuration file by running</p>
<div class="language-shell line-numbers-mode" data-ext="shell" data-title="shell"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665">tsc</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076"> --init</span></span></code></pre>

<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h3 id="noimplicitany" tabindex="-1"><a class="header-anchor" href="#noimplicitany"><span>noImplicitAny</span></a></h3>
<p>noImplicitAny controls what TypeScript does when it can’t determine the type of a variable.</p>
<p>TypeScript is the most helpful when it has type information, so you should be sure to set noImplicitAny whenever possible. Once you grow accustomed to all variables having types, TypeScript without noImplicitAny feels almost like a different language.</p>
<h3 id="strictnullchecks" tabindex="-1"><a class="header-anchor" href="#strictnullchecks"><span>strictNullChecks</span></a></h3>
<p>strictNullChecks controls whether null and undefined are permissible values in every type.</p>
<h3 id="other-options" tabindex="-1"><a class="header-anchor" href="#other-options"><span>Other Options</span></a></h3>
<p>There are many other settings that affect language semantics (e.g., noImplicitThis and strictFunctionTypes), but these are minor compared to noImplicitAny and strictNullChecks. To enable all of these checks, turn on the strict setting. Type‐ Script is able to catch the most errors with strict, so this should be your goal.</p>
<p>If you create a project using tsc --init, you’ll be in strict mode by default.</p>
<p><strong>Things to Remember</strong></p>
<ul>
<li>The TypeScript compiler includes several settings that affect core aspects of the language.</li>
<li>Configure TypeScript using tsconfig.json rather than command-line options.</li>
<li>Turn on noImplicitAny unless you are transitioning a JavaScript project to TypeScript.</li>
<li>Use strictNullChecks to prevent “undefined is not an object”-style runtime errors.</li>
<li>Aim to enable strict to get the most thorough checking that TypeScript can offer.</li>
</ul>
<h2 id="code-generation-is-independent-of-type" tabindex="-1"><a class="header-anchor" href="#code-generation-is-independent-of-type"><span>Code Generation Is Independent of Type</span></a></h2>
<p>At a high level, tsc (the TypeScript compiler) does two thing</p>
<ol>
<li>It converts next-generation TypeScript/JavaScript to an older version of JavaScript that works in browsers or other runtimes (“transpiling”)</li>
<li>It checks your code for type errors</li>
</ol>
<p>What’s surprising is that these two behaviors are entirely independent of one another</p>
<h3 id="you-cannot-check-typescript-types-at-runtime" tabindex="-1"><a class="header-anchor" href="#you-cannot-check-typescript-types-at-runtime"><span>You Cannot Check TypeScript Types at Runtime</span></a></h3>
<p>TypeScript types are “erasable”: part of com‐ pilation to JavaScript is simply removing all the interfaces, types, and type annota‐ tions from your code.</p>
<h3 id="code-with-type-errors-can-produce-output" tabindex="-1"><a class="header-anchor" href="#code-with-type-errors-can-produce-output"><span>Code with Type Errors Can Produce Output</span></a></h3>
<p>You can think of all TypeScript errors as being similar to warnings in those languages: it’s likely that they indicate a problem and are worth investigating, but they won’t stop the build.</p>
<h3 id="type-operations-cannot-affect-runtime-values" tabindex="-1"><a class="header-anchor" href="#type-operations-cannot-affect-runtime-values"><span>Type Operations Cannot Affect Runtime Values</span></a></h3>
<div class="language-typescript line-numbers-mode" data-ext="typescript" data-title="typescript"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676">function</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665"> asNumber</span><span style="--shiki-light:#999999;--shiki-dark:#666666">(</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">val</span><span style="--shiki-light:#999999;--shiki-dark:#666666">: </span><span style="--shiki-light:#2E8F82;--shiki-dark:#5DA994">number</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> | </span><span style="--shiki-light:#2E8F82;--shiki-dark:#5DA994">string</span><span style="--shiki-light:#999999;--shiki-dark:#666666">):</span><span style="--shiki-light:#2E8F82;--shiki-dark:#5DA994"> number</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> {</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE"> </span></span>
<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">   return</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A"> val</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375"> as</span><span style="--shiki-light:#2E8F82;--shiki-dark:#5DA994"> number</span><span style="--shiki-light:#999999;--shiki-dark:#666666">;</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">}</span></span></code></pre>

<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript line-numbers-mode" data-ext="javascript" data-title="javascript"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676">function</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665"> asNumber</span><span style="--shiki-light:#999999;--shiki-dark:#666666">(</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">val</span><span style="--shiki-light:#999999;--shiki-dark:#666666">)</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> {</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE"> </span></span>
<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">   return</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A"> val</span><span style="--shiki-light:#999999;--shiki-dark:#666666">;</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">}</span></span></code></pre>

<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>There is no conversion going on whatsoever. The as number is a type operation, so it cannot affect the runtime behavior of your code. To normalize the value you’ll need to check its runtime type and do the conversion using JavaScript constructs.</p>
<h3 id="runtime-types-may-not-be-the-same-as-declared-types" tabindex="-1"><a class="header-anchor" href="#runtime-types-may-not-be-the-same-as-declared-types"><span>Runtime Types May Not Be the Same as Declared Types</span></a></h3>
<p>TypeScript usually flags dead code, but it does not complain about this, even with the strict option.</p>
<div class="language-typescript line-numbers-mode" data-ext="typescript" data-title="typescript"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676">function</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665"> setLightSwitch</span><span style="--shiki-light:#999999;--shiki-dark:#666666">(</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">value</span><span style="--shiki-light:#999999;--shiki-dark:#666666">: </span><span style="--shiki-light:#2E8F82;--shiki-dark:#5DA994">boolean</span><span style="--shiki-light:#999999;--shiki-dark:#666666">)</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> {</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE"> </span></span>
<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">  switch</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> (</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">value</span><span style="--shiki-light:#999999;--shiki-dark:#666666">)</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> {</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE"> </span></span>
<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">    case</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375"> true</span><span style="--shiki-light:#999999;--shiki-dark:#666666">:</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665"> turnLightOn</span><span style="--shiki-light:#999999;--shiki-dark:#666666">();</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375"> break</span><span style="--shiki-light:#999999;--shiki-dark:#666666">;</span></span>
<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">    case</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375"> false</span><span style="--shiki-light:#999999;--shiki-dark:#666666">:</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665"> turnLightOff</span><span style="--shiki-light:#999999;--shiki-dark:#666666">();</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375"> break</span><span style="--shiki-light:#999999;--shiki-dark:#666666">;</span></span>
<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">    default</span><span style="--shiki-light:#999999;--shiki-dark:#666666">:</span></span>
<span class="line"><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">      console</span><span style="--shiki-light:#999999;--shiki-dark:#666666">.</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665">log</span><span style="--shiki-light:#999999;--shiki-dark:#666666">(</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">`</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D">I'm afraid I can't do that.</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">`</span><span style="--shiki-light:#999999;--shiki-dark:#666666">);</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">  }</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE"> </span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">}</span></span></code></pre>

<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>The key is to remember that boolean is the declared type. Because it is a TypeScript type, it goes away at runtime. In JavaScript code, a user might inadvertently call setLightSwitch with a value like &quot;ON&quot;.</p>
<h3 id="you-cannot-overload-a-function-based-on-typescript-types" tabindex="-1"><a class="header-anchor" href="#you-cannot-overload-a-function-based-on-typescript-types"><span>You Cannot Overload a Function Based on TypeScript Types</span></a></h3>
</div></template>


