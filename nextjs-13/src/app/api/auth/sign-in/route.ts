import { NextRequest, NextResponse } from "next/server";

import { createEdgeRouter } from "next-connect";

export async function GET(request: NextRequest, ctx: RequestContext) {
  return await createEdgeRouter().use(async (req, event, next) => {
    const start = Date.now();
    await next(); // call next in chain
    const end = Date.now();
    console.log(`Request took ${end - start}ms`);
  }).get((req) => {
    console.log('========>111 : ', 111)
    // try {
      // const authService = new AuthGoogleService();
      // authService.authenticate()(req, NextResponse)
      return NextResponse.json({status: 200}, { status: 200 })
    // } catch (error) {
    //   return NextResponse.json({ message: (error as Error).message }, { status: 500 })
    // }
  }).run(request, ctx);
}
