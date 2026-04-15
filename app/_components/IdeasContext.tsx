"use client";

import { createContext, useContext, useReducer, ReactNode } from "react";
import { Idea } from "../_lib/types";

// 1. Define action types
type Action =
  | { type: "add"; payload: Idea }
  | { type: "remove"; payload: string }
  | { type: "update"; payload: { updatedIdea: Idea; id: string } }
  | { type: "set"; payload: Idea[] };

// 2. Define context type
type IdeasContextType = {
  state: Idea[];
  dispatch: React.Dispatch<Action>;
};

// 3. Initial state (present in context)

// 4. Create context
const IdeasContext = createContext<IdeasContextType | undefined>(undefined);

// 5. Reducer
function reducer(state: Idea[], action: Action): Idea[] {
  switch (action.type) {
    case "set":
      return action.payload;

    case "add":
      return [...state, { ...action.payload, syncStatus: "synced" }];

    case "remove":
      return state.filter((idea) => idea.id !== action.payload);

    case "update":
      const { updatedIdea, id } = action.payload;
      const newState: Idea[] = [];

      for (const idea of state) {
        if (idea.id === id) {
          newState.push({ ...idea, ...updatedIdea, syncStatus: "pending" });
        } else {
          newState.push({ ...idea });
        }
      }

      return newState;

    default:
      return state;
  }
}

// 6. Provider
function IdeasContextProvider({
  children,
  initialIdeas,
}: {
  children: ReactNode;
  initialIdeas: Idea[];
}) {
  const [state, dispatch] = useReducer(reducer, initialIdeas);

  return (
    <IdeasContext.Provider value={{ state, dispatch }}>
      {children}
    </IdeasContext.Provider>
  );
}

// 7. Custom hook
function useIdeas() {
  const context = useContext(IdeasContext);

  if (!context) {
    throw new Error("useIdeas must be used within IdeasContextProvider");
  }

  return context;
}

export { IdeasContextProvider, useIdeas };
