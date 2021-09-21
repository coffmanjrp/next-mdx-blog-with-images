export interface PostData {
  id: string;
  body: {
    compiledSource: string;
    scope: string;
  };
  frontmatter: {
    name: string;
    description: string;
    category: string;
    updated: string;
  };
}
