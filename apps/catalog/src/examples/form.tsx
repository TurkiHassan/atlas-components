import { Button, Stack, TextInput } from '@atlas/ui';
import { useForm } from '@atlas/ui/form';
import { notifications } from '@atlas/ui/notifications';

export default function Example() {
  const form = useForm({ initialValues: { email: '' }, validate: { email: (value) => /^\S+@\S+\.\S+$/.test(value) ? null : 'أدخل بريدًا إلكترونيًا صالحًا' } });
  return (
    <form onSubmit={form.onSubmit(() => { notifications.show({ title: "تم التحقق", message: "البيانات صالحة. هذا مثال محلي ولا يرسلها إلى خادم." }); })}><Stack><TextInput label="البريد الإلكتروني" type="email" placeholder="name@example.com" {...form.getInputProps("email")} /><Button type="submit">التحقق من البيانات</Button></Stack></form>
  );
}
