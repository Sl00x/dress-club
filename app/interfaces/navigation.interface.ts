import { NavigationIdentifier } from '@/features/reducers/product-reducer';

export const Routes = {
  home: '/(root)/home',
  shop: '/(root)/shop',
  sell: '/(root)/sell',
};

export interface Navigation {
  name: string;
  icon: string;
  identifier: NavigationIdentifier;
  link: string;
}
