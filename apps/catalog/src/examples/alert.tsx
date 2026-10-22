import { Alert } from '@atlas/ui';
import { ShieldCheck } from '@atlas/ui/icons';

export default function Example() {
  return (
    <Alert w="100%" variant="light" title="المصدر موثّق" icon={<ShieldCheck size={20} />}>هذا المكوّن جاهز للاستخدام من الحزمة الرسمية.</Alert>
  );
}
