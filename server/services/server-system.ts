import os from "os";

export const serverUtilization = () => {
  let CPU_USAGE = os.loadavg()[0];
  const CURRENT_TIME = new Date().toISOString();
  const TOTAL_MEMORY = os.totalmem();
  const FREE_MEMORY = os.freemem();
  const MEMORY_USAGE = ((TOTAL_MEMORY - FREE_MEMORY) / TOTAL_MEMORY) * 100;
  const SECONDS = new Date(CURRENT_TIME).getSeconds();
  return {
    CURRENT_TIME,
    CPU_USAGE,
    TOTAL_MEMORY,
    FREE_MEMORY,
    MEMORY_USAGE,
    SECONDS,
  };
};
