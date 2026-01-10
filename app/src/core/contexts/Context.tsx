// import React, { createContext, useContext, useMemo, type ReactNode } from "react";

// type XXXContextType = {}

// const XXXContext = createContext<XXXContextType | null>(null);

// export const XXXProvider = ({ children }: { children: ReactNode }) => {

//     const value = useMemo(() => ({}), []);

//     return <XXXContext.Provider value={value}>{children}</XXXContext.Provider>
// }

// export const useXXX = () => {
//     const context = useContext(XXXContext);

//     if (context === undefined) {
//         throw new Error("Component is out of XXXProvider");
//     }

//     if (context === null) {
//         throw new Error("Error loading XXXContext");
//     }
// }