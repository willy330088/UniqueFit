import React, {useCallback, useRef, useState, useEffect} from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import Muscle from './images/muscle.png'
import styled from 'styled-components';

const StyledInfoHeader = styled.h2`
  color: #3264a8;
  font-family: sans-serif;
  font-weight: bold;
  text-align: center;
  font-size: 15px;
`;

const StyledInfoRating = styled.h3`
  color: #b31010;
  font-family: sans-serif;
  font-weight: bold;
  text-align: center;
`;

const StyledInfoOpening = styled.h2`
  color: black;
  font-family: sans-serif;
  font-weight: bold;
  text-align: center;
  font-size: 15px;
`;

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
  const [selected, setSelected] = React.useState(null);
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
            onClick={() => {
              setSelected(marker);
            }}
            icon={{
              url: Muscle,
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(20, 20),
              scaledSize: new window.google.maps.Size(40, 40),
            }}
          />
        ))}

        {selected ? (
          <InfoWindow
            position={{ lat: selected.geometry.location.lat, lng: selected.geometry.location.lng }}
            onCloseClick={() => {
              setSelected(null);
            }}
          >
            <div>
                <StyledInfoHeader>{selected.name}</StyledInfoHeader>
                <StyledInfoRating> ⭐ {selected.rating} 📍 {selected.vicinity}</StyledInfoRating>
                {selected.opening_hours.open_now ? (
                  <StyledInfoOpening>🏠 Now Open</StyledInfoOpening>
                ) : ( null
                )}
            </div>
          </InfoWindow>
        ) : null}  
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