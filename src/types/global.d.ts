declare module '*.css' {
  const content: { [className: string]: string }
  export default content
}
declare namespace JSX{
  interface IntrinsicElements{
    "w3m-button": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
  }
}

