import { Stack, Title, Text, Highlight } from '@atlas/ui';

export default function Example() {
  return (
    <Stack gap={6}><Title order={3}>تفاصيل تصنع الفرق.</Title><Text c="dimmed">واجهة واضحة، وتجربة تستحق الاستخدام.</Text><Highlight highlight="جاهزة" highlightStyles={{ background: "var(--mantine-color-teal-light)", color: "var(--mantine-color-teal-light-color)" }}>مكونات جاهزة لمشروعك القادم.</Highlight></Stack>
  );
}
