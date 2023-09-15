module.exports = {
    // 指定如何解析语法：ESLint 对 TypeScript 的解析，使用 @typescript-eslint/parser
    parser: '@typescript-eslint/parser',
    // eslint校验插件
    plugins: [
        'react',
        'react-hooks',
        '@typescript-eslint',
        'jsdoc',
        'prettier',
        'simple-import-sort'
    ],
    settings: {
        react: {
            version: 'detect'
        }
    },
    env: {
        browser: true
    },
    globals: {
        domain: false
    },
    rules: {
        /**
         * eslint----ES基础配置
         */
        'no-debugger': 2, // 不允许出现debugger语句
        // 禁止出现未使用过的变量
        'no-unused-vars': 'off',
        // 强制最大可嵌深度为4，alloy 默认为 5, eslint 建议为 4
        'max-depth': ['error', 4],
        // 如果一个变量不会被重新赋值，则使用const声明
        'prefer-const': 'error',
        // 关闭强制在花括号内使用一致的换行符
        'object-curly-newline': 'off',
        // 关闭点击元素上强制增加onKey**事件
        'click-events-have-key-events': 'off',
        // parseInt 必须传入第二个参数, TS会自动校正，所以关闭
        radix: 'off',
        // 函数括号内换行，开启会增加数组循环return书写复杂度
        // consistent: 要求每对圆括号一致地使用换行符。如果该对中的一个括号内有换行符，而另一个括号中没有换行符，则会报告错误。
        // 'function-paren-newline': ['error', 'consistent'],
        // 使用void 0 代替 undefined
        'no-void': 'off',
        // 允许使用简便的方式对值类型进行转换
        'no-implicit-coercion': 'off',
        // 此规则在对象文字的大括号内执行一致的间距，解构赋值和导入/导出说明符。
        // 降维使用花括号
        'object-curly-spacing': ['error', 'always'],
        // 忽略错误回调，必须处理异常现象
        'handle-callback-err': 'off',
        // Project.reject 可以不使用 error
        // 'prefer-promise-reject-errors': 'off',
        /**
         * 禁止在类之外的地方使用 this
         * @reason 只允许在 class 中使用 this
         */
        'no-invalid-this': 'off',

        /**
         * eslint----React
         */

        // 使用了jsx语法的js代码文件其扩展名可以使用js或jsx
        'react/jsx-filename-extension': ['error', { extensions: ['.tsx'] }],
        // react static property 改造阶段不检测, jsx to tsx 阶段会转为 interface
        // 'react/static-property-placement': 'off',
        // 无状态和没有使用生命周期的组件使用函数组件声明
        'react/prefer-stateless-function': ['error', { ignorePureComponents: false }],
        // 组件内部换行
        'react/jsx-one-expression-per-line': 'off',
        // 第一个属性必须换行
        'react/jsx-first-prop-new-line': 'off',
        // 禁止jsx中使用无用的引号
        'react/jsx-curly-brace-presence': 'off',
        // 禁止无意义的 Fragment 组件
        'react/jsx-no-useless-fragment': 'off',
        // hooks的依赖性没写全时，警告即可
        'react-hooks/exhaustive-deps': 'off',
        // 检查 Hook 的规则
        'react-hooks/rules-of-hooks': 'error',
        /**
         * <button> 必须有 type 属性
         */
        'react/button-has-type': 'off',
        /**
         * 必须使用 <></> 而不是 React.Fragment
         * @reason <></> 不需要额外引入 Fragment 组件
         */
        'react/jsx-fragments': ['error', 'syntax'],
        /**
         * handler 的名称必须是 onXXX 或 handleXXX
         */
        'react/jsx-handler-names': 'off',
        /**
         * 数组中的 jsx 必须有 key
         */
        'react/jsx-key': [
            'error',
            {
                checkFragmentShorthand: true
            }
        ],
        /**
         * 禁止出现重复的 props
         */
        'react/jsx-no-duplicate-props': 'error',
        /**
         * 禁止出现 href="javascript:void(0)"
         * @reason React 已经有 warning 了，并且会在将来禁止此类属性值
         */
        'react/jsx-no-script-url': 'error',
        /**
         * 禁止使用 target="_blank"
         */
        'react/jsx-no-target-blank': 'off',
        /**
         * 禁止使用未定义的组件
         */
        'react/jsx-no-undef': 'error',
        /**
         * 组件的名称必须符合 PascalCase
         */
        'react/jsx-pascal-case': 'error',
        /**
         * 禁止使用 {...props}
         */
        'react/jsx-props-no-spreading': 'off',
        /**
         * defaultProps 必须按字母排序
         */
        'react/jsx-sort-default-props': 'off',
        /**
         * props 必须按字母排序
         */
        'react/jsx-sort-props': 'off',
        /**
         * 禁止在 setState 中使用 this.state
         */
        'react/no-access-state-in-setstate': 'off',
        /**
         * 禁止使用数组的索引作为 key
         */
        'react/no-array-index-key': 'off',
        /**
         * 禁止将 children 作为一个 prop
         */
        'react/no-children-prop': 'error',
        /**
         * 禁止使用 dangerouslySetInnerHTML
         */
        'react/no-danger': 'off',
        /**
         * 禁止在使用了 dangerouslySetInnerHTML 的组件内添加 children
         */
        'react/no-danger-with-children': 'error',
        /**
         * 禁止使用已废弃的 api
         */
        'react/no-deprecated': 'error',
        /**
         * 禁止在 componentDidMount 里使用 setState
         * @reason 同构应用需要在 didMount 里使用 setState
         */
        'react/no-did-mount-set-state': 'off',
        /**
         * 禁止在 componentDidUpdate 里使用 setState
         */
        'react/no-did-update-set-state': 'error',
        /**
         * 禁止直接修改 this.state
         */
        'react/no-direct-mutation-state': 'error',
        /**
         * 已定义的 state 必须使用
         * @reason 没有官方文档，并且存在很多 bug：https://github.com/yannickcr/eslint-plugin-react/search?q=no-unused-state&type=Issues&utf8=%E2%9C%93
         */
        'react/no-unused-state': 'off',
        /**
         * render 方法中必须有返回值
         */
        'react/require-render-return': 'error',
        /**
         * style 属性的取值必须是 object
         */
        'react/style-prop-object': 'error',

        /**
         * eslint----typescript
         */

        // 是否检测空接口
        '@typescript-eslint/no-empty-interface': 'off',
        // 是否显示声明类成员的访问性, 使用React的成员顺序
        '@typescript-eslint/explicit-member-accessibility': 'off',
        // 将代码缩进管理，委托 prettier 进行管理
        '@typescript-eslint/indent': 'off',
        // 禁止出现没必要的 constructor, 自动模板生成的代码都是空的constructor
        '@typescript-eslint/no-useless-constructor': 'off',
        // 不允许无用的表达式
        // 'no-unused-expressions': [
        //     'error',
        //     {
        //         allowShortCircuit: true,
        //         allowTernary: true,
        //         allowTaggedTemplates: true
        //     }
        // ],
        // no-unused-expressions 会跟typescript的链式可选链调用冲突（prefer-optional-chain）
        'no-unused-expressions': 'off',
        '@typescript-eslint/no-unused-expressions': [
            'error',
            {
                allowShortCircuit: true, // 允许简单回调 如 path && history.push(path)
                allowTernary: true, // 允许三元函数
                allowTaggedTemplates: true // 允许标签膜吧
            }
        ],
        // 禁止出现未使用过的变量，编码过程都是预定义参数，然后编写代码实现，如果一开始就提醒，导致编码过程不友好
        '@typescript-eslint/no-unused-vars': 'off',
        /**
         * 禁止给一个基础类型初始化时直接赋值为 number, string 的变量显式的声明类型
         * @reason 可以简化代码
         */
        '@typescript-eslint/no-inferrable-types': 'off',
        /**
         * 使用 ?? 替代 ||
         */
        '@typescript-eslint/prefer-nullish-coalescing': 'off',
        /**
         * 枚举值必须初始化
         */
        '@typescript-eslint/prefer-enum-initializers': 'off',
        /**
         * 使用 for 循环遍历数组时，如果索引仅用于获取成员，则必须使用 for of 循环替代 for 循环
         * @reason for of 循环更加易读
         */
        '@typescript-eslint/prefer-for-of': 'error',
        '@typescript-eslint/no-explicit-any': ['off'], // 关闭any类型检测

        /**
         * eslint----base
         */

        // 注释的首字母必须大写
        'capitalized-comments': 'off',
        /**
         * 禁止函数的循环复杂度超过 20
         * @reason https://en.wikipedia.org/wiki/Cyclomatic_complexity
         * 限制循环复杂度(if else的个数)
         * complexity: ['error', 60],
         */
        complexity: [
            'error',
            {
                max: 20
            }
        ],
        /**
         * 禁止函数在不同分支返回不同类型的值
         * @reason 缺少 TypeScript 的支持，类型判断是不准确的
         */
        'consistent-return': 'off',
        /**
         * switch 语句必须有 default
         */
        'default-case': 'off',
        /**
         * switch 语句中的 default 必须在最后
         */
        'default-case-last': 'error',
        /**
         * 有默认值的参数必须放在函数参数的末尾
         */
        'default-param-last': 'off',
        /**
         * 禁止使用 foo['bar']，必须写成 foo.bar
         * @reason 当需要写一系列属性的时候，可以更统一
         */
        'dot-notation': 'off',
        /**
         * 必须使用 === 或 !==，禁止使用 == 或 !=
         */
        eqeqeq: ['error', 'always'],
        /**
         * 禁止方向错误的 for 循环,无限循环等
         */
        'for-direction': 'error',
        /**
         * 函数赋值给变量的时候，函数名必须与变量名一致
         */
        'func-name-matching': [
            'error',
            'always',
            {
                includeCommonJSModuleExports: false
            }
        ],
        /**
         * 函数必须有名字
         */
        'func-names': 'off',
        /**
         * 必须只使用函数声明或只使用函数表达式
         */
        'func-style': 'off',
        /**
         * 单行注释必须写在上一行
         */
        'line-comment-position': 'off',
        /**
         * 回调函数嵌套禁止超过 3 层，多了请用 async await 替代
         */
        'max-nested-callbacks': ['error', 3],
        // 函数的参数禁止超过 4 个
        'max-params': ['error', 4],
        /**
         * 禁止使用 console
         */
        'no-console': 'off',
        /**
         * 禁止对使用 const 定义的常量重新赋值
         */
        'no-const-assign': 'error',
        /**
         * 禁止对一个变量使用 delete
         * @reason 编译阶段就会报错了
         */
        'no-delete-var': 'off',
        /**
         * 禁止在函数参数中出现重复名称的参数
         * @reason 编译阶段就会报错了
         */
        'no-dupe-args': 'off',
        /**
         * 禁止 if else 的条件判断中出现重复的条件
         */
        'no-dupe-else-if': 'error',
        /**
         * 禁止在对象字面量中出现重复的键名
         */
        'no-dupe-keys': 'error',
        /**
         * 禁止在 switch 语句中出现重复测试表达式的 case
         */
        'no-duplicate-case': 'error',
        /**
         * 禁止重复导入模块
         */
        'no-duplicate-imports': 'error',
        /**
         * 禁止在 else 内使用 return，必须改为提前结束
         * @reason else 中使用 return 可以使代码结构更清晰
         */
        'no-else-return': 'off',
        /**
         * 禁止出现空代码块，允许 catch 为空代码块
         */
        'no-empty': [
            'error',
            {
                allowEmptyCatch: true
            }
        ],
        /**
         * 不允许有空函数
         * @reason 有时需要将一个空函数设置为某个项的默认值
         */
        'no-empty-function': 'off',
        /**
         * 禁止解构赋值中出现空 {} 或 []
         */
        'no-empty-pattern': 'error',
        /**
         * switch 的 case 内必须有 break, return 或 throw，空的 case 除外
         */
        'no-fallthrough': 'error',
        /**
         * 禁止连续赋值，比如 foo = bar = 1
         */
        'no-multi-assign': 'off',
        /**
         * 禁止使用嵌套的三元表达式，比如 a ? b : c ? d : e
         */
        'no-nested-ternary': 'off',
        /**
         * 禁止使用 ++ 或 --
         */
        'no-plusplus': 'off',
        /**
         * 禁止在 return 语句里赋值
         */
        'no-return-assign': ['error', 'always'],
        /**
         * 禁止使用三元表达式
         */
        'no-ternary': 'off',
        /**
         * 禁止使用未定义的变量
         */
        'no-undef': 'off',
        /**
         * 禁止使用 undefined
         */
        'no-undefined': 'off',
        /**
         * 禁止变量名出现下划线
         */
        'no-underscore-dangle': 'off',
        /**
         * 必须使用 !a 替代 a ? false : true
         * @reason 后者表达的更清晰
         */
        'no-unneeded-ternary': 'off',
        /**
         * 禁止解构赋值时出现同样名字的的重命名，比如 let { foo: foo } = bar;
         */
        'no-useless-rename': 'error',
        /**
         * 禁止没必要的 return
         */
        'no-useless-return': 'off',
        /**
         * 禁止变量申明时用逗号一次申明多个
         */
        // 'one-var': ['error', 'never'],
        /**
         * 必须使用 x = x + y 而不是 x += y
         */
        'operator-assignment': 'off',
        /**
         * 必须使用 ... 而不是 Object.assign，除非 Object.assign 的第一个参数是一个变量
         */
        'prefer-object-spread': 'error',
        /**
         * 必须使用 ... 而不是 apply，比如 foo(...args)
         */
        'prefer-spread': 'off',
        /**
         * async 函数中必须存在 await 语句
         */
        'require-await': 'off',
        // import的排序，默认按成员语法排序，其次是按照第一个成员或别名的字母顺序排序
        // 'simple-import-sort/imports': 'error',
        // 'simple-import-sort/exports': 'error',
        // 强制模块内的 import 排序
        'sort-imports': 'off',
        '@typescript-eslint/naming-convention': 0,
        '@typescript-eslint/explicit-module-boundary-types': 0,

        // 禁止在常规字符串中出现模板字面量占位符语法
        'no-template-curly-in-string': 0,
        // 强制每个文件中包含的class类的最大数量
        'max-classes-per-file': ['error', 2],

        '@typescript-eslint/no-require-imports': 'off',
        // 禁用未声明的变量，除非它们在 /*global */ 注释中被提到
        '@typescript-eslint/no-undef': 'off',
        // IDE 或编译中的代码中会处理，

        // 禁止扩展原生对象
        'no-extend-native': 'off',
        // 'prettier/prettier': 'error',
        /**
         * prettier
         * 样式规则委托prettier进行管理
         */
        'prettier/prettier': [
            'error',
            {},
            {
                fileInfoOptions: {
                    withNodeModules: true
                }
            }
        ],
        '@typescript-eslint/consistent-type-assertions': 'off',
        // 不允许对null用==或者!=
        'no-eq-null': 2,
        'no-eval': 2, // 不允许使用eval()
        'no-extra-boolean-cast': 2, // 不允许出现不必要的布尔值转换
        'no-extra-semi': 2, // 不允许出现不必要的分号
        'no-inner-declarations': ['error', 'functions'], // 不允许在嵌套代码块里声明函数
        'no-irregular-whitespace': 2, // 不允许出现不规则的空格
        'no-sparse-arrays': 2, // 数组中不允许出现空位置
        // radix: 2, // 使用parseInt时强制使用基数来指定是十进制还是其他进制
        'no-undef-init': 2, // 不允许初始化变量时给变量赋值undefined
        camelcase: [
            2,
            {
                properties: 'never'
            }
        ], // 强制驼峰命名规则
        'no-multiple-empty-lines': [
            2,
            {
                max: 2
            }
        ], // 空行最多不能超过两行
        // 使用let和const代替var
        'no-var': 2,
        // 不允许变量重复声明
        'no-redeclare': 'off',
        // 不允许使用new String，Number和Boolean对象
        'no-new-wrappers': 2,
        // 要求检查NaN的时候使用isNaN()
        'use-isnan': 2,
        // 引入但未使用的import
        'unused-imports/no-unused-imports': 'off'
        // 引入的模块，编译时会认为模块联邦的模块为不可用模块，需要设置其可用，解决找不到模块“commonComponents/IconFont”或其相应的类型声明
        // 'import/no-unresolved': [2, { ignore: ['^@theme', '^@docusaurus', '^@site'] }],
    }
};
