module.exports = {
    // 与@commitlint/config-angular作用相似，选其一
    extends: ['@commitlint/config-conventional'],
    rules: {
        // type 类型定义
        'type-enum': [
            2,
            'always',
            [
                'feat', // 新功能 feature
                'fix', // 修复 bug
                'docs', // 文档注释
                'style', // 代码格式(不影响代码运行的变动)
                'test', // 增加测试
                'build', // 打包
                'refactor', // 代码重构，不引入新功能和缺陷修复
                'perf', // 性能优化

                'chore' // 构建过程或辅助工具的变动：不修改src的提交 或 测试文件的提交
            ]
        ],
        // subject 大小写不做校验
        // 自动部署的BUILD ROBOT的commit信息大写，以作区别
        'subject-case': [0],
        // scope不能为空，为空则抛出error
        'scope-empty': [2, 'never'],
        // scope小写
        'scope-case': [2, 'always', 'lowerCase']
    }
};
