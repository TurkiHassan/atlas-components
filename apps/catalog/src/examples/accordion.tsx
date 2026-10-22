import { Accordion } from '@atlas/ui';

export default function Example() {
  return (
    <Accordion defaultValue="source" w="100%"><Accordion.Item value="source"><Accordion.Control>من أين تأتي المكونات؟</Accordion.Control><Accordion.Panel>من الحزم الرسمية مباشرة، دون إعادة بناء.</Accordion.Panel></Accordion.Item><Accordion.Item value="rtl"><Accordion.Control>هل تدعم العربية؟</Accordion.Control><Accordion.Panel>تضبط DirectionProvider ووسمة dir اتجاه الواجهة.</Accordion.Panel></Accordion.Item></Accordion>
  );
}
