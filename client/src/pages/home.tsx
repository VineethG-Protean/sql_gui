import ServerMemory from "@/components/graphs/server-memory";
import ServerStatsCard from "@/components/cards/server-stats-card";
import ServerCpu from "@/components/graphs/server-cpu";

const Home = () => {
  return (
    <div className="p-6 flex gap-4 w-full">
      <div className="w-2/3 flex flex-col gap-4">
        <ServerMemory />
        <ServerCpu />
      </div>
      <div className="w-1/3">
        <ServerStatsCard />
      </div>
    </div>
  );
};

export default Home;
