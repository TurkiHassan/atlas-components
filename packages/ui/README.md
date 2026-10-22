# @atlas/ui

مكتبة محلية منتقاة من حزم React الأصلية. تعيد تصدير المكونات دون تغيير تنفيذها، مع سمة اختيارية للعربية. المصادر وحقوق المؤلف محفوظة في `THIRD_PARTY_NOTICES.md` و`licenses/`.

## التثبيت

```bash
npm install ./atlas-ui-1.1.1.tgz
```

تحتاج React وReact DOM متوافقين مع `^19.2.0`. الحزمة محلية وخاصة ولم تنشر إلى npm.

## الاستخدام

```tsx
import { DirectionProvider, MantineProvider, Button, atlasTheme, atlasCssVariablesResolver } from '@atlas/ui';
import '@atlas/ui/styles.css';

export default function App() {
  return (
    <DirectionProvider initialDirection="rtl">
      <MantineProvider theme={atlasTheme} cssVariablesResolver={atlasCssVariablesResolver} defaultColorScheme="dark">
        <Button>ابدأ الآن</Button>
      </MantineProvider>
    </DirectionProvider>
  );
}
```

ضع `lang="ar" dir="rtl"` على html. السمة تستخدم Free Palestine للعناوين من الخط المثبت محليًا، وNoto Sans Arabic Variable للنصوص. ثبّت `@fontsource-variable/noto-sans-arabic` واستورده. ملفات Free Palestine غير موزعة مع الحزمة؛ تعود العناوين إلى Noto عند غيابه. لاختيار Noto للجميع ضع `data-atlas-font="noto"` على html. `@atlas/ui/fonts.css` متاح منفصلًا ويُستورد تلقائيًا مع CSS الأساس. الأمثلة والمعرض الكاملان في مجلد المصدر `component-library`.

## نقاط الدخول

| المسار | المصدر |
|---|---|
| `@atlas/ui` | Mantine Core وسمة atlasTheme |
| `@atlas/ui/hooks` | Mantine Hooks |
| `@atlas/ui/form` | Mantine Form |
| `@atlas/ui/dates` | Mantine Dates |
| `@atlas/ui/charts` | Mantine Charts |
| `@atlas/ui/notifications` | Mantine Notifications |
| `@atlas/ui/modals` | Mantine Modals |
| `@atlas/ui/dropzone` | Mantine Dropzone |
| `@atlas/ui/spotlight` | Mantine Spotlight |
| `@atlas/ui/carousel` | Mantine Carousel |
| `@atlas/ui/editor` | Mantine Tiptap |
| `@atlas/ui/tiptap` | Tiptap useEditor وStarterKit |
| `@atlas/ui/table` | Mantine DataTable |
| `@atlas/ui/numbers` | NumberFlow |
| `@atlas/ui/virtual` | React Virtuoso |
| `@atlas/ui/motion` | Motion React |
| `@atlas/ui/icons` | Lucide |

لكل من dates وcharts وnotifications وdropzone وspotlight وcarousel وeditor وtable ملف `@atlas/ui/<entry>/styles.css`؛ استورده بعد CSS الأساس. Modals يستخدم CSS الأساس. notifications.show يحتاج تركيب Notifications. مدير modals يحتاج ModalsProvider.

مكونات التواريخ تستخدم تقويمًا ميلاديًا؛ اضبط العربية عبر DatesProvider واستيراد `dayjs/locale/ar`. غني النص يحتاج إعداد Tiptap. راجع [Mantine](https://mantine.dev/) و[Mantine DataTable](https://icflorescu.github.io/mantine-datatable/) للتفاصيل. لا تدخل مكونات Pro أو Motion+ أو Virtuoso Message List التجارية ضمن الحزمة.

الإصدارات مثبتة في package.json. حدّث حزم Mantine معًا واختبر التطبيق المستهلك. دعم الإتاحة في المصادر لا يعفي التطبيق من اختبار محتواه وتسمياته وتدفقاته.
