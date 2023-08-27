interface Image{}

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
        // This object includes addition info but it depends on the product. So, The front-end needs to know which type of additional property can be here by last item of category object.
      }
    ]
}