import { NextResponse } from 'next/server';
import connectDB from '@/utils/db';
import {ContactModel} from '@/utils/schema';


export async function POST(req) {
  await connectDB();

  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Preencha todos os campos.' }, { status: 400 });
    }

    const newContact = new ContactModel({ name, email, message});
    await newContact.save();

    return NextResponse.json({ message: 'Mensagem enviada com sucesso!' }, { status: 200 });
  } catch (error) {
    console.error('Erro ao salvar mensagem:', error);
    return NextResponse.json({ error: 'Erro interno do servidor.' }, { status: 500 });
  }
}
