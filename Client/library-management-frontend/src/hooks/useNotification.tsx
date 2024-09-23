import { useState } from "react";

interface Notification {
    isVisible: boolean;
    mainText: string;
    subText: string;
}

const useNotification = (): {
    notification: Notification
    showNotification: (mainText: string, subText: string, ms: number) => void
} => {
    const [notification, setNotification] = useState<Notification>({
        isVisible: false,
        mainText: "",
        subText: ""
    });

    const showNotification = (mainText: string, subText: string, ms: number): void => {
        setNotification({isVisible: true, mainText, subText})
        setTimeout(() => {
            setNotification({isVisible: false, mainText: "", subText: ""})
        }, ms);
    };

    return {notification, showNotification};
}

export default useNotification;