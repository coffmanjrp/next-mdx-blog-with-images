import { FC } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { MDXRemote } from 'next-mdx-remote';
import { MDXComponents } from '../../components/mdx';
import { getPostById, getPostIds } from '../../lib/post';
import { PostData } from '../../lib/types';

export interface BlogPostProps extends PostData {}

const BlogPost: FC<BlogPostProps> = ({ frontmatter, body }) => {
  return (
    <div style={{ display: 'flex' }}>
      <div style={{ margin: '0 auto', flexGrow: 1, maxWidth: 750 }}>
        <h1>{frontmatter.name}</h1>
        <small>{frontmatter.updated}</small>
        <div style={{ marginTop: '50px' }}>
          <MDXRemote {...body} components={MDXComponents} />
          test
        </div>
      </div>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const ids = await getPostIds();

  return {
    paths: ids.map((id) => ({ params: { id } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (props) => {
  const file = await getPostById(props.params.id as string);

  return { props: file };
};

export default BlogPost;
