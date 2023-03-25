import { useEffect, useRef, useState } from "react";

export const useEffectOnce = (effect: () => void | (() => void)) => {
    const destroyFunc = useRef<void | (() => void)>();
    const effectCalled = useRef(false);
    const renderAfterCalled = useRef(false);
    const [, forceUpdate] = useState<number>(0);

    useEffect(() => {
        if (!effectCalled.current) {
            destroyFunc.current = effect();
            effectCalled.current = true;
            forceUpdate((val) => val + 1);
        }

        return () => {
            if (!renderAfterCalled.current) {
                renderAfterCalled.current = true;
                return;
            }

            if (destroyFunc.current) {
                destroyFunc.current();
            }
        };
    }, [effect]);
};
