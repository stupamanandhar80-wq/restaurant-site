import { useEffect, useRef } from "react";
import { useLocation } from "react-router";


const pageTitles = {
    '/': 'Home',
    '/menu': 'Menu',
    '/about': 'Our Story',
    '/reservations': 'Reservations',
    '/contact': 'Contact',
};

function PageNavigation () {
    const { pathname } = useLocation ();
    const previousPath = useRef(pathname);

    useEffect (() => {
        const pageTitle = pageTitles[pathname] ?? 'Page Not Found';

        document.title = `${pageTitle} | Saffron and Stone`;

        if (previousPath.current !== pathname) {
            const mainContent = document.getElementById ('main-content');

            mainContent?.focus({ preventScroll: true});

            window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'instant',
            });

            previousPath.current = pathname;
        }
    }, [pathname]);

    return (null);
}

export default PageNavigation;