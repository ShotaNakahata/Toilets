// frontend/src/config/motionConfig.ts
export const headerAnimation = {
    initial: { y: -100, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: {
        type: "spring",
        stiffness: 70,
        damping: 10,
        mass: 1,
    }
};

export const titlecolorAnimation = {
    initial: { color: "#FFFFFF" },
    animate: { color: ["#FFFFFF", "#004CDF", "#FFFFFF"] },
    transition: {
        duration: 4, // アニメーション合計時間
        ease: "easeInOut",
        // repeat: Infinity, // 無限に繰り返し
        // repeatType: "loop", // ループさせる
    },
};

export const titleColorVariants = {
    initial: { color: "#FFFFFF" },
    animate: {
        color: "#004CDF",
        transition: {
            duration: 0.7,
            ease: "easeInOut",
        },
    },
};

export const FadeInUpAnimation = {
    hidden: {
        opacity: 0,
        y: 50,
        transition: {
            duration: 1,
            ease: "easeOut",
        },
    },
    animate: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 1,
            ease: "easeOut",
        },
    },
};
