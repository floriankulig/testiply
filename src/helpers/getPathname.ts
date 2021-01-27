import { useRouter } from 'next/router';

const getPathname = (): string[] => {
  const router = useRouter();

  return router.pathname.split('/').slice(1);
};
export default getPathname;
