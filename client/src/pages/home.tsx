import ServerMemory from "@/components/graphs/server-memory";

const Home = () => {
  return (
    <div className="p-6 w-full h-full flex gap-4">
      <div className="w-3/4">
        <ServerMemory />
      </div>
    </div>
  );
};

export default Home;
