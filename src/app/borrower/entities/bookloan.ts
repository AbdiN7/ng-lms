export interface BookLoan {
    bookLoanKey: {
        book: {
            bookId: number,
            title: string,
            author: {
                authorId: number,
                authorName: string
            },
            publisher: {
                publisherId: number,
                publisherName: string,
                publisherAddress: string,
                publisherPhone: string

            }
        },
        branch: {
            branchId: number,
            branchName: string,
            branchAddress: string
        },
        borrower: {
            cardNo: number,
            name: string,
            address: string,
            phone: string
        }
    },
    dateOut : Date,
    dueDate : Date
  }