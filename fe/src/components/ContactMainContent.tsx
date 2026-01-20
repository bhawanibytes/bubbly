import Button from "./Button";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useIsUserAvailableMutation } from "@features/chats/chatApi";
import { useEffect } from "react";
import ChatWindow from "./ChatWindow";

export const ContactMainContent = () => {
    const activeContact = useSelector(
        (state: RootState) => state.dashboard.activeContact
    );
    const contactMap = useSelector(
        (state: RootState) => state.dashboard.contacts
    );
    const [isUserAvailable, { data }] = useIsUserAvailableMutation();

    // check if active Contact Number is available of Bubbly or Not
    useEffect(() => {
        const fetch = async () => {
            try {
                await isUserAvailable({
                    userNumber: activeContact,
                }).unwrap();
            } catch (error) {
                console.error("Error while checking user availability:", error);
            }
        };
        if (activeContact) {
            fetch();
        }
    }, [activeContact, isUserAvailable]);

    // prompt user to invite their contact for registring on Bubbly
    if (data && data.data.available != true) {
        return (
            <div className="bg-background text-muted flex h-full w-full flex-col items-center justify-center">
                Your Contact{" "}
                {contactMap ? contactMap[activeContact] : activeContact} is not
                on Bubbly, Invite them to Bubbly through SMS, use below given
                Button.
                <Button
                    className={`mt-5 w-fit rounded-lg px-4 py-0 text-base font-normal`}
                    href={`sms:${activeContact}`}
                >
                    <span>
                        Invite
                        <span className="italic">
                            {" "}
                            {contactMap
                                ? contactMap[activeContact]
                                : activeContact}
                        </span>
                    </span>
                </Button>
            </div>
        );
    }

    // if user available let the user talk to them
    return (
        // <div className="bg-surface text-foreground flex h-screen items-center justify-center">
        //     Hello
        // </div>
        <ChatWindow
            messageArr={[]}
            contactName={contactMap ? contactMap[activeContact] : activeContact}
        />
    );
};
