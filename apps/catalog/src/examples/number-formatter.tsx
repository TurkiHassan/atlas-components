import { NumberFormatter, Stack, Text } from '@atlas/ui';

export default function Example() {
  return (
    <Stack><Text size="xl" fw={700} dir="ltr"><NumberFormatter value={128450} thousandSeparator suffix=" SAR" /></Text><Text size="sm" c="dimmed">تنسيق آلاف وعملة دون منطق محلي إضافي.</Text></Stack>
  );
}
