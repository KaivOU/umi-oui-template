import React, { useEffect, useRef } from 'react';
/**
 * 功能：React hooks帮助类
 */

export function useInterval(fun, intervalTime = 1000) {
    const myRef = React.useRef(null);
    React.useEffect(() => {
        myRef.current = fun;
    }, [fun]);

    React.useEffect(() => {
        myRef.current();
        const id = setInterval(() => {
            myRef.current();
        }, intervalTime);
        return () => clearInterval(id);
    }, []);
}

// async方式的useEffect
export function useAsyncEffect<T, U extends any[]>(method: () => Promise<T>, deps: U) {
    const methodRef = useRef<any>(() => {});

    useEffect(() => {
        (async () => {
            methodRef.current = await method();
        })();
        return methodRef.current;
    }, deps);
}
