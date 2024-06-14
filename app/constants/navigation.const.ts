import { Navigation, Routes } from '@/interfaces/navigation.interface';

export const NavigationItems: Navigation[] = [
  {
    name: 'Home',
    icon: 'ri-home-line',
    identifier: 'HOME',
    link: Routes.home,
  },
  {
    name: 'Shop',
    icon: 'ri-shopping-cart-2-line',
    identifier: 'SHOP',
    link: Routes.shop,
  },
  {
    name: 'Sell',
    icon: 'ri-add-box-line',
    identifier: 'SELL',
    link: Routes.sell,
  },
  {
    name: '',
    icon: 'ri-notification-line',
    identifier: 'NOTIFICATIONS',
    link: Routes.notifications,
  },
];
