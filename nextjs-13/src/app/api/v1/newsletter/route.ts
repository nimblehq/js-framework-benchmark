import { NextResponse, NextRequest } from 'next/server';

import baseHandler from 'lib/handler/base.handler';
import {
  createNewsletter,
  queryNewsletterByUserId,
} from 'repositories/newsletter.repository';

export async function POST(req: NextRequest) {
  return baseHandler(req, async (currentUser, body) => {
    try {
      const { name, content } = body;

      const attributes = {
        name: name,
        content: content,
        user: { connect: { id: currentUser.id } },
      };

      const record = await createNewsletter(attributes);

      return NextResponse.json({ newsletter: record }, { status: 200 });
    } catch (err) {
      return NextResponse.json({ message: 'Invalid params' }, { status: 422 });
    }
  });
}

export async function GET(req: NextRequest) {
  return baseHandler(req, async (currentUser, _) => {
    const records = await queryNewsletterByUserId(currentUser.id);

    return NextResponse.json({ records: records }, { status: 200 });
  });
}
