// Plik: app/api/scan_attendance/route.ts
// Ten plik JEST TWOIM PROXY DLA SKANERA

import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

// Musi być POST, bo klient wysyła nam dane (token QR)
export async function POST(request: NextRequest) {
  try {
    // 1. Zabezpiecz ten endpoint: Zdobądź token UŻYTKOWNIKA (studenta) z sesji
    //    Nie bierz go z URL-a, weź go z 'auth()' - to jest bezpieczne!
    const { getToken } = await auth();
    const userToken = await getToken();
    if (!userToken) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    // 2. Zdobądź token QR (z kamery), który przyszedł w body od klienta
    const body = await request.json();
    const qrToken = body.token;
    if (!qrToken) {
      return NextResponse.json({ error: 'QR Token is required' }, { status: 400 });
    }

    // 3. Uderz do PRAWDZIWEGO backendu, wysyłając OBA tokeny
    const API_URL = 'http://localhost:3000/api/attendance/scan';
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${userToken}`, // Token studenta (z auth)
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ token: qrToken }) // Token z QR kodu (z body)
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'Backend error');
    }

    return NextResponse.json(data);

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}