import React, {useCallback, useRef, useState, useEffect} from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

const libraries = ["places"];
const mapContainerStyle = {
  height: "500px",
  width: "700px",
};

export default function App() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyAbsCYT5vZNuhGd3Z2e5GoqDk_N_lntlGI',
    libraries,
  });

  const [currentLocation, setCurrentLocation] = useState({
    lat: 25.0361,
    lng: 121.5372,
  })

  const [isNavigating, setIsNavigating] = useState(true)
  const [isFetching, setIsFetching] = useState(false)
  const [nearby, setNearyby] = useState([])
  // const mapRef = useRef();
  // const onMapLoad = useCallback((map) => {
  //   mapRef.current = map;
  // }, []);

  // useEffect(() => {
  //   setIsFetching(true)
  //   console.log(currentLocation)
  //   fetch(`https://us-central1-uniquefit-william.cloudfunctions.net/getGoogleNearbySearch?lat=${currentLocation.lat}&lng=${currentLocation.lng}`)
  //     .then(res => res.json())
  //     .then(json => setNearyby(json.results))
  // }, []);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCurrentLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        })
        fetch(`https://us-central1-uniquefit-william.cloudfunctions.net/getGoogleNearbySearch?lat=${position.coords.latitude}&lng=${position.coords.longitude}`)
          .then(res => res.json())
          .then(json => setNearyby(json.results))
        setIsNavigating(false);
      },
      () => {
        alert('Please allow location tracking!')
        setIsNavigating(false)
      }
    );
  }, [])


  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";

  return isNavigating ? (
    <div>loading</div>
  ):(
    <div>
      <Locate setCurrentLocation={setCurrentLocation} setIsNavigating={setIsNavigating}/>


      <GoogleMap
        id="map"
        mapContainerStyle={mapContainerStyle}
        zoom={16}
        center={currentLocation}
        // onLoad={onMapLoad}
      >
        <Marker
          position={currentLocation}
        />
        {nearby.map((marker) => (
          <Marker
            key={marker.place_id}
            position={{ lat: marker.geometry.location.lat, lng: marker.geometry.location.lng }}
          />
        ))}  
      </GoogleMap>
    </div>
  );
}

function Locate({ setCurrentLocation, setIsNavigating }) {
  return (
    <button
      onClick={() => {
        setIsNavigating(true)
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setCurrentLocation({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            })
            setIsNavigating(false);
          },
          () => {
            alert('Please allow location tracking!')
            setIsNavigating(false)
          }
        );
      }}
    >
      where I am
    </button>
  );
}

