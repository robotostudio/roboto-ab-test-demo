'use client';
import { FC, Suspense } from 'react';
import Cookies from 'js-cookie';
import { VariantSwitcher } from './footer-bucket-client';
import { USER_VARIANT_COOKIE } from '~/config';

const getCookie = () => {
  return Cookies.get(USER_VARIANT_COOKIE);
};

export const UserVersion: FC = () => {
  const bucket = getCookie();
  const [, version] = bucket?.split('-') ?? [];

  return (
    <Suspense>
      <div className="flex flex-col items-center gap-4 text-xs text-slate-200">
        <div>You&apos;re now viewing {version} of this page.</div>
        <div className="flex gap-4">
          <VariantSwitcher />
        </div>
      </div>
    </Suspense>
  );
};
