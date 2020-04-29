export interface BookCopy {
        bookCopyKey: {
            book: {
                bookId: number,
                title: string,
                author: {
                    authorId: number,
                    authorName: string
                },
                publisher: {
                    publisherId: number,
                    publisherName: string
                    publisherAddress: string,
                    publisherPhone: string
                }
            },
            branch: {
                branchId: number,
                branchName: string,
                branchAddress: string
            }
        },
        noOfCopies: number
}