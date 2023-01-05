interface IngredientsParams {
  name: string,
  icon: string,
  _id: string,
}

export interface ProductParams {
  _id: string,
  name: string,
  description: string,
  imagePath: string,
  price: number,
  ingredients: IngredientsParams[]
}
