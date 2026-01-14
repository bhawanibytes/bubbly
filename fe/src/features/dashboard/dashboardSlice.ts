import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MessageTableSelect } from "@shared/types/messages.type";
import type { VerticleMenu } from "@sections/VerticalNavMenu";

export interface StateMessageType extends MessageTableSelect {
    senderOfThisMessage: { phoneNumber: string };
}

export interface DashboardStateType {
    ActiveMenu: VerticleMenu;
    contacts: Record<string, string> | null;
    contactIntegration: boolean;
    searchActive: boolean;
    activeContact: string;
}

const initialState: DashboardStateType = {
    ActiveMenu: "chat",
    contacts: {},
    contactIntegration: false,
    searchActive: false,
    activeContact: "",
};

export const dashboardSlice = createSlice({
    name: "dashboard",
    initialState,
    reducers: {
        updateContactIntegration: (
            state,
            action: PayloadAction<{
                contactIntegrationStatus: boolean;
            }>
        ) => {
            const { contactIntegrationStatus } = action.payload;
            state.contactIntegration = contactIntegrationStatus;
        },
        setContacts: (
            state,
            action: PayloadAction<{
                contactRecord: Record<string, string>;
            }>
        ) => {
            const { contactRecord } = action.payload;
            state.contacts = contactRecord;
        },
        setActiveMenu: (
            state,
            action: PayloadAction<{ selectedMenu: VerticleMenu }>
        ) => {
            const { selectedMenu } = action.payload;
            state.ActiveMenu = selectedMenu;
        },
        setSearchStatus: (
            state,
            action: PayloadAction<{
                search: boolean;
            }>
        ) => {
            const { search } = action.payload;
            state.searchActive = search;
        },
        setActiveContact: (
            state,
            action: PayloadAction<{
                phoneNumber: string;
            }>
        ) => {
            const { phoneNumber } = action.payload;
            state.activeContact = phoneNumber;
        },
    },
});

export const {
    updateContactIntegration,
    setContacts,
    setActiveMenu,
    setSearchStatus,
    setActiveContact,
} = dashboardSlice.actions;
export default dashboardSlice.reducer;
