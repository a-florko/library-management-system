export interface OverdueIssuedBooks {
    id: number,
    bookTitle: string,
    borrowerFullName: string,
    borrowerTelephone: string,
    borrowerEmail: string,
    overdue: number,
}