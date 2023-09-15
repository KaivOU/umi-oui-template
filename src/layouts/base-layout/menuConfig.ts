import { menuIcon } from './MenuIcon';
export const menuConfig = (renderItem: Function) => {
    return [
        {
            label: renderItem('总览', '/overview'),
            key: '/overview',
            icon: menuIcon['Nav Overview']
        }
    ];
};
