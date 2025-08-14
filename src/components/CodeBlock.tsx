import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

type Props = {
  language: string;
  code: string;
};

const CodeBlock: React.FC<Props> = ({ language, code }) => {
  return (
    <div className="rounded-md overflow-hidden bg-[#282c34] text-sm">
      <SyntaxHighlighter language={language} style={oneDark} wrapLines>
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeBlock;
