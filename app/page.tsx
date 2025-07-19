import Posts from "@/components/Posts";
import SmileOutlined from "@ant-design/icons/SmileOutlined";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen pb-20 gap-10">
      <header className="w-full min-h-[4rem] bg-white shadow-md px-6 py-4 flex items-center justify-between">
        <div className="flex items-center pt-7 gap-2 justify-center">
          <SmileOutlined />
          <span>DummyJson</span>
        </div>
      </header>
      <main className="p-8 flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Posts />
      </main>
    </div>
  );
}
