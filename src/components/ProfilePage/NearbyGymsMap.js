import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from '@react-google-maps/api';

import {
  StyledGeneralBtn,
  StyledBlurringEffectContainer,
} from '../Common/GeneralStyle';
import { errorToast } from '../../utils/toast';
import MuscleIcon from '../../images/muscle-icon.png';
import LogoDumbbell from '../../images/logo-dumbbell.png';
require('dotenv').config();

export default function NearbyGymsMap() {
  const libraries = ['places'];
  const mapContainerStyle = {
    height: '600px',
    width: '100%',
  };
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

  async function fetchNearbyGym(lat, lng) {
    const res = await fetch(
      `https://us-central1-uniquefit-william.cloudfunctions.net/getGoogleNearbySearch?lat=${lat}&lng=${lng}`
    );
    const json = await res.json();
    setNearyby(json.results);
    setIsNavigating(false);
  }

  function getGeolocationWithNearbyGym() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCurrentLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        fetchNearbyGym(position.coords.latitude, position.coords.longitude);
      },
      () => {
        errorToast('Please allow location tracking!');
        setIsNavigating(false);
      }
    );
  }

  function dragMarker(coords) {
    const { latLng } = coords;
    const lat = latLng.lat();
    const lng = latLng.lng();

    setCurrentLocation({
      lat: lat,
      lng: lng,
    });
    fetchNearbyGym(lat, lng);
  }

  useEffect(() => {
    getGeolocationWithNearbyGym();
  }, []);

  if (loadError) return 'Error';
  if (!isLoaded) return 'Loading...';

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
                ??? {selected.rating} ???? {selected.vicinity}
              </StyledInfoRating>
              {selected.business_status === 'CLOSED_TEMPORARILY' ? (
                <StyledInfoOpening>Closed Temporarily</StyledInfoOpening>
              ) : selected.opening_hours && selected.opening_hours.open_now ? (
                <StyledInfoOpening>???? Now Open</StyledInfoOpening>
              ) : (
                <StyledInfoOpening>???? Now Closed</StyledInfoOpening>
              )}
            </div>
          </InfoWindow>
        ) : null}
      </GoogleMap>
      <StyledLocationBtn
        onClick={() => {
          setIsNavigating(true);
          getGeolocationWithNearbyGym();
        }}
      >
        Where I Am
      </StyledLocationBtn>
    </StyledMapContainer>
  );
}

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

const StyledLogoContainer = styled(StyledBlurringEffectContainer)`
  display: flex;
  align-items: center;
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
