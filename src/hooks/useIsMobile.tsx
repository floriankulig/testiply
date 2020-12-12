import { useEffect, useState } from "react";

export const useIsMobile = (breakpoint: number = 960) => {
    const [isMobile, setIsMobile] = useState(false);

    const onResize = (e) => {
        if (e.currentTarget.innerWidth > breakpoint) {
            setIsMobile(false)
        } else {
            setIsMobile(true)
        }
    }

    useEffect(() => {
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize)
    }, [])

    return isMobile
}