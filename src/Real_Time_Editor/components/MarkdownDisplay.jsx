import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const MarkdownDisplay = ({ content, setEdit }) => {
  return (
    <>
    <div className='prose text-[#000000] prose-headings:text-black bg-white p-6 rounded-3xl overflow-y-scroll max-h-[22rem]'>
    <ReactMarkdown 
      children={content} 
      remarkPlugins={[remarkGfm]} 
    />
    </div>
    <button 
    className=''
    onClick={() => setEdit((prevState) => !prevState)}>Edit</button>
    </>
    
  );
};

export default MarkdownDisplay;


// ### Step 4: Run Your Application

// Make sure to run your application, and you should see the Markdown content rendered as HTML in your React component.

// ### Additional Options

// - **Syntax Highlighting**: If you want to add syntax highlighting for code blocks, you can use additional libraries like  `react-syntax-highlighter`  along with  `react-markdown` . You would need to specify a renderer for code blocks.
  
// - **Custom Renderers**: You can customize how specific Markdown elements are rendered by providing a custom renderer to  `react-markdown` .

// ### Example with Syntax Highlighting

// Here’s a quick example of how to integrate syntax highlighting:

// 1. Install  `react-syntax-highlighter` :
// npm install react-syntax-highlighter
// 2. Update your  `MarkdownDisplay`  component:
// import React from 'react';
//    import ReactMarkdown from 'react-markdown';
//    import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
//    import { solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism';

//    const MarkdownDisplay = ({ markdown }) => {
//      const renderers = {
//        code: ({ language, value }) => {
//          return (
//            <SyntaxHighlighter style={solarizedlight} language={language}>
//              {value}
//            </SyntaxHighlighter>
//          );
//        },
//      };

//      return (
//        <div>
//          <ReactMarkdown components={renderers}>{markdown}</ReactMarkdown>
//        </div>
//      );
//    };

//    export default MarkdownDisplay;
// Now you have a fully functional Markdown display component in a React application!