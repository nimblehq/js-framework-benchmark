import { NextResponse, NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

import { createNewsletter } from 'repositories/newsletter.repository';
import baseHandler from 'lib/handler/base.handler';
// import { findUserById } from 'repositories/user.repository';

export async function POST(req: NextRequest) {
  return baseHandler(req, async (currentUser) => {
    const { name, content } = req;

    const attributes = {
      name: name,
      content: content,
      userId: currentUser.id,
    };

    const record = await createNewsletter(attributes);

    return NextResponse.json({ newsletter: record }, { status: 200 });
  })
}