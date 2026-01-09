import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { ChatMainContent } from "@components/ChatMainContent";
import { SettingMainContent } from "@components/SettingMainContent";

export const MainContent = () => {
    const ActiveMenu = useSelector(
        (state: RootState) => state.dashboard.ActiveMenu
    );

    return (
        <div className="flex h-full w-[80%] flex-col justify-end bg-gray-300">
            {ActiveMenu === "chat" ? <ChatMainContent /> : <></>}
            {ActiveMenu === "setting" ? <SettingMainContent /> : <></>}
        </div>
    );
};
