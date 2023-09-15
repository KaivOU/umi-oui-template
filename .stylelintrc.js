module.exports = {
    extends: ['stylelint-config-standard'],
    // 解决Unknown word CssSyntaxError问题，依赖postcss@8
    customSyntax: 'postcss-less',
    rules: {
        indentation: 4, // 指定缩进（可自动修复）
        'color-no-invalid-hex': true, // 禁止无效的 16 进制颜色
        'block-no-empty': true, // 禁止空块
        'unit-no-unknown': true, // 禁止未知的单位
        'no-empty-source': true, // 禁止空源码
        'max-empty-lines': 2, // 限制相邻空行的数量
        'at-rule-no-unknown': null, // 禁止未知的 at 规则。
        'color-function-notation': null, // 指定颜色函数的现代或传统符号可使用rgba(12, 122, 231, 0.2)
        'font-family-no-missing-generic-family-keyword': null, // 禁止字体系列中缺少通用系列关键字。null时font-family非必要加上Arial, sans-serif
        'no-descending-specificity': null, // 禁止在具有较高优先级的选择器后出现被其覆盖的较低优先级的选择器
        'selector-pseudo-class-no-unknown': [
            true,
            {
                ignorePseudoClasses: ['global']
            }
        ]
    },
    // 忽略文件
    ignoreFiles: [
        'node_modules/**/*',
        'public/**/*',
        'dist/**/*',
        '**/*.js',
        '**/*.jsx',
        '**/*.tsx',
        '**/*.ts',
        '*.png',
        '*.eot',
        '*.ttf',
        '*.woff'
    ]
};
