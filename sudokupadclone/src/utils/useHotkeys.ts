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
        if (e.ctrlKey && e.key === 'z') {
            onUserAction(UserAction.Undo);
            return;
        }
        if (e.ctrlKey && e.key === 'y') {
            onUserAction(UserAction.Redo);
            return;
        }
        switch (e.key) {
            case 'Backspace':
                onUserAction(UserAction.Backspace);
                break;
            case 'ArrowUp':
                onUserAction(UserAction.ArrowUp);
                break;
            case 'ArrowDown':
                onUserAction(UserAction.ArrowDown);
                break;
            case 'ArrowLeft':
                onUserAction(UserAction.ArrowLeft);
                break;
            case 'ArrowRight':
                onUserAction(UserAction.ArrowRight);
                break;
            default:
                break;
        }
    }, [onUserAction]);

    useEffect(() => {
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [handler]);
}