import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import { Navigate } from 'react-router';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));
const FuelManagement = Loadable(lazy(() => import('views/Fuel')));
const ViewOrderHistory = Loadable(lazy(() => import('views/Fuel/OverOrderHistory')));
const PumpManagment = Loadable(lazy(() => import('views/Pump')));
const AssginDutyManagement = Loadable(lazy(() => import('views/AssginDuty')));
const DutyManagement = Loadable(lazy(() => import('views/AssginDuty/ViewDuty')));
const SavingManagement = Loadable(lazy(() => import('views/Saving')));
const StaffManagement = Loadable(lazy(() => import('views/Staff')));
const PayrollManagment = Loadable(lazy(() => import('views/Payroll')));
const ViewPayrollManagment = Loadable(lazy(() => import('views/Payroll/ViewPayroll')));
const SupplierManagement = Loadable(lazy(() => import('views/Supplier')));
const ViewSupplierDetails = Loadable(lazy(() => import('views/Supplier/ViewSupplier')));
const CreditorsDetails = Loadable(lazy(() => import('views/Creditors')));
const CreditorsHistory = Loadable(lazy(() => import('views/Creditors/ViewCreditor')));
// const SettingDetails = Loadable(lazy(() => import('views/Setting/index')));
const SalesManagement = Loadable(lazy(() => import('views/SalesSupport')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        }
      ]
    },
    {
      path: 'managment',
      children: [
        {
          path: 'fuel',
          element: <FuelManagement />
        }
      ]
    },
    {
      path: 'order',
      children: [
        {
          path: 'ViewOrderHistory',
          element: <ViewOrderHistory />
        }
      ]
    },
    {
      path: 'managment',
      children: [
        {
          path: 'Pump',
          element: <PumpManagment />
        }
      ]
    },
    {
      path: 'management',
      children: [
        {
          path: 'assignDuty',
          element: <AssginDutyManagement />
        }
      ]
    },
    {
      path: 'OrderDuty',
      children: [
        {
          path: 'orderCum',
          element: <DutyManagement />
        }
      ]
    },
    {
      path: 'savingList',
      children: [
        {
          path: 'saving',
          element: <SavingManagement />
        }
      ]
    },
    {
      path: 'hrms',
      children: [
        {
          path: 'staff',
          element: <StaffManagement />
        }
      ]
    },
    {
      path: 'hrms',
      children: [
        {
          path: 'staff',
          element: <StaffManagement />
        }
      ]
    },
    {
      path: 'hrms',
      children: [
        {
          path: 'supplier',
          element: <SupplierManagement />
        }
      ]
    },
    {
      path: 'hrms',
      children: [
        {
          path: 'payroll',
          element: <PayrollManagment />
        }
      ]
    },
    {
      path: 'ping',
      children: [
        {
          path: 'payrollData',
          element: <ViewPayrollManagment />
        }
      ]
    },
    {
      path: 'supp',
      children: [
        {
          path: 'ViewSuppDetails',
          element: <ViewSupplierDetails />
        }
      ]
    },
    {
      path: 'hrms',
      children: [
        {
          path: 'cred',
          element: <CreditorsDetails />
        }
      ]
    },
    {
      path: 'details',
      children: [
        {
          path: 'cred',
          element: <CreditorsHistory />
        }
      ]
    },
    // {
    //   path: 'hrms',
    //   children: [
    //     {
    //       path: 'setting',
    //       element: <SettingDetails />
    //     }
    //   ]
    // },
    {
      path: 'managment',
      children: [
        {
          path: 'sales',
          element: <SalesManagement />
        }
      ]
    }
  ]
};

export default MainRoutes;
