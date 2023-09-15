export default function access(initialState: any) {
    const { token, permissions } = initialState || {};
    return {
        hasPermission: () => permissions.includes('admin'),
        hasAccess: () => !!token
    };
}
