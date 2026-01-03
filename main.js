const ideaTemplate = `# Title Here

## 📌 Basic Information
- **Name**:
---

## Problem Statement
__write the problem statement here__

---

## 💡 Idea Summary
__share your thoughts__`;

const displayThePath = (path) => {
  console.log(
    "Your idea is registered to modify the details refer file://./README.md",
  );
  console.log(
    `Add The problem statement and descriptin of idea at file://${path}`,
  );
  console.log("Thanks for Sharing 🤍");
};

export const createIdeaFile = async (path) => {
  await Deno.writeTextFile(path, ideaTemplate);
  displayThePath(path);
};

export const registerIdea = async ({ name, idea, path }) => {
  const field = `| ${idea} | ${name} | [View Idea](${path}) |\n`;
  await Deno.writeTextFile("./README.md", field, { append: true });
  await createIdeaFile(path);
};

export const collectData = () => {
  const name = prompt("Enter your name > ");
  const idea = prompt("Enter the title of the idea use Kebab-case > ");
  const empId = prompt("enter the employee id > ");
  return { name, idea, empId, path: `./ideas/${idea}-${empId}.md` };
};

const main = () => {
  const details = collectData();
  registerIdea(details);
};

main();
