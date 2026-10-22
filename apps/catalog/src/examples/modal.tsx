import { Modal, Button, Text, Stack } from '@atlas/ui';
import { useDisclosure } from '@atlas/ui/hooks';

export default function Example() {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <><Button onClick={open}>فتح الحوار</Button><Modal opened={opened} onClose={close} title="مساحة لمشروعك" centered closeButtonProps={{ "aria-label": "إغلاق الحوار" }}><Stack><Text>هذا حوار جاهز من Mantine، يدير التركيز والتنقل بلوحة المفاتيح.</Text><Button onClick={close}>تم</Button></Stack></Modal></>
  );
}
