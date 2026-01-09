import { RootState } from "@/redux/store";
import ChatSection from "@components/ChatSection";
import { Settings } from "@components/Settings";
import { useSelector } from "react-redux";

export const MenuContent = () => {
    const selectedMenu = useSelector(
        (state: RootState) => state.dashboard.ActiveMenu
    );
    const dashboardState = useSelector(
        (state: RootState) => state.dashboard.dashboardState
    );

    return (
        <div
            className={`bg-background text-foreground flex h-full w-[45%] min-w-50 flex-col px-4 py-3`}
        >
            {selectedMenu === "chat" ? (
                <ChatSection dashboardState={dashboardState} />
            ) : (
                <></>
            )}
            {selectedMenu === "setting" ? <Settings /> : <></>}
        </div>
    );
};
