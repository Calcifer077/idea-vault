"use client";

import { createContext, useContext, useReducer, ReactNode } from "react";
import { Idea } from "../_lib/types";

// 1. Define action types
type Action =
  | { type: "add"; payload: Idea }
  | { type: "remove"; payload: string }
  | {
      type: "update";
      payload: {
        id: string;
        title: string;
        description: string;
        tags: string[];
        techStack: string[];
      };
    }
  | { type: "set"; payload: Idea[] }
  | { type: "set-password"; payload: { password: string } };

// 2. Define context type
type IdeasState = {
  ideas: Idea[];
  password?: string;
};

type IdeasContextType = {
  state: IdeasState;
  dispatch: React.Dispatch<Action>;
};

// 3. Initial state (present in context)

// 4. Create context
const IdeasContext = createContext<IdeasContextType | undefined>(undefined);

// 5. Reducer
function reducer(state: IdeasState, action: Action): IdeasState {
  switch (action.type) {
    case "set":
      return { ...state, ideas: action.payload };

    case "add":
      return {
        ...state,
        ideas: [...state.ideas, { ...action.payload, syncStatus: "synced" }],
      };

    case "remove":
      return {
        ...state,
        ideas: state.ideas.filter((idea) => idea.id !== action.payload),
      };

    case "update":
      const { id, title, description, tags, techStack } = action.payload;

      return {
        ...state,
        ideas: state.ideas.map((idea) =>
          idea.id === id
            ? {
                ...idea,
                title,
                description,
                tags,
                techStack,
                syncStatus: "pending",
              }
            : idea,
        ),
      };

    case "set-password":
      return {
        ...state,
        password: action.payload.password,
      };

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
  const [state, dispatch] = useReducer(reducer, {
    ideas: initialIdeas,
    password: undefined,
  });

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
