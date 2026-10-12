import { useEffect, useRef } from 'react';
import { matchPath, useLocation } from 'react-router';
import menuItems from '../data/menu.js';

const pageTitles = {
  '/': 'Home',
  '/menu': 'Menu',
  '/about': 'Our Story',
  '/reservations': 'Reservations',
  '/contact': 'Contact',
};

function PageNavigation() {
  const { pathname } = useLocation();
  const previousPath = useRef(pathname);

  useEffect(() => {
    const dishMatch = matchPath('/menu/:dishId', pathname);

    const dish = dishMatch
      ? menuItems.find(
          (item) => String(item.id) === dishMatch.params.dishId
        )
      : undefined;

    const pageTitle = dishMatch
      ? dish?.name ?? 'Dish Not Found'
      : pageTitles[pathname] ?? 'Page Not Found';

    document.title = `${pageTitle} | Saffron & Stone`;

    if (previousPath.current !== pathname) {
      const mainContent = document.getElementById('main-content');

      mainContent?.focus({ preventScroll: true });

      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant',
      });
    }

    previousPath.current = pathname;
  }, [pathname]);

  return null;
}

export default PageNavigation;