import Button from "./Button";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export const ContactIsNotOnBubbly = () => {
    const contactNumber = useSelector(
        (state: RootState) => state.dashboard.activeContact
    );
    const contactMap = useSelector(
        (state: RootState) => state.dashboard.contacts
    );

    return (
        <div className="bg-background text-muted flex h-full w-full flex-col items-center justify-center">
            Your Contact{" "}
            {contactMap ? contactMap[contactNumber] : contactNumber} is not on
            Bubbly, Invite them to Bubbly through SMS, use below given Button.
            <Button
                className={`mt-5 w-fit rounded-lg px-4 py-0 text-base font-normal`}
                href={`sms:${contactNumber}`}
            >
                <span>
                    Invite
                    <span className="italic">
                        {" "}
                        {contactMap ? contactMap[contactNumber] : contactNumber}
                    </span>
                </span>
            </Button>
        </div>
    );
};
