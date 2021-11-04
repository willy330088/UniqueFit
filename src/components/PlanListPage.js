import React, { useState, useEffect } from 'react';
import Header from './Header';
import Banner from './Banner';
import CreatePlanPopup from './CreatePlanPopup';
import styled from 'styled-components';
import Popup from 'reactjs-popup';
import firebase from '../utils/firebase';
import 'firebase/firestore';
import PlanItem from './PlanItem';
import Filter from './Filter';

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

const StyledPopup = styled(Popup)`
  &-overlay {
    background: rgba(0, 0, 0, 0.6);
  }

  &-content {
    margin: auto;
    background: #222d35;
    width: 700px;
    height: 800px;
    padding: 50px 100px;
    position: relative;
  }
`;

const StyledCreatePlanBtn = styled.button`
  width: 200px;
  height: 50px;
  margin-left: auto;
  font-size: 20px;
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

  return (
    <StyledBody>
      <Header />
      <Banner slogan={'Collect Your Plans'} />
      <StyledPlanListPageContainer>
        <StyledPopup
          trigger={
            <StyledCreatePlanBtn>
              Create Your Workout
            </StyledCreatePlanBtn>
          }
          modal
          nested
        >
          <CreatePlanPopup/>
        </StyledPopup>
        <Filter
          filteredMuscleGroups={filteredMuscleGroups}
          setFilteredMuscleGroups={setFilteredMuscleGroups}
        />
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
