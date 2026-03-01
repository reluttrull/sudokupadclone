import { useEffect, useCallback } from 'react';

export function useHotkeys(onUserInput: (n: number) => void) {
    const handler = useCallback((e: KeyboardEvent) => {
        if (e.key >= '0' && e.key <= '9') {
            onUserInput(Number(e.key));
        }
    }, [onUserInput]);

    useEffect(() => {
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [handler]);
}