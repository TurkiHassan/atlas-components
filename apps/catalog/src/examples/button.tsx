import { Button, Group } from '@atlas/ui';

export default function Example() {
  return (
    <Group><Button>ابدأ مشروعك</Button><Button variant="light">معاينة</Button><Button variant="outline">تفاصيل</Button><Button disabled>غير متاح</Button></Group>
  );
}
