import { TagsInput } from '@atlas/ui';

export default function Example() {
  return (
    <TagsInput w="100%" label="الوسوم" placeholder="اكتب ثم اضغط Enter" defaultValue={["واجهة", "عربي"]} />
  );
}
