import { Stack, Slider, RangeSlider, Text } from '@atlas/ui';

export default function Example() {
  return (
    <Stack w="100%" gap="xl"><Text id="slider-label" size="sm">مستوى الجودة</Text><Slider thumbLabel="مستوى الجودة" defaultValue={65} /><Text id="range-label" size="sm">النطاق</Text><RangeSlider defaultValue={[20, 80]} thumbFromLabel="أقل قيمة" thumbToLabel="أعلى قيمة" /></Stack>
  );
}
