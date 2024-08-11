import lookup from "country-code-lookup"

export interface Flight {
    /** A one-way flight object. */
    airline: string
    flightNumber: string
    departureTime: Date,
    originAirportCode: string,
    originCity: string,
    originCountry: lookup.SearchOutput,
    destinationAirportCode: string,
    destinationCity: string,
    destinationCountry: lookup.SearchOutput,
    currency: string,
    price: number
}