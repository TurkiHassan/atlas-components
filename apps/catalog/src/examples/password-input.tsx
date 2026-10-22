import { PasswordInput } from '@atlas/ui';

export default function Example() {
  return (
    <PasswordInput w="100%" label="كلمة المرور" placeholder="أدخل كلمة المرور" visibilityToggleButtonProps={{ "aria-label": "إظهار كلمة المرور أو إخفاؤها" }} />
  );
}
