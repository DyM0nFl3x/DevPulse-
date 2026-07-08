import chalk from "chalk";
import boxen from "boxen";

type StyleConsoleProps = {
  server: boolean;
  database: boolean;
  port: number;
  title?: string;
  titleColor?:
    | "green"
    | "red"
    | "cyan"
    | "blue"
    | "yellow"
    | "magenta"
    | "white";
};

export default function styleConsole({
  server,
  database,
  port,
  title = "DevPulse Backend",
  titleColor = "cyan",
}: StyleConsoleProps) {
  const coloredTitle = chalk[titleColor].bold(title);

  console.log(
    boxen(
      `
${coloredTitle}

🌍 Server      : ${server ? chalk.green("Running ✅") : chalk.red("Stopped ❌")}
🗄️ Database    : ${database ? chalk.green("Connected ✅") : chalk.red("Failed ❌")}
🔌 Port        : ${chalk.yellow(port)}
⏰ Started     : ${chalk.white(new Date().toLocaleString())}
`,
      {
        title: " DevPulse ",
        titleAlignment: "center",
        padding: 1,
        margin: 1,
        borderStyle: "double",
        borderColor: "cyan",
      }
    )
  );
}