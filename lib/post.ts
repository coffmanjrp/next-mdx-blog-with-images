import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import { serialize } from 'next-mdx-remote/serialize';
import { promisify } from 'util';
import { MDXComponents } from '../components/mdx';
import imageMetadata from '../plugins/image-metadata';
import { PostData } from './types';

export async function getPostById(id: string): Promise<PostData> {
  const allFiles = fs.readdirSync(path.join(process.cwd(), 'posts'));
  const file = allFiles
    .filter((file) => /\.mdx$/.test(file))
    .find((fileName) => fileName.replace(/\.mdx$/, '') === id);

  if (!file) return undefined;

  const data = (
    await promisify(fs.readFile)(path.join(process.cwd(), 'posts', `${id}.mdx`))
  ).toString();

  const { content, data: metadata } = matter(data);
  const mdxBody = await serialize(content, {
    components: MDXComponents,
    scope: metadata,

    mdxOptions: {
      rehypePlugins: [imageMetadata],
    },
  });

  return {
    id,
    frontmatter: metadata as PostData['frontmatter'],
    body: mdxBody,
  };
}

export async function getPostIds(): Promise<string[]> {
  const allFiles = fs.readdirSync(path.join(process.cwd(), 'posts'));
  return allFiles
    .filter((file) => /\.mdx$/.test(file))
    .map((file) => file.replace(/\.mdx$/, ''));
}
