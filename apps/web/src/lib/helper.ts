import * as React from 'react';

export async function handleErrors<T>(
  promise: Promise<T>,
): Promise<[T | undefined, unknown]> {
  try {
    const data = await promise;
    return [data, null];
  } catch (err) {
    if (err instanceof Error) {
      console.log('errr', err.name, err.message);
    } else {
      console.log('eror', JSON.stringify(err));
    }

    return [undefined, err];
  }
}

export const extractFormData = (data: FormData) => {
  const raw: any = {};
  data.forEach((val, key) => {
    console.log('args', val, key);
    if (!key.startsWith('$')) {
      raw[key] = val;
    }
  });
  return raw;
};

export function useMediaQuery(query: string) {
  const [value, setValue] = React.useState(false);

  React.useEffect(() => {
    function onChange(event: MediaQueryListEvent) {
      setValue(event.matches);
    }

    const result = matchMedia(query);
    result.addEventListener('change', onChange);
    setValue(result.matches);

    return () => result.removeEventListener('change', onChange);
  }, [query]);

  return value;
}
