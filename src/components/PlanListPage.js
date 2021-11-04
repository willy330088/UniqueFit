import React, { useState, useEffect } from 'react';
import Header from './Header';
import Banner from './Banner';
import styled from 'styled-components';
import muscleGroupImage from '../utils/muscleGroup';
import FrontMuscle from './FrontMuscle';
import BackMuscle from './BackMuscle';
import Popup from 'reactjs-popup';
import firebase from '../utils/firebase';
import 'firebase/firestore';
import PlanItem from './PlanItem';

const StyledFilterContainer = styled.div`
  display: none;
  @media (min-width: 800px) {
    width: 100%;
    height: 200px;
    background-color: #ddd;
    display: flex;
    margin: 30px auto 30px;
    align-items: center;
    justify-content: space-around;
  }
`;

const StyledFilterMuscleGroups = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 450px;
  height: 180px;
  background: #ddd;
  margin: 20px;
  border-radius: 5px;
`;

const StyledMuscleGroupImage = styled.img`
  flex: 1 20%;
  width: 50px;
  cursor: pointer;
  border: ${(props) => (props.selected ? '3px solid #1face1' : 'none')};
  border-radius: 50%;

  &:hover {
    border: 3px solid #a2dff5;
  }
`;

const StyledFilterMuscleIcons = styled.div`
  background: #ddd;
  border-radius: 5px;
  padding: 5px;
  margin: 20px;
`;

const StyledPopup = styled(Popup)`
  &-overlay {
    background: rgba(0, 0, 0, 0.6);
  }

  &-content {
    background: #ddd;
    width: 700px;
    height: 550px;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
`;

const StyledBody = styled.div`
  background: #222d35;
  min-height: 100vh;
`;

const StyledPlanListPageContainer = styled.div`
  padding: 50px 16% 100px;
`;

const StyledPlanListContainer = styled.div`
  margin-top: 80px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

export default function PlanListPage() {
  const [plans, setPlans] = useState([]);
  const [filteredMuscleGroups, setFilteredMuscleGroups] = useState([]);

  useEffect(() => {
    firebase
      .firestore()
      .collection('plans')
      .where('public', '==', true)
      .onSnapshot((collectionSnapshot) => {
        const data = collectionSnapshot.docs.map((docSnapshot) => {
          const id = docSnapshot.id;
          return { ...docSnapshot.data(), id };
        });
        setPlans(data);
      });
  }, []);

  function toggleMuscleClick(name) {
    if (filteredMuscleGroups.includes(name)) {
      setFilteredMuscleGroups(
        filteredMuscleGroups.filter((muscle) => {
          if (muscle !== name) return muscle;
        })
      );
    } else {
      setFilteredMuscleGroups((filteredMuscleGroups) => [
        ...filteredMuscleGroups,
        name,
      ]);
    }
  }

  return (
    <StyledBody>
      <Header />
      <Banner slogan={'Collect Your Plans'} />
      <StyledPlanListPageContainer>
        <StyledFilterContainer>
          <StyledFilterMuscleGroups>
            {muscleGroupImage.map((muscle) => {
              return (
                <StyledMuscleGroupImage
                  key={muscle.name}
                  src={muscle.src}
                  onClick={() => {
                    toggleMuscleClick(muscle.name);
                  }}
                  selected={filteredMuscleGroups.includes(muscle.name)}
                />
              );
            })}
          </StyledFilterMuscleGroups>
          <StyledPopup
            trigger={
              <StyledFilterMuscleIcons>
                <FrontMuscle
                  width={'100px'}
                  filteredMuscleGroups={filteredMuscleGroups}
                  setFilteredMuscleGroups={setFilteredMuscleGroups}
                />
                <BackMuscle
                  width={'100px'}
                  filteredMuscleGroups={filteredMuscleGroups}
                  setFilteredMuscleGroups={setFilteredMuscleGroups}
                />
              </StyledFilterMuscleIcons>
            }
            modal
            nested
          >
            {(close) => (
              <>
                <FrontMuscle
                  width={'300px'}
                  filteredMuscleGroups={filteredMuscleGroups}
                  setFilteredMuscleGroups={setFilteredMuscleGroups}
                />
                <BackMuscle
                  width={'300px'}
                  filteredMuscleGroups={filteredMuscleGroups}
                  setFilteredMuscleGroups={setFilteredMuscleGroups}
                />
              </>
            )}
          </StyledPopup>
        </StyledFilterContainer>
        <StyledPlanListContainer>
          {plans.map((plan) => {
            if (filteredMuscleGroups.length !== 0) {
              if (filteredMuscleGroups.includes(plan.targetMuscleGroup)) {
                return <PlanItem plan={plan} />;
              }
            } else {
              return <PlanItem plan={plan} />;
            }
          })}
        </StyledPlanListContainer>
      </StyledPlanListPageContainer>
    </StyledBody>
  );
}
