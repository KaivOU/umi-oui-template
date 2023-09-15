# lotus

路特斯项目

## Getting started
node: v18+
```ts
// 使用node v18 按照依赖包，stylelint需要
yarn

// v18 or v16
npm run start

```

## models层，数据管理方案
### useModel
官方：useModel 是一个 Hook，提供消费 Model 的能力，使用示例如下：
```typescript
import { useModel } from 'umi';

export default () => {
  const { user, fetchUser } = useModel('user', model => ({ user: model.user, fetchUser: model.fetchUser }));
  return <>hello</>
};
```
> useModel 有两个参数，namespace 和 updater。
namespace - 就是 hooks model 文件的文件名，如上面例子里的 useAuthModel
updater - 可选参数。在 hooks model 返回多个状态，但使用组件仅引用了其中部分状态，并且希望仅在这几个状态更新时 rerender 时使用（性能相关）

* @@initialState方式，初始化APP.tsx中使用
```typescript
// 定义：入口文件app.ts中，使用getInitialState返回初始值
// app.ts
/**
 * 初始化用户数据
 * 注：这里可以增加其它基本数据
 */
export async function getInitialState() {
  ...
  return {
    user,
    permissiones,
    authInfo,
  };
}

// 使用：通过useModel('@@initialState')获取getInitialState返回的值
// 例子：
const AllPermissions = useModel(
    '@@initialState',
    (state) => new Set(state.initialState?.permissiones),
  );
// 例子：
const { 
  initialState,  // getInitialState 的返回值
  loading, // getInitialState 是否处于 loading 状态
  error, // 当运行时配置中，getInitialState throw Error 时，会将错误储存在 error 中
  refresh, // 重新执行 getInitialState 方法，并获取新数据
  setInitialState //手动设置 initialState 的值
  } = useModel('@@initialState');
```

* 普通model方式
```typescript
// 定义，src/models/common.ts，models下的文件名默认为useModel的namespace
import { useState } from 'react';
export default function useCommonModel() {
  const [siderMenuCollapsed, setSiderMenuCollapsed] = useState(false);
  return {
    siderMenuCollapsed,
    setSiderMenuCollapsed,
  };
}

// 使用
import { useModel } from 'umi';
const { siderMenuCollapsed } = useModel('common');
```

* 自定义hook方式-接口请求
我们约定在 src/models 目录下的文件为项目定义的 model 文件。每个文件需要默认导出一个 function，该 function 定义了一个 Hook，不符合规范的文件我们会过滤掉。
文件名则对应最终 model 的 name，你可以通过插件提供的 API 来消费 model 中的数据。
所谓 hooks model 文件，就是自定义 hooks 模块，没有任何需要使用者关注的黑魔法。请看示例：
src/models/useAuthModel.js
```ts
import { useState, useCallback } from 'react'

export default function useAuthModel() {
  const [user, setUser] = useState(null)

  const signin = useCallback((account, password) => {
    // signin implementation-接口请求
    // setUser(user from signin API)
  }, [])

  const signout = useCallback(() => {
    // signout implementation-接口请求
    // setUser(null)
  }, [])

  return {
    user,
    signin,
    signout
  }
}

// 使用
import { useModel } from 'umi';
const { user, signin, signout } = useModel('useAuthModel');
await signin(account, password)
```
> 使用者书写的就是一个普通的自定义 hooks，但 @umijs/plugin-model 把其中的状态变成了『全局状态』，多个组件中使用该 model 时，拿到的同一份状态。
参考：https://v3.umijs.org/zh-CN/plugins/plugin-initial-state

规范
vscode设置-键盘快捷键-eslint: Fix all auto-fixable problem的快捷键可以快速格式化文件
