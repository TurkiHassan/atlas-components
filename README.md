# أطلس — مكتبة مكونات جاهزة

[![Verify Atlas](https://github.com/TurkiHassan/atlas-components/actions/workflows/ci.yml/badge.svg)](https://github.com/TurkiHassan/atlas-components/actions/workflows/ci.yml)

مجموعة React + TypeScript منتقاة من المصادر الأصلية، مع العربية وRTL ومظهر فاتح وداكن. **لا تحتوي حزمة المكتبة على تنفيذ محلي لـButton أو Dialog أو غيرهما**؛ تعيد تصدير المكونات الأصلية. المعرض يضم 70 مثال استخدام قابلًا للتجربة والنسخ.

## ما ستجده

- `packages/ui`: حزمة `@atlas/ui` مع صادرات منفصلة لكل تخصص وأنواع TypeScript.
- `apps/catalog`: معرض عربي تفاعلي: بحث وفئات وشيفرة المصدر وروابط التوثيق.
- `apps/compare`: مقارنة مستقلة بين HeroUI وMantine للنموذج والحوار والجدول والتاريخ، عبر `/compare/`.
- `docs/COMPARISON-RESULTS.md`: النتائج العملية وحجم البناء وحدود الاختبار.
- `docs/SELECTION-CRITERIA.md`: المعايير والأوزان المعتمدة قبل التثبيت.
- `docs/RESEARCH.md`: المقارنة والمراجع الرسمية وآراء المطورين وأسباب الاستبعاد.
- `docs/COMPONENTS.md`: فهرس الأمثلة السبعين.
- `docs/VERIFICATION.md`: نتائج التحقق وحدوده.
- `AGENTS.md`: تعليمات الاستعمال والصيانة للـAgent.
- `docs/MAINTENANCE.md`: سياسة البحث الأسبوعي والتحديث عبر Pull Requests.
- `research`: لقطات بيانات GitHub وnpm وprovenance للإصدارات المثبتة.
- `licenses` و`THIRD_PARTY_NOTICES.md`: نصوص التراخيص التي شحنتها الحزم وتوثيق الاعتماديات.
- `artifacts`: حزمة محلية قابلة للتثبيت، نتائج الاختبارات، ولقطات المعرض.

## التشغيل

المتطلبات: Node.js 22.12+ أو 24. اختُبر هذا المشروع على Node.js 24.21.0. لا يُنصح باستخدام Node.js 23 المنتهي الدعم.

```bash
git clone https://github.com/TurkiHassan/atlas-components.git
cd atlas-components
npm ci
npm run dev
```

افتح `http://127.0.0.1:5173` للمكتبة، و`http://127.0.0.1:5173/compare/` للمقارنة. يشغّل أمر التطوير المعرض على 5173 ومعاينات المقارنة على 5174. بناء الإنتاج يجمعهما في `apps/catalog/dist` لعرضهما من خادم واحد.

```bash
npm run typecheck
npm run build
npm test
npm run provenance
npm run pack
```

اختبارات المتصفح تستخدم Chrome المثبت. على جهاز لا يحتوي Chrome، شغّل `npx playwright install --with-deps chrome` أو عدّل `channel` في playwright.config.ts إلى متصفح متاح. `npm run check` يجمع فحص الأنواع والبناء والاختبارات. `npm run examples` يعيد توليد أمثلة الاستخدام والفهرس من ملف التعريف المحلي. فحص الخطوط يقبل غياب Free Palestine على أجهزة CI ويتحقق من Noto البديل. ملفات tgz ونتائج الفحص الجديدة تُرفق بتشغيل GitHub Actions عند اكتماله؛ ويمكن توليد الحزمة محليًا بالأوامر التالية.

## استخدام الحزمة في مشروع آخر

```bash
npm run pack
```

ينتج `artifacts/atlas-ui-1.1.0.tgz`. ثبّته داخل مشروع React متوافق:

```bash
npm install /path/to/atlas-components/artifacts/atlas-ui-1.1.0.tgz
```

الحزمة قابلة للتوليد من المستودع العام، ولم تُنشر إلى npm. استبدل `/path/to/atlas-components` بمسار نسختك المحلية. تحتاج React وReact DOM 19.2 أو أحدث متوافق. لا تضف إصدارات Mantine مختلفة إلى مشروعك المستهلك. Tiptap يحتاج إعداد محركه عند استخدام المحرر. الأمثلة الكاملة داخل المعرض تعرض الاستيرادات الفعلية.

### الحد الأدنى للإعداد

ضع `lang="ar" dir="rtl"` على عنصر `html`، ثم:

```tsx
import { DirectionProvider, MantineProvider, Button, atlasTheme, atlasCssVariablesResolver } from '@atlas/ui';
import '@atlas/ui/styles.css';

export default function App() {
  return (
    <DirectionProvider initialDirection="rtl">
      <MantineProvider theme={atlasTheme} cssVariablesResolver={atlasCssVariablesResolver} defaultColorScheme="dark">
        <Button>ابدأ مشروعك</Button>
      </MantineProvider>
    </DirectionProvider>
  );
}
```

الخط المعتمد: **Free Palestine للعناوين وNoto Sans Arabic للنصوص والنماذج والأزرار**. لتطابق المعرض، ثبّت `@fontsource-variable/noto-sans-arabic` واستورد الحزمة في جذر التطبيق. يستدعي CSS خط Free Palestine المثبت محليًا عبر `local()`؛ لم يُضمّن ملفه لعدم توفر ترخيص إعادة توزيع مرفق. على جهاز لا يحتويه، تعود العناوين إلى Noto ثم خط النظام. قائمة «اختيار الخط» تتيح Noto للواجهة كلها وتحفظ التفضيل. لاستعمال Noto دائمًا ضع `data-atlas-font="noto"` على html. راجع `research/free-palestine-font.json`. React Server Components في Next.js تتطلب وضع استخدام المزود والمكونات التفاعلية في حد `use client` مناسب.

### الصادرات المتخصصة

| المسار | الاستخدام | CSS إضافي |
|---|---|---|
| `@atlas/ui` | جميع صادرات Mantine Core + theme | `@atlas/ui/styles.css` |
| `@atlas/ui/hooks` | Hooks الأصلية | — |
| `@atlas/ui/form` | إدارة النماذج والتحقق | — |
| `@atlas/ui/dates` | DatesProvider ومكونات التاريخ | `@atlas/ui/dates/styles.css` |
| `@atlas/ui/charts` | الرسوم | `@atlas/ui/charts/styles.css` |
| `@atlas/ui/table` | DataTable | `@atlas/ui/table/styles.css` |
| `@atlas/ui/notifications` | Notifications وnotifications | `@atlas/ui/notifications/styles.css` |
| `@atlas/ui/modals` | ModalsProvider وmodals | CSS الأساس يكفي |
| `@atlas/ui/dropzone` | Dropzone | `@atlas/ui/dropzone/styles.css` |
| `@atlas/ui/spotlight` | Spotlight | `@atlas/ui/spotlight/styles.css` |
| `@atlas/ui/carousel` | Carousel | `@atlas/ui/carousel/styles.css` |
| `@atlas/ui/editor` | RichTextEditor | `@atlas/ui/editor/styles.css` |
| `@atlas/ui/tiptap` | useEditor وStarterKit | CSS المحرر |
| `@atlas/ui/numbers` | NumberFlow | — |
| `@atlas/ui/virtual` | Virtuoso وTableVirtuoso | — |
| `@atlas/ui/motion` | بدائيات Motion React | — |
| `@atlas/ui/icons` | أيقونات Lucide | — |

استورد CSS الأساس أولًا ثم CSS الامتداد. إشعارات `notifications.show` تتطلب تركيب `<Notifications />` داخل MantineProvider. مدير الحوارات يتطلب `<ModalsProvider>`؛ أما `<Modal>` العادي فلا يحتاجه.

للتواريخ العربية استورد `dayjs/locale/ar` وغلّف المكونات بـ`<DatesProvider settings={{ locale: 'ar', firstDayOfWeek: 0, weekendDays: [5, 6] }}>`. هذه تقاويم ميلادية عربية؛ لا تتضمن دعمًا هجريًا. منطق الأسبوع يطابق الاستخدام السعودي.

## تحديث المكتبة

1. راجع معايير القبول والتراخيص والملاحظات الخاصة بالإصدارات.
2. حدّث حزم Mantine إلى الإصدار نفسه، وحدّث peer dependencies المتوافقة.
3. استخدم إصدارًا ثابتًا، وأعد توليد lockfile.
4. شغّل `npm run check` و`npm run provenance`، وراجع المظهرين والاتجاهين.
5. أعد الحزم بـ`npm run pack` بعد تحديث رقم الإصدار.

المكونات مدعومة من مشاريعها الأصلية. طبقة أطلس لا تضيف ضمانًا أو شهادة إتاحة. أمثلة الملفات والنماذج محلية ولا تتصل بخادم. السحب والإفلات لإعادة الترتيب، مخططات 3D، المحادثة المتدفقة، الجدولة ليست أمثلة مثبتة هنا، والهجري متاح في مقارنة HeroUI المنفصلة؛ يلزم تقييم متخصص قبل إضافتها. تفاصيل الاختيار والاستبعاد في التقرير.
