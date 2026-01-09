import { RootState } from "@/redux/store";
import { setActiveContact } from "@features/dashboard/dashboardSlice";
import { useDispatch, useSelector } from "react-redux";

export interface ContactTilesType {
    contactName: string;
    message: string | null;
    phoneNumber: string;
}

export default function ContactTiles({
    contactName,
    message,
    phoneNumber,
}: ContactTilesType) {
    const activeContact = useSelector(
        (state: RootState) => state.dashboard.activeContact
    );
    const dispatch = useDispatch();
    const onClickHandler = () => {
        dispatch(setActiveContact({ phoneNumber: phoneNumber }));
    };
    return (
        <div
            className={`${activeContact === phoneNumber ? "bg-surface" : ""} hover:bg-surface text-foreground w-full cursor-pointer rounded-2xl px-2 py-1 shadow`}
            onClick={onClickHandler}
        >
            <div className="truncate text-base font-medium">
                {`${contactName}`}
            </div>
            <div className="text-muted/90 truncate text-sm">{`${message}`}</div>
        </div>
    );
}
