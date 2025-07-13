export default function Stitch() {
  return (
    <html>
      <head>
        {/* <link rel="preconnect" href="https://fonts.gstatic.com/" crossorigin="" /> */}
        {/* <link
      rel="stylesheet"
      as="style"
      onload="this.rel='stylesheet'"
      href="https://fonts.googleapis.com/css2?display=swap&amp;family=Noto+Sans%3Awght%40400%3B500%3B700%3B900&amp;family=Plus+Jakarta+Sans%3Awght%40400%3B500%3B700%3B800"
    /> */}

        <title>Stitch Design</title>
        <link rel="icon" type="image/x-icon" href="data:image/x-icon;base64," />

        {/* <script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script> */}
      </head>
      <body>
        <div
          className="group/design-root relative flex size-full min-h-screen flex-col overflow-x-hidden bg-white"
          // style='font-family: "Plus Jakarta Sans", "Noto Sans", sans-serif;'
        >
          <div className="layout-container flex h-full grow flex-col">
            <header className="flex items-center justify-between border-b border-solid border-b-[#f2f2f2] px-10 py-3 whitespace-nowrap">
              <div className="flex items-center gap-4 text-[#141414]">
                <div className="size-4">
                  {/* <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M39.475 21.6262C40.358 21.4363 40.6863 21.5589 40.7581 21.5934C40.7876 21.655 40.8547 21.857 40.8082 22.3336C40.7408 23.0255 40.4502 24.0046 39.8572 25.2301C38.6799 27.6631 36.5085 30.6631 33.5858 33.5858C30.6631 36.5085 27.6632 38.6799 25.2301 39.8572C24.0046 40.4502 23.0255 40.7407 22.3336 40.8082C21.8571 40.8547 21.6551 40.7875 21.5934 40.7581C21.5589 40.6863 21.4363 40.358 21.6262 39.475C21.8562 38.4054 22.4689 36.9657 23.5038 35.2817C24.7575 33.2417 26.5497 30.9744 28.7621 28.762C30.9744 26.5497 33.2417 24.7574 35.2817 23.5037C36.9657 22.4689 38.4054 21.8562 39.475 21.6262ZM4.41189 29.2403L18.7597 43.5881C19.8813 44.7097 21.4027 44.9179 22.7217 44.7893C24.0585 44.659 25.5148 44.1631 26.9723 43.4579C29.9052 42.0387 33.2618 39.5667 36.4142 36.4142C39.5667 33.2618 42.0387 29.9052 43.4579 26.9723C44.1631 25.5148 44.659 24.0585 44.7893 22.7217C44.9179 21.4027 44.7097 19.8813 43.5881 18.7597L29.2403 4.41187C27.8527 3.02428 25.8765 3.02573 24.2861 3.36776C22.6081 3.72863 20.7334 4.58419 18.8396 5.74801C16.4978 7.18716 13.9881 9.18353 11.5858 11.5858C9.18354 13.988 7.18717 16.4978 5.74802 18.8396C4.58421 20.7334 3.72865 22.6081 3.36778 24.2861C3.02574 25.8765 3.02429 27.8527 4.41189 29.2403Z"
                  fill="currentColor"
                ></path>
              </svg> */}
                </div>
                <h2 className="text-lg leading-tight font-bold tracking-[-0.015em] text-[#141414]">
                  ChatApp
                </h2>
              </div>
              <div className="flex flex-1 justify-end gap-8">
                <div className="flex items-center gap-9">
                  <a
                    className="text-sm leading-normal font-medium text-[#141414]"
                    href="#"
                  >
                    Product
                  </a>
                  <a
                    className="text-sm leading-normal font-medium text-[#141414]"
                    href="#"
                  >
                    Features
                  </a>
                  <a
                    className="text-sm leading-normal font-medium text-[#141414]"
                    href="#"
                  >
                    Pricing
                  </a>
                </div>
                <div className="flex gap-2">
                  <button className="flex h-10 max-w-[480px] min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-full bg-black px-4 text-sm leading-normal font-bold tracking-[0.015em] text-white">
                    <span className="truncate">Sign Up</span>
                  </button>
                  <button className="flex h-10 max-w-[480px] min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-full bg-[#f2f2f2] px-4 text-sm leading-normal font-bold tracking-[0.015em] text-[#141414]">
                    <span className="truncate">Log In</span>
                  </button>
                </div>
              </div>
            </header>
            <div className="flex flex-1 justify-center px-40 py-5">
              <div className="layout-content-container flex max-w-[960px] flex-1 flex-col">
                <div className="@container">
                  <div className="@[480px]:p-4">
                    <div
                      className="flex min-h-[480px] flex-col items-start justify-end gap-6 bg-cover bg-center bg-no-repeat px-4 pb-10 @[480px]:gap-8 @[480px]:rounded-xl @[480px]:px-10"
                      // style='background-image: linear-gradient(rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.4) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuAmIOrU-F58c6w1KzlQBn2YMtMYu2iMk0scnOZbQkdzaYfOlcxVIa4iYSqxs-RU0FJdgRtHi5wgRJzfKD190YNcyL0Bse0GKqZAeY7JYBHWWa2Vi-ceOMBNmB197kCCBN5mslwjZPhu4z5AL2qNwwKPIDhe_K3yXhkaTSSoZ32roc1yAGZIzT8Znf42IXB-uWNQ05CHgG_EdbY5-6MS7jYo_roDVSMbwJCHNWE5Jhini6xdIszyhLJhIIDvUqC3Ys6H6aifJ6qBFiBo");'
                    >
                      <div className="flex flex-col gap-2 text-left">
                        <h1 className="text-4xl leading-tight font-black tracking-[-0.033em] text-white @[480px]:text-5xl @[480px]:leading-tight @[480px]:font-black @[480px]:tracking-[-0.033em]">
                          Connect Instantly, Communicate Seamlessly
                        </h1>
                        <h2 className="text-sm leading-normal font-normal text-white @[480px]:text-base @[480px]:leading-normal @[480px]:font-normal">
                          Experience real-time messaging with ChatApp. Our
                          platform offers secure, reliable, and feature-rich
                          communication tools for individuals and teams. Stay
                          connected with friends, family, and colleagues
                          effortlessly.
                        </h2>
                      </div>
                      <button className="flex h-10 max-w-[480px] min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-full bg-black px-4 text-sm leading-normal font-bold tracking-[0.015em] text-white @[480px]:h-12 @[480px]:px-5 @[480px]:text-base @[480px]:leading-normal @[480px]:font-bold @[480px]:tracking-[0.015em]">
                        <span className="truncate">Get Started</span>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="@container flex flex-col gap-10 px-4 py-10">
                  <div className="flex flex-col gap-4">
                    <h1 className="tracking-light max-w-[720px] text-[32px] leading-tight font-bold text-[#141414] @[480px]:text-4xl @[480px]:leading-tight @[480px]:font-black @[480px]:tracking-[-0.033em]">
                      Key Features
                    </h1>
                    <p className="max-w-[720px] text-base leading-normal font-normal text-[#141414]">
                      Explore the powerful features that make ChatApp the
                      preferred choice for seamless communication.
                    </p>
                  </div>
                  <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-0">
                    <div className="flex flex-1 flex-col gap-3 rounded-lg border border-[#e0e0e0] bg-white p-4">
                      <div
                        className="text-[#141414]"
                        data-icon="ShieldCheck"
                        data-size="24px"
                        data-weight="regular"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24px"
                          height="24px"
                          fill="currentColor"
                          viewBox="0 0 256 256"
                        >
                          <path d="M208,40H48A16,16,0,0,0,32,56v58.78c0,89.61,75.82,119.34,91,124.39a15.53,15.53,0,0,0,10,0c15.2-5.05,91-34.78,91-124.39V56A16,16,0,0,0,208,40Zm0,74.79c0,78.42-66.35,104.62-80,109.18-13.53-4.51-80-30.69-80-109.18V56H208ZM82.34,141.66a8,8,0,0,1,11.32-11.32L112,148.68l50.34-50.34a8,8,0,0,1,11.32,11.32l-56,56a8,8,0,0,1-11.32,0Z"></path>
                        </svg>
                      </div>
                      <div className="flex flex-col gap-1">
                        <h2 className="text-base leading-tight font-bold text-[#141414]">
                          Secure Messaging
                        </h2>
                        <p className="text-sm leading-normal font-normal text-[#757575]">
                          End-to-end encryption ensures your messages remain
                          private and secure.
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col gap-3 rounded-lg border border-[#e0e0e0] bg-white p-4">
                      <div
                        className="text-[#141414]"
                        data-icon="Users"
                        data-size="24px"
                        data-weight="regular"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24px"
                          height="24px"
                          fill="currentColor"
                          viewBox="0 0 256 256"
                        >
                          <path d="M117.25,157.92a60,60,0,1,0-66.5,0A95.83,95.83,0,0,0,3.53,195.63a8,8,0,1,0,13.4,8.74,80,80,0,0,1,134.14,0,8,8,0,0,0,13.4-8.74A95.83,95.83,0,0,0,117.25,157.92ZM40,108a44,44,0,1,1,44,44A44.05,44.05,0,0,1,40,108Zm210.14,98.7a8,8,0,0,1-11.07-2.33A79.83,79.83,0,0,0,172,168a8,8,0,0,1,0-16,44,44,0,1,0-16.34-84.87,8,8,0,1,1-5.94-14.85,60,60,0,0,1,55.53,105.64,95.83,95.83,0,0,1,47.22,37.71A8,8,0,0,1,250.14,206.7Z"></path>
                        </svg>
                      </div>
                      <div className="flex flex-col gap-1">
                        <h2 className="text-base leading-tight font-bold text-[#141414]">
                          Group Chats
                        </h2>
                        <p className="text-sm leading-normal font-normal text-[#757575]">
                          Create and manage group chats with up to 1000 members
                          for easy collaboration.
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col gap-3 rounded-lg border border-[#e0e0e0] bg-white p-4">
                      <div
                        className="text-[#141414]"
                        data-icon="Clock"
                        data-size="24px"
                        data-weight="regular"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24px"
                          height="24px"
                          fill="currentColor"
                          viewBox="0 0 256 256"
                        >
                          <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm64-88a8,8,0,0,1-8,8H128a8,8,0,0,1-8-8V72a8,8,0,0,1,16,0v48h48A8,8,0,0,1,192,128Z"></path>
                        </svg>
                      </div>
                      <div className="flex flex-col gap-1">
                        <h2 className="text-base leading-tight font-bold text-[#141414]">
                          Real-Time Updates
                        </h2>
                        <p className="text-sm leading-normal font-normal text-[#757575]">
                          Receive instant notifications and updates for all your
                          messages and activities.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <h2 className="px-4 pt-5 pb-3 text-[22px] leading-tight font-bold tracking-[-0.015em] text-[#141414]">
                  User Testimonials
                </h2>
                <div className="flex flex-col gap-8 overflow-x-hidden bg-white p-4">
                  <div className="flex flex-col gap-3 bg-white">
                    <div className="flex items-center gap-3">
                      <div
                        className="aspect-square size-10 rounded-full bg-cover bg-center bg-no-repeat"
                        // style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuBCFy6mtdG4J56wM3zCr-nfB7aZzObfjb7ZlqC3FPm360NrbmH8XCATimmMDFeSZj2dQTbJZ2jZJcmhdwYm9rtXuMqoOZ8VsmAomqVGYT9UB2pVkuAkn1CVIqcBMynKObsfsct4d-XyVvMR1L2jdWLKlZiZgsvXdsx9F8bD1IKuF97VhHb-Wb16Zoud1eHN9HrI5KWqFXwO2qraEkWxbmkjZUdWugiP-aV0wdBYf7wYqJD4ry5BaVXeNP9PCBwIykdOjBmw1a3U7IS3");'
                      ></div>
                      <div className="flex-1">
                        <p className="text-base leading-normal font-medium text-[#141414]">
                          Sophia Carter
                        </p>
                        <p className="text-sm leading-normal font-normal text-[#757575]">
                          2023-09-15
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-0.5">
                      <div
                        className="text-[#141414]"
                        data-icon="Star"
                        data-size="20px"
                        data-weight="fill"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20px"
                          height="20px"
                          fill="currentColor"
                          viewBox="0 0 256 256"
                        >
                          <path d="M234.5,114.38l-45.1,39.36,13.51,58.6a16,16,0,0,1-23.84,17.34l-51.11-31-51,31a16,16,0,0,1-23.84-17.34L66.61,153.8,21.5,114.38a16,16,0,0,1,9.11-28.06l59.46-5.15,23.21-55.36a15.95,15.95,0,0,1,29.44,0h0L166,81.17l59.44,5.15a16,16,0,0,1,9.11,28.06Z"></path>
                        </svg>
                      </div>
                      <div
                        className="text-[#141414]"
                        data-icon="Star"
                        data-size="20px"
                        data-weight="fill"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20px"
                          height="20px"
                          fill="currentColor"
                          viewBox="0 0 256 256"
                        >
                          <path d="M234.5,114.38l-45.1,39.36,13.51,58.6a16,16,0,0,1-23.84,17.34l-51.11-31-51,31a16,16,0,0,1-23.84-17.34L66.61,153.8,21.5,114.38a16,16,0,0,1,9.11-28.06l59.46-5.15,23.21-55.36a15.95,15.95,0,0,1,29.44,0h0L166,81.17l59.44,5.15a16,16,0,0,1,9.11,28.06Z"></path>
                        </svg>
                      </div>
                      <div
                        className="text-[#141414]"
                        data-icon="Star"
                        data-size="20px"
                        data-weight="fill"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20px"
                          height="20px"
                          fill="currentColor"
                          viewBox="0 0 256 256"
                        >
                          <path d="M234.5,114.38l-45.1,39.36,13.51,58.6a16,16,0,0,1-23.84,17.34l-51.11-31-51,31a16,16,0,0,1-23.84-17.34L66.61,153.8,21.5,114.38a16,16,0,0,1,9.11-28.06l59.46-5.15,23.21-55.36a15.95,15.95,0,0,1,29.44,0h0L166,81.17l59.44,5.15a16,16,0,0,1,9.11,28.06Z"></path>
                        </svg>
                      </div>
                      <div
                        className="text-[#141414]"
                        data-icon="Star"
                        data-size="20px"
                        data-weight="fill"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20px"
                          height="20px"
                          fill="currentColor"
                          viewBox="0 0 256 256"
                        >
                          <path d="M234.5,114.38l-45.1,39.36,13.51,58.6a16,16,0,0,1-23.84,17.34l-51.11-31-51,31a16,16,0,0,1-23.84-17.34L66.61,153.8,21.5,114.38a16,16,0,0,1,9.11-28.06l59.46-5.15,23.21-55.36a15.95,15.95,0,0,1,29.44,0h0L166,81.17l59.44,5.15a16,16,0,0,1,9.11,28.06Z"></path>
                        </svg>
                      </div>
                      <div
                        className="text-[#141414]"
                        data-icon="Star"
                        data-size="20px"
                        data-weight="fill"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20px"
                          height="20px"
                          fill="currentColor"
                          viewBox="0 0 256 256"
                        >
                          <path d="M234.5,114.38l-45.1,39.36,13.51,58.6a16,16,0,0,1-23.84,17.34l-51.11-31-51,31a16,16,0,0,1-23.84-17.34L66.61,153.8,21.5,114.38a16,16,0,0,1,9.11-28.06l59.46-5.15,23.21-55.36a15.95,15.95,0,0,1,29.44,0h0L166,81.17l59.44,5.15a16,16,0,0,1,9.11,28.06Z"></path>
                        </svg>
                      </div>
                    </div>
                    <p className="text-base leading-normal font-normal text-[#141414]">
                      ChatApp has transformed the way our team communicates. The
                      real-time updates and secure messaging features have
                      significantly improved our workflow.
                    </p>
                  </div>
                  <div className="flex flex-col gap-3 bg-white">
                    <div className="flex items-center gap-3">
                      <div
                        className="aspect-square size-10 rounded-full bg-cover bg-center bg-no-repeat"
                        // style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuCzRHut2zZlKDblLhl5Yqd2F3LP1120-HIfaKrHbfiORaDzmqZQl8FPLUCpNb6I1u1Md3F3HsN2wV0eD1Pc0lvDG4Eum4GRjqwhklq_H3qHy1V94zi18xmhsNuM4zCM0DX3n2dtLnixWPXz6UI6UxY3-9NraiLZjzLMebIZM34cZB3raevT5VtyzwnqZG94sh4fJHD1y3-jbeCKTj5EonSx9jogd_y3BcJf9ymK04HdsHupoKkPq6j1Q4bg6k7sQvvHYULYtysUBXn8");'
                      ></div>
                      <div className="flex-1">
                        <p className="text-base leading-normal font-medium text-[#141414]">
                          Ethan Blake
                        </p>
                        <p className="text-sm leading-normal font-normal text-[#757575]">
                          2023-10-20
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-0.5">
                      <div
                        className="text-[#141414]"
                        data-icon="Star"
                        data-size="20px"
                        data-weight="fill"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20px"
                          height="20px"
                          fill="currentColor"
                          viewBox="0 0 256 256"
                        >
                          <path d="M234.5,114.38l-45.1,39.36,13.51,58.6a16,16,0,0,1-23.84,17.34l-51.11-31-51,31a16,16,0,0,1-23.84-17.34L66.61,153.8,21.5,114.38a16,16,0,0,1,9.11-28.06l59.46-5.15,23.21-55.36a15.95,15.95,0,0,1,29.44,0h0L166,81.17l59.44,5.15a16,16,0,0,1,9.11,28.06Z"></path>
                        </svg>
                      </div>
                      <div
                        className="text-[#141414]"
                        data-icon="Star"
                        data-size="20px"
                        data-weight="fill"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20px"
                          height="20px"
                          fill="currentColor"
                          viewBox="0 0 256 256"
                        >
                          <path d="M234.5,114.38l-45.1,39.36,13.51,58.6a16,16,0,0,1-23.84,17.34l-51.11-31-51,31a16,16,0,0,1-23.84-17.34L66.61,153.8,21.5,114.38a16,16,0,0,1,9.11-28.06l59.46-5.15,23.21-55.36a15.95,15.95,0,0,1,29.44,0h0L166,81.17l59.44,5.15a16,16,0,0,1,9.11,28.06Z"></path>
                        </svg>
                      </div>
                      <div
                        className="text-[#141414]"
                        data-icon="Star"
                        data-size="20px"
                        data-weight="fill"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20px"
                          height="20px"
                          fill="currentColor"
                          viewBox="0 0 256 256"
                        >
                          <path d="M234.5,114.38l-45.1,39.36,13.51,58.6a16,16,0,0,1-23.84,17.34l-51.11-31-51,31a16,16,0,0,1-23.84-17.34L66.61,153.8,21.5,114.38a16,16,0,0,1,9.11-28.06l59.46-5.15,23.21-55.36a15.95,15.95,0,0,1,29.44,0h0L166,81.17l59.44,5.15a16,16,0,0,1,9.11,28.06Z"></path>
                        </svg>
                      </div>
                      <div
                        className="text-[#141414]"
                        data-icon="Star"
                        data-size="20px"
                        data-weight="fill"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20px"
                          height="20px"
                          fill="currentColor"
                          viewBox="0 0 256 256"
                        >
                          <path d="M234.5,114.38l-45.1,39.36,13.51,58.6a16,16,0,0,1-23.84,17.34l-51.11-31-51,31a16,16,0,0,1-23.84-17.34L66.61,153.8,21.5,114.38a16,16,0,0,1,9.11-28.06l59.46-5.15,23.21-55.36a15.95,15.95,0,0,1,29.44,0h0L166,81.17l59.44,5.15a16,16,0,0,1,9.11,28.06Z"></path>
                        </svg>
                      </div>
                      <div
                        className="text-[#c4c4c4]"
                        data-icon="Star"
                        data-size="20px"
                        data-weight="regular"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20px"
                          height="20px"
                          fill="currentColor"
                          viewBox="0 0 256 256"
                        >
                          <path d="M239.2,97.29a16,16,0,0,0-13.81-11L166,81.17,142.72,25.81h0a15.95,15.95,0,0,0-29.44,0L90.07,81.17,30.61,86.32a16,16,0,0,0-9.11,28.06L66.61,153.8,53.09,212.34a16,16,0,0,0,23.84,17.34l51-31,51.11,31a16,16,0,0,0,23.84-17.34l-13.51-58.6,45.1-39.36A16,16,0,0,0,239.2,97.29Zm-15.22,5-45.1,39.36a16,16,0,0,0-5.08,15.71L187.35,216v0l-51.07-31a15.9,15.9,0,0,0-16.54,0l-51,31h0L82.2,157.4a16,16,0,0,0-5.08-15.71L32,102.35a.37.37,0,0,1,0-.09l59.44-5.14a16,16,0,0,0,13.35-9.75L128,32.08l23.2,55.29a16,16,0,0,0,13.35,9.75L224,102.26S224,102.32,224,102.33Z"></path>
                        </svg>
                      </div>
                    </div>
                    <p className="text-base leading-normal font-normal text-[#141414]">
                      I've been using ChatApp for personal communication, and
                      it's been fantastic. The interface is user-friendly, and
                      the group chat feature is a lifesaver.
                    </p>
                  </div>
                  <div className="flex flex-col gap-3 bg-white">
                    <div className="flex items-center gap-3">
                      <div
                        className="aspect-square size-10 rounded-full bg-cover bg-center bg-no-repeat"
                        // style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuDnThBIwpfFTHM23xXXS6AJf-wceI8EP_oK1DjDiyBAuOCIoEIk32phRps3Ej0PzvyWjSdwPXK4JtbDbaChTmFvvJSsBs6dCSl7sWDWbub8o8rl7JKUySotx6zQJof2NYEkWy9CY1M_YiLK-ymUL3Rgj-CWGUYCsEscRYQAQi4RzxhejbO6EdCulFFhXBWR2OVC9NN0rKeO-E9W0-lEudHq7vhHE45DWThXhvVDdhKU8e_13sN65_5PFMliye9r12vBiTrSIzxgV_6b");'
                      ></div>
                      <div className="flex-1">
                        <p className="text-base leading-normal font-medium text-[#141414]">
                          Olivia Hayes
                        </p>
                        <p className="text-sm leading-normal font-normal text-[#757575]">
                          2023-11-05
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-0.5">
                      <div
                        className="text-[#141414]"
                        data-icon="Star"
                        data-size="20px"
                        data-weight="fill"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20px"
                          height="20px"
                          fill="currentColor"
                          viewBox="0 0 256 256"
                        >
                          <path d="M234.5,114.38l-45.1,39.36,13.51,58.6a16,16,0,0,1-23.84,17.34l-51.11-31-51,31a16,16,0,0,1-23.84-17.34L66.61,153.8,21.5,114.38a16,16,0,0,1,9.11-28.06l59.46-5.15,23.21-55.36a15.95,15.95,0,0,1,29.44,0h0L166,81.17l59.44,5.15a16,16,0,0,1,9.11,28.06Z"></path>
                        </svg>
                      </div>
                      <div
                        className="text-[#141414]"
                        data-icon="Star"
                        data-size="20px"
                        data-weight="fill"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20px"
                          height="20px"
                          fill="currentColor"
                          viewBox="0 0 256 256"
                        >
                          <path d="M234.5,114.38l-45.1,39.36,13.51,58.6a16,16,0,0,1-23.84,17.34l-51.11-31-51,31a16,16,0,0,1-23.84-17.34L66.61,153.8,21.5,114.38a16,16,0,0,1,9.11-28.06l59.46-5.15,23.21-55.36a15.95,15.95,0,0,1,29.44,0h0L166,81.17l59.44,5.15a16,16,0,0,1,9.11,28.06Z"></path>
                        </svg>
                      </div>
                      <div
                        className="text-[#141414]"
                        data-icon="Star"
                        data-size="20px"
                        data-weight="fill"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20px"
                          height="20px"
                          fill="currentColor"
                          viewBox="0 0 256 256"
                        >
                          <path d="M234.5,114.38l-45.1,39.36,13.51,58.6a16,16,0,0,1-23.84,17.34l-51.11-31-51,31a16,16,0,0,1-23.84-17.34L66.61,153.8,21.5,114.38a16,16,0,0,1,9.11-28.06l59.46-5.15,23.21-55.36a15.95,15.95,0,0,1,29.44,0h0L166,81.17l59.44,5.15a16,16,0,0,1,9.11,28.06Z"></path>
                        </svg>
                      </div>
                      <div
                        className="text-[#141414]"
                        data-icon="Star"
                        data-size="20px"
                        data-weight="fill"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20px"
                          height="20px"
                          fill="currentColor"
                          viewBox="0 0 256 256"
                        >
                          <path d="M234.5,114.38l-45.1,39.36,13.51,58.6a16,16,0,0,1-23.84,17.34l-51.11-31-51,31a16,16,0,0,1-23.84-17.34L66.61,153.8,21.5,114.38a16,16,0,0,1,9.11-28.06l59.46-5.15,23.21-55.36a15.95,15.95,0,0,1,29.44,0h0L166,81.17l59.44,5.15a16,16,0,0,1,9.11,28.06Z"></path>
                        </svg>
                      </div>
                      <div
                        className="text-[#141414]"
                        data-icon="Star"
                        data-size="20px"
                        data-weight="fill"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20px"
                          height="20px"
                          fill="currentColor"
                          viewBox="0 0 256 256"
                        >
                          <path d="M234.5,114.38l-45.1,39.36,13.51,58.6a16,16,0,0,1-23.84,17.34l-51.11-31-51,31a16,16,0,0,1-23.84-17.34L66.61,153.8,21.5,114.38a16,16,0,0,1,9.11-28.06l59.46-5.15,23.21-55.36a15.95,15.95,0,0,1,29.44,0h0L166,81.17l59.44,5.15a16,16,0,0,1,9.11,28.06Z"></path>
                        </svg>
                      </div>
                    </div>
                    <p className="text-base leading-normal font-normal text-[#141414]">
                      ChatApp is the best messaging app I've used. The security
                      features give me peace of mind, and the real-time updates
                      keep me connected with everyone.
                    </p>
                  </div>
                </div>
                <div className="flex justify-center px-4 py-3">
                  <button className="flex h-12 max-w-[480px] min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-full bg-black px-5 text-base leading-normal font-bold tracking-[0.015em] text-white">
                    <span className="truncate">Sign Up Now</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
