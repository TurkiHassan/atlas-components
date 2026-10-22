import { Paper, Text, Center, useDirection } from '@atlas/ui';
import { Carousel } from '@atlas/ui/carousel';

export default function Example() {
  const { dir } = useDirection();
  return (
    <Carousel w="100%" height={155} slideSize="100%" slideGap="md" nextControlProps={{ "aria-label": "الشريحة التالية" }} previousControlProps={{ "aria-label": "الشريحة السابقة" }} emblaOptions={{ loop: true, direction: dir }}>{["الفكرة", "التصميم", "الإطلاق"].map((label, index) => <Carousel.Slide key={label}><Paper h="100%" withBorder bg="var(--mantine-color-teal-light)"><Center h="100%"><div><Text c="teal" size="xs" ta="center">0{index + 1}</Text><Text size="xl" fw={700}>{label}</Text></div></Center></Paper></Carousel.Slide>)}</Carousel>
  );
}
