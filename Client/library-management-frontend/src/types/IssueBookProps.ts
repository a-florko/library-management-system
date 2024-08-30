export interface IssueBookData {
    bookId: number,
    borrowerId: number,
    issuedById: number,
    issueDate: string,
    returnBefore: string,
    notes: string
}

export interface IssuedBookDto {
    id: number,
    bookId: number,
    bookTitle: string,
    borrowerId: number,
    borrowerFullName: string,
    returnBefore: string,
    notes: string,
}