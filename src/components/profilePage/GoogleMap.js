import React, { useState, useEffect } from 'react';
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from '@react-google-maps/api';
import MuscleIcon from '../../images/muscle.png';
import styled from 'styled-components';
import LogoDumbbell from '../../images/logoDumbbell.png';
import {
  StyledGeneralBtn,
  StyledVerticalContainer,
} from '../common/GeneralStyle';
import { blurring } from '../../utils/animation';
require('dotenv').config();

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

const StyledLocationBtn = styled(StyledGeneralBtn)`
  font-size: 20px;
  height: 40px;
  width: 120px;
  line-height: 40px;
  margin: 30px 0;
`;

const StyledMapContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
`;

const StyledLoadingContent = styled.div`
  height: 600px;
  width: 100%;
  background: hsla(205, 22%, 30%);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledLogoContainer = styled(StyledVerticalContainer)`
  div:nth-child(1) {
    animation: ${blurring} 1.2s linear 0s infinite alternate;
  }
  div:nth-child(2) {
    animation: ${blurring} 1.2s linear 0.15s infinite alternate;
  }
  div:nth-child(3) {
    animation: ${blurring} 1.2s linear 0.3s infinite alternate;
  }

  div:nth-child(4) {
    animation: ${blurring} 1.2s linear 0.45s infinite alternate;
  }

  div:nth-child(5) {
    animation: ${blurring} 1.2s linear 0.6s infinite alternate;
  }

  div:nth-child(6) {
    animation: ${blurring} 1.2s linear 0.75s infinite alternate;
  }

  div:nth-child(7) {
    animation: ${blurring} 1.2s linear 0.9s infinite alternate;
  }

  div:nth-child(8) {
    animation: ${blurring} 1.2s linear 1.05s infinite alternate;
  }

  div:nth-child(9) {
    animation: ${blurring} 1.2s linear 1.2s infinite alternate;
  }
`;

const StyledLogoText1 = styled.div`
  font-size: 40px;
  color: #1face1;
  margin: 0 5px;

  @media (min-width: 550px) {
    font-size: 80px;
  }
`;

const StyledLogoText2 = styled.div`
  font-size: 40px;
  color: white;
  margin: 0 5px;

  @media (min-width: 550px) {
    font-size: 80px;
  }
`;

const StyledLogoDumbbell = styled.div`
  background-image: url(${LogoDumbbell});
  background-repeat: no-repeat;
  background-size: cover;
  width: 17px;
  height: 36px;
  margin: 0 5px;

  @media (min-width: 550px) {
    width: 33px;
    height: 65px;
  }
`;

const libraries = ['places'];
const mapContainerStyle = {
  height: '600px',
  width: '100%',
};

export default function App() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLEMAP_API_KEY,
    libraries,
  });

  const [currentLocation, setCurrentLocation] = useState({
    lat: 25.0361,
    lng: 121.5372,
  });

  const [isNavigating, setIsNavigating] = useState(true);
  const [selected, setSelected] = useState(null);
  const [nearby, setNearyby] = useState();

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
              url: MuscleIcon,
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
