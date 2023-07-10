"use client";

import usePlacesAutocomplete, { getGeocode } from "use-places-autocomplete";

import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";

import "@reach/combobox/styles.css";
import fetchPlaces from "@/lib/fetchPlaces";

function PlacesAutocomplete({ setSelected, map, info, setInfo }) {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();

    const results = await getGeocode({ address });
    const place_id = results[0].place_id;

    const data = await fetchPlaces(place_id);
    const { name, location: lat_lng } = data;

    setSelected({ name, lat_lng });
    setInfo(null);

    if (map) {
      map.setCenter(lat_lng);
      map.setZoom(15);
    }
  };

  return (
    <Combobox onSelect={handleSelect}>
      <ComboboxInput
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={!ready}
        className="w-full p-2"
        placeholder="Search an address"
      />
      <ComboboxPopover>
        <ComboboxList>
          {status === "OK" &&
            data.map(({ place_id, description }) => (
              <ComboboxOption key={place_id} value={description} />
            ))}
        </ComboboxList>
      </ComboboxPopover>
    </Combobox>
  );
}

export default PlacesAutocomplete;
