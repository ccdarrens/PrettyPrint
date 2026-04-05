function getXmlDeclaration(input: string): string | null {
  const match = input.trim().match(/^<\?xml[\s\S]*?\?>/i);
  return match ? match[0] : null;
}

function formatNode(node: Node, depth: number): string[] {
  const indent = '  '.repeat(depth);

  switch (node.nodeType) {
    case Node.ELEMENT_NODE: {
      const element = node as Element;
      const tagName = element.tagName;
      const attributes = Array.from(element.attributes)
        .map((attribute) => `${attribute.name}="${attribute.value}"`)
        .join(' ');
      const openTag = attributes ? `<${tagName} ${attributes}>` : `<${tagName}>`;
      const closeTag = `</${tagName}>`;
      const childNodes = Array.from(element.childNodes).filter((child) => {
        if (child.nodeType !== Node.TEXT_NODE) {
          return true;
        }

        return child.textContent?.trim().length;
      });

      if (childNodes.length === 0) {
        return [`${indent}${attributes ? `<${tagName} ${attributes} />` : `<${tagName} />`}`];
      }

      if (childNodes.length === 1 && childNodes[0]?.nodeType === Node.TEXT_NODE) {
        return [`${indent}${openTag}${childNodes[0].textContent?.trim() ?? ''}${closeTag}`];
      }

      return [
        `${indent}${openTag}`,
        ...childNodes.flatMap((child) => formatNode(child, depth + 1)),
        `${indent}${closeTag}`,
      ];
    }
    case Node.TEXT_NODE:
      return node.textContent?.trim() ? [`${indent}${node.textContent.trim()}`] : [];
    case Node.CDATA_SECTION_NODE:
      return [`${indent}<![CDATA[${node.textContent ?? ''}]]>`];
    case Node.COMMENT_NODE:
      return [`${indent}<!--${node.textContent ?? ''}-->`];
    case Node.PROCESSING_INSTRUCTION_NODE: {
      const processingInstruction = node as ProcessingInstruction;
      const data = processingInstruction.data ? ` ${processingInstruction.data}` : '';
      return [`${indent}<?${processingInstruction.target}${data}?>`];
    }
    default:
      return [];
  }
}

export function prettyXml(documentNode: Document, input: string): string {
  const lines: string[] = [];
  const declaration = getXmlDeclaration(input);

  if (declaration) {
    lines.push(declaration);
  }

  if (documentNode.doctype) {
    const publicId = documentNode.doctype.publicId ? ` PUBLIC "${documentNode.doctype.publicId}"` : '';
    const systemId = documentNode.doctype.systemId ? ` "${documentNode.doctype.systemId}"` : '';
    lines.push(`<!DOCTYPE ${documentNode.doctype.name}${publicId}${systemId}>`);
  }

  lines.push(...formatNode(documentNode.documentElement, 0));

  return lines.join('\n');
}
