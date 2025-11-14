import { NextRequest, NextResponse } from 'next/server';

type Lead = {
  id: string;
  name: string;
  phone: string;
  email?: string;
  product?: string;
  status: string;
};

let leads: Lead[] = [
  { id: '1', name: 'Иван', phone: '+79000000001', status: 'Новый' },
];

export async function GET(req: NextRequest) {
  return NextResponse.json(leads); // Массив объектов JSON
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json(); // парсим тело
    if (!body.name || !body.phone) {
      return NextResponse.json({ error: 'Имя и телефон обязательны' }, { status: 400 });
    }

    const newLead: Lead = {
      id: Date.now().toString(),
      name: body.name,
      phone: body.phone,
      email: body.email,
      product: body.product,
      status: 'Новый',
    };
    leads.push(newLead);
    return NextResponse.json(newLead); // Возвращаем новый объект JSON
  } catch (err) {
    return NextResponse.json({ error: 'Неверный JSON' }, { status: 400 });
  }
}
