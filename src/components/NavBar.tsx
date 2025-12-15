import Link from 'next/link';
import { getUserRole } from '@/services/api';
import { UserButton } from '@clerk/nextjs'; 
import { School, PlusCircle, BookOpen } from 'lucide-react';

export async function NavBar() {
  const user = await getUserRole();

  return (
    <header className="sticky top-0 z-500 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-8 mx-auto max-w-7xl">
        {/* --- Left side (LOGO + NAV) --- */}
        <div className="flex gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <School className="h-6 w-6 text-indigo-600" />
            <span className="hidden font-bold sm:inline-block text-xl tracking-tight">QR Attendance app</span>
          </Link>

          <nav className="flex gap-6">
            <Link href="/" className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
              <BookOpen className="mr-2 h-4 w-4" />
              Classes
            </Link>
            <Link
              href="/create_new_class"
              className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Create new Class
            </Link>
          </nav>
        </div>

        {/* --- Right side (USER BUTTON) --- */}
        <div className="flex items-center gap-4">
          {/* Info About user */}
          {user && (
            <div className="hidden md:flex flex-col items-end">
              <span className="text-sm font-medium leading-none">{user.name}</span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">{user.role}</span>
            </div>
          )}

          {/* CLERK MAGIC BUTTON */}
          {/* appearance helps */}
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: {
                avatarBox: 'h-10 w-10 border border-slate-200',
              },
            }}
          />
        </div>
      </div>
    </header>
  );
}
