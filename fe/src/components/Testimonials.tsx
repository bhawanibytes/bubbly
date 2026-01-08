import Image from "next/image";

export default function Testimonials() {
  return (
    <>
      <div className="min-w-240 px-4 pt-5 pb-3 text-[1.375rem] font-bold">
        User Testimonials
      </div>
      <div className="reviews flex max-w-240 flex-col gap-8 p-4">
        <div className="flex flex-col gap-3">
          <div className="profile flex max-h-11 items-center gap-3">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBCFy6mtdG4J56wM3zCr-nfB7aZzObfjb7ZlqC3FPm360NrbmH8XCATimmMDFeSZj2dQTbJZ2jZJcmhdwYm9rtXuMqoOZ8VsmAomqVGYT9UB2pVkuAkn1CVIqcBMynKObsfsct4d-XyVvMR1L2jdWLKlZiZgsvXdsx9F8bD1IKuF97VhHb-Wb16Zoud1eHN9HrI5KWqFXwO2qraEkWxbmkjZUdWugiP-aV0wdBYf7wYqJD4ry5BaVXeNP9PCBwIykdOjBmw1a3U7IS3"
              alt=""
              width={40}
              height={40}
              className="rounded-full"
            />
            <div className="profileDetails">
              <p className="text-base font-medium">Clara Bennett</p>
              <p className="text-sm font-normal text-neutral-500">2023-09-15</p>
            </div>
          </div>
          <div className="ratings flex gap-0.5">
            <Image src="./star.svg" alt="" width={20} height={20} />
            <Image src="./star.svg" alt="" width={20} height={20} />
            <Image src="./star.svg" alt="" width={20} height={20} />
            <Image src="./star.svg" alt="" width={20} height={20} />
            <Image src="./star.svg" alt="" width={20} height={20} />
          </div>
          <div className="review">
            <p className="text-base">
              {`ChatApp has transformed the way our team communicates. The
              real-time updates and secure messaging features have significantly
              improved our workflow.`}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="profile flex max-h-11 items-center gap-3">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCzRHut2zZlKDblLhl5Yqd2F3LP1120-HIfaKrHbfiORaDzmqZQl8FPLUCpNb6I1u1Md3F3HsN2wV0eD1Pc0lvDG4Eum4GRjqwhklq_H3qHy1V94zi18xmhsNuM4zCM0DX3n2dtLnixWPXz6UI6UxY3-9NraiLZjzLMebIZM34cZB3raevT5VtyzwnqZG94sh4fJHD1y3-jbeCKTj5EonSx9jogd_y3BcJf9ymK04HdsHupoKkPq6j1Q4bg6k7sQvvHYULYtysUBXn8"
              alt=""
              width={40}
              height={40}
              className="rounded-full"
            />
            <div className="profileDetails">
              <p className="text-base font-medium">Owen Harper</p>
              <p className="text-sm font-normal text-neutral-500">2023-10-20</p>
            </div>
          </div>
          <div className="ratings flex gap-0.5">
            <Image src="./star.svg" alt="" width={20} height={20} />
            <Image src="./star.svg" alt="" width={20} height={20} />
            <Image src="./star.svg" alt="" width={20} height={20} />
            <Image src="./star.svg" alt="" width={20} height={20} />
            <Image src="./empty_star.svg" alt="" width={20} height={20} />
          </div>
          <div className="review">
            <p className="text-base">
              {`I've been using ChatApp for personal communication, and it's been
              fantastic. The interface is user-friendly, and the group chat
              feature is a lifesaver.`}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="profile flex max-h-11 items-center gap-3">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDnThBIwpfFTHM23xXXS6AJf-wceI8EP_oK1DjDiyBAuOCIoEIk32phRps3Ej0PzvyWjSdwPXK4JtbDbaChTmFvvJSsBs6dCSl7sWDWbub8o8rl7JKUySotx6zQJof2NYEkWy9CY1M_YiLK-ymUL3Rgj-CWGUYCsEscRYQAQi4RzxhejbO6EdCulFFhXBWR2OVC9NN0rKeO-E9W0-lEudHq7vhHE45DWThXhvVDdhKU8e_13sN65_5PFMliye9r12vBiTrSIzxgV_6b"
              alt=""
              width={40}
              height={40}
              className="rounded-full"
            />
            <div className="profileDetails">
              <p className="text-base font-medium">Isabella Reed</p>
              <p className="text-sm font-normal text-neutral-500">2023-11-05</p>
            </div>
          </div>
          <div className="ratings flex gap-0.5">
            <Image src="./star.svg" alt="" width={20} height={20} />
            <Image src="./star.svg" alt="" width={20} height={20} />
            <Image src="./star.svg" alt="" width={20} height={20} />
            <Image src="./star.svg" alt="" width={20} height={20} />
            <Image src="./star.svg" alt="" width={20} height={20} />
          </div>
          <div className="review">
            <p className="text-base">
              {`ChatApp is the best messaging app I've used. The security features
              give me peace of mind, and the real-time updates keep me connected
              with everyone.`}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
