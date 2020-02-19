import React from 'react';
import components from '@theme/MDXComponents';

export function Code({ children, language }) {
  return code(language, children);
}

export function code(language, children) {
  return (
    <components.pre>
      <components.code
        children={children}
        className={`language-${language}`}
        mdxType="code"
        originalType="code"
        parentName="pre"
      />
    </components.pre>
  );
}