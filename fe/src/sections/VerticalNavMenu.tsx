import { Settings, MessageSquareText } from "lucide-react";
import { useDispatch } from "react-redux";
import { setActiveMenu } from "@features/dashboard/dashboardSlice";

export type VerticleMenu = "chat" | "setting";

export const VerticalNavMenu = () => {
    const dispatch = useDispatch();
    return (
        <div className="bg-surface w-13 p-1 pt-3">
            <div className="flex h-full flex-col items-center justify-between">
                {/* Top Div */}
                <div className="flex flex-col items-center">
                    <div className="bg-background/80 flex h-8 w-8 items-center justify-center rounded-full">
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
                    <Settings
                        className="text-foreground m-2 p-1"
                        onClick={() => {
                            dispatch(
                                setActiveMenu({ selectedMenu: "setting" })
                            );
                        }}
                    />
                    {/* Profile Icon Div*/}
                </div>
            </div>
        </div>
    );
};
