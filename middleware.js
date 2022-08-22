import { NextResponse } from "next/server";
import { log, withAxiom } from "next-axiom";

async function middleware(req, ev) {
  req.log.info("Hello from middleware", { status: "OK" });
  return NextResponse.next();
}

export default withAxiom(middleware);
