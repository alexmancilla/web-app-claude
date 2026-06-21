import { prisma } from "@/library/third-party/global-prisma-client"
import bcrypt from 'bcrypt';
import { User } from '@prisma/client'
import { AUTH_RESULT, StandardLoginInfo } from "../../types";

export async function checkLogin(existingUser: StandardLoginInfo): Promise<User | string> {

  try {
    const user = await prisma.user.findUnique({ where: { email: existingUser.email } });

    if (!user) {
      return AUTH_RESULT.NO_USER;
    }

    if (!user.verified) {
      return AUTH_RESULT.UNVERIFIED_USER;
    }

    const passwordMatches = await bcrypt.compare(existingUser.password, user.password!);

    if (!passwordMatches) {
      return AUTH_RESULT.PASSWORD_MISMATCH;
    }

    return user; // User found and password matches
  }
  catch (error) {
    console.error("Check log in: Failed", { error })
    return AUTH_RESULT.INTERNAL_ERROR;
  }
}