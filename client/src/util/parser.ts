interface Token {
  type: string;
  level?: number;
  value: string;
}

export class Parser {
  private tokens: Token[];
  private current: number;

  constructor(tokens:Token[]) {
    this.tokens = tokens;
    this.current = 0;
  }

  parse() {
    const nodes = [];
    while (this.current < this.tokens.length) {
      const node = this.element();
      if (node) {
        nodes.push(node);
      }
    }
    return { type: 'Document', children: nodes };
  }
  element() {
    const element = this.tokens[this.current];
    switch (element.type) {
      case 'HEADER':
        return this.parseHeader();
    }
    return null;
  }
  parseHeader() {
    const currentToken = this.tokens[this.current];
    this.current += 1;
    return { ...currentToken };
  }
}


export function render(node) {
  if (node.type === 'Document') {
    return node.children.map(render).join('');
  }

  if (node.type === 'HEADER') {
    return `<h${node.level}>${node.value}</h${node.level}>`;
  }

  return '';
}

export function tokenize(input:string) {
  const regex = /(?:\*\*.*?\*\*|__.*?__|\*.*?\*|_.*?_|\n|(?:#+)(?=\s)|[-*] |.)/;
  const match = regex.exec(input);
  if (match !== null) {
    const value = match[0];
    const fullMatch = match.input.split(`${value}`);
    return {
      ...detectTokenType(value.trim()),
      value: fullMatch[fullMatch.length - 1],
    };
  }
}

function detectTokenType(value:string) {
  if (/^#{1,6}\s?$/.test(value)) {
    const match = value.match(/^#+/);
    const level = match ? match[0].length : 0;
    return { type: 'HEADER', level };
  }
}


export function* lineGenerator(text:string) {
  let start = 0;
  let end;
  while ((end = text.indexOf('\n', start)) !== -1) {
    yield text.slice(start, end);
    start = end + 1;
  }
}