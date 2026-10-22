import { HoverCard, Anchor, Text } from '@atlas/ui';

export default function Example() {
  return (
    <HoverCard width={240} shadow="md"><HoverCard.Target><Anchor href="https://mantine.dev/" target="_blank" rel="noreferrer">عن Mantine</Anchor></HoverCard.Target><HoverCard.Dropdown><Text size="sm">مجموعة React جاهزة. الرابط يفتح المصدر الكامل، وتبقى المعلومة متاحة دون الاعتماد على التحويم وحده.</Text></HoverCard.Dropdown></HoverCard>
  );
}
