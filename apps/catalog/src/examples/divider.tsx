import { Stack, Divider, Text } from '@atlas/ui';

export default function Example() {
  return (
    <Stack w="100%"><Text size="sm">قبل المتابعة</Text><Divider label="أو" labelPosition="center" /><Text size="sm" c="dimmed">اختر طريقة أخرى</Text></Stack>
  );
}
