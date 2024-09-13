import "./NotificationBox.css"

interface NotificationBoxProps {
    visible: boolean;
    mainText: string;
    subText: string;
}

const NotificationBox: React.FC<NotificationBoxProps> = ({ visible, mainText, subText }) => {
    return (
        <div
            className={`notification-box text-center alert alert-danger ${visible ? "visible" : "hidden"
                }`}
            role="alert">
            <h2 className="main-text">{mainText}</h2>
            <h4>{subText}</h4>
        </div>
    )
}

export default NotificationBox;