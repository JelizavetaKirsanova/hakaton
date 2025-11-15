import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../prisma/prisma';

export async function GET() {
  try {
    const leads = await prisma.lead.findMany({
      orderBy: { createdAt: 'desc' },
      include: { manager: true }, // подтягиваем данные менеджера
    });
    return NextResponse.json(leads);
  } catch (error) {
    console.error('Ошибка при получении лидов:', error);
    return NextResponse.json({ error: 'Не удалось получить лиды' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log('Полученные данные:', body);

    if (!body.name || !body.phone) {
      console.error('Ошибка: Имя и телефон обязательны');
      return NextResponse.json({ error: 'Имя и телефон обязательны' }, { status: 400 });
    }

    const newLead = await prisma.lead.create({
      data: {
        name: body.name,
        phone: body.phone,
        email: body.email || null,
        product: body.product || null,
        region: body.region || null,
        status: 'NEW',
      },
      include: { manager: true },
    });

    console.log('Лид успешно создан:', newLead);
    return NextResponse.json(newLead, { status: 201 });
  } catch (error) {
    console.error('Ошибка при создании лида:', error);
    return NextResponse.json({ error: 'Не удалось создать лид' }, { status: 500 });
  }
}