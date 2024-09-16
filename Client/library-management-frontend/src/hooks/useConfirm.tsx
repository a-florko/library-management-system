import { useState } from "react"
import ConfirmModal from "../components/ui/modals/ConfirmationModal";

export const useConfirm = () => {
    const [isModalVisible, setModalVisible] = useState<boolean>(false);
    const [promiseHandler, setPromiseHandler] = useState<{ resolve: (value: boolean) => void, reject: () => void } | null>(null);

    const [modalContent, setModalContent] = useState({ title: '', body: '' });

    const confirm = (title: string, body: string): Promise<boolean> => {
        setModalContent({ title, body });
        setModalVisible(true);

        return new Promise<boolean>((resolve, reject) => {
            setPromiseHandler({ resolve, reject });
        });
    };

    const handleConfirm = () => {
        if (promiseHandler) promiseHandler.resolve(true);
        setModalVisible(false);
    };

    const handleCancel = () => {
        if (promiseHandler) promiseHandler.resolve(false);
        setModalVisible(false);
    };

    const ConfirmationDialog = () => (
        <ConfirmModal
            show={isModalVisible}
            title={modalContent.title}
            body={modalContent.body}
            onConfirm={handleConfirm}
            onCancel={handleCancel}
        />
    );

    return { confirm, ConfirmationDialog };
};