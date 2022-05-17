type AgeRating = 0 | 6 | 12 | 16 | 18
type Genre = 'Horror' | 'Drama' | 'Romance' | 'Action'
type BookId = `M-${AgeRating}-${number}`

type Movie = {
    id: BookId
    name: string
    ageRating: AgeRating
    genre: Genre
}

function getAgeRatings(): AllCombinationsOf<AgeRating> {
    return [0, 6, 16, 18, 12]
}

const icons: {
    [k in Genre as k extends 'Action' ? never : Uncapitalize<k>]: string
} = {
    horror: 'svg',
    drama: 'svg',
    romance: 'svg',
}

function printIcon(genre: keyof typeof icons) {
    const icon = icons[genre]
}

type Initials<T extends string> = T extends `${infer FIRST}${string} ${infer LAST}${string}`
    ? `${FIRST}${LAST}`
    : T

let h: Initials<'Mark Twain'>

type AllCombinationsOf<T, UTIL = T> = [T] extends [never]
    ? []
    : T extends UTIL
        ? [T, ...AllCombinationsOf<Exclude<UTIL, T>>]
        : never

type AsArray<T> = T extends any[] ? T : T[]
let x: AsArray<number>
let y: AsArray<number[]>

type AsArray1<T> = T[]
type AsArray2<T> = [T] extends [any] ? T[] : never

type U = AsArray1<AgeRating>
type V = AsArray2<AgeRating>

type LoaderState<T> = {
    state: 'success' | 'error' | 'pending',
    values?: T[]
}

let b: boolean

let movieState: LoaderState<Movie>


let movie: Movie
movie = {
    id: 'M-16-2343545',
    ageRating: 18,
    genre: 'Horror',
    name: 'Alien'
}

let a: 'hi' | 'hello' | number = 'hi'
a = 'hello'
a = 34

type ChildAgeRating = Exclude<AgeRating, 16 | 18>
type MovieWithoutId = Partial<Movie>