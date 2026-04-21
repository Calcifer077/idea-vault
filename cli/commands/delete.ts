import { Command } from "commander";
import inquirer from "inquirer";
import chalk from "chalk";
import { loadIdeas, saveIdeas } from "../lib/store";

export const deleteCommand = new Command("delete")
  .description("Delete an idea by ID")
  .option("-i, --id <id>", "ID of the idea to delete")
  .action(async (opts: { id: string }) => {
    try {
      const answers = await inquirer.prompt([
        {
          type: "input",
          name: "id",
          message: "ID of the idea to delete:",
          when: !opts.id,
          validate: (v) => v.trim() !== "" || "ID is required",
        },
      ]);

      console.log(chalk.dim("Fetching ideas from GitHub..."));

      const { ideas, sha } = await loadIdeas();

      if (ideas.length === 0) {
        console.log(chalk.yellow("No ideas found."));
        return;
      }

      const idToDelete = answers.id.trim();

      const idea = ideas.find((idea) => idea.id === idToDelete);

      if (!idea) {
        console.log(chalk.red("Idea not found."));
        return;
      }

      console.log(chalk.dim(`Deleting idea with ID: ${idToDelete}...`));

      const newIdeas = ideas.filter((idea) => idea.id !== idToDelete);

      console.log(chalk.dim("Saving updated ideas to GitHub..."));
      await saveIdeas(newIdeas, sha, `Deleted idea with ID: ${idToDelete}`);

      console.log(chalk.green("Idea deleted successfully!"));
    } catch (error) {
      console.error(
        chalk.red("Error:"),
        error instanceof Error ? error.message : String(error),
      );
      process.exit(1);
    }
  });
