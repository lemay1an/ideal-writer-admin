// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'orders',
    path: '/dashboard/orders',
    icon: icon('ic_cart'),
  },
  {
    title: 'user',
    path: '/dashboard/user',
    icon: icon('ic_user'),
  },
  {
    title: 'Pricing',
    path: '/dashboard/pricing',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Blogs',
    path: '/dashboard/blogs',
    icon: icon('ic_blog'),
  },
  {
    title: 'Queries',
    path: '/dashboard/queries',
    icon: icon('ic_lock'),
  },
  {
    title: 'Settings',
    path: '/dashboard/settings',
    icon: icon('cog'),
  },
];

export default navConfig;
