import { RootState } from "@/redux/store";
import ChatTilesSection from "@components/ChatTilesSection";
import { Settings } from "@components/Settings";
import { useSelector } from "react-redux";

export const MenuContent = () => {
    const selectedMenu = useSelector(
        (state: RootState) => state.dashboard.ActiveMenu
    );
    const dashboardState = useSelector(
        (state: RootState) => state.dashboard.dashboardState
    );
    const contactIntegration = useSelector(
        (state: RootState) => state.dashboard.contactIntegration
    );

    return (
        <div className={`bg-background flex h-full w-[20%] min-w-50 flex-col`}>
            {selectedMenu === "chat" ? (
                <ChatTilesSection
                    dashboardState={dashboardState}
                    contactIntegration={contactIntegration}
                />
            ) : (
                <></>
            )}
            {selectedMenu === "setting" ? <Settings /> : <></>}
        </div>
    );
};
