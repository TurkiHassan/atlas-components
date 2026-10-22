import { Timeline, Text } from '@atlas/ui';

export default function Example() {
  return (
    <Timeline active={1} bulletSize={18} lineWidth={2}><Timeline.Item title="تحديد المعايير"><Text size="xs" c="dimmed">الجودة أولًا</Text></Timeline.Item><Timeline.Item title="اختيار المصادر"><Text size="xs" c="dimmed">توثيق وتحقق</Text></Timeline.Item><Timeline.Item title="بدء المشروع"><Text size="xs" c="dimmed">جاهز لخطوتك التالية</Text></Timeline.Item></Timeline>
  );
}
