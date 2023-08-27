const schema = {
    categories: [
        {
            name: String,
            link: String
        }
    ],

    productName: String,
    shortDescription: String,
    stockOut: Boolean,
    favourite: Boolean,
    images: Array,
    rating: {
        numberOfRatings: Number,
        ratingInStar: Number
    },
    compareWith: String,
    rank: Number,
    comparePrices: [Number, Number],
    RelatedProducts: [
        {
            id,
            name: String,
            price: Number,
            favourite: Boolean,
            image: String,
            rating: {
                numberOfRatings: Number,
                ratingInStarts: Number
            },
            discount: Number,
            specialProperty: {
                trending: Boolean,
                watching: {
                    watchers: Number
                }
            }
        }
    ],
    showAllRelatedProductsLink: String,
    reviews: [
        {
            userId: String,
            name: String,
            country: {
                name: String,
                flagImage: String
            },
            stars: Number,
            date: String,
            time: String,
            title: String,
            description: String,
            liked: Number,
            expertsReview: Boolean
        }
    ],

    // Front-end should calculate the dates. It would reduce the latency.

    statistics: {
        gapBetweenXAxisPrices: Number,
        firstMonth: {
            importantDates: [
                {
                    startingDate: String,
                    endingDate: String
                }
            ],
            xAxisPrices: {
               start: Number,
               end: Number,
            },
            yAxisDates: {
               start: String,
               end: String,
               gapBetweenDates: Number
            }
        },
        thirdMonth: {
            importantDates: [
                {
                    startingDate: String,
                    endingDate: String
                }
            ],
            xAxisPrices: {
               start: Number,
               end: Number,
            },
            yAxisDates: {
               start: String,
               end: String,
               gapBetweenDates: Number
            }
        },
        sixthMonth: {
            importantDates: [
                {
                    startingDate: String,
                    endingDate: String
                }
            ],
            xAxisPrices: {
               start: Number,
               end: Number,
            },
            yAxisDates: {
               start: String,
               end: String,
               gapBetweenDates: Number
            }
        },
        all: {
            importantDates: [
                {
                    startingDate: String,
                    endingDate: String
                }
            ],
            xAxisPrices: {
               start: Number,
               end: Number,
            },
            yAxisDates: {
               start: String,
               end: String,
               gapBetweenDates: Number
            }
        }
    }
}