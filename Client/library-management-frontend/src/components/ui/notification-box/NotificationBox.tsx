import "./NotificationBox.css"

interface NotificationBoxProps {
    isVisible: boolean;
    mainText: string;
    subText: string;
}

const NotificationBox: React.FC<NotificationBoxProps> = ({ isVisible, mainText, subText }) => (
    <div
        className={`notification-box text-center alert alert-danger ${isVisible ? "visible" : "hidden"}`}
        role="alert">
        <h2 className="main-text">{mainText}</h2>
        <h4>{subText}</h4>
    </div>
);

export default NotificationBox;
