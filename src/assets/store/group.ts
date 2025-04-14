import { create } from "zustand";

/* 오늘, 주간 */
export const useTotalStore = create(() => {
    return {
        total: {
            today: {
                koreanName: "오늘",
                sumMoney: 0,
            },
            week: {
                koreanName: "주간",
                sumMoney: 0,
            },
            thisMonth: {
                koreanName: "월간",
                sumMoney: 0,
            },
            lastMonth: {
                koreanName: "저번달",
                sumMoney: 0,
            },
        },
    };
});

/* 한달별 */
export const useMouthStore = create(() => {
    return {
        mouth: {
            january: {
                sumMoney: 0,
                view: "",
            },
            february: {
                sumMoney: 0,
                view: "",
            },
            march: {
                sumMoney: 0,
                view: "last",
            },
            april: {
                sumMoney: 0,
                view: "this",
            },
            may: {
                sumMoney: 0,
                view: "",
            },
            june: {
                sumMoney: 0,
                view: "",
            },
            july: {
                sumMoney: 0,
                view: "",
            },
            august: {
                sumMoney: 0,
                view: "",
            },
            september: {
                sumMoney: 0,
                view: "",
            },
            october: {
                sumMoney: 0,
                view: "",
            },
            november: {
                sumMoney: 0,
                view: "",
            },
            december: {
                sumMoney: 0,
                view: "",
            },
        },
    };
});
