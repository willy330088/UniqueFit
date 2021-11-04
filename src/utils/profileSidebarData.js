import * as RiIcons from 'react-icons/ri';

const SidebarData = [
  {
    title: 'My Workouts',
    state: 'myworkouts',
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: 'My Workout Creations',
        state: 'myworkoutcreations',
      },
      {
        title: 'My Workout Collections',
        state: 'myworkoutcollections',
      },
    ],
  },
  {
    title: 'My Plans',
    state: 'myplans',
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: 'My plan Creations',
        state: 'myplancreations',
      },
      {
        title: 'My plan Collections',
        state: 'myplancollections',
      },
    ],
  },
  {
    title: 'My Nearby Gyms',
    state: 'mynearbygyms',
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
  },
];

export default SidebarData;