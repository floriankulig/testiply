import { useEffect, useState } from "react";

export const useIsMobile = (breakpoint: number = 1080) => {
    const [isMobile, setIsMobile] = useState(false);

    const onResize = (e) => {
        if (e.currentTarget.innerWidth > breakpoint) {
            setIsMobile(false)
        } else {
            setIsMobile(true)
        }
    }

    useEffect(() => {
        // set this as an initial without having to resize first
        setIsMobile(window.innerWidth <= breakpoint);

        // handle on resize
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize)
    }, [])

    return isMobile
}