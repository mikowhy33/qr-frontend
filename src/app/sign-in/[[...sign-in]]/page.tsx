// Plik: src/app/sign-in/[[...sign-in]]/page.tsx

import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex justify-center items-center py-12">
      {/* To jest ten formularz, którego szukasz */}
      <SignIn />
    </div>
  );
}