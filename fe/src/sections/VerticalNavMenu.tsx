import { Settings, MessageSquareText } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setActiveMenu } from "@features/dashboard/dashboardSlice";
import { RootState } from "@/redux/store";

export type VerticleMenu = "chat" | "setting";

export const VerticalNavMenu = () => {
    const dispatch = useDispatch();
    const selectedMenu = useSelector(
        (state: RootState) => state.dashboard.ActiveMenu
    );
    return (
        <div className="bg-surface w-15 p-1 pt-3">
            <div className="flex h-full flex-col items-center justify-between">
                {/* Top Div */}
                <div className="flex flex-col items-center">
                    <div
                        className={`${selectedMenu === "chat" ? "bg-background/80" : ""} hover:bg-background/80 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full`}
                    >
                        <MessageSquareText
                            className="text-foreground p-1"
                            onClick={() => {
                                dispatch(
                                    setActiveMenu({ selectedMenu: "chat" })
                                );
                            }}
                        />
                    </div>
                    {/* features div */}
                </div>
                {/* Last div */}
                <div className="flex flex-col items-center">
                    <div
                        className={`${selectedMenu === "setting" ? "bg-background/80" : ""} hover:bg-background/80 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full`}
                    >
                        <Settings
                            className="text-foreground p-1"
                            onClick={() => {
                                dispatch(
                                    setActiveMenu({ selectedMenu: "setting" })
                                );
                            }}
                        />
                    </div>
                    {/* Profile Icon Div*/}
                </div>
            </div>
        </div>
    );
};
