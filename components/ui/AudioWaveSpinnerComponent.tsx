import lottie from "lottie-web";
import { useEffect, useRef } from "react";

const AudioWaveSpinnerComponent = () => {
    const animationContainer = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (
            typeof window !== "undefined" &&
            animationContainer.current &&
            animationContainer.current.childNodes.length === 0
        ) {
            lottie.loadAnimation({
                container: animationContainer.current,
                renderer: "svg",
                loop: true,
                autoplay: true,
                path: "/vMImG9Teup.json",
            });
        }
    }, []);

    return (
        <div ref={animationContainer} className="w-10 h-10 overflow-hidden"></div>
    );
};

export default AudioWaveSpinnerComponent;
