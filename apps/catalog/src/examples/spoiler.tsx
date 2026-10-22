import { Spoiler, Text } from '@atlas/ui';

export default function Example() {
  return (
    <Spoiler maxHeight={62} showLabel="اقرأ المزيد" hideLabel="عرض أقل"><Text size="sm">هذه مكتبة منتقاة من مكونات جاهزة ومفتوحة المصدر. الهدف أن تختار ما تحتاجه، وتقرأ شيفرته ومصدره، وتبدأ العمل بسرعة. جميع مكونات الواجهة تأتي من مكتباتها الأصلية. المعرض يجمعها في مساحة متناسقة، ويوثق متطلبات الإعداد والتراخيص وحدود الاستخدام.</Text></Spoiler>
  );
}
