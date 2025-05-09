import BlogData from "@/components/Blog/blogData";
import Categories from "@/components/Blog/Categories";
import PostHeader from "@/components/Blog/PostHeader";
import RelatedPost from "@/components/Blog/RelatedPost";
import SearchPost from "@/components/Blog/SearchPost";
import { BlogPostMetadata } from "@/types/blogPostMetadata";
import { notFound } from "next/navigation";
import { FC } from "react";

const loadPost = async (
  slug: string,
): Promise<{ default: BlogPostMetadata, Post: FC } | null> => {
  try {
    return await import(`@/posts/${slug}.tsx`);
  } catch {
    return null;
  }
};

export function generateStaticParams() {
  return BlogData.map((post) => ({
    slug: post.slug,
  }));
}

const BlogPostPage = async ({ params }) => {
  const { slug } = await params;
  const post = await loadPost(slug);
  if (!post) notFound();
  const metadata = post.default;
  const Component = post.Post;

  return (
    <>
      <section className="pb-20 pt-35 lg:pb-25 lg:pt-45 xl:pb-30 xl:pt-50">
        <div className="mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0">
          <div className="flex flex-col-reverse gap-7.5 lg:flex-row xl:gap-12.5 justify-center">
            {/* <div className="md:w-1/2 lg:w-[32%]">
              <SearchPost />
              <Categories />
              <RelatedPost />
            </div> */}

            <div className="lg:w-2/3">
              <div className="animate_top rounded-md border border-stroke bg-white p-7.5 shadow-solid-13 dark:border-strokedark dark:bg-blacksection md:p-10">
                <PostHeader post={metadata} />
                <div className="blog-details">
                  {/* <MarkdownPost slug={slug} /> */}
                  <Component />
                </div>

                {/* <SharePost /> */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogPostPage;
