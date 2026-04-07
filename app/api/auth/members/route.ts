import { NextRequest } from "next/server";
import MembersServices from "./service/index.service";

export async function POST(req: NextRequest) {
  return MembersServices().post(req);
}