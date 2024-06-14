export const Routes = {
  home: '/(root)/home',
  notifications: '/(root)/notifications/chat',
  shop: '/(root)/shop',
  sell: '/(root)/sell',
};

export interface Navigation {
  name: string;
  icon: string;
  identifier: string;
  link: string;
  main?: boolean;
}
