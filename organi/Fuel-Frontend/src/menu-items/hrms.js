// assets
import { IconKey, IconUserStar, IconCash, IconShoppingCart, IconCreditCardFilled, IconSettingsCog } from '@tabler/icons-react';

// constant
const icons = {
  IconKey,
  IconCash,
  IconUserStar,
  IconShoppingCart,
  IconCreditCardFilled,
  IconSettingsCog
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const hrms = {
  id: 'hrms',
  title: 'HRMS',
  type: 'group',

  children: [
    {
      id: 'staff',
      title: 'Staff',
      type: 'item',
      url: '/hrms/staff',
      icon: icons.IconUserStar
    },
    {
      id: 'payroll',
      title: 'Payroll',
      type: 'item',
      url: '/hrms/payroll',
      icon: icons.IconCash
    },
    {
      id: 'suppliers',
      title: 'Suppliers',
      type: 'item',
      url: '/hrms/supplier',
      icon: icons.IconShoppingCart
    },
    {
      id: 'creditors',
      title: 'Creditors',
      type: 'item',
      url: '/hrms/cred',
      icon: icons.IconCreditCardFilled
    }
    // {
    //   id: 'setting',
    //   title: 'Setting',
    //   type: 'item',
    //   url: '/hrms/setting',
    //   icon: icons.IconSettingsCog
    // }
  ]
};

export default hrms;
