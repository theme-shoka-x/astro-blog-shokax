export interface NavItemType {
  href: string;
  text: string;
  icon?: string;
  dropbox?: boolean;
  dropboxItems?: NavItemType[];
}
