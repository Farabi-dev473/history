interface Image{}
type numOrStr = number | string

interface Product {
   name: string;
   price: number,
   images: [Image],
   favourite: boolean,
   shortDescription: string,
   categories: [
    {
        name: String,
        link: String
    }
    ],
    ratings: {
      total: number,
      stars: number,
    },
    rank: number,
    comparePrice: {
      start: number,
      end: number
    }
    variants: [
      {
        image: Image,
        link: string,
        price: number
      }
    ],
    propertis: [
      {
        // This object includes additional info but it depends on the product. So, The front-end needs to know which type of additional property can be here by last item of category array.
      }
    ],

    relatedProducts: [
      {
        name: string,
        img: Image,
        price: string,
        favourite: boolean,
        ratings: string,
        totalReviews: string,
        link: string,
        discount?: number,
        watching?: number
      }
    ]

    review: {
      totalReviews: numOrStr
      users: [{
        name: string,
        image: Image,
        country: {
          name: string,
          flagImage: Image
        },
        reviewDate: Date,
        stars: numOrStr,
        updated: boolean,
        title: string,
        shortDescription: string,
        readMoreLink: string,
        reviewPercentages: {
          one: number,
          two: number,
          three: number,   // Here I can also use an array but it depends on the operation on the data
          four: number,
          five: number
        }

      }],
      experts: []
    }

    statistics: [
      {
        date: Date,
        store: string,
        lowestPrice: numOrStr
        exchange: numOrStr
      }
    ],
    
    productInfo: {
      first: string,
      mid: [string],
      last: string,
      compare: [
        {
          name: string,
          link: string
        }
      ],

      productAdditionInfo: {
          headers: [string],
          values: [
            {
              key: string,
              value: string          // the header has a relation with values array like headers[1] === values[1], headers[2] === values[2] and so on.
            }
          ]
      }
      createdAt: Date,
      videosLinks?: [string]
    }
}