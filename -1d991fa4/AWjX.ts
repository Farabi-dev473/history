interface Image{}
interface ProductVariant {
  image: Image,
  link: string,
  price: number
}

interface Statistics {
  startPrice: number
  endPrice: number
  startDate: Date
  endDate: Date
  pricesPerDay: [
    {
      price: number,
      shop: string
    }
  ]
}

interface RelatedProduct {
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

interface PaymentMethodSite {
  ad: boolean,
        name: string,
        logo: Image,
        freight: number,
        delivery: string,
        price: number,
        link: string,
        paymentMethods: [string],
        deliveryOptions?: [
          {
            deliveryService: string,
            deliveryOptions: string,
            deliveryType: string,
            estimatedDeliveryTime: string,
            price: number
          }
        ]
}

type numOrStr = number | string

interface Product {
   name: string;
   price: number,
   images: [Image],
   favourite: boolean,
   shortDescription: string,

   // This looks like - Start / Clothing * Accesesories / Shoes Trainer.
   // every object contain in this array are name & corresponding link.
   categories: [
    {
        name: String,
        link: String
    }
    ],

    // This object includes the totalRatings & starts of the proudct
    ratings: {
      total: number,
      stars: number,
    },

    // This is the rank of the product
    rank: number,
  
    // This is the compared price. Which has a start & end
    comparePrice: {
      start: number,
      end: number
    }

    // Different variants of the product.
    variants: [ProductVariant],
    propertis: [
      {
        // This object includes additional info but it depends on the product. So, The front-end needs to know which type of additional property can be here by last item of category array.
      }
    ],

    // This object includes payment methods with different websites for payment & delivery options
    payments: {
      cards: [{name: string, logo: Image}],
      sites: [PaymentMethodSite]
    }

    // Related products array
    relatedProducts: [RelatedProduct]

    review: {
      totalReviews: numOrStr // total number of reviews

      // This is a users array. The user represents here are those who reviewed the product
      users: [{
        name: string,
        image: Image,
        country: {       
          name: string,
          flagImage: Image
        },

        // Below contians the review & it's related informations
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

      // There are other users who are called experts. These array contains there name
      // buy using this name we can search in the users array.
      expertsName: [String]
    }

    // Contains array of statistics of 1, 3, 6 & all months.
    statistics: [Statistics]

    // Additional Info of product
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