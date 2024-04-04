import { exec } from "child_process";

export const executeUnsafeCommands = (command: string) => {
  return new Promise((resolve, _) => {
    exec(command, (error, stdout, stderr) => {
      resolve(stdout.trim());
    });
  });
};

export const executeCommand = (command: string) => {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error);
        return;
      }
      if (stderr) {
        reject(stderr);
        return;
      }
      resolve(stdout.trim());
    });
  });
};
