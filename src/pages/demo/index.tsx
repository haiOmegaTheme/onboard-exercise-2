export default function DemoPage() {
  return (
    <div className="flex flex-col h-dvh bg-secondary">
      <div className="flex items-center justify-between py-2 px-5 bg-black h-[40px]"></div>
      <div className="overflow-y-scroll flex-1 mt-7">
        <div className="flex flex-col items-center">
          <div className="font-bold text-xl">Choose your plan</div>
          <div className="mt-2.5">
            Only pay for Visor users that need to edit.
          </div>
        </div>
      </div>
    </div>
  );
}
