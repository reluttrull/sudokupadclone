import { useEffect, useCallback } from 'react'
import { UserAction } from '../puzzle/enums'

export function useNumberHotkeys(onUserInput: (n: number) => void) {
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

export function useControlHotkeys(onUserAction: (userAction: UserAction) => void) {
    const handler = useCallback((e: KeyboardEvent) => {
        if (e.key == 'Backspace') onUserAction(UserAction.Backspace);
    }, [onUserAction]);

    useEffect(() => {
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [handler]);
}