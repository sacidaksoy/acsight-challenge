const initialState = {
    providers: [],
};

export const provideReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_PROVIDER":
            return {
                ...state,
                providers: action.payload,
            };
        default:
            return state;
    }
};