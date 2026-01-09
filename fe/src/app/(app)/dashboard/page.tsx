"use client";

import { useInitialFetchQuery } from "@features/dashboard/dashboardApi";
import {
    setContacts,
    setDashboardState,
    updateContactIntegration,
} from "@features/dashboard/dashboardSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { VerticalNavMenu } from "@sections/VerticalNavMenu";
import { MenuContent } from "@sections/MenuContent";
import { MainContent } from "@sections/MainContent";

export default function Dashboard() {
    const dispatch = useDispatch();
    const { data, isLoading, error } = useInitialFetchQuery();
    // Update the dashboard state when data is fetched
    useEffect(() => {
        if (data) {
            dispatch(
                setDashboardState({ dashboardState: data.data.messageRecords })
            );
            dispatch(
                updateContactIntegration({
                    contactIntegrationStatus: data.data.contactIntergration,
                })
            );
            localStorage.setItem("userNumber", data.data.userNumber);
            localStorage.setItem(
                "contacts",
                JSON.stringify(data.data.contactRecords)
            );
            dispatch(
                setContacts({
                    contactRecord: data.data.contactRecords.contactMap,
                })
            );
            // console.log("contactMap: ", data.data.contactRecords.contactMap)
        }
    }, [data, dispatch]);

    // Loading While Fetching Data
    if (isLoading) {
        return (
            <div className="bg-surface flex h-screen items-center justify-center space-x-2">
                <div className="relative h-16 w-16">
                    <div className="absolute inset-0 animate-spin rounded-full border-4 border-gray-600 border-t-orange-500"></div>
                    <div
                        className="absolute inset-2 animate-spin rounded-full border-4 border-gray-700 border-t-amber-400"
                        style={{
                            animationDirection: "reverse",
                            animationDuration: "0.75s",
                        }}
                    ></div>
                </div>
            </div>
        );
    }
    // Error Handling While Fetching Data
    if (error) {
        console.error("Error:", error); // Debug log
        return <div>Error loading dashboard: {JSON.stringify(error)}</div>;
    }

    return (
        <div className="flex h-screen w-screen text-black">
            <VerticalNavMenu />

            {/* Left Chat Section */}
            <MenuContent />
            {/* Section's Vertical Divider */}
            <div className="bg-background/90 h-full w-0.5"></div>
            {/* Right Side Chat Window Section*/}
            <MainContent />
        </div>
    );
}
