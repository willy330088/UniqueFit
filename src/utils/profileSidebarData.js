import * as RiIcons from 'react-icons/ri';

const SidebarData = [
  {
    title: 'My Workouts',
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: 'My Workout Creations',
      },
      {
        title: 'My Workout Collections',
      },
    ],
  },
  {
    title: 'My Plans',
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: 'My Plan Creations',
      },
      {
        title: 'My Plan Collections',
      },
    ],
  },
  {
    title: 'My Schedule',
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
  },
  {
    title: 'My Nearby Gyms',
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
  },
];

export default SidebarData;
