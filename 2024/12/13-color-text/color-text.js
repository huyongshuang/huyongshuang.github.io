hexo.extend.tag.register('color', function (args, content) {
    const color = args[0] || 'black';
    return `<span style="color: ${color};">${content}</span>`;
}, { ends: true });
