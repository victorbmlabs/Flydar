<script lang="ts">
    import { DataHandler } from "@vincjo/datatables";
    import ThSort from "@components/ThSort.svelte";
    import Search from "@components/Search.svelte";
    import type { Flight } from "@src/types";

    export let flightData: Flight[];
    const handler = new DataHandler(flightData, { rowsPerPage: 20 });
    const rows = handler.getRows();
</script>

<div class="overflow-x-auto">
    <!-- <header>
        <Search {handler} />
    </header> -->
    <table class="table table-auto w-full">
        <thead class="bg-gray-900">
            <tr class="text-2xl text-gray-800 dark:text-gray-200">
                <ThSort {handler} orderBy="originCity">Origin</ThSort>
                <ThSort {handler} orderBy="destinationCity">Destination</ThSort>
                <ThSort {handler} orderBy="departureTime"
                    >Departure time</ThSort
                >
                <ThSort {handler} orderBy="price">Price</ThSort>
                <ThSort {handler} orderBy="airline">Airline</ThSort>
                <ThSort {handler} orderBy="flightNumber">Flight #</ThSort>
            </tr>
        </thead>
        <tbody>
            {#each $rows as row}
                <tr class="text-gray-800 dark:text-gray-200 text-xl even:bg-gray-800 odd:bg-gray-700">
                    <td class="p-2">{row.originCity}, {row.originCountry.iso2}</td>
                    <td class="p-2"
                        >{row.destinationCity}, {row.destinationCountry
                            .iso2}</td
                    >
                    <td class="p-2"
                        >{row.departureTime.toLocaleDateString("en-US", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })}</td
                    >
                    <td class="p-2">{row.price} {row.currency}</td>
                    <td class="p-2">{row.airline}</td>
                    <td class="p-2">{row.flightNumber}</td>
                </tr>
            {/each}
        </tbody>
    </table>
</div>
