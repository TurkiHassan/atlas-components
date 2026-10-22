import { Stack, Skeleton } from '@atlas/ui';

export default function Example() {
  return (
    <Stack w="100%" role="group" aria-label="معاينة هيكل التحميل"><Skeleton height={32} circle /><Skeleton height={8} width="75%" /><Skeleton height={8} /><Skeleton height={8} width="60%" /></Stack>
  );
}
