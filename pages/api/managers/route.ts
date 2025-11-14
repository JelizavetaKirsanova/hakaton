import { NextRequest, NextResponse } from 'next/server';

type Manager = { id: string; name: string; currentLoad: number };

let managers: Manager[] = [
  { id: '1', name: 'Алексей', currentLoad: 2 },
];

export async function GET(req: NextRequest) {
  return NextResponse.json(managers);
}
