import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { url } from 'inspector';
import { NextResponse } from 'next/server';

// pages, where login isnt required
const isPublicRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)', '/api/(.*)']);

// auth info about user session, req the request that comes
export default clerkMiddleware(async (auth, req) => {
  // getting if the userId exists if not logged in he will not enter
  const { userId } = await auth();

  if (!isPublicRoute(req) && !userId) {
    const sign_in = new URL('/sign-in', req.url);

    return NextResponse.redirect(sign_in);
  }

  return NextResponse.next();
});

export const config = {
  // work on everything
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
