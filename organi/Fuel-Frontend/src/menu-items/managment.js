// assets
import { IconKey, IconGasStation, IconDropletHalf2Filled, IconClipboardTypography, IconPigMoney, IconReport } from '@tabler/icons-react';

// constant
const icons = {
  IconKey,

  IconGasStation,
  IconDropletHalf2Filled,
  IconClipboardTypography,
  IconPigMoney,
  IconReport
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const managements = {
  id: 'fuel managment',
  title: 'Fuel Managements',
  type: 'group',

  children: [
    {
      id: 'fuel',
      title: 'Fuel',
      type: 'item',
      url: '/managment/fuel',
      icon: icons.IconGasStation
    },
    {
      id: 'pumps',
      title: 'Pumps',
      type: 'item',
      url: '/managment/Pump',
      icon: icons.IconDropletHalf2Filled
    },
    {
      id: 'assign duty',
      title: 'Assign Duty',
      type: 'item',
      url: '/management/assignDuty',
      icon: icons.IconClipboardTypography
    },
    {
      id: 'saving',
      title: 'Saving',
      type: 'item',
      url: '/savingList/saving',
      icon: icons.IconPigMoney
    },
    {
      id: 'sales report',
      title: 'Sales Report',
      type: 'item',
      url: '/managment/sales',
      icon: icons.IconReport
    }
  ]
};

export default managements;
