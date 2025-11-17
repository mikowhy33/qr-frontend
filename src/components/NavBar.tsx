import Link from 'next/link';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from './ui/navigation-menu';

import { SignOutButton } from '@clerk/nextjs';

export const NavBar = () => {
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

          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link href="/" passHref>
                Reports/ Not yet done, in testing
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

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

/*

// Plik: src/components/NavBar.tsx

import Link from 'next/link';
import { 
  NavigationMenu, 
  NavigationMenuItem, 
  NavigationMenuLink, 
  NavigationMenuList,
  navigationMenuTriggerStyle  <--- 1. IMPORTUJ TĘ FUNKCJĘ
} from './ui/navigation-menu';

import { SignOutButton } from '@clerk/nextjs';

export const NavBar = () => {
  return (
    <header className=" flex justify-center mt-5 mb-5">
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
                Teacher Classes
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link href="/" passHref>
                Reports/ Not yet done, in testing
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

         
          {/* Ubieramy go w NavigationMenuItem, żeby był w jednej linii
          <NavigationMenuItem>
            <SignOutButton>
             
                Dajemy mu DOKŁADNIE te same style, co linkom obok,
                używając zaimportowanej funkcji.
             
              <button className={navigationMenuTriggerStyle()}>
                Wyloguj się
              </button>
            </SignOutButton>
          </NavigationMenuItem>
          
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
};
*/
