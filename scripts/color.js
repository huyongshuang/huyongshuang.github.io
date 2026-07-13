hexo.extend.tag.register('color', function (args, content) {
    const color = args[0] || 'black';
    const size = args[1] || '';
    let style = `color: ${color};`;
    if (size) style += `font-size:${size};`
    return `<span style="${style}">${content}</span>`;
}, { ends: true });