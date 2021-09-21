import type { MDXProviderComponentsProp } from '@mdx-js/react';
import Image from 'next/image';

export const MDXComponents: MDXProviderComponentsProp = () => {
  img: (props) => {
    console.log('NextImage Props: ', props);
    return <Image {...props} layout="responsive" />;
  };
};
