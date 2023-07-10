"use client";

import Map from "@/components/Map";
import { useLoadScript } from "@react-google-maps/api";
import { useState } from "react";

const libraries = ["places"];

export default function Places() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_BROWSER_API_KEY,
    libraries,
  });

  const [map, setMap] = useState(null);

  if (!isLoaded) return <div>Loading...</div>;
  return <Map map={map} setMap={setMap} />;
}
