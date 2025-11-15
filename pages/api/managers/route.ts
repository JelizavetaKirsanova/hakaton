import { NextRequest, NextResponse } from 'next/server';

type Manager = { id: string; name: string; currentLoad: number };

let managers: Manager[] = [
  { id: '1', name: 'Алексей', currentLoad: 2 },
];

// Обработка GET-запросов
export async function GET(req: NextRequest) {
  return NextResponse.json(managers);
}

// Обработка POST-запросов
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const newManager: Manager = {
      id: (managers.length + 1).toString(),
      name: body.name,
      currentLoad: body.currentLoad || 0,
    };

    managers.push(newManager);
    return NextResponse.json(newManager, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
}