import { createContext, useContext, useReducer, ReactNode } from "react";
import { Idea } from "../_lib/types";

// 1. Define action types
type Action =
  | { type: "add"; payload: Idea }
  | { type: "remove"; payload: string }
  | { type: "update"; payload: { updatedIdea: Idea; id: string } };

// 2. Define context type
type IdeasContextType = {
  state: Idea[];
  dispatch: React.Dispatch<Action>;
};

// 3. Initial state
const initialState: Idea[] = [];

// 4. Create context
const IdeasContext = createContext<IdeasContextType | undefined>(undefined);

// 5. Reducer
function reducer(state: Idea[], action: Action): Idea[] {
  switch (action.type) {
    case "add":
      return [...state, { ...action.payload, syncStatus: "pending" }];

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
function IdeasContextProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

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
