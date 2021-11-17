import React, { useCallback, useRef, useState, useEffect } from 'react';
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from '@react-google-maps/api';
import Muscle from '../images/muscle.png';
import styled from 'styled-components';
import Logo from '../images/logo.png';
import LogoDumbbell from '../images/logoDumbbell.png';

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

const StyledLocationBtn = styled.div`
  font-size: 20px;
  height: 40px;
  width: 120px;
  cursor: pointer;
  color: #1face1;
  border-radius: 5px;
  background-color: transparent;
  text-align: center;
  line-height: 40px;
  margin: 30px 0;
  border: solid 2px #1face1;

  &:hover {
    color: white;
    background-color: #1face1;
  }
`;

const StyledMapContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const StyledLoadingContent = styled.div`
  height: 600px;
  width: 100%;
  background: hsla(205, 22%, 30%);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledLogoContainer = styled.div`
  display: flex;
  align-items: center;

  div:nth-child(1) {
    animation: blurring 1.2s linear 0s infinite alternate;
  }
  div:nth-child(2) {
    animation: blurring 1.2s linear 0.15s infinite alternate;
  }
  div:nth-child(3) {
    animation: blurring 1.2s linear 0.3s infinite alternate;
  }

  div:nth-child(4) {
    animation: blurring 1.2s linear 0.45s infinite alternate;
  }

  div:nth-child(5) {
    animation: blurring 1.2s linear 0.6s infinite alternate;
  }

  div:nth-child(6) {
    animation: blurring 1.2s linear 0.75s infinite alternate;
  }

  div:nth-child(7) {
    animation: blurring 1.2s linear 0.9s infinite alternate;
  }

  div:nth-child(8) {
    animation: blurring 1.2s linear 1.05s infinite alternate;
  }

  div:nth-child(9) {
    animation: blurring 1.2s linear 1.2s infinite alternate;
  }

  @keyframes blurring {
    0% {
      filter: blur(0);
    }
    100% {
      filter: blur(6px);
    }
  }
`;

const StyledLogoText1 = styled.div`
  font-size: 80px;
  color: #1face1;
  margin: 0 5px;
`;

const StyledLogoText2 = styled.div`
  font-size: 80px;
  color: white;
  margin: 0 5px;
`;

const StyledLogoDumbbell = styled.div`
  background-image: url(${LogoDumbbell});
  background-repeat: no-repeat;
  background-size: cover;
  width: 33px;
  height: 65px;
  margin: 0 5px;
`;

const libraries = ['places'];
const mapContainerStyle = {
  height: '600px',
  width: '100%',
};

export default function App() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyAbsCYT5vZNuhGd3Z2e5GoqDk_N_lntlGI',
    libraries,
  });

  const [currentLocation, setCurrentLocation] = useState({
    lat: 25.0361,
    lng: 121.5372,
  });

  const [isNavigating, setIsNavigating] = useState(true);
  const [selected, setSelected] = useState(null);
  const [nearby, setNearyby] = useState();
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
        });
        fetch(
          `https://us-central1-uniquefit-william.cloudfunctions.net/getGoogleNearbySearch?lat=${position.coords.latitude}&lng=${position.coords.longitude}`
        )
          .then((res) => res.json())
          .then((json) => setNearyby(json.results));
        setIsNavigating(false);
      },
      () => {
        alert('Please allow location tracking!');
        setIsNavigating(false);
      }
    );
  }, []);

  function dragMarker(coords) {
    const { latLng } = coords;
    const lat = latLng.lat();
    const lng = latLng.lng();

    setCurrentLocation({
      lat: lat,
      lng: lng,
    });
    fetch(
      `https://us-central1-uniquefit-william.cloudfunctions.net/getGoogleNearbySearch?lat=${lat}&lng=${lng}`
    )
      .then((res) => res.json())
      .then((json) => setNearyby(json.results));
    setIsNavigating(false);
  }

  if (loadError) return 'Error';
  if (!isLoaded) return 'Loading...';

  console.log(nearby);
  console.log(selected);

  return isNavigating || !nearby ? (
    <StyledLoadingContent>
      <StyledLogoContainer>
        <StyledLogoText1>U</StyledLogoText1>
        <StyledLogoText1>N</StyledLogoText1>
        <StyledLogoText1>I</StyledLogoText1>
        <StyledLogoText1>Q</StyledLogoText1>
        <StyledLogoText1>U</StyledLogoText1>
        <StyledLogoText1>E</StyledLogoText1>
        <StyledLogoText2>F</StyledLogoText2>
        <StyledLogoDumbbell src={LogoDumbbell} />
        <StyledLogoText2>T</StyledLogoText2>
      </StyledLogoContainer>
    </StyledLoadingContent>
  ) : (
    <StyledMapContainer>
      <GoogleMap
        id="map"
        mapContainerStyle={mapContainerStyle}
        zoom={16}
        center={currentLocation}
        clickableIcons={false}
        // onLoad={onMapLoad}
      >
        <Marker
          position={currentLocation}
          draggable={true}
          onDragEnd={(coords) => dragMarker(coords)}
        />
        {nearby.map((marker) => (
          <Marker
            key={marker.place_id}
            position={{
              lat: marker.geometry.location.lat,
              lng: marker.geometry.location.lng,
            }}
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
            position={{
              lat: selected.geometry.location.lat,
              lng: selected.geometry.location.lng,
            }}
            onCloseClick={() => {
              setSelected(null);
            }}
          >
            <div>
              <StyledInfoHeader>{selected.name}</StyledInfoHeader>
              <StyledInfoRating>
                {' '}
                ⭐ {selected.rating} 📍 {selected.vicinity}
              </StyledInfoRating>
              {selected.business_status === 'CLOSED_TEMPORARILY' ? (
                <StyledInfoOpening>Closed Temporarily</StyledInfoOpening>
              ) : selected.opening_hours && selected.opening_hours.open_now ? (
                <StyledInfoOpening>🏠 Now Open</StyledInfoOpening>
              ) : (
                <StyledInfoOpening>🏠 Now Closed</StyledInfoOpening>
              )}
            </div>
          </InfoWindow>
        ) : null}
      </GoogleMap>
      <LocateUser
        setCurrentLocation={setCurrentLocation}
        setIsNavigating={setIsNavigating}
        setNearyby={setNearyby}
      />
    </StyledMapContainer>
  );
}

function LocateUser({ setCurrentLocation, setIsNavigating, setNearyby }) {
  return (
    <StyledLocationBtn
      onClick={() => {
        setIsNavigating(true);
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setCurrentLocation({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
            fetch(
              `https://us-central1-uniquefit-william.cloudfunctions.net/getGoogleNearbySearch?lat=${position.coords.latitude}&lng=${position.coords.longitude}`
            )
              .then((res) => res.json())
              .then((json) => setNearyby(json.results));
            setIsNavigating(false);
          },
          () => {
            alert('Please allow location tracking!');
            setIsNavigating(false);
          }
        );
      }}
    >
      Where I Am
    </StyledLocationBtn>
  );
}
