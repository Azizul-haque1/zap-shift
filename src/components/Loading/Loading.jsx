import Lottie from "lottie-react";
import loadingAnimation from "../../assets/animations/loading.json";

const Loading = () => {
    return (
        <div className="flex flex-col items-center justify-center gap-5">
            <div className="max-w-sm relative">
                <Lottie
                    animationData={loadingAnimation}
                    loop={true}
                    autoplay={true}
                />
            </div>
        </div>
    );
};

export default Loading;
