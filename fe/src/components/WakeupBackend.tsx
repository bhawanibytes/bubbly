import Button from "./Button";

export const WakeupBackend = () => {
    return (
        <div className="mb-6 flex flex-col items-center justify-center gap-2">
            <span>Please wakeup the backend before using it</span>
            <Button
                href={
                    process.env.NEXT_PUBLIC_BACKEND_URL +
                    "?from=" +
                    encodeURIComponent(window.location.href)
                }
                className={`w-fit`}
            >
                Wakeup the Backend
            </Button>
        </div>
    );
};
