export default interface QuoteAPIResponse {
    statusCode: number
    message: string
    pagination: {
        currentPage: number,
        nextPage: number,
        totalPages: number
    },
    totalQuotes: number
    data: [
        {
            _id: string,
            quoteText: string,
            quoteAuthor: string,
            quoteGenre: string
        }
    ]
}

