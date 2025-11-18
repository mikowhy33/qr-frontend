import Link from 'next/link';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from './ui/navigation-menu';

import { SignOutButton } from '@clerk/nextjs';
import { getUserRole } from '@/services/api';

export const NavBar = async () => {
  const data = await getUserRole();

  const isTeacher = data?.role === 'teacher';

  return (
    <header className=" flex justify-center mt-5 mb-5">
      {/* <div className='mr-auto'>bzz</div> */}
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link href="/" passHref>
                Home
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link href="/getUserClasses" passHref>
                Classes
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          {isTeacher && (
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/create_new_class" passHref>
                  Create new Class
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          )}
          <NavigationMenuItem>
            <SignOutButton>
              {/* styles taken from the menu, built in shadcn! */}
              <button className={navigationMenuTriggerStyle()}>Log out</button>
            </SignOutButton>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
};
