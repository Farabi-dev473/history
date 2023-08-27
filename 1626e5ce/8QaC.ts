const getRandomQuote = (author: string, quotes: string[]) => {
    const quote = quotes[Math.floor(Math.random() * quotes.length)]
    return `${quote} - ${author}`
}

export default getRandomQuote