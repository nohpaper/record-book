import { create } from "zustand";

export const useListStore = create(() => {
    return {
        allList: [
            {
                date: "2025-04-14",
                list: [
                    {
                        index: 0,
                        category: {
                            color: "",
                            name: "",
                        },
                        memo: "test text",
                        active: {
                            income: false,
                            export: false,
                        },
                        money: 0,
                    },
                    {
                        index: 0,
                        category: {
                            color: "",
                            name: "",
                        },
                        memo: "test text22",
                        active: {
                            income: false,
                            export: false,
                        },
                        money: 0,
                    },
                ],
            },
        ],
    };
});
