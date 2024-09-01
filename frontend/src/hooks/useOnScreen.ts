// src/hooks/useOnScreen.ts
import { useEffect, useState } from 'react';

function useOnScreen(ref: React.RefObject<HTMLElement>, threshold = 0.7) {
    const [isIntersecting, setIntersecting] = useState(false);

    useEffect(() => {
        // threshold が有効な数値でない場合、デフォルト値に戻す
        if (threshold == null || typeof threshold !== 'number' || isNaN(threshold) || threshold < 0 || threshold > 1) {
            console.error("Invalid threshold value", threshold);
            threshold = 0.7; // デフォルト値に戻す
        }

        const observer = new IntersectionObserver(
            ([entry]) => setIntersecting(entry.isIntersecting),
            {
                root: null,
                rootMargin: '0px',
                threshold: threshold, // ここでエラーが発生している可能性が高い
            }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [ref, threshold]);

    return isIntersecting;
}

export default useOnScreen;

