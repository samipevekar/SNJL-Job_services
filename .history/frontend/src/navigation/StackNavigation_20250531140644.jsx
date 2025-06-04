import { createStackNavigator } from '@react-navigation/stack';
import FaceRecongnitionAttendance from '../screens/Attendance/FaceRecongnitionAttendance';
import Home from '../screens/Home/Home';
import Login from '../screens/Auth/Login';
import AuthCheck from '../Helpers/AuthCheck';
import TabNavigation from './TabNavigation';
import ShopDetails from '../screens/Shops/ShopDetails';
import AttendanceDetails from '../screens/Attendance/AttendanceDetails';
import BalanceSheetPage from '../screens/Accounting/BalanceSheetPage';
import IndentFormation from '../screens/IndentFormation/IndentFormation';
import ExpenseForm from '../screens/Expense/ExpenseForm';
import WarehousePaymentPage from '../screens/WarehousePayment/WarehousePaymentForm';
import SaleSheetDetails from '../screens/SaleSheet/SaleSheetDetails';
import SaleSheetsPage from '../screens/SaleSheet/SaleSheetPage';
import StockIncrementForm from '../screens/SaleSheet/StockIncrementForm';
import ShopSaleSheets from '../screens/Shops/ShopSaleSheets';
import UserManagement from '../screens/Auth/UserManagement';
import ShopManagement from '../screens/Shops/ShopManagement';
import PreviousRecordSalePage from '../screens/SaleSheet/PreviousRecordSalePage';
import PreviousStockIncrementForm from '../screens/SaleSheet/PreviousStockIncrementForm';
import BrandManagement from '../screens/Brands/BrandManagement';
import BrandDetail from '../screens/Brands/BrandDetail';
import AllStockPage from '../screens/SaleSheet/AllStockPage';
import PreviousAllStockPage from '../screens/SaleSheet/PreviousAllStockPage';
import TransferStock from '../screens/SaleSheet/TransferStock';

const Stack = createStackNavigator();

export default function StackNavigation() {
  return (
    <Stack.Navigator>
    </Stack.Navigator>
  );
}