"use client";

import { useState, useMemo } from "react";
import { GoogleMap, Marker, InfoWindow } from "@react-google-maps/api";
import PlacesAutocomplete from "./PlacesAutocomplete";

function Map({ map, setMap }) {
  const [selected, setSelected] = useState(null);
  const [info, setInfo] = useState(null);

  const center = useMemo(() => ({ lat: 3.1412, lng: 101.68653 }), []);

  return (
    <>
      <div className="absolute top-2.5 left-1/2 -translate-x-1/2 z-10 w-75">
        <PlacesAutocomplete
          setSelected={setSelected}
          map={map}
          info={info}
          setInfo={setInfo}
        />
      </div>

      <GoogleMap
        zoom={10}
        center={center}
        mapContainerClassName="w-full h-screen"
        onLoad={(map) => setMap(map)}
      >
        {selected && (
          <Marker
            position={selected.lat_lng}
            onClick={() => {
              setInfo(`${selected.name}`);
            }}
          />
        )}

        {info && (
          <InfoWindow
            position={selected.lat_lng}
            onCloseClick={() => {
              setInfo(null);
            }}
          >
            <div>{info}</div>
          </InfoWindow>
        )}
      </GoogleMap>
    </>
  );
}

export default Map;
