import { create } from "zustand";

interface ListItem {
    index: number;
    category: {
        color: string;
        name: string;
    };
    memo: string;
    active: {
        income: boolean;
        export: boolean;
    };
    money: number;
}

interface DayList {
    date: string;
    list: ListItem[];
}

interface ListStore {
    allList: DayList[];
    dataPush: (nowTime: string, item: ListItem) => void;
}

export const useListStore = create<ListStore>((set) => {
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
        dataPush: (nowTime, sendItem) =>
            set((state) => {
                let isFindDate = false;

                const updatedAllList = state.allList.map((item) => {
                    console.log("list.ts에서 item", item, sendItem);
                    if (item.date === nowTime) {
                        isFindDate = true;
                        return {
                            ...item,
                            list: [...item.list, sendItem],
                        };
                    }
                    return item;
                });
                if (!isFindDate) {
                    updatedAllList.push({
                        date: nowTime,
                        list: [sendItem],
                    });
                }

                return { allList: updatedAllList };
            }),
    };
});
