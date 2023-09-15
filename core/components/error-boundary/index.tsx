import React, { ErrorInfo, ReactNode } from 'react';
import ErrorFallback from '../error-fallback';

interface ErrorBoundaryProps {
    children: ReactNode;
    FallbackComponent?: any;
}
interface ErrorBoundaryState {
    hasError: any;
    error: any;
    errorInfo: string;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    static getDerivedStateFromError(error: Error) {
        return { hasError: true, error: error, errorInfo: error.message };
    }

    state = { hasError: false, error: null, errorInfo: '' };

    componentDidCatch(error: any, errorInfo: ErrorInfo) {
        console.log(error, errorInfo);
    }

    render() {
        const { children, FallbackComponent = ErrorFallback } = this.props;
        const { error, errorInfo } = this.state;
        if (this.state.hasError) {
            return <FallbackComponent error={error} errorInfo={errorInfo} />;
        }

        return children;
    }
}

export default ErrorBoundary;
