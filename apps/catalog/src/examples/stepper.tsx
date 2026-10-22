import { Stepper, Stack, Text } from '@atlas/ui';
import { useState } from 'react';

export default function Example() {
  const [active, setActive] = useState(0);
  return (
    <Stack w="100%"><Stepper active={active} onStepClick={setActive} size="sm"><Stepper.Step label="الفكرة" description="حدد الهدف"><Text size="sm" mt="sm">ابدأ بتحديد هدف المشروع.</Text></Stepper.Step><Stepper.Step label="التصميم" description="اختر الأساس"><Text size="sm" mt="sm">اختر مكوناتك الجاهزة.</Text></Stepper.Step><Stepper.Step label="الإطلاق" description="ابدأ العمل"><Text size="sm" mt="sm">مشروعك جاهز للمرحلة التالية.</Text></Stepper.Step></Stepper></Stack>
  );
}
