import React, { useState } from 'react';
import styled from 'styled-components';

const StyledPath = styled.path`
  fill: ${(props) => props.selected ? '#1face1' : '#8c9194'};
  cursor: pointer;

  &:hover {
    fill: #a2dff5;
  }
`;

export default function FrontMuscle({filteredMuscleGroups, setFilteredMuscleGroups, width}) {

  function toggleMuscleClick(name) {
    if (filteredMuscleGroups.includes(name)) {
      setFilteredMuscleGroups(
        filteredMuscleGroups.filter((muscle) => {
          if (muscle !== name) return muscle;
        })
      );
    } else {
      setFilteredMuscleGroups((filteredMuscleGroups)=> [...filteredMuscleGroups, name]);
    }
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 474.97 778.75"
      width={width}
    >
      <path
        fill="#262a2d"
        d="M306.17,627.1v-7.25c1.51-3.57.85-7.39,1.09-11.07,1-15.2,4.43-30,7.2-44.88a6.08,6.08,0,0,0-.92-5.08,35.4,35.4,0,0,1-5.11-12.36c-2.92-12.55-4.4-25.3-5.82-38.09-1.27-11.33-3-22.59-3.22-34a204,204,0,0,0-2.26-24.63c-1.86-13.09-3.88-26.15-5.53-39.27-1.46-11.69-1.69-23.48-2-35.25-.06-2.55-.74-3.25-3.31-3.2-2.92.06-2.64,1.78-2.63,3.63a316.82,316.82,0,0,1-3.63,47.15c-2.45,16.79-5.58,33.46-5.94,50.55-.42,19.3-3.95,38.36-6.26,57.51-1.08,9-2.28,18.26-7.2,26.11-2.49,4-2.55,7.42-1.42,11.58,4.14,15.28,6.28,30.92,7.46,46.65,1.34,17.85-3.4,34.94-8.25,51.85-3.58,12.45-6.4,24.8-5.39,37.9.68,8.83.42,17.73.72,26.59a244,244,0,0,0,2.5,26.44c1.31,9,2.46,18,1.82,27.2-.49,7.2-3.48,12.06-9.14,12.17-8.15.16-15.42,2.73-22.73,5.71a26.17,26.17,0,0,1-5.67,1.24c-11.71,1.93-23.48,1.15-35.23.54a20,20,0,0,1-10-2.95c-4.89-3.15-5.3-8.87-.81-12.37,11.48-9,22.89-18,33.84-27.63,5.78-5.1,8.21-10.54,8.38-17.91.41-17.31-3.11-34-7.14-50.66-2.3-9.54-5.45-18.89-7.44-28.49a215,215,0,0,1-4.82-37.86c-.5-19-1.2-38.08,1.62-57.09,1.87-12.51,5.88-24.5,8-37,2.1-12.22,2.94-24.21-.39-36.37-2.78-10.17-5.62-20.39-7.26-30.78a273.52,273.52,0,0,1-2.58-63.5c1.9-25,6.65-49.21,15.4-72.69,1.85-5,4.24-9.87,4.53-15.28q.63-11.46.84-22.94c.14-7.29.35-14.63-1.68-21.71a36.19,36.19,0,0,1-.13-18.34c1.88-8.24,5.85-15.81,6.67-24.46.78-8.17.93-15.33-5.68-21.65-5.39-5.16-8.71-12-11.68-20-3,7.06-6.28,13-11.26,17.4-4.2,3.74-5.32,7.92-4.87,13.22a39.1,39.1,0,0,1-6,25.37c-6.34,9.71-13.53,18.88-22.31,26.32-13.84,11.72-23.78,26.12-32.12,41.91a14.55,14.55,0,0,0-1.6,5.56,103.72,103.72,0,0,1-6.45,27.17c-3.16,8.4-6.09,16.85-7.58,25.77a43.53,43.53,0,0,1-4.29,12.72,3.88,3.88,0,0,1-4.89,2.14c-2-.59-2.34-2.3-2.12-4.1.36-2.89,1-5.75,1.21-8.64.33-4.19,1.76-8.38.51-12.86-2,1.25-2,3.14-2.42,4.69a149.44,149.44,0,0,1-9.16,24.12c-1.43,2.93-4.46,4.22-6.91,3.13-3.29-1.45-2.86-3.9-1.91-6.7,2.85-8.38,5.92-16.69,8.09-25.29.22-.87.76-1.76-.27-2.7-1.61.77-2.15,2.31-3,3.59-5.3,8.11-9.59,16.89-15.9,24.35-2,2.35-4.35,4.08-7.2,2.23s-1.67-4.65-.36-7.13c4.4-8.37,8.82-16.74,13.18-25.14.34-.66,1.37-1.49.46-2.24-1.19-1-1.68.44-2.23,1.06-5,5.76-10,11.57-15,17.34-2.69,3.08-5.92,3.85-8.24,1.92-3.24-2.69-1.26-5.2.46-7.59,7.56-10.57,14.6-21.48,21.5-32.48A20.05,20.05,0,0,0,76,327.1a2.41,2.41,0,0,0-.29-2.75c-1-.86-1.85.09-2.59.57A49,49,0,0,1,62.69,330c-2.07.74-4.2,1.41-6.4.78-1.33-.38-3-.43-3.35-2.31-.28-1.65.59-2.73,1.81-3.69,3.33-2.63,6.69-5.24,9.93-8,9-7.61,18.54-14.09,30.51-16.1a6.52,6.52,0,0,0,5.76-5.29,17.79,17.79,0,0,1,2.86-5.85c9.38-13.58,12-29.19,13.83-45.08.84-7.33,1.48-14.71,4.43-21.65,4.84-11.35,13-20.11,21.76-28.4a8.45,8.45,0,0,0,3-7,32.55,32.55,0,0,1,3.23-15.53,91.52,91.52,0,0,1,16.93-24,5.68,5.68,0,0,0,1.74-5.83,97.74,97.74,0,0,1-1.57-34.39c1.14-9.34,3.29-18.38,9.37-26,5.94-7.45,12.76-13.9,21.91-16.85a98.66,98.66,0,0,0,15.51-6C225.4,52.9,236.81,47,248.42,41.45c7.32-3.46,8.53-4.73,8.27-12.93h5.83c-.06.61-.17,1.21-.17,1.81,0,9.57,2.51,18.62,6.23,27.3a93,93,0,0,0,15.51,24.85c1.76,2,3.05,2.59,5,0a132.89,132.89,0,0,0,9.66-13.6c7.35-12.46,12.3-25.63,11.83-40.4h5.83c-.35,7.5,1,9.47,7.7,12.69,9,4.32,17.75,9,26.69,13.34,6.73,3.28,12.94,7.6,20.33,9.61,16.37,4.44,27.33,15.1,32.25,31.11,4.45,14.48,4.1,29.47,1.42,44.35-.66,3.69-.49,6.86,2.54,9.59a40.13,40.13,0,0,1,5,5.81c7,9.36,14,18.74,13.67,31.34-.12,3.83,1.73,6.51,4.48,9a136.88,136.88,0,0,1,15.11,17.21c8.06,10.45,8.62,22.86,10,35.15,1.59,14.22,4.79,28,12.89,40.14a26.8,26.8,0,0,1,3.56,7.55c.85,3,2.87,4.54,5.92,5.16a81,81,0,0,1,8.76,2.38c13.06,4.23,21.78,14.69,32.21,22.68,2.6,2,1.72,4.35-1.53,5.19a10.27,10.27,0,0,1-5-.21,44.1,44.1,0,0,1-10.59-4.72c-1.37-.77-2.73-3.14-4.26-1.72s-.33,3.66.54,5.42a18,18,0,0,0,1.4,2.12q10.89,16.15,21.81,32.29c1.57,2.32,2,4.53-.52,6.37-2.3,1.7-4.55,1.25-6.54-.72-.34-.34-.67-.7-1-1-5.37-5.3-10-11.25-15-16.91-.79-.91-1.41-2.22-3.67-1.84,1.49,2.9,2.76,5.47,4.11,8,3.74,7,7.54,13.85,11.24,20.82,1.13,2.13,1.14,4.32-1.08,5.8s-4.17.89-5.93-.83c-.78-.76-1.49-1.59-2.2-2.42-6.17-7.27-10.46-15.76-15.48-23.77-.72-1.14-1-2.82-2.77-2.91-.64.58-.38,1.15-.22,1.73,2.43,9,4.91,18,8.16,26.76.7,1.89,1.39,3.68-.89,5.08s-4.31,1.37-6.26-.54a14.6,14.6,0,0,1-3.48-5.49c-2.74-7.51-6.09-14.8-8.18-22.55-.22-.82-.21-2-1.88-2.24a18.05,18.05,0,0,0,.05,6.35c.62,5.05,1.35,10.09,1.92,15.14a3.38,3.38,0,0,1-2.16,3.84A3.89,3.89,0,0,1,465,381a15.8,15.8,0,0,1-2.23-5c-3.74-11.25-5.05-23.21-10.09-34.09-1.89-4.08-2.63-8.56-3.68-12.93-2.13-8.85-2.37-18.1-7.9-26.15-4.3-6.26-7.44-13.3-12.49-19.15C420.76,274.66,411.4,267,403.42,258c-6.05-6.82-12-13.77-16-22-3.74-7.79-3.05-16.36-3.23-24.71a8,8,0,0,0-2.75-6.39,43.19,43.19,0,0,1-8.36-10.05c-1.73-2.86-3.35-5.79-5.26-9.12A68.14,68.14,0,0,1,352,210.83a4.43,4.43,0,0,0-1.39,3.28c.16,8.25-.2,16.65,2.85,24.45,4.44,11.35,6.32,22.53,3.23,34.77-2.46,9.76-.94,20.07-1.1,30.13a61.68,61.68,0,0,0,4.9,24.47c13.15,32.16,16.55,66,16.84,100.23a211.92,211.92,0,0,1-9.19,62.08c-2.77,9.34-4.75,18.87-3.59,28.71a162.64,162.64,0,0,0,2.6,17.62c2.43,10.62,5.25,21.16,6.84,31.95,3.17,21.37,2.31,42.89,1.95,64.37-.12,6.75-1.36,13.52-2.44,20.22-2.45,15.23-7.62,29.82-10.84,44.89-3.4,15.92-6.22,31.89-6.11,48.24a17.37,17.37,0,0,0,6.48,14c11.74,9.59,23,19.77,35.33,28.66,4.93,3.56,4.57,10.09-.79,13.16a18.7,18.7,0,0,1-7.62,2.21,221.12,221.12,0,0,1-30.56.62c-5.32-.22-10.71-.8-15.6-3.14a37.82,37.82,0,0,0-17.48-4.18c-5.39.12-9.86-3.66-10.41-8.37a78.25,78.25,0,0,1-.43-16c1.13-13.42,3.44-26.72,3.5-40.25.06-12.25.57-24.52,1.09-36.77a57.36,57.36,0,0,0-2.42-18.62c-3.56-12.34-6.86-24.77-9.56-37.34C307.09,635.92,307.61,631.38,306.17,627.1Zm78.76-427.25a.84.84,0,0,0,.16.24s.11,0,.17,0l-.37-.23a1.22,1.22,0,0,0-.65-1.52c-2-6.15-6-11.4-7.69-17.75-1.46-5.53-3.49-10.91-4.6-16.81a3.78,3.78,0,0,0-1.48,2.85c-1,8.85,1.71,16.74,6.41,24,1.91,3,3.55,6.35,7.14,7.87A1.26,1.26,0,0,0,384.93,199.85Zm-196-.74c10-9.5,16.7-23.23,12.81-35.82-.55,1.57-1.14,2.89-1.47,4.27a127.53,127.53,0,0,1-6.16,19.31c-1.68,4.11-4.45,7.77-5.12,12.3-.33,0-.68,0-.33.44Zm27,157.52c-1.22.49-1.21,1.72-1.56,2.69-1.77,4.9-3.55,9.8-5.2,14.74-2.33,7-5.47,13.9-6.63,21.1A156.22,156.22,0,0,0,201,428.5a292.21,292.21,0,0,0,5.43,44.28c2,9.35,3.64,18.86,10.71,26.17,3.89,4,6.17,3.61,7.85-1.66,2.89-9.07,2-17.9-1.66-26.58-2-4.8-4.3-9.47-5.52-14.59-2.74-11.46-3.85-23.11-5.12-34.8-1.73-15.84-.3-31.42,1.37-47.07.62-5.88,1.2-11.76,1.81-17.64.73-.16.81-.68.64-1.28a.67.67,0,0,0-.43-.28C215.6,355.51,215.79,356.08,215.9,356.63Zm142,1.48-.32-1.63c-.09.07-.24.13-.27.22-.18.63-.1,1.16.65,1.36-.57,6.94,1.39,13.65,1.82,20.5.56,8.82,2,17.61,1.56,26.48-.43,8.22-1.29,16.43-1.78,24.65a118.88,118.88,0,0,1-9.94,41.67,37,37,0,0,0-1.77,25.22c.53,2,1.21,4.27,3.38,4.9s3.53-1.22,4.81-2.66a39.4,39.4,0,0,0,7.72-13.49c3.46-10.11,4.51-20.74,6.47-31.16,1.24-6.56,1.15-13.26,1.56-19.89q.59-9.27.4-18.57c-.29-13.89-2.46-27.48-7.82-40.39C362.06,369.65,361.16,363.45,357.94,358.11Zm105-67.12c.07.25,0,.81.48.27l-.51-.24c.24-1.35-.69-2.3-1.26-3.32-6.85-12.15-9.62-25.45-11.35-39.1-.81-6.35-.54-12.83-2.26-19.06-2.94-10.66-10.17-18.62-17.18-26.61-5.61-6.38-6-6.22-8.59,1.64-5.46,16.31-5.06,32.51,2.56,48C433.15,269.54,447.22,281.15,462.91,291Zm-352.65,0a131.48,131.48,0,0,0,14.82-10.47c12.19-10.51,22.66-22.21,27.22-38.24,4.17-14.64,2.15-28.76-2.76-42.76-.69-2-1.68-2.18-3.13-.72-1.63,1.64-3.36,3.18-4.9,4.89-7.78,8.67-15.38,17.49-17.14,29.61-1,6.93-1.58,13.91-2.57,20.84-1.17,8.25-2.14,16.54-6.24,24.11-2.17,4-4.35,8.11-5.4,12.64-.49,0-.6.23-.26.62ZM331.66,148.8c10.66.08,18.66-3.71,24.22-11.13,4.64-6.21,10-10.89,18.28-10.78,2.64,0,2.11-1.3,1-2.65-5-6-7.82-13.08-11.16-19.93-6.65-13.64-16.74-23.55-31.07-28.88a12.8,12.8,0,0,0-7.41-.77c-9.87,2.07-19.37,5.31-28.81,8.71a11.45,11.45,0,0,0-7.94,11.17c-.1,15.78.13,31.56.17,47.33,0,1.85.79,2.38,2.5,2.8,3,.74,6,.46,9,.78C311.41,146.62,322.39,147.42,331.66,148.8Zm-47.5-31.33h.22c0-6.92,0-13.85,0-20.77,0-7.68-2.05-10.69-9-13.66-8-3.4-16.4-5.14-24.63-7.6a16.52,16.52,0,0,0-11.09.31,58.5,58.5,0,0,0-27.48,22.3c-5.65,8.59-7.43,19.24-14.59,27-1,1.06-.58,1.79.85,1.78,9.18-.1,14.73,5.5,19.92,12.15a24.11,24.11,0,0,0,20.26,9.7c14.53-.34,28.77-4,43.33-4.18,2.48,0,2.17-1.78,2.17-3.33C284.17,133.27,284.16,125.37,284.16,117.47ZM215.74,405.94c-.31,7.5,1,19.78,2.57,32,1.22,9.88,3.27,19.61,7.69,28.62,3.69,7.54,9.61,7.92,14.51,1.08a45,45,0,0,0,6.69-15.6c4.27-16.93,4.45-34.28,5-51.57.55-16.85-1.43-33.6-3.11-50.32-1.15-11.49-2.47-23-5.33-34.31-.55-2.15-1.21-4.21-3-5.65s-3.5-1.75-5,.78A98,98,0,0,0,228,326.24C218.78,350.33,215.91,375.46,215.74,405.94Zm104.93-11.82c.76,12.31,1.34,25,2.39,37.71.79,9.65,1.77,19.33,5.65,28.39,1.82,4.24,3.61,8.52,7.82,11.1,3,1.84,5.68,1.78,8.11-1a25.12,25.12,0,0,0,5.18-9.52,186,186,0,0,0,7.38-44.3,264.3,264.3,0,0,0-.45-28,336.4,336.4,0,0,0-3.87-35.31,119.09,119.09,0,0,0-15-41.46c-1.82-3.07-3.75-3.35-6.26-.78a7.8,7.8,0,0,0-1.59,3.61c-4,13.91-5.38,28.22-6.81,42.55C322,369.3,321.44,381.51,320.67,394.12Zm19.58,341.8c1.21-3.63,2.1-6.5,3.13-9.33,4-11,6.32-22.69,11.43-33.31,8.23-17.08,12.78-35,15.13-53.83,2.85-22.7,1.64-45.23-.95-67.78-.36-3.1-.14-6.47-2.1-9.56-1.17,1.34-1.19,2.75-1.45,4.15-1.42,7.53-3.08,15.09-7.71,21.36a61.39,61.39,0,0,0-9.46,19.9c-5.84,20.29-6.72,41.27-8.21,62.1-1.37,19.13-1.31,38.35-1,57.54A25.75,25.75,0,0,0,340.25,735.92Zm-107.13-.59c1.35-1.44.92-2.85.94-4.13.17-12.75-.17-25.49-.45-38.23-.39-17.7-1.17-35.36-2.81-53-.68-7.2-1.93-14.37-3.2-21.5-1.74-9.82-4-19.52-10-27.81a52.52,52.52,0,0,1-10-26.46,7,7,0,0,0-1.75-4.8c-2.37,15.9-4.64,31.3-4,47,.58,14.15.35,28.35,3,42.37,2.1,11.18,3.57,22.57,8.58,32.92a228.43,228.43,0,0,1,13.81,37.47C228.74,724.6,230.32,730.09,233.12,735.33Zm22.95-332.45c-1.77,7.83-1,15.6-1.53,23.32-1.08,16.74-3.95,32.84-12.11,47.79-4.53,8.28-7.32,17.23-6.11,26.88.81,6.49,1.62,13,7.45,17.51s13.49,3,17-3.54a38.68,38.68,0,0,0,4.65-14.45c.48-4.83,1.25-9.69,1.89-14.44,1.05-7.69,2.64-15.26,2.23-23.1-.78-14.91-2.8-29.62-7.26-43.9C260.59,413.46,259.17,407.83,256.07,402.88Zm60.69-1c-2.84,8-5.52,14.95-7.25,22.28a207,207,0,0,0-5.89,40.49,108.48,108.48,0,0,0,2.72,27.39c1.63,7.28,2.22,14.71,5.41,21.73a11.57,11.57,0,0,0,19.7,2.66c4.6-5.71,5.91-12.33,5.69-19.38-.3-9.82-4.41-18.51-8.4-27.2-2.94-6.4-5.79-12.83-7.07-19.79a210.83,210.83,0,0,1-3.56-37.94C318.1,409.05,318.39,405.86,316.76,401.92ZM337.44,72.75c.24.63.26,1,.41,1,.94.56,1.89,1.08,2.86,1.58a61.3,61.3,0,0,1,22.93,20.2c3.71,5.46,5.57,11.84,8.72,17.54,5.94,10.77,14.73,19.13,24.06,27,2.05,1.72,2.73,1,3.09-1.26,1.44-9.09,3-18.22,1.38-27.4s-2.16-18.22-8.3-26.45c-9-12.07-23.17-19.21-38.08-16.42A140.83,140.83,0,0,0,337.44,72.75Zm-101.24.11c-5-1.27-9.31-2.19-13.54-3.49-20.45-6.29-39.17,5.92-46.61,23.41-4.06,9.56-4.46,20-4.37,30.24,0,6.11,1.41,12.23,3,18.37,14.74-11.5,24.12-23.13,30.4-37.36A55.74,55.74,0,0,1,229.92,77C231.91,75.87,234.07,75,236.2,72.86Zm175.86,120c-.47-7.17-1.17-14.36-3.58-21.31-3-8.64-7.9-16.34-12-24.45-3.58-7.11-10.22-11.19-16.09-16-2.15-1.75-5.15-1.57-7.61-.12-2.27,1.34-1.8,3.86-1.59,6a196.3,196.3,0,0,0,4.29,27.57,130.69,130.69,0,0,0,19.41,43.1,30.34,30.34,0,0,0,8.32,8.54c3.71,2.4,5.76,1.55,6.59-2.7C411.14,206.68,411.49,199.79,412.06,192.83Zm-251,.57c-.41,2.17.73,5.48.93,8.86s.93,7,1.27,10.44c.51,5.2,2.51,6.17,7,3.16a31.71,31.71,0,0,0,8.57-8.82c14.71-22.06,21.67-46.58,23.05-72.86a3.25,3.25,0,0,0-2.42-3.55c-3.91-1.54-6.81.33-9.64,2.55-6.85,5.36-12.73,11.49-16.19,19.68a104.19,104.19,0,0,1-5.23,10.33C163.31,172.19,161.45,182,161.09,193.4ZM288.68,298h.3c0,14.09,0,28.18,0,42.27,0,1.72-1.06,4.47.71,5,2.2.62,4.06-1.58,5.54-3.38a11.11,11.11,0,0,0,.76-1.24c6.45-10.29,10.08-21.65,12.94-33.36,3.39-13.93,6.13-27.9,4.77-42.34-.71-7.58-2.59-13.39-11.62-13.85-3.26-.17-6.55,0-9.78-.42-3-.41-3.74.8-3.72,3.62C288.74,268.87,288.68,283.45,288.68,298Zm-4.55.46h.32V256.62c0-5.87,0-5.87-5.67-5.86-1.82,0-3.64-.07-5.46,0-8.52.43-12.49,3.55-13.77,11.11a81.31,81.31,0,0,0-.82,9.37c-.37,7.07,1,14,2.21,20.87,2.69,15.06,6.64,29.77,13.27,43.63,1.5,3.12,2.9,6.47,6.11,8.4,1,.6,2,1.78,3.21,1,1-.62.59-2,.59-3Q284.15,320.32,284.13,298.48Zm39.32,27.21-.6-.24c-1.21,2.3-2.38,4.62-3.63,6.89-6.2,11.23-11.64,22.93-21.16,32-3.52,3.36-4.25,7.92-3.41,12.48a86.22,86.22,0,0,1,1.06,13.36c.36,13.2,2.07,26.21,4.07,39.22.56,3.63,1.2,7.25,1.8,10.87A6.17,6.17,0,0,0,303,437c1.49-12.26,5.32-23.88,10.05-35.16,2.35-5.62,5-11.08,4.86-17.27-.36-16,3.08-31.7,4.3-47.58C322.51,333.2,323,329.45,323.45,325.69ZM251,326.84l-1,.23c.65,5.93,1.17,11.87,2,17.78,1.57,11.63,2.86,23.27,3.31,35,.22,5.84-.2,11.91,2.7,17.43,5.68,10.81,8.77,22.49,11.24,34.37.62,2.95.71,6.09,2.47,9.32.46-3.48.7-6.39,1.25-9.24,3.12-16.44,5.33-33,5-49.75a39.54,39.54,0,0,1,.57-8.33,8.71,8.71,0,0,0-3.23-9c-4.92-4.12-8.41-9.41-11.67-15C259.23,342.17,255.3,334.41,251,326.84Zm212.65-26.08c-.4-3.26-2.42-5.43-5-7.24-9.28-6.59-18.48-13.27-25.78-22.15-2.68-3.26-5.63-6.4-7.75-10a86,86,0,0,1-9.09-23.25c-1.13-4.6-3.27-8.86-5.25-13.15a6.12,6.12,0,0,0-4.82-3.92,16.47,16.47,0,0,1-8.47-4.67,40.24,40.24,0,0,1-5.6-6.68c-.41-.59-.92-1.33-1.69-1.17s-.71,1.15-1,1.79c-1,2.38-.16,4.81-.21,7.21a36.27,36.27,0,0,0,6.51,21.86A170.87,170.87,0,0,0,424,270.86c8.88,7.68,15.62,17.26,20.8,27.78,3.88,7.9,11.09,7.51,16.56,5.39C462.87,303.44,463.86,302.55,463.66,300.76Zm-280.31-93c-2,1.13-2.77,3-4,4.47-3,3.53-5.82,7.63-10.58,8.42-4.29.71-6.17,3.24-7.84,6.61a57.92,57.92,0,0,0-3.42,9.39c-2.67,9-5,18.06-10.45,26-8.46,12.33-19.44,21.84-31.62,30.17a15.31,15.31,0,0,0-5.37,5.79c-.74,1.49-1.15,3,.25,4.34,3.46,3.28,14.4,3.49,17-2.27,5.82-12.89,14.74-23.53,24.92-33.24,6.54-6.24,12.91-12.66,19-19.37C181.76,236.53,186.68,223.54,183.35,207.76Zm105.34-49.84h.09a41,41,0,0,1,0,5.08c-.44,3.57,1,5.1,4.55,5.89,10.37,2.28,20,6.19,28.31,13.21,4.55,3.86,9.11,2.94,13.33-1.84,7-7.86,7.35-17.31,1.09-25.81a5.43,5.43,0,0,0-4.75-2.12,47.24,47.24,0,0,1-7.6-.35c-10.22-1.75-20.44-3.46-30.88-3.48-3.06,0-4.58.59-4.14,4A43.21,43.21,0,0,1,288.69,157.92Zm-4.25.52c0-2.06-.14-4.14,0-6.19.24-3-1.23-4-3.91-3.57-3.49.54-7,.37-10.5.71-5.17.51-10.45-.16-15.51,1.3a34.93,34.93,0,0,1-12.17,1.63,5.88,5.88,0,0,0-5.06,2.23c-6.59,7.23-6.46,15.71.48,25.08,3.84,5.17,10,6,14.88,1.87a58.53,58.53,0,0,1,23.09-11.83C284.33,167.33,284.31,167.27,284.44,158.44Zm4.25,68.29H289c0,5.71.06,11.41,0,17.11,0,2.1.64,3.19,2.83,3.25a126.79,126.79,0,0,0,16.64-1c3.58-.37,5-2.24,6-5.56,2.41-7.86,2.15-15.74,1.52-23.76-.41-5.25-3.58-7.61-8-9.11-5.18-1.74-10.55-1.1-15.85-1.35-2.85-.13-3.51,1.06-3.45,3.63C288.78,215.57,288.69,221.15,288.69,226.73Zm-4.53-.11h.28c0-5.71-.08-11.42,0-17.13,0-2.39-.82-3.29-3.18-3.1-4.11.33-8.25.28-12.33.82-7.9,1-11.13,3.68-12.09,9.38a53,53,0,0,0,1.85,24.06c1.17,4,3.79,5.55,7.7,5.91a96.88,96.88,0,0,0,14.85.15c2.22-.15,3-.77,2.91-3C284.08,238,284.16,232.32,284.16,226.62ZM252.4,299.21a17.89,17.89,0,0,0-.17-1.81c-2.17-11.87-4-23.71-11.3-34A158.94,158.94,0,0,0,226.77,246c-1.63-1.73-3.21-2.48-4.3.44-3.24,8.67-4.17,17.74-.31,26.14A85.46,85.46,0,0,0,246,303.35c1.34,1.08,2.82,2.94,4.7,1.89,1.65-.93,1.57-3.13,1.72-4.94C252.42,299.94,252.39,299.57,252.4,299.21Zm68.66,2.19c.1.74-.7,3,1.24,4s3.31-1,4.69-2.05a45.31,45.31,0,0,0,9.29-9.16c3.68-5,7.61-9.75,11.14-14.81,7.06-10.14,7.46-21.09,3.4-32.44-.82-2.28-2-3.23-4.22-1.2C330.43,260.37,322.25,278.76,321.06,301.4ZM357.24,63.91c-5.61-2.91-10.33-5.53-15.19-7.86-9.25-4.41-18.24-9.3-27.12-14.4-1.2-.68-1.85-1.18-2.21.61-1.82,9-5,17.67-7.67,26.47-1.45,4.78,1.34,7.32,6.16,5.86,7.66-2.32,15.56-3.49,23.34-5.19C341.83,67.8,349.13,66.37,357.24,63.91Zm-140.6-.23A2.7,2.7,0,0,0,219,65.1c14,3.09,28.19,5.43,42.09,9.08,5.93,1.55,8.32-.7,6.66-6.67-1.05-3.8-2.6-7.46-3.7-11.25-1.31-4.46-2.47-9-3.51-13.51-.5-2.15-1.24-2.31-2.9-1.07A36.12,36.12,0,0,1,252.48,45c-7.49,3.88-15.06,7.6-22.56,11.46C225.45,58.81,221.06,61.29,216.64,63.68ZM288.69,187h.23c0,4.13.08,8.25,0,12.37-.07,2.38.54,3.57,3.24,3.45,7.4-.3,14.73-.26,21.65,3.21,2.29,1.15,4.24-.43,5.27-2.6,1.46-3.06,2.72-6.21,4.06-9.31a4.92,4.92,0,0,0-1-5.69c-8.26-9.24-18.79-14.18-30.78-16.41-1.81-.34-2.71.23-2.67,2.25C288.75,178.53,288.69,182.78,288.69,187Zm-4.52.08h.22c0-4.12-.1-8.24,0-12.36.07-2.25-.72-3.17-3-2.73-12.29,2.44-23.1,7.47-31.06,17.6a3.35,3.35,0,0,0-.5,3.69c1.36,3.36,2.52,6.8,4,10.08,1.05,2.25,3.1,3.89,5.6,2.63,6.79-3.4,14-3.43,21.26-3.18,2.64.09,3.41-1,3.37-3.37C284.12,195.34,284.17,191.22,284.17,187.1ZM252,669.33c1.23-4.5,2.59-9,3.68-13.49,3-12.44,6.67-24.79,5.84-37.82-.69-10.95-2.47-21.77-3.92-32.64-.58-4.3-1.25-8.66-3.15-12.74C250.11,604.78,251.78,637,252,669.33Zm69.38-.27c.48-32.52.16-65-2.64-97.43C310.11,604.4,308.72,637,321.4,669.06Zm6.69-436.56c4.38-4.11,8.15-7.9,12.82-10.53,2.94-1.66,4.35-3.92,4.1-7.39-.53-7.46,1-14.63,3.26-21.71.51-1.64,2.26-4,.64-5s-3.42,1.12-4.86,2.35C331.13,201.21,327.27,215.64,328.09,232.5Zm-82.92,0c0-3.53.15-6,0-8.54-1-14.31-6-26.64-18.12-35.21-.79-.56-1.79-1.76-2.84-.86-.79.68-.06,1.84.2,2.72,2.43,8.15,4.3,16.37,3.83,25a5.78,5.78,0,0,0,2.86,5.54A65.51,65.51,0,0,1,245.17,232.48Zm-.93,28.45.93-.2c.28-5.66,1.44-11.43.66-16.94-1.3-9.2-8.64-14.16-15.81-18.85-1.46-1-2.2-.14-2.47,1.36a76.26,76.26,0,0,1-1.53,7.83c-1.27,4.42-.46,7.82,3.81,10.16a12.22,12.22,0,0,1,3.16,3C236.78,251.79,240.49,256.37,244.24,260.93Zm83.81-.29.87.18c.4-.44.82-.86,1.18-1.33,4.85-6.45,9.68-12.92,16.24-17.83,1.62-1.22,1.43-2.88,1.12-4.62-.63-3.54-1.73-7-1.51-10.68.11-1.92-1.07-2.28-2.62-1.32a52.57,52.57,0,0,0-12.82,10.59c-1.91,2.28-3.72,5-3.53,8.16C327.32,249.4,328.35,255,328.05,260.64Zm37.46,106.27c.8-1.68.17-2.76,0-3.89-1.59-10.18-5.37-19.75-8.63-29.42-3.57-10.63-6.6-21.24-6.47-32.56,0-1.09.55-2.81-.86-3.24s-2.75.56-3.81,1.67c-3.69,3.82-4.8,10.81-2.3,15.55a328.89,328.89,0,0,1,17,38.08C362.08,357.57,363.72,362.05,365.51,366.91Zm-158.77,1.28c3.45-6.25,4.51-13.39,7.65-19.79,2.76-5.62,4.72-11.62,7.29-17.34,2.76-6.12,5.87-12.07,8.73-18.14,2-4.17-.34-11.95-4.19-14.32-1.82-1.12-3.13-1.53-3.41,1.6-.27,2.92.29,5.75,0,8.68-1.05,9.6-4.33,18.56-7.39,27.58A217.24,217.24,0,0,0,206.74,368.19Zm142.6-162.84c11-9.55,22.86-43.59,18.62-53.59a15.12,15.12,0,0,0-.67,1.81,102.72,102.72,0,0,1-11.69,29.17C351.69,189.49,350.2,197.29,349.34,205.35Zm55.17-49.55c12.62,17,11.67,36.32,9.84,56.2C427.6,194,420.52,167.67,404.51,155.8ZM223.69,205.71a11,11,0,0,0,.12-2c-1.37-8.1-3.32-15.88-7.73-23.11a88.29,88.29,0,0,1-10.2-26.2c-.27-1.16-.11-2.65-2.35-3.38C205.58,171.08,209.77,189.76,223.69,205.71ZM158.37,210c-2.44-18.51-.6-36.28,8.55-52.91C151.23,172.27,146.73,193.65,158.37,210ZM366.43,368c-.06,0-.17,0-.19.07a.48.48,0,0,0,0,.31c.11.29.24.26.31-.08C366.53,368.22,366.46,368.11,366.43,368Z"
        transform="translate(-49.14 -28.52)"
      />
      <path
        fill="#8c9094"
        d="M310.61,28.52c.47,14.77-4.48,27.94-11.83,40.4a132.89,132.89,0,0,1-9.66,13.6c-2,2.55-3.27,2-5,0a93,93,0,0,1-15.51-24.85c-3.72-8.68-6.25-17.73-6.23-27.3,0-.6.11-1.2.17-1.81h3.64c-.62,1.53.81,2.16,1.44,3.06,3.1,4.47,6.52,8.78,7.63,14.3,1.49,7.33,4.83,14.09,6.6,21.34A15.63,15.63,0,0,0,284,71.77c2.1,3.21,3.47,3.16,5.4-.25,2.52-4.46,3.44-9.52,5.06-14.31,2.87-8.51,4.24-17.62,10.5-24.72.9-1,2.49-2.08,2-4Z"
        transform="translate(-49.14 -28.52)"
      />
      <path
        fill="#262a2d"
        d="M307,28.52c.49,1.89-1.1,2.95-2,4-6.26,7.1-7.63,16.21-10.5,24.72-1.62,4.79-2.54,9.85-5.06,14.31-1.93,3.41-3.3,3.46-5.4.25a15.63,15.63,0,0,1-2.18-4.55c-1.77-7.25-5.11-14-6.6-21.34-1.11-5.52-4.53-9.83-7.63-14.3-.63-.9-2.06-1.53-1.44-3.06Z"
        transform="translate(-49.14 -28.52)"
      />
      <StyledPath
        onClick={() => {
          toggleMuscleClick('Chest')
        }}
        selected={filteredMuscleGroups.includes('Chest')}
        d="M331.66,148.8c-9.27-1.38-20.25-2.18-31.19-3.35-3-.32-6,0-9-.78-1.71-.42-2.49-.95-2.5-2.8,0-15.77-.27-31.55-.17-47.33a11.45,11.45,0,0,1,7.94-11.17c9.44-3.4,18.94-6.64,28.81-8.71a12.8,12.8,0,0,1,7.41.77c14.33,5.33,24.42,15.24,31.07,28.88,3.34,6.85,6.21,14,11.16,19.93,1.11,1.35,1.64,2.68-1,2.65-8.29-.11-13.64,4.57-18.28,10.78C350.32,145.09,342.32,148.88,331.66,148.8Zm-47.28-31.33c0-6.92,0-13.85,0-20.77,0-7.68-2.05-10.69-9-13.66-8-3.4-16.4-5.14-24.63-7.6a16.52,16.52,0,0,0-11.09.31,58.5,58.5,0,0,0-27.48,22.3c-5.65,8.59-7.43,19.24-14.59,27-1,1.06-.58,1.79.85,1.78,9.18-.1,14.73,5.5,19.92,12.15a24.11,24.11,0,0,0,20.26,9.7c14.53-.34,28.77-4,43.33-4.18,2.48,0,2.17-1.78,2.17-3.33,0-7.9,0-15.8,0-23.7Z"
        transform="translate(-49.14 -28.52)"
      />
      <path
        fill="#8c9094"
        d="M340.25,735.92a25.75,25.75,0,0,1-1.23-8.76c-.27-19.19-.33-38.41,1-57.54,1.49-20.83,2.37-41.81,8.21-62.1a61.39,61.39,0,0,1,9.46-19.9c4.63-6.27,6.29-13.83,7.71-21.36.26-1.4.28-2.81,1.45-4.15,2,3.09,1.74,6.46,2.1,9.56,2.59,22.55,3.8,45.08.95,67.78-2.35,18.78-6.9,36.75-15.13,53.83-5.11,10.62-7.41,22.28-11.43,33.31C342.35,729.42,341.46,732.29,340.25,735.92Z"
        transform="translate(-49.14 -28.52)"
      />
      <path
        fill="#8c9094"
        d="M233.12,735.33c-2.8-5.24-4.38-10.73-5.92-16.15a228.43,228.43,0,0,0-13.81-37.47c-5-10.35-6.48-21.74-8.58-32.92-2.63-14-2.4-28.22-3-42.37-.65-15.69,1.62-31.09,4-47a7,7,0,0,1,1.75,4.8,52.52,52.52,0,0,0,10,26.46c6,8.29,8.26,18,10,27.81,1.27,7.13,2.52,14.3,3.2,21.5,1.64,17.61,2.42,35.27,2.81,53,.28,12.74.62,25.48.45,38.23C234,732.48,234.47,733.89,233.12,735.33Z"
        transform="translate(-49.14 -28.52)"
      />
      <StyledPath
        onClick={() => {
          toggleMuscleClick('Shoulder')
        }}
        selected={filteredMuscleGroups.includes('Shoulder')}
        d="M337.44,72.75a140.83,140.83,0,0,1,17.07-4.22c14.91-2.79,29.07,4.35,38.08,16.42,6.14,8.23,6.71,17.31,8.3,26.45s.06,18.31-1.38,27.4c-.36,2.3-1,3-3.09,1.26-9.33-7.82-18.12-16.18-24.06-26.95-3.15-5.7-5-12.08-8.72-17.54a61.3,61.3,0,0,0-22.93-20.2c-1-.5-1.92-1-2.86-1.58C337.7,73.7,337.68,73.38,337.44,72.75ZM222.66,69.37c-20.45-6.29-39.17,5.92-46.61,23.41-4.06,9.56-4.46,20-4.37,30.24,0,6.11,1.41,12.23,3,18.37,14.74-11.5,24.12-23.13,30.4-37.36A55.74,55.74,0,0,1,229.92,77c2-1.09,4.15-1.93,6.28-4.1C231.24,71.59,226.89,70.67,222.66,69.37Z"
        transform="translate(-49.14 -28.52)"
      />
      <path
        fill="#8c9094"
        d="M110.16,290.93c1-4.53,3.23-8.63,5.4-12.64,4.1-7.57,5.07-15.86,6.24-24.11,1-6.93,1.57-13.91,2.57-20.84,1.76-12.12,9.36-20.94,17.14-29.61,1.54-1.71,3.27-3.25,4.9-4.89,1.45-1.46,2.44-1.24,3.13.72,4.91,14,6.93,28.12,2.76,42.76-4.56,16-15,27.73-27.22,38.24A131.48,131.48,0,0,1,110.26,291Z"
        transform="translate(-49.14 -28.52)"
      />
      <path
        fill="#8c9094"
        d="M462.91,291c-15.69-9.84-29.76-21.45-38.11-38.42-7.62-15.49-8-31.69-2.56-48,2.63-7.86,3-8,8.59-1.64,7,8,14.24,15.95,17.18,26.61,1.72,6.23,1.45,12.71,2.26,19.06,1.73,13.65,4.5,27,11.35,39.1.57,1,1.5,2,1.26,3.32Z"
        transform="translate(-49.14 -28.52)"
      />
      <path
        fill="#8c9094"
        d="M463.66,300.76c.2,1.79-.79,2.68-2.3,3.27-5.47,2.12-12.68,2.51-16.56-5.39-5.18-10.52-11.92-20.1-20.8-27.78a170.87,170.87,0,0,1-28.43-31.47,36.27,36.27,0,0,1-6.51-21.86c.05-2.4-.8-4.83.21-7.21.27-.64.16-1.62,1-1.79s1.28.58,1.69,1.17a40.24,40.24,0,0,0,5.6,6.68,16.47,16.47,0,0,0,8.47,4.67,6.12,6.12,0,0,1,4.82,3.92c2,4.29,4.12,8.55,5.25,13.15a86,86,0,0,0,9.09,23.25c2.12,3.6,5.07,6.74,7.75,10,7.3,8.88,16.5,15.56,25.78,22.15C461.24,295.33,463.26,297.5,463.66,300.76Z"
        transform="translate(-49.14 -28.52)"
      />
      <path
        fill="#8c9094"
        d="M183.35,207.76c3.33,15.78-1.59,28.77-12.1,40.35-6.1,6.71-12.47,13.13-19,19.37-10.18,9.71-19.1,20.35-24.92,33.24-2.6,5.76-13.54,5.55-17,2.27-1.4-1.34-1-2.85-.25-4.34a15.31,15.31,0,0,1,5.37-5.79c12.18-8.33,23.16-17.84,31.62-30.17,5.49-8,7.78-17,10.45-26a57.92,57.92,0,0,1,3.42-9.39c1.67-3.37,3.55-5.9,7.84-6.61,4.76-.79,7.62-4.89,10.58-8.42C180.58,210.75,181.36,208.89,183.35,207.76Z"
        transform="translate(-49.14 -28.52)"
      />
      <path
        fill="#8c9094"
        d="M357.24,63.91c-8.11,2.46-15.41,3.89-22.69,5.49-7.78,1.7-15.68,2.87-23.34,5.19-4.82,1.46-7.61-1.08-6.16-5.86,2.67-8.8,5.85-17.43,7.67-26.47.36-1.79,1-1.29,2.21-.61,8.88,5.1,17.87,10,27.12,14.4C346.91,58.38,351.63,61,357.24,63.91Z"
        transform="translate(-49.14 -28.52)"
      />
      <path
        fill="#8c9094"
        d="M216.64,63.68c4.42-2.39,8.81-4.87,13.28-7.18,7.5-3.86,15.07-7.58,22.56-11.46a36.12,36.12,0,0,0,5.15-3.36c1.66-1.24,2.4-1.08,2.9,1.07,1,4.53,2.2,9,3.51,13.51,1.1,3.79,2.65,7.45,3.7,11.25,1.66,6-.73,8.22-6.66,6.67-13.9-3.65-28.08-6-42.09-9.08A2.7,2.7,0,0,1,216.64,63.68Z"
        transform="translate(-49.14 -28.52)"
      />
      <path
        fill="#8c9094"
        d="M252,669.33c-.24-32.29-1.91-64.55,2.45-96.69,1.9,4.08,2.57,8.44,3.15,12.74,1.45,10.87,3.23,21.69,3.92,32.64.83,13-2.83,25.38-5.84,37.82C254.61,660.37,253.25,664.83,252,669.33Z"
        transform="translate(-49.14 -28.52)"
      />
      <path
        fill="#8c9094"
        d="M321.4,669.06c-12.68-32.09-11.29-64.66-2.64-97.43C321.56,604.05,321.88,636.54,321.4,669.06Z"
        transform="translate(-49.14 -28.52)"
      />
      <StyledPath
        onClick={() => {
          toggleMuscleClick('Abs')
        }}
        selected={filteredMuscleGroups.includes('Abs')}
        d="M288.68,298c0-14.57.06-29.15-.05-43.73,0-2.82.72-4,3.72-3.62,3.23.45,6.52.25,9.78.42,9,.46,10.91,6.27,11.62,13.85,1.36,14.44-1.38,28.41-4.77,42.34-2.86,11.71-6.49,23.07-12.94,33.36a11.11,11.11,0,0,1-.76,1.24c-1.48,1.8-3.34,4-5.54,3.38-1.77-.5-.7-3.25-.71-5-.08-14.09,0-28.18,0-42.27Zm-4.23.46V256.62c0-5.87,0-5.87-5.67-5.86-1.82,0-3.64-.07-5.46,0-8.52.43-12.49,3.55-13.77,11.11a81.31,81.31,0,0,0-.82,9.37c-.37,7.07,1,14,2.21,20.87,2.69,15.06,6.64,29.77,13.27,43.63,1.5,3.12,2.9,6.47,6.11,8.4,1,.6,2,1.78,3.21,1,1-.62.59-2,.59-3q0-21.84,0-43.68Zm4.33-140.56a41,41,0,0,1,0,5.08c-.44,3.57,1,5.1,4.55,5.89,10.37,2.28,20,6.19,28.31,13.21,4.55,3.86,9.11,2.94,13.33-1.84,7-7.86,7.35-17.31,1.09-25.81a5.43,5.43,0,0,0-4.75-2.12,47.24,47.24,0,0,1-7.6-.35c-10.22-1.75-20.44-3.46-30.88-3.48-3.06,0-4.58.59-4.14,4a43.21,43.21,0,0,1,0,5.46Zm-4.31-5.67c.24-3-1.23-4-3.91-3.57-3.49.54-7,.37-10.5.71-5.17.51-10.45-.16-15.51,1.3a34.93,34.93,0,0,1-12.17,1.63,5.88,5.88,0,0,0-5.06,2.23c-6.59,7.23-6.46,15.71.48,25.08,3.84,5.17,10,6,14.88,1.87a58.53,58.53,0,0,1,23.09-11.83c8.56-2.34,8.54-2.4,8.67-11.23C284.44,156.38,284.3,154.3,284.47,152.25ZM289,226.73c0,5.71.06,11.41,0,17.11,0,2.1.64,3.19,2.83,3.25a126.79,126.79,0,0,0,16.64-1c3.58-.37,5-2.24,6-5.56,2.41-7.86,2.15-15.74,1.52-23.76-.41-5.25-3.58-7.61-8-9.11-5.18-1.74-10.55-1.1-15.85-1.35-2.85-.13-3.51,1.06-3.45,3.63.13,5.58,0,11.16,0,16.74Zm-4.54-.11c0-5.71-.08-11.42,0-17.13,0-2.39-.82-3.29-3.18-3.1-4.11.33-8.25.28-12.33.82-7.9,1-11.13,3.68-12.09,9.38a53,53,0,0,0,1.85,24.06c1.17,4,3.79,5.55,7.7,5.91a96.88,96.88,0,0,0,14.85.15c2.22-.15,3-.77,2.91-3-.11-5.71,0-11.42,0-17.12ZM252.23,297.4c-2.17-11.87-4-23.71-11.3-34A158.94,158.94,0,0,0,226.77,246c-1.63-1.73-3.21-2.48-4.3.44-3.24,8.67-4.17,17.74-.31,26.14A85.46,85.46,0,0,0,246,303.35c1.34,1.08,2.82,2.94,4.7,1.89,1.65-.93,1.57-3.13,1.72-4.94,0-.36,0-.73,0-1.09A17.89,17.89,0,0,0,252.23,297.4Zm70.07,8c2,1,3.31-1,4.69-2.05a45.31,45.31,0,0,0,9.29-9.16c3.68-5,7.61-9.75,11.14-14.81,7.06-10.14,7.46-21.09,3.4-32.44-.82-2.28-2-3.23-4.22-1.2-16.17,14.68-24.35,33.07-25.54,55.71C321.16,302.14,320.36,304.4,322.3,305.35ZM288.92,187c0,4.13.08,8.25,0,12.37-.07,2.38.54,3.57,3.24,3.45,7.4-.3,14.73-.26,21.65,3.21,2.29,1.15,4.24-.43,5.27-2.6,1.46-3.06,2.72-6.21,4.06-9.31a4.92,4.92,0,0,0-1-5.69c-8.26-9.24-18.79-14.18-30.78-16.41-1.81-.34-2.71.23-2.67,2.25.08,4.24,0,8.49,0,12.73Zm-4.53.08c0-4.12-.1-8.24,0-12.36.07-2.25-.72-3.17-3-2.73-12.29,2.44-23.1,7.47-31.06,17.6a3.35,3.35,0,0,0-.5,3.69c1.36,3.36,2.52,6.8,4,10.08,1.05,2.25,3.1,3.89,5.6,2.63,6.79-3.4,14-3.43,21.26-3.18,2.64.09,3.41-1,3.37-3.37-.06-4.12,0-8.24,0-12.36ZM340.91,222c2.94-1.66,4.35-3.92,4.1-7.39-.53-7.46,1-14.63,3.26-21.71.51-1.64,2.26-4,.64-5s-3.42,1.12-4.86,2.35c-12.92,11-16.78,25.39-16,42.25C332.47,228.39,336.24,224.6,340.91,222Zm-95.76,2c-1-14.31-6-26.64-18.12-35.21-.79-.56-1.79-1.76-2.84-.86-.79.68-.06,1.84.2,2.72,2.43,8.15,4.3,16.37,3.83,25a5.78,5.78,0,0,0,2.86,5.54,65.51,65.51,0,0,1,14.09,11.38C245.17,229,245.32,226.43,245.15,223.94Zm0,36.79c.28-5.66,1.44-11.43.66-16.94-1.3-9.2-8.64-14.16-15.81-18.85-1.46-1-2.2-.14-2.47,1.36a76.26,76.26,0,0,1-1.53,7.83c-1.27,4.42-.46,7.82,3.81,10.16a12.22,12.22,0,0,1,3.16,3c3.79,4.52,7.5,9.1,11.25,13.66Zm83.75.09c.4-.44.82-.86,1.18-1.33,4.85-6.45,9.68-12.92,16.24-17.83,1.62-1.22,1.43-2.88,1.12-4.62-.63-3.54-1.73-7-1.51-10.68.11-1.92-1.07-2.28-2.62-1.32a52.57,52.57,0,0,0-12.82,10.59c-1.91,2.28-3.72,5-3.53,8.16.34,5.61,1.37,11.17,1.07,16.85Z"
        transform="translate(-49.14 -28.52)"
      />
      <StyledPath
        onClick={() => {
          toggleMuscleClick('Quadriceps')
        }}
        selected={filteredMuscleGroups.includes('Quadriceps')}
        d="M215.74,405.94c.17-30.48,3-55.61,12.28-79.7A98,98,0,0,1,235.73,311c1.52-2.53,3.09-2.3,5-.78s2.48,3.5,3,5.65c2.86,11.27,4.18,22.82,5.33,34.31,1.68,16.72,3.66,33.47,3.11,50.32-.57,17.29-.75,34.64-5,51.57a45,45,0,0,1-6.69,15.6c-4.9,6.84-10.82,6.46-14.51-1.08-4.42-9-6.47-18.74-7.69-28.62C216.79,425.72,215.43,413.44,215.74,405.94Zm107.32,25.89c.79,9.65,1.77,19.33,5.65,28.39,1.82,4.24,3.61,8.52,7.82,11.1,3,1.84,5.68,1.78,8.11-1a25.12,25.12,0,0,0,5.18-9.52,186,186,0,0,0,7.38-44.3,264.3,264.3,0,0,0-.45-28,336.4,336.4,0,0,0-3.87-35.31,119.09,119.09,0,0,0-15-41.46c-1.82-3.07-3.75-3.35-6.26-.78a7.8,7.8,0,0,0-1.59,3.61c-4,13.91-5.38,28.22-6.81,42.55-1.22,12.18-1.79,24.39-2.56,37C321.43,406.43,322,419.15,323.06,431.83Zm-68.52-5.63c-1.08,16.74-3.95,32.84-12.11,47.79-4.53,8.28-7.32,17.23-6.11,26.88.81,6.49,1.62,13,7.45,17.51s13.49,3,17-3.54a38.68,38.68,0,0,0,4.65-14.45c.48-4.83,1.25-9.69,1.89-14.44,1.05-7.69,2.64-15.26,2.23-23.1-.78-14.91-2.8-29.62-7.26-43.9-1.71-5.49-3.13-11.12-6.23-16.07C254.3,410.71,255,418.48,254.54,426.2Zm55-2a207,207,0,0,0-5.89,40.49,108.48,108.48,0,0,0,2.72,27.39c1.63,7.28,2.22,14.71,5.41,21.73a11.57,11.57,0,0,0,19.7,2.66c4.6-5.71,5.91-12.33,5.69-19.38-.3-9.82-4.41-18.51-8.4-27.2-2.94-6.4-5.79-12.83-7.07-19.79a210.83,210.83,0,0,1-3.56-37.94c0-3.11.28-6.3-1.35-10.24C313.92,409.91,311.24,416.87,309.51,424.2ZM358,358.06c-.57,6.94,1.39,13.65,1.82,20.5.56,8.82,2,17.61,1.56,26.48-.43,8.22-1.29,16.43-1.78,24.65a118.88,118.88,0,0,1-9.94,41.67,37,37,0,0,0-1.77,25.22c.53,2,1.21,4.27,3.38,4.9s3.53-1.22,4.81-2.66a39.4,39.4,0,0,0,7.72-13.49c3.46-10.11,4.51-20.74,6.47-31.16,1.24-6.56,1.15-13.26,1.56-19.89q.59-9.27.4-18.57c-.29-13.89-2.46-27.48-7.82-40.39-2.35-5.67-3.25-11.87-6.47-17.21Zm-142.1-1.43c-1.22.49-1.21,1.72-1.56,2.69-1.77,4.9-3.55,9.8-5.2,14.74-2.33,7-5.47,13.9-6.63,21.1A156.22,156.22,0,0,0,201,428.5a292.21,292.21,0,0,0,5.43,44.28c2,9.35,3.64,18.86,10.71,26.17,3.89,4,6.17,3.61,7.85-1.66,2.89-9.07,2-17.9-1.66-26.58-2-4.8-4.3-9.47-5.52-14.59-2.74-11.46-3.85-23.11-5.12-34.8-1.73-15.84-.3-31.42,1.37-47.07.62-5.88,1.2-11.76,1.81-17.64Zm107-31.18c-1.21,2.3-2.38,4.62-3.63,6.89-6.2,11.23-11.64,22.93-21.16,32-3.52,3.36-4.25,7.92-3.41,12.48a86.22,86.22,0,0,1,1.06,13.36c.36,13.2,2.07,26.21,4.07,39.22.56,3.63,1.2,7.25,1.8,10.87A6.17,6.17,0,0,0,303,437c1.49-12.26,5.32-23.88,10.05-35.16,2.35-5.62,5-11.08,4.86-17.27-.36-16,3.08-31.7,4.3-47.58.28-3.76.8-7.51,1.22-11.27ZM250,327.07c.65,5.93,1.17,11.87,2,17.78,1.57,11.63,2.86,23.27,3.31,35,.22,5.84-.2,11.91,2.7,17.43,5.68,10.81,8.77,22.49,11.24,34.37.62,2.95.71,6.09,2.47,9.32.46-3.48.7-6.39,1.25-9.24,3.12-16.44,5.33-33,5-49.75a39.54,39.54,0,0,1,.57-8.33,8.71,8.71,0,0,0-3.23-9c-4.92-4.12-8.41-9.41-11.67-15-4.4-7.51-8.33-15.27-12.62-22.84ZM365.5,363c-1.59-10.18-5.37-19.75-8.63-29.42-3.57-10.63-6.6-21.24-6.47-32.56,0-1.09.55-2.81-.86-3.24s-2.75.56-3.81,1.67c-3.69,3.82-4.8,10.81-2.3,15.55a328.89,328.89,0,0,1,17,38.08c1.67,4.47,3.31,8.95,5.1,13.81C366.31,365.23,365.68,364.15,365.5,363ZM214.39,348.4c2.76-5.62,4.72-11.62,7.29-17.34,2.76-6.12,5.87-12.07,8.73-18.14,2-4.17-.34-11.95-4.19-14.32-1.82-1.12-3.13-1.53-3.41,1.6-.27,2.92.29,5.75,0,8.68-1.05,9.6-4.33,18.56-7.39,27.58a217.24,217.24,0,0,0-8.65,31.73C210.19,361.94,211.25,354.8,214.39,348.4Z"
        transform="translate(-49.14 -28.52)"
      />
      <path
        fill="#8c9094"
        d="M349.34,205.35c.86-8.06,2.35-15.86,6.26-22.61a102.72,102.72,0,0,0,11.69-29.17,15.12,15.12,0,0,1,.67-1.81C372.2,161.76,360.36,195.8,349.34,205.35Z"
        transform="translate(-49.14 -28.52)"
      />
      <path
        fill="#8c9094"
        d="M223.69,205.71c-13.92-16-18.11-34.63-20.16-54.66,2.24.73,2.08,2.22,2.35,3.38a88.29,88.29,0,0,0,10.2,26.2c4.41,7.23,6.36,15,7.73,23.11A11,11,0,0,1,223.69,205.71Z"
        transform="translate(-49.14 -28.52)"
      />
      <StyledPath
        onClick={() => {
          toggleMuscleClick('Biceps')
        }}
        selected={filteredMuscleGroups.includes('Biceps')}
        d="M412.06,192.83c-.57,7-.92,13.85-2.25,20.62-.83,4.25-2.88,5.1-6.59,2.7a30.34,30.34,0,0,1-8.32-8.54,130.69,130.69,0,0,1-19.41-43.1,196.3,196.3,0,0,1-4.29-27.57c-.21-2.1-.68-4.62,1.59-6,2.46-1.45,5.46-1.63,7.61.12,5.87,4.78,12.51,8.86,16.09,16,4.09,8.11,9,15.81,12,24.45C410.89,178.47,411.59,185.66,412.06,192.83Zm-250,9.43c.2,3.49.93,7,1.27,10.44.51,5.2,2.51,6.17,7,3.16a31.71,31.71,0,0,0,8.57-8.82c14.71-22.06,21.67-46.58,23.05-72.86a3.25,3.25,0,0,0-2.42-3.55c-3.91-1.54-6.81.33-9.64,2.55-6.85,5.36-12.73,11.49-16.19,19.68a104.19,104.19,0,0,1-5.23,10.33c-5.07,9-6.93,18.76-7.29,30.21C160.68,195.57,161.82,198.88,162,202.26ZM414.35,212c13.25-18.05,6.17-44.33-9.84-56.2C417.13,172.81,416.18,192.12,414.35,212ZM166.92,157.06c-15.69,15.21-20.19,36.59-8.55,52.91C155.93,191.46,157.77,173.69,166.92,157.06Zm217.32,41.32c-2-6.15-6-11.4-7.69-17.75-1.46-5.53-3.49-10.91-4.6-16.81a3.78,3.78,0,0,0-1.48,2.85c-1,8.85,1.71,16.74,6.41,24,1.91,3,3.55,6.35,7.13,7.88Zm-195.34.73c10-9.5,16.7-23.23,12.81-35.82-.55,1.57-1.14,2.89-1.47,4.27a127.53,127.53,0,0,1-6.16,19.31c-1.68,4.11-4.45,7.77-5.12,12.3Z"
        transform="translate(-49.14 -28.52)"
      />
    </svg>
  );
}
