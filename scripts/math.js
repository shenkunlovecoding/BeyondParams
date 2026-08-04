'use strict';

// Convert display delimiters before marked builds headings and the theme TOC.
hexo.extend.filter.register('before_post_render', function (data) {
  data.content = data.content.replace(/\$\$([\s\S]*?)\$\$/g, '\\\\[$1\\\\]');
  return data;
});

// Protect MathJax display blocks from marked before Markdown parses underscores,
// line breaks, and leading operators as Markdown syntax.
hexo.extend.filter.register('marked:extensions', function (extensions) {
  extensions.push({
    name: 'mathBlock',
    level: 'block',
    tokenizer(src) {
      const match = /^\s{0,3}\$\$([\s\S]+?)\n?\s{0,3}\$\$/.exec(src);
      if (!match) return;
      return {
        type: 'mathBlock',
        raw: match[0],
        text: match[1].trim()
      };
    },
    renderer(token) {
      return `<div class="math-block">\\[${token.text}\\]</div>\n`;
    }
  });
});
