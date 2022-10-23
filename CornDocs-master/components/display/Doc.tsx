import dynamic from "next/dynamic";
import { MDXProvider } from "@mdx-js/react";
import CodeBlock from "../markdown/code-block";
import { H2, H3, H4 } from "../markdown/heading";
import Breadcrumb from "../breadcrumb/breadcrumb";
import { useRouter } from "next/router";
import Loading from "../loading";
import ArticleNavigation from "../layout/docs/article/navigation";
import ArticleSidebar from "../layout/docs/article/sidebar";
import ArticleFooter from "../layout/docs/article/footer";
import corndocsConfig from "../../corndocs.config";
import { motion, AnimatePresence } from "framer-motion";

const DynamicDocument = (c: any) =>
  dynamic(() => import(`../../_posts/${c}.mdx`), {
    ssr: false,
    loading: Loading,
  });

interface DocProps {
  data: {
    custom: {
      path: string;
      headings: string[];
      slug: string;
      data: {
        description: string;
        title: string;
        banner: string;
      };
    };
  };
}

const components = {
  h2: H2,
  h3: H3,
  h4: H4,
  pre: CodeBlock,
};

const variants = {
  hidden: { opacity: 0, y: 12 },
  enter: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
};

const DisplayDoc = ({ data }: DocProps) => {
  const { custom } = data;

  const DocumentContent = DynamicDocument(custom.path);
  const router = useRouter();

  return (
    <AnimatePresence>
      <motion.div
        variants={variants} // Pass the variant object into Framer Motion
        initial="hidden" // Set the initial state to variants.hidden
        animate="enter" // Animated state to variants.enter
        exit="exit" // Exit state (used later) to variants.exit
        transition={{ type: "spring" }} // Set the transition to linear
        className="pl-2"
      >
        <main className="dark:bg-slate-900">
          <div className="container mx-auto py-6">
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-12">
                <div className="grid grid-cols-12 lg:gap-16 xl:gap-8">
                  <div className="col-span-12 lg:col-span-9">
                    <Breadcrumb data={router.query.slug} />
                    <article className="prose prose-slate w-full max-w-none dark:prose-invert">
                      {/* @ts-ignore */}
                      <MDXProvider components={components}>
                        <DocumentContent />
                      </MDXProvider>
                    </article>
                    <ArticleNavigation />
                  </div>
                  {custom.headings.length > 0 && (
                    <ArticleSidebar data={custom.headings} />
                  )}
                </div>
              </div>
            </div>
          </div>
          <ArticleFooter>
            {corndocsConfig.project.github.repo ? (
              <a
                target="_blank"
                href={`${corndocsConfig.project.github.repo}/edit/${
                  corndocsConfig.project.github.usesMain ? "main" : "master"
                }/_posts/${custom.path}.mdx`}
              >
                Edit on GitHub
              </a>
            ) : null}
          </ArticleFooter>
        </main>
      </motion.div>
    </AnimatePresence>
  );
};

export default DisplayDoc;
