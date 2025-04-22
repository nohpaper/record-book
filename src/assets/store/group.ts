import { create } from "zustand";

/* 오늘, 주간 */
export const useTotalStore = create(() => {
    return {
        total: {
            today: {
                koreanName: "오늘",
                incomeMoney: 0,
                exportMoney: 0,
                highCategory: [],
            },
            week: {
                koreanName: "주간",
                incomeMoney: 0,
                exportMoney: 0,
                highCategory: [],
            },
            thisMonth: {
                koreanName: "월간",
                incomeMoney: 0,
                exportMoney: 0,
                highCategory: [],
            },
            lastMonth: {
                koreanName: "저번달",
                incomeMoney: 0,
                exportMoney: 0,
                highCategory: [],
            },
        },
    };
});

/* 한달별 */
export const useMouthStore = create(() => {
    return {
        mouth: {
            january: {
                incomeMoney: 0,
                exportMoney: 0,
                highCategory: [],
                view: "",
            },
            february: {
                incomeMoney: 0,
                exportMoney: 0,
                highCategory: [],
                view: "",
            },
            march: {
                incomeMoney: 0,
                exportMoney: 0,
                view: "last",
            },
            april: {
                incomeMoney: 0,
                exportMoney: 0,
                highCategory: [],
                view: "this",
            },
            may: {
                incomeMoney: 0,
                exportMoney: 0,
                highCategory: [],
                view: "",
            },
            june: {
                incomeMoney: 0,
                exportMoney: 0,
                highCategory: [],
                view: "",
            },
            july: {
                incomeMoney: 0,
                exportMoney: 0,
                highCategory: [],
                view: "",
            },
            august: {
                incomeMoney: 0,
                exportMoney: 0,
                highCategory: [],
                view: "",
            },
            september: {
                incomeMoney: 0,
                exportMoney: 0,
                highCategory: [],
                view: "",
            },
            october: {
                incomeMoney: 0,
                exportMoney: 0,
                highCategory: [],
                view: "",
            },
            november: {
                incomeMoney: 0,
                exportMoney: 0,
                highCategory: [],
                view: "",
            },
            december: {
                incomeMoney: 0,
                exportMoney: 0,
                highCategory: [],
                view: "",
            },
        },
    };
});
