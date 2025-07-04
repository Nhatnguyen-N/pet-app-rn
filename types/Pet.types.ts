export interface PetTypes {
  age: string,
  breed: string,
  category: string,
  imageUrl: string,
  name: string,
  sex?: string,
  about: string,
  address: string,
  user: UserTypes,
  weight: string,
  userName: string,
  userImage: string,
}
export interface UserTypes {
  name: string,
  imageUrl: string,
  email: string,
}