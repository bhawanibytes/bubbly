import Image from "next/image";
export default function KeyFeatures() {
  return (
    <div className="flex max-w-240 flex-col gap-10 px-4 py-10">
      <div className="key flex flex-col gap-4">
        <h1 className="text-4xl leading-tight font-black tracking-[-0.033em]">
          Key Features
        </h1>
        <p className="max-w-180 text-base leading-normal font-normal">
          Explore the powerful features that make ChatApp the preferred choice
          for seamless communication.
        </p>
      </div>
      <div className="box grid grid-cols-3 gap-3">
        <div className="card flex min-h-39 flex-col gap-3 rounded-lg border border-[#dbdbdb] p-4">
          <div className="box-border flex max-h-6 max-w-6 items-center justify-center">
            <Image src="./shield_icon.svg" alt="" width={24} height={24} />
          </div>

          <div className="flex flex-col gap-1">
            <h2 className="text-base font-bold">Secure Messaging</h2>
            <p className="text-sm font-normal text-neutral-500">
              End-to-end encryption ensures your messages remain private and
              secure.
            </p>
          </div>
        </div>
        <div className="card flex min-h-39 flex-col gap-3 rounded-lg border border-[#dbdbdb] p-4">
          <div className="box-border flex min-h-6 max-w-6 items-center justify-center">
            <Image src="./group.svg" alt="" width={24} height={24} />
          </div>
          <div className="flex flex-col gap-1">
            <h2 className="text-base font-bold">Group Chats</h2>
            <p className="text-sm font-normal text-neutral-500">
              Create and manage group chats with up to 1000 members for easy
              collaboration.
            </p>
          </div>
        </div>
        <div className="card flex min-h-39 flex-col gap-3 rounded-lg border border-[#dbdbdb] p-4">
          <div className="box-border flex max-h-6 max-w-6 items-center justify-center">
            <Image src="./clock.svg" alt="" width={24} height={24} />
          </div>
          <div className="flex flex-col gap-1">
            <h2 className="text-base font-bold">Real-Time Updates</h2>
            <p className="text-sm font-normal text-neutral-500">
              Receive instant notifications and updates for all your messages
              and activities.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
