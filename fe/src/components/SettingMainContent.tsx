import { Settings } from "lucide-react";

export const SettingMainContent = () => {
    return (
        <div className="bg-background text-muted flex h-full w-full flex-col items-center justify-center gap-4">
            <Settings className="h-10 w-10" />
            <div>Setting</div>
        </div>
    );
};
