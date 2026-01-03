const displayThePath = (path) => {
  console.log(
    `Your idea is registered, to modify the details refer file://${Deno.cwd()}/README.md`,
  );
  console.log(
    `Add The problem statement and descriptin of idea at file://${Deno.cwd()}/${path}`,
  );
  console.log("Thanks for Sharing 🤍");
};

const getTemplate = (name, idea) => {
  return `# ${idea}
### 📌 Basic Information
- **Name**: ${name}
- **GitHub repo**: nil (modify if exists).
---
### Problem Statement
__write the problem statement here__
---
### 💡 Idea Summary
_share your thoughts here_`;
};

export const createIdeaFile = async ({ path, name, idea }) => {
  const template = getTemplate(name, idea);
  await Deno.writeTextFile(path, template);
  displayThePath(path);
};

export const registerIdea = async (details) => {
  const { name, idea, path } = details;
  const field = `| ${idea} | ${name} | [View Idea](./${path}) |\n`;
  await Deno.writeTextFile("./README.md", field, { append: true });
  await createIdeaFile(details);
};

export const collectData = () => {
  const name = prompt("Enter your name > ");
  const idea = prompt("Enter the title of the idea use Kebab-case > ") ||
    "idea";
  const empId = prompt("enter the employee id > ");
  return { name, idea, empId, path: `ideas/${idea}-${empId}.md` };
};

const main = () => {
  const details = collectData();
  registerIdea(details);
};

main();
