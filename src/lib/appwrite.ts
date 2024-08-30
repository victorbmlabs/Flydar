import { Client, Databases, Query } from "node-appwrite"
import { toCamelCase } from "@lib/helpers";
import lookup from "country-code-lookup";
import type { Flight } from "@src/types";

const APPWRITE_ENDPOINT = import.meta.env.APPWRITE_ENDPOINT;
const FLYDAR_PROJECT_ID = import.meta.env.FLYDAR_PROJECT_ID;
const FLYDAR_DATABASE_ID = import.meta.env.FLYDAR_DATABASE_ID;
const FLYDAR_ONEWAYS = import.meta.env.FLYDAR_ONEWAYS_COLLECTION_ID;

const client = new Client();
client
    .setEndpoint(APPWRITE_ENDPOINT)
    .setProject(FLYDAR_PROJECT_ID)
;

const databases = new Databases(client);

const getAllFlights = async (): Promise<Flight[]> => {
    const response = await databases.listDocuments(
        FLYDAR_DATABASE_ID,
        FLYDAR_ONEWAYS,
        [
            Query.limit(5000)
        ]
    );

    const flights: Flight[] = [];

    for (const doc of response.documents) {
        const flight = toCamelCase<Flight>(doc);
        flight.departureTime = new Date(flight.departureTime);
        const oc = lookup.byCountry(flight.originCountry!);
        const dc = lookup.byCountry(flight.destinationCountry);

        if (!oc || !dc) {
            continue;
        }

        flight.originCountry = oc;
        flight.destinationCountry = dc;

        flights.push(flight);
    }

    return flights;
}

export { getAllFlights };