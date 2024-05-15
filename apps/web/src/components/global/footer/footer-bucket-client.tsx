'use client';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { FC } from 'react';
import { Button } from '~/components/ui/button';
import { USER_VARIANT_COOKIE } from '~/config';

export const VariantSwitcher: FC = () => {
  const router = useRouter();

  return (
    <Button
      variant={'link'}
      className="text-slate-200"
      onClick={() => {
        Cookies.remove(USER_VARIANT_COOKIE);
        router.refresh();
      }}
    >
      Remove Version
    </Button>
  );
};
