import { create,StoreApi, UseBoundStore  } from 'zustand';

interface State {
    print: null | React.MutableRefObject<null>;
    file: string;
    fontSize: number;
    bold: boolean;
    italics: boolean;
    underline: boolean;
};

interface Action{
    setPrint: (item: React.MutableRefObject<null>) => void;
    setFile: (file: string) => void;
    reset: () => void;

};

type WithSelectors<S> = S extends { getState: () => infer T }
    ? S & { use: { [K in keyof T]: () => T[K] } }
    : never

const createSelectors = <S extends UseBoundStore<StoreApi<object>>>(
        _store: S,
    ) => {
        let store = _store as WithSelectors<typeof _store>
        store.use = {}
        for (let k of Object.keys(store.getState())) {
            ;(store.use as any)[k] = () => store((s) => s[k as keyof typeof s])
        }

        return store
};

const initialState = {
    print: null,
    file: '',
    fontSize: 11,
    bold: false,
    italics: false,
    underline: false,
};

const useEditorHeaderBase = create<State & Action>((set) => ({
    ...initialState,
    setPrint: (print: React.MutableRefObject<null>) => set({print}),
    setFile: (file:string) => set({file}),
    reset: () => set(initialState),
}));

export const useEditorHeaderStore = createSelectors(useEditorHeaderBase);