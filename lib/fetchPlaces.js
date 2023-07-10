const fetchPlaces = async (place_Id) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ placeId: place_Id }),
  };

  try {
    const response = await fetch("/api/getPlaces", options);
    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};

export default fetchPlaces;
