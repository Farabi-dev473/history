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