// Builds the AI policy template as a .docx from its Markdown (build spec §3): Arial, the policy title
// as the document title, headings, lists and tables kept as real Word tables.
import {
  AlignmentType,
  BorderStyle,
  Document,
  HeadingLevel,
  Packer,
  Paragraph,
  ShadingType,
  Table,
  TableCell,
  TableRow,
  TextRun,
  WidthType,
} from "docx";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import type { Root, RootContent, PhrasingContent, List, Table as MdTable } from "mdast";

const FONT = "Arial";
const INK = "16181A";
const LINE = "E4E1DA";
const BAND = "F4F2ED";

// Inline Markdown to text runs. Soft line breaks in the source become line breaks, as on the page.
function runs(nodes: PhrasingContent[], bold = false, italics = false): TextRun[] {
  return nodes.flatMap((n): TextRun[] => {
    switch (n.type) {
      case "text":
        return n.value.split("\n").map((part, i) => new TextRun({ text: part, bold, italics, break: i ? 1 : 0 }));
      case "strong":
        return runs(n.children, true, italics);
      case "emphasis":
        return runs(n.children, bold, true);
      case "link":
        return runs(n.children, bold, italics);
      case "inlineCode":
        return [new TextRun({ text: n.value, bold, italics })];
      case "break":
        return [new TextRun({ text: "", break: 1 })];
      default:
        return [];
    }
  });
}

function list(node: List, level = 0): Paragraph[] {
  return node.children.flatMap((item, index) =>
    item.children.flatMap((child): Paragraph[] => {
      if (child.type === "paragraph") {
        const numbering = node.ordered
          ? { reference: "policy-numbers", level, instance: 0 }
          : undefined;
        return [
          new Paragraph({
            children: runs(child.children),
            ...(node.ordered ? { numbering } : { bullet: { level } }),
            spacing: { after: 80 },
          }),
        ];
      }
      if (child.type === "list") return list(child, level + 1);
      return [];
    }),
  );
}

const border = { style: BorderStyle.SINGLE, size: 4, color: LINE };
const borders = { top: border, bottom: border, left: border, right: border, insideHorizontal: border, insideVertical: border };

function table(node: MdTable): Table {
  const columns = node.children[0]?.children.length ?? 1;
  const width = Math.floor(9000 / columns);
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    columnWidths: Array(columns).fill(width),
    borders,
    rows: node.children.map(
      (row, r) =>
        new TableRow({
          tableHeader: r === 0,
          children: row.children.map(
            (cell) =>
              new TableCell({
                width: { size: width, type: WidthType.DXA },
                shading: r === 0 ? { type: ShadingType.CLEAR, color: "auto", fill: BAND } : undefined,
                margins: { top: 80, bottom: 80, left: 100, right: 100 },
                children: [new Paragraph({ children: runs(cell.children, r === 0) })],
              }),
          ),
        }),
    ),
  });
}

function block(node: RootContent): (Paragraph | Table)[] {
  switch (node.type) {
    case "heading": {
      const level = node.depth === 1 ? HeadingLevel.TITLE : node.depth === 2 ? HeadingLevel.HEADING_1 : HeadingLevel.HEADING_2;
      return [new Paragraph({ heading: level, children: runs(node.children) })];
    }
    case "paragraph":
      return [new Paragraph({ children: runs(node.children), spacing: { after: 160 } })];
    case "list":
      return list(node);
    case "table":
      return [table(node), new Paragraph({ children: [] })];
    default:
      return [];
  }
}

export async function policyDocx(markdown: string): Promise<Uint8Array> {
  const tree = unified().use(remarkParse).use(remarkGfm).parse(markdown) as Root;
  const doc = new Document({
    title: "[Business name] AI use policy",
    creator: "Incubate Labs",
    description: "AI use policy template for small businesses, from incubatelabs.ai",
    styles: {
      default: {
        document: { run: { font: FONT, size: 22, color: INK }, paragraph: { spacing: { line: 288 } } },
        title: { run: { font: FONT, size: 40, bold: true, color: INK }, paragraph: { spacing: { after: 240 } } },
        heading1: { run: { font: FONT, size: 28, bold: true, color: INK }, paragraph: { spacing: { before: 320, after: 120 } } },
        heading2: { run: { font: FONT, size: 24, bold: true, color: INK }, paragraph: { spacing: { before: 240, after: 120 } } },
      },
    },
    numbering: {
      config: [
        {
          reference: "policy-numbers",
          levels: [{ level: 0, format: "decimal", text: "%1.", alignment: AlignmentType.START }],
        },
      ],
    },
    sections: [{ properties: {}, children: tree.children.flatMap(block) }],
  });
  return new Uint8Array(await Packer.toBuffer(doc));
}
