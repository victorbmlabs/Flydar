<script lang="ts">
	import type { DataHandler } from '@vincjo/datatables';
	import flatpickr from "flatpickr";
    import { onMount } from 'svelte';
	export let handler: DataHandler;
	let from: string;
	let from_date_element: HTMLElement;
	let from_date_value: Date;

	onMount(() => {
		flatpickr(from_date_element, {
				allowInput: true,
				clickOpens: true,
				mode: 'single',
				onValueUpdate: (selectedDates: string[], dateStr: string, instance) => {
					// selectedDates is string with time.
					const f = new Date(selectedDates[0]);
					if (from_date_value != f)
						from_date_value = f;
				}
			}
		)
	})

</script>


<div class="grid grid-cols-4">
	<div class="">
		<input
			class="input sm:w-64 w-36"
			type="search"
			placeholder="From (city, country, airport)"
			bind:value={from}
			on:input={
				() => handler.search(from)
			}
		/>		
	</div>
	<div class="">
		<input bind:this={from_date_element}>
	</div>
</div>
