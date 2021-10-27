import React from 'react';
import styled from 'styled-components';

const StyledExerciseItemContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 10px;
  cursor: pointer;
  justify-content: center;
`;

const StyledExerciseItemDescription = styled.div``;

const StyledExerciseItemTitle = styled.div`
  font-size: 50px;
  color: #1face1;
`;

const StyledExerciseItemPublisher = styled.div`
  font-size: 25px;
  color: white;
`;

const StyledExerciseItemImage = styled.img`
  width: 100px;
  margin-right: 20px;
`;

const StyledCollectIcon = styled.svg`
  margin-left: 30px;
`;

export default function ExerciseItem (props) {
  return (
    <StyledExerciseItemContainer>
      <StyledExerciseItemImage src={props.image}/>
      <StyledExerciseItemDescription>
        <StyledExerciseItemTitle>Flutter Kicks</StyledExerciseItemTitle>
        <StyledExerciseItemPublisher>
          By Victor Chen Muscle Man
        </StyledExerciseItemPublisher>
      </StyledExerciseItemDescription>
      <StyledCollectIcon
        version="1.0"
        xmlns="http://www.w3.org/2000/svg"
        width="40px"
        viewBox="0 0 512.000000 512.000000"
        preserveAspectRatio="xMidYMid meet"
      >
        <g
          transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
          fill="#fff"
          stroke="none"
        >
          <path
            d="M1489 4757 c-147 -50 -216 -110 -361 -318 -543 -779 -901 -1631
            -1099 -2619 -33 -165 -32 -326 3 -432 50 -151 148 -286 261 -361 82 -54 299
            -169 447 -237 522 -240 1067 -385 1636 -435 195 -17 582 -20 770 -5 516 41
            1034 162 1504 353 314 127 374 167 433 286 l32 66 3 829 c3 920 5 889 -63 993
            -53 80 -199 175 -381 247 -388 153 -821 110 -1165 -116 -111 -73 -259 -213
            -259 -245 0 -55 16 -70 142 -132 143 -70 302 -171 408 -260 106 -88 122 -125
            78 -175 -35 -40 -76 -43 -119 -9 -255 197 -361 263 -537 333 -320 128 -626
            150 -967 68 -122 -29 -145 -52 -145 -140 0 -116 -35 -285 -85 -406 -18 -44
            -55 -72 -95 -72 -26 0 -80 52 -80 77 0 10 14 52 30 95 68 174 71 273 25 689
            -26 233 -45 530 -45 701 0 139 19 177 91 178 61 0 77 -27 81 -143 3 -94 4
            -100 31 -123 71 -60 307 3 429 115 72 66 108 131 163 291 75 217 73 341 -6
            499 -47 95 -136 184 -231 230 -35 17 -202 69 -372 116 -284 78 -316 85 -400
            85 -67 0 -108 -6 -157 -23z"
          />
        </g>
      </StyledCollectIcon>
    </StyledExerciseItemContainer>
  );
}
