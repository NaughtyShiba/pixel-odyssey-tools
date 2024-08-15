import type { ReactNode } from "react";

interface PageArticleProps {
	children: ReactNode;
}
function PageArticle({ children }: PageArticleProps) {
	return <article className="w-full flex flex-col gap-4">{children}</article>;
}

interface PageTitleProps {
	children: ReactNode;
}
function PageTitle({ children }: PageTitleProps) {
	return <h1 className="text-3xl">{children}</h1>;
}

interface PageSubTitleProps {
	children: ReactNode;
}
function PageSubTitle({ children }: PageSubTitleProps) {
	return <h1 className="text-xl">{children}</h1>;
}

interface PageContentProps {
	children: ReactNode;
}
function PageContent({ children }: PageContentProps) {
	return <div className="flex flex-col gap-16">{children}</div>;
}

export { PageArticle, PageTitle, PageSubTitle, PageContent };
