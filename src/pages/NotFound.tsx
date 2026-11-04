import { Button } from "../components/Button.tsx";
import { Seo } from "../components/Seo.tsx";
import { useI18n } from "../i18n/LanguageContext.tsx";

export default function NotFoundPage() {
  const { t } = useI18n();
  return (
    <>
      <Seo title={t.meta.notFoundTitle} description={t.meta.notFoundDesc} path="/404" />
      <div className="mx-auto max-w-xl px-4 py-20 text-center sm:px-6">
        <h1 className="font-heading text-4xl leading-[1.6] text-navy">{t.notFound.title}</h1>
        <p className="mt-3 text-lg leading-relaxed">{t.notFound.lead}</p>
        <Button to="/" className="mt-6">
          {t.common.backHome}
        </Button>
      </div>
    </>
  );
}
