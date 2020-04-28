export interface Book {
    bookId: number;
    title: string;
    author: {
        authorId: number,
        authorName: string
    },
    publisher: {
      publisherId: number,
      publisherName: string,
      publisherAddress: string,
      publisherPhone: string,

    }
  }
