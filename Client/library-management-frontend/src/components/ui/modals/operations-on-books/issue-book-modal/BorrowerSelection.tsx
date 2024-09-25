import { useEffect, useState } from "react";
import { Form, Spinner } from "react-bootstrap";
import { BorrowerDto } from "../../../../../types/BorrowerProps";
import { BorrowerService } from "../../../../../services/borrower.service";
import useNotification from "../../../../../hooks/useNotification";
import { Typeahead } from "react-bootstrap-typeahead";
import NotificationBox from "../../../notification-box/NotificationBox";
import { BorrowerType } from "./borrower-types.enum";

interface BorrowerSelectionProps {
    toggleAddNewBorrowerModal: () => void;
    setBorrowerId: (borrowerId: number | undefined) => void;
}

export const BorrowerSelection: React.FC<BorrowerSelectionProps> = ({ toggleAddNewBorrowerModal, setBorrowerId }) => {
    const [borrowerType, setBorrowerType] = useState<BorrowerType>(BorrowerType.NOT_SET);
    const [borrowersOptions, setBorrowersOptions] = useState<BorrowerDto[]>([]);
    const [isLoadingBorrowers, setIsLoadingBorrowers] = useState<boolean>(false);

    const { notification, showNotification } = useNotification();

    useEffect(() => {
        if (borrowerType === BorrowerType.NEW) {
            toggleAddNewBorrowerModal();
        } else if (borrowerType === BorrowerType.EXISTING) {
            const fetchBorrowers = async () => {
                setIsLoadingBorrowers(true);
                try {
                    const borrowers = await BorrowerService.getDtoBorrowers();
                    if (borrowers) setBorrowersOptions(borrowers);
                } catch {
                    showNotification("Unable to obtain registered borrowers", "Please try again later", 5000);
                } finally {
                    setIsLoadingBorrowers(false);
                }
            };

            fetchBorrowers();
        }
    // eslint-disable-next-line
    }, [borrowerType]);

    return (
        <>
            <NotificationBox isVisible={notification.isVisible}
                             mainText={notification.mainText}
                             subText={notification.subText} />
            <Form.Group>
                <Form.Label className="h5 ms-1">Borrower</Form.Label>
                <div className="ms-1 mb-2">
                    <Form.Check
                        type="radio"
                        label="Add New"
                        value={BorrowerType.NEW}
                        checked={borrowerType === BorrowerType.NEW}
                        onChange={e => setBorrowerType(BorrowerType.NEW)}
                    />
                    <Form.Check
                        type="radio"
                        label="Issue to an existing"
                        value={BorrowerType.EXISTING}
                        checked={borrowerType === BorrowerType.EXISTING}
                        onChange={e => setBorrowerType(BorrowerType.EXISTING)}
                    />
                </div>
            </Form.Group>
            {borrowerType === BorrowerType.EXISTING && (
                <Form.Group className="mb-3">
                    {isLoadingBorrowers ? (
                        <Spinner animation="border"></Spinner>
                    ) : (
                        <Typeahead
                            id="borrower-select"
                            onChange={(selected) => {
                                setBorrowerId(
                                    borrowersOptions.find(b => String(selected) === b.fullName)!.id
                                )
                            }}
                            options={borrowersOptions.map(b => b.fullName)}
                            placeholder="Borrower"
                        />
                    )}
                </Form.Group>
            )}
        </>
    );
};
