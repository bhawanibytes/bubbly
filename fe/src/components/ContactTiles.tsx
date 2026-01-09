export interface ContactTilesType {
    contactName: string;
    message: string | null;
}

export default function ContactTiles({
    contactName,
    message,
}: ContactTilesType) {
    const onClickHandler = () => {

    }
    return (
        <div className="hover:bg-surface text-foreground w-full cursor-pointer rounded-2xl px-2 py-1 shadow" onClick={onClickHandler}>
            <div className="truncate text-base font-medium">
                {`${contactName}`}
            </div>
            <div className="truncate text-sm text-muted/90">{`${message}`}</div>
        </div>
    );
}
