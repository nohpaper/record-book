import { create } from "zustand";
import moment from "moment";

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
    money: number | null;
}

interface DateTotalStoreType {
    date?: string | number | null;
    koreanName: string;
    incomeMoney: number;
    exportMoney: number;
    highCategory: string[];
}
interface DateTotalStore {
    total: {
        today: DateTotalStoreType;
        week: DateTotalStoreType;
        thisMonth: DateTotalStoreType;
        lastMonth: DateTotalStoreType;
    };
    todayMathSum: (nowTime: string, item: ListItem) => void;
}
/* 오늘, 주간 */
export const useDateTotalStore = create<DateTotalStore>((set) => {
    return {
        total: {
            today: {
                date: "",
                koreanName: "오늘",
                incomeMoney: 0,
                exportMoney: 0,
                highCategory: [],
            },
            week: {
                date: null,
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
        todayMathSum: (nowTime, sendItem) =>
            set((state) => {
                const total = state.total;
                const totalCopy = {
                    ...total,
                    today: { ...total.today },
                    week: { ...total.week },
                    thisMonth: { ...total.thisMonth },
                };

                //주간 체크
                const currentWeek = moment.utc(nowTime).local().week();
                const firstMonthWeek = moment.utc(nowTime).startOf("month").week();
                const week = currentWeek - firstMonthWeek + 1;

                /* 1. 오늘의 합산 내역을 월간에 넣고, 월간은 합산 내역 부분을 배열로 생성하여 1주,2주별로 기록해둔다.
                 * 2. 주간은 월간 []내의 내용중 해당하는 주차를 보여준다
                 * 3. 월간은 []내의 내용을 모두 합산한다
                 * */

                //오늘
                if (total.today.date !== "") {
                    //공란이 아닐 경우
                    if (total.today.date === nowTime) {
                        //내용이 같을 경우
                        // list.ts해당 날짜 맨 마지막 항목을 incomeMoney or exportMoney 에 합산

                        const activeTrue = Object.keys(sendItem.active).find((key) => {
                            const typeKey = key as keyof (typeof sendItem)["active"];
                            return sendItem.active[typeKey] === true;
                        });

                        if (String(activeTrue) === "income") {
                            //income:true일 경우
                            if (sendItem.money !== null) {
                                totalCopy.today.incomeMoney += sendItem.money;
                            }
                        }
                        if (String(activeTrue) === "export") {
                            //export:true일 경우
                            if (sendItem.money !== null) {
                                totalCopy.today.exportMoney += sendItem.money;
                            }
                        }
                    } else {
                        //내용이 다를 경우
                        //money 두 항목 내용 삭제 -> incomeMoney or exportMoney 에 합산

                        totalCopy.today.incomeMoney = 0;
                        totalCopy.today.exportMoney = 0;

                        const activeTrue = Object.keys(sendItem.active).find((key) => {
                            const typeKey = key as keyof (typeof sendItem)["active"];
                            return sendItem.active[typeKey] === true;
                        });

                        if (String(activeTrue) === "income") {
                            //income:true일 경우
                            if (sendItem.money !== null) {
                                totalCopy.today.incomeMoney += sendItem.money;
                            }
                        }
                        if (String(activeTrue) === "export") {
                            //export:true일 경우
                            if (sendItem.money !== null) {
                                totalCopy.today.exportMoney += sendItem.money;
                            }
                        }
                    }
                } else {
                    //공란일 경우 nowTime 삽입
                    totalCopy.today.date = nowTime;
                }

                /*//주간
                const currentWeek = moment.utc(nowTime).local().week();
                const firstMonthWeek = moment.utc(nowTime).startOf("month").week();
                const week = currentWeek - firstMonthWeek + 1;

                if (total.week.date !== null) {
                    //공란이 아닐 경우
                    if (total.week.date === week) {
                        //주차가 동일할경우
                        totalCopy.week.incomeMoney = totalCopy.today.incomeMoney;
                        totalCopy.week.exportMoney = totalCopy.today.exportMoney;
                    } else {
                        //주차가 동일하지 않을 경우
                    }
                } else {
                    //공란일 경우 삽입
                    totalCopy.week.date = week;
                }*/
                return { total: totalCopy };
            }),
    };
});

/* 한달별 */
export const useDateMouthStore = create(() => {
    return {
        mouth: {
            january: {
                incomeMoney: [],
                exportMoney: [],
                highCategory: [],
                view: "",
            },
            february: {
                incomeMoney: [],
                exportMoney: [],
                highCategory: [],
                view: "",
            },
            march: {
                incomeMoney: [],
                exportMoney: [],
                view: "last",
            },
            april: {
                incomeMoney: [],
                exportMoney: [],
                highCategory: [],
                view: "this",
            },
            may: {
                incomeMoney: [],
                exportMoney: [],
                highCategory: [],
                view: "",
            },
            june: {
                incomeMoney: [],
                exportMoney: [],
                highCategory: [],
                view: "",
            },
            july: {
                incomeMoney: [],
                exportMoney: [],
                highCategory: [],
                view: "",
            },
            august: {
                incomeMoney: [],
                exportMoney: [],
                highCategory: [],
                view: "",
            },
            september: {
                incomeMoney: [],
                exportMoney: [],
                highCategory: [],
                view: "",
            },
            october: {
                incomeMoney: [],
                exportMoney: [],
                highCategory: [],
                view: "",
            },
            november: {
                incomeMoney: [],
                exportMoney: [],
                highCategory: [],
                view: "",
            },
            december: {
                incomeMoney: [],
                exportMoney: [],
                highCategory: [],
                view: "",
            },
        },
    };
});

/*카테고리별(한달)*/
// 수입/지출별 값은 한달 주기로 삭제됨
export const useCategoryTotalStore = create(() => {
    return {
        total: [
            {
                color: "#FFA742",
                koreanName: "기본 카테고리1", //인터페이스에서 수정하면 계속 변경됨
                incomeMoney: 0,
                exportMoney: 0,
            },
            {
                color: "#9EF284",
                koreanName: "기본 카테고리2",
                incomeMoney: 0,
                exportMoney: 0,
            },
            {
                color: "#B560F5",
                koreanName: "기본 카테고리3",
                incomeMoney: 0,
                exportMoney: 0,
            },
            {
                color: "#030417",
                koreanName: "기본 카테고리4",
                incomeMoney: 0,
                exportMoney: 0,
            },
        ],
    };
});
