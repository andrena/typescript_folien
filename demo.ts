type User = 'Marco' | 'Susi' | 'Tom'
let user: User
user = 'Marco'
user = 'Susi'

type AgeRating = 0 | 6 | 12 | 16 | 18
type ChildAgeRating = Exclude<AgeRating, 16 | 18>
type Genre = 'Action' | 'Horror' | 'Abenteuer' | 'Comedy'

const icons: {
  [k in Genre as k extends 'Horror' ? never : Uncapitalize<k>]: string
} = {
  action: 'svg',
  abenteuer: 'svg',
  comedy: 'svg'
}

function drawIcon(genre: Genre) {
  const icon = icons[genre]
}

let a: 12 extends string ? boolean : number

type AllCombinationsOf<T, S = T> = [T] extends [never]
  ? []
  : T extends S
    ? [T, ...AllCombinationsOf<Exclude<S, T>>]
    : never

type AsArray1<T> = T[]
type AsArray2<T> = [T] extends [any] ? T[] : T
type A = AsArray1<AgeRating>
type B = AsArray2<AgeRating>

function getAgeRatings(): AllCombinationsOf<AgeRating> {
  return [0, 6, 18, 16, 12]
}

type Movie = {
  name: string
  ageRating: AgeRating
  genre: Genre
  id: `M-${AgeRating}-${number}`,
  director: {
    name: string
    country: {
      isoCode: string,
      number: number
    }
  }
}

let movie: Movie ={
  name: 'Jurassic park',
  ageRating: 12,
  genre: 'Abenteuer',
  id: 'M-12-43343'
}

type LoaderState<T> = {
  status: 'success',
  values: T[]
} | {
  status: 'error',
  error: string
} | {
  status: 'loading'
}

let ml: LoaderState<Movie> = {
  status: 'error',
  error: 'Someerror'
}

type FlattenArray<T> = T extends (infer R)[] ? FlattenArray<R> : T
type X = FlattenArray<number>
type Y = FlattenArray<number[]>
type Z = FlattenArray<number[][][]>


type Join<K, P> = K extends string | number
  ? P extends (string | number)
    ? `${ K }${ '' extends P ? '' : '.' }${ P }`
    : never
  : never

export type Leaves<T> = T extends object
  ? { [K in keyof T]-?: Join<K, Leaves<T[K]>> }[keyof T] | ''
  : '';

export type TypeAtLeave<SOURCE, PATH> = PATH extends `${ infer PROP }.${ infer REST }`
  ? SOURCE extends any ? PROP extends keyof SOURCE ? TypeAtLeave<SOURCE[PROP], REST> : never : never
  : SOURCE extends any ? PATH extends keyof SOURCE ? SOURCE[PATH] : never : never

function updateSingleNestedOption<T extends Leaves<Movie>>(propertyName: T, value: TypeAtLeave<Movie, T>) {
  //
}

updateSingleNestedOption('director.country.number', 12)