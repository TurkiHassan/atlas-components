# مراجعة المصدر التقني لـHeroUI

> هذه مذكرة مرحلة قراءة المستودع. أُنجز لاحقًا تطبيق مقارنة مستقل؛ انظر [النتائج العملية](../docs/COMPARISON-RESULTS.md). حدود عدم التشغيل المذكورة هنا تخص مرحلة قراءة المصدر.

تاريخ الفحص: **22 أكتوبر 2026**. المرجع المثبت للقراءة: فرع `v3` عند [d814c204a92464ca02eb229c384a4a982d1ab398](https://github.com/heroui-inc/heroui/commit/d814c204a92464ca02eb229c384a4a982d1ab398). النطاق: قراءة المصدر والـmanifests وCI والمشكلات وحزم npm؛ لم تُثبت HeroUI في مكتبة أطلس، ولم يُشغّل كود المستودع أو اختباره محليًا.

## الحكم التقني

المستودع مشروع فعلي ذو بنية وصيانة واختبارات واضحة، ويصلح مرشحًا قويًا كأساس بصري جاهز لمشروعات React الحديثة. تظل جودة العربية على مستوى التفاصيل، وإيماءات الهاتف، واتساق التوثيق والترخيص نقاطًا تتطلب تجربة محددة قبل اعتماده في مكتبة يعاد توزيعها. وجود React Aria لا يلغي أخطاء طبقة HeroUI فوقه.

## ما تحقق من المصدر

- بنية monorepo تضم `packages/react` و`packages/styles` و`packages/testing` وStorybook وتطبيق التوثيق؛ تستخدم pnpm وTurborepo. إعداد التطوير نفسه يحتاج Node 22+ وpnpm 10+، وهذه متطلبات تطوير المستودع وليست بالضرورة متطلبات تشغيل كل تطبيق مستهلك. [المجلدات](https://github.com/heroui-inc/heroui/tree/d814c204a92464ca02eb229c384a4a982d1ab398/packages)، [root package.json](https://github.com/heroui-inc/heroui/blob/d814c204a92464ca02eb229c384a4a982d1ab398/package.json).
- `@heroui/react` و`@heroui/styles` في المصدر كلاهما `3.2.6`. React وReact DOM مطلوبان `>=19.0.0` وTailwind `>=4.0.0`؛ الحزمة تطلب كذلك نسخ React Aria وReact Aria Components المتوافقة، وتستخدم input-otp وtailwind-variants. هذه إشارة إلى ضرورة ضبط peer dependencies، لا أنها حزمة مستقلة عن منظومة React Aria. [manifest React](https://github.com/heroui-inc/heroui/blob/d814c204a92464ca02eb229c384a4a982d1ab398/packages/react/package.json)، [manifest styles](https://github.com/heroui-inc/heroui/blob/d814c204a92464ca02eb229c384a4a982d1ab398/packages/styles/package.json).
- استيراد React Aria مباشر في أمثلة المصدر المفحوصة؛ مثل CloseButton وDrawer. React package يعلن `sideEffects: false`، وحزمة styles تستثني CSS من الحذف. هذه مهيئات جيدة لتجزئة الحزم، لكنها لا تثبت حجم bundle أو زمن عرض فعليًا. [CloseButton](https://github.com/heroui-inc/heroui/blob/d814c204a92464ca02eb229c384a4a982d1ab398/packages/react/src/components/close-button/close-button.tsx)، [Drawer](https://github.com/heroui-inc/heroui/blob/d814c204a92464ca02eb229c384a4a982d1ab398/packages/react/src/components/drawer/drawer.tsx).

## الإصدارات والصيانة والاختبارات

- أحدث إصدار GitHub المنشور وقت الفحص هو [v3.2.6 بتاريخ 17 سبتمبر 2026](https://github.com/heroui-inc/heroui/releases/tag/v3.2.6)، ويتطابق مع `latest` على npm. ملاحظاته تتضمن تقليل إعادة الرسم في 43 مكوّنًا وإصلاحات focus rings وتحديث React Aria؛ هذه ادعاءات سجل الإصدار ولم نقسها مستقلاً.
- إعداد CI يتضمن build وlint وtypecheck، واختبارات متصفح بـPlaywright Chromium، واختبارات jsdom مع coverage. [QA workflow](https://github.com/heroui-inc/heroui/blob/d814c204a92464ca02eb229c384a4a982d1ab398/.github/workflows/QA.yaml).
- إحصاء شجرة `packages/react/tests` عند المرجع أعلاه أعطى **125 ملف اختبار، منها 12 ملف browser**؛ هذا عدد ملفات وليس عدد حالات ناجحة. حدود coverage المعلنة 80% للأسطر والعبارات، و56% للفروع، و83% للدوال؛ هي شروط إعداد وليست تقرير تغطية مقاسًا في هذه المراجعة. [مجلد الاختبارات](https://github.com/heroui-inc/heroui/tree/d814c204a92464ca02eb229c384a4a982d1ab398/packages/react/tests)، [Vitest config](https://github.com/heroui-inc/heroui/blob/d814c204a92464ca02eb229c384a4a982d1ab398/packages/react/vitest.config.ts).
- راجعت عينتي Modal وDrawer: اختبارات المتصفح تفحص حصر التركيز وقفل تمرير الصفحة وEscape واستعادة التركيز. [Modal browser test](https://github.com/heroui-inc/heroui/blob/d814c204a92464ca02eb229c384a4a982d1ab398/packages/react/tests/components/modal/modal.browser.test.tsx)، [Drawer browser test](https://github.com/heroui-inc/heroui/blob/d814c204a92464ca02eb229c384a4a982d1ab398/packages/react/tests/components/drawer/drawer.browser.test.tsx).
- عينة Actions الحديثة تضمنت أعمال تطوير جارية ومحاولات feature PR ألغيت أو فشلت؛ لا يصح تحويلها إلى ادعاء أن الإصدار المنشور يفشل، ولم نعتمدها كتقييم جودة مطلق. [Actions](https://github.com/heroui-inc/heroui/actions).

## مشكلات راهنة مهمة للعربية والهاتف

| الدليل | الحالة وقت الفحص | الاستنتاج المحدود |
|---|---|---|
| [#6945 — CloseButton English label](https://github.com/heroui-inc/heroui/issues/6945) | مفتوحة، تبلغ عن 3.2.6 | المصدر الحالي يثبت `aria-label="Close"` قبل نشر بقية الخصائص. يمكن تجاوزه عند الوصول للزر، لكن بلاغ Toast يذكر فقدان التوطين في زر التخطيط الافتراضي. لا تعني React Aria أن كل التسميات عربية تلقائيًا. |
| [#6967 — Drawer cancelled drag](https://github.com/heroui-inc/heroui/issues/6967) | مفتوحة، 3.2.6 | كود السحب المفحوص يعالج pointerdown/move/up دون pointercancel؛ شكوى القفز على اللمس تتسق مع القراءة. لم نعد إنتاجها على جهاز. |
| [#6956 — Dropdown phone width](https://github.com/heroui-inc/heroui/issues/6956) | مفتوحة، 3.2.6 | بلاغ قابل للمراجعة عن حد عرض القائمة على 390px؛ يحتاج فحصًا عند اتخاذ قرار لمشروعات الهاتف. لم نقس العرض مستقلًا. |
| [#6519 — rendering performance](https://github.com/heroui-inc/heroui/issues/6519) و[#6131 — mobile performance](https://github.com/heroui-inc/heroui/issues/6131) | مفتوحتان لكن تتعلقان بإصدارات أقدم | إشارتان لاختبار الأداء؛ لا يصح نسب نتائجهما آليًا لـ3.2.6 بعد إصلاحات إعادة الرسم. |
| [#6445 — RTL table/pagination](https://github.com/heroui-inc/heroui/issues/6445) | **مغلقة** منذ 31 يوليو 2026 | ليست عيبًا حاليًا مثبتًا. [v3.2.3](https://github.com/heroui-inc/heroui/releases/tag/v3.2.3) يسجل تحويل الخصائص إلى منطقية لدعم RTL. |

اختبار CloseButton نفسه يفحص الاسم الإنجليزي الافتراضي وإمكانية تجاوزه، ولا يقدم ضمانًا بأن جميع السياقات توطّنه. [الاختبار](https://github.com/heroui-inc/heroui/blob/d814c204a92464ca02eb229c384a4a982d1ab398/packages/react/tests/components/close-button/close-button.test.tsx).

## اتساق الترخيص

يوجد **تعارض metadata يجب تسجيله**: root LICENSE نص Apache 2.0، لكن root package.json وmanifest الحزمتين تقول MIT. استُرجعت حزم الإصدار `3.2.6` إلى مجلد مؤقت للقراءة فقط، وتبين أن كلًا من `@heroui/react` و`@heroui/styles` يشحن `package/LICENSE` بنص **Apache 2.0** أيضًا. حُذف المجلد المؤقت بعد الفحص. لا يثبت ذلك ترخيصًا مزدوجًا؛ عند تقييم إعادة التوزيع ينبغي تسجيل النص المرفق والتباين وطلب توضيح من المصدر عند الحاجة. لم تجرَ مراسلة المطورين.

المراجع: [LICENSE المصدر](https://github.com/heroui-inc/heroui/blob/d814c204a92464ca02eb229c384a4a982d1ab398/LICENSE)، [npm React 3.2.6 metadata](https://registry.npmjs.org/@heroui%2Freact/3.2.6)، [React tarball](https://registry.npmjs.org/@heroui/react/-/react-3.2.6.tgz)، [npm styles 3.2.6 metadata](https://registry.npmjs.org/@heroui%2Fstyles/3.2.6)، [styles tarball](https://registry.npmjs.org/@heroui/styles/-/styles-3.2.6.tgz).

## تنبيه عملي إلى خلط v2 وv3

README الحالي يذكر الحزم الفردية مثل `@heroui/button`. لكن npm `latest` لهذه الحزمة وقت الفحص هو `2.2.32`، ويطلب `@heroui/theme` و`@heroui/system` وFramer Motion وفق مسار v2. بالمقابل `@heroui/react@3.2.6` يقدم 89 export paths، ومنها `./button`. عند اعتماد v3، استخدم مساره الموثق الموافق للإصدار ولا تجمع تلقائيًا أمثلة الحزم القديمة مع v3. [README](https://github.com/heroui-inc/heroui/blob/d814c204a92464ca02eb229c384a4a982d1ab398/README.md)، [button metadata](https://registry.npmjs.org/@heroui%2Fbutton/latest)، [react metadata](https://registry.npmjs.org/@heroui%2Freact/3.2.6).

## حدود المراجعة

هذا فحص مصدر وإصدارات وتوثيق، لا مراجعة أمنية شاملة أو تجربة أداء/قارئات شاشة. لم نشغّل test suite أو نحصل على تغطية فعلية، ولم نقس الهاتف أو RTL تفاعليًا. لم تُعدّل حزم أطلس أو تنفيذ المكونات أو المعرض الحالي.
