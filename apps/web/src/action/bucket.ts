'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { USER_VARIANT_COOKIE } from '~/config';

export async function removeBucket() {
  cookies().delete(USER_VARIANT_COOKIE);
}
