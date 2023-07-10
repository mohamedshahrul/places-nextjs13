import "server-only";

import { NextResponse } from "next/server";
import { Client } from "@googlemaps/google-maps-services-js";

export async function POST(request) {
  const client = new Client({});

  const apiKey = process.env.GOOGLE_MAPS_SERVER_API_KEY;

  const { placeId } = await request.json();

  const response = await client.placeDetails({
    params: {
      key: apiKey,
      place_id: placeId,
    },
  });

  const {
    name,
    geometry: { location },
  } = response.data.result;

  const placeDetails = { name, location };

  return NextResponse.json(placeDetails);
}
