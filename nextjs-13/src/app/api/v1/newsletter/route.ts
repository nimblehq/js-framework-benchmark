import { NextResponse, NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

import { createNewsletter } from 'repositories/newsletter.repository';
// import { findUserById } from 'repositories/user.repository';

export async function POST(req: NextRequest) {
  try {
    const token = await getToken({ req });

    if (!token?.userId) {
      return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
    }
    //
    // return NextResponse.json({ user: currentUser }, { status: 200 });

    const { name, content } = req;

    const attributes = {
      name: name,
      content: content,
      userId: token?.userId,
    };
    const record = await createNewsletter(attributes);
    return NextResponse.json({ newsletter: record }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: (error as Error).message },
      { status: 500 }
    );
  }
}
