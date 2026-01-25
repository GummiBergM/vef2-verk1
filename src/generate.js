import fs from "node:fs/promises";
import path from "node:path";

const MAX_QUESTIONS_PER_CATEGORY = 10000;

const css = "./styles.css";
const js = "./questions.js"

const categories = [
    ["1", "general_knowledge", "Almenn kunnátta"],
    ["2", "nature_and_science", "Náttúra og vísindi"],
    ["3", "books_and_arts", "Bókmenntir og listir"],
    ["4", "history", "Saga"],
    ["5", "geology", "Landafræði"],
    ["6", "entertainment_and_fun", "Skemmtun og afþreying"],
    ["7", "sports", "Íþróttir og tómstundir"]
];

function parseLine(line) {
    const split = line.split(",");

    const categoryNumber = split[0];
    const subNumber = split[1];
    const difficulty = split[2];
    const quality = split[3];
    const question = split[4];
    const answer = split[5];

    const q = {
        categoryNumber,
        subNumber,
        difficulty,
        quality,
        question,
        answer,
    };

    return q;
}

function generateMainHtml(title) {
    return `
<!doctype html>
<html lang="is">
  <head>
    <title>${title}</title>
    <link rel="stylesheet" href="${css}">
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  </head>
  
  <body>
    <div class="title">
      <h1>${title}</h1>
      <p><a href="./index.html">Til baka</a></p>
    </div>
  <main class="questions">`;
}

function generateEndHtml() {
    return `
    </main>
    <script src="${js}"></script>
  </body>
</html>
    `;
}

function toSubClass(subNumber) {
    const sub = (subNumber ?? "").trim();

    if (!sub) return "";

    return `sub-${sub
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\p{L}\p{N}_-]/gu, "")}`;
}

function generateSubButtons(qs) {
    const subs = Array.from(
        new Set(
            qs
                .map((q) => (q.subNumber ?? "").trim())
                .filter(Boolean),
        ),
    );

    if (subs.length === 0) return "";

    const buttons = subs
        .map((sub) => {
            const subClass = toSubClass(sub);
            return `<button class="subButton" type="button" data-sub="${subClass}">${sub}</button>`;
        })
        .join("\n");

    return `
    <nav class="subButtons">
${buttons}
    </nav>
    `;
}

function generateQuestionHtml(q) {
    const subClass = toSubClass(q.subNumber);

    const classes = ["question", subClass].filter(Boolean).join(" ");

    const html = `
    <section class="${classes}">
      <h3>${q.question}</h3>
      <p>${q.answer}</p>
    </section>`;

    return html;
}

async function main() {
    const distPath = "./dist";
    await fs.mkdir(distPath, { recursive: true });

    const content = await fs.readFile("./questions.csv", "utf-8");

    const lines = content.split("\n");

    const questions = lines.map(parseLine);

    for (const [catNumber, fileName, displayName] of categories) {
        const qs = questions
            .filter((q) => q.categoryNumber === catNumber)
            .slice(0, MAX_QUESTIONS_PER_CATEGORY);

        const output = qs.map(generateQuestionHtml).join("\n");
        const buttonsHtml = generateSubButtons(qs);

        const fullHtml = `${generateMainHtml(displayName)}\n${buttonsHtml}\n${output}\n${generateEndHtml()}`;

        await fs.writeFile(`./dist/${fileName}.html`, fullHtml, "utf-8");
    }

    const publicPath = "./public";

    const files = await fs.readdir(publicPath);

    for (const file of files) {
        await fs.copyFile(
            path.join(publicPath, file),
            path.join(distPath, file),
        );
    }
}

main().catch((error) => {
    console.error("error generating", error);
});
