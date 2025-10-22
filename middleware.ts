import { auth } from './auth';

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isOnAdmin = req.nextUrl.pathname.startsWith('/admin');
  const isOnLogin = req.nextUrl.pathname === '/admin/login';

  // Protect all admin routes except login
  if (isOnAdmin && !isOnLogin && !isLoggedIn) {
    return Response.redirect(new URL('/admin/login', req.nextUrl));
  }

  // Redirect logged-in users away from login page
  if (isOnLogin && isLoggedIn) {
    return Response.redirect(new URL('/admin/dashboard', req.nextUrl));
  }
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
