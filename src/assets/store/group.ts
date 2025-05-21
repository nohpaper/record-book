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
    money: number | null;
}

interface DateTotalStoreType {
    date?: string;
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
                const totalCopy = {...total, today: {...total.today}};

                if (total.today.date !== "") {
                    //공란이 아닐 경우
                    if (total.today.date === nowTime) {
                        //내용이 같을 경우
                        // list.ts해당 날짜 맨 마지막 항목을 incomeMoney or exportMoney 에 합산

                        const activeTrue= Object.keys(sendItem.active).find(key => sendItem.active[key] === true);
                        if(String(activeTrue) === "income"){
                            //income:true일 경우
                            if(sendItem.money !== null){
                                totalCopy.today.incomeMoney += sendItem.money;
                            }
                        }
                        if(String(activeTrue) === "export") {
                            //export:true일 경우
                            if(sendItem.money !== null){
                                totalCopy.today.exportMoney += sendItem.money;
                            }
                        }
                    } else {
                        //내용이 다를 경우
                        //money 두 항목 내용 삭제 -> incomeMoney or exportMoney 에 합산
                    }
                } else {
                    //공란일 경우 nowTime 삽입
                    totalCopy.today.date = nowTime;
                }

                return { total: totalCopy };
            }),
    };
});

/* 한달별 */
export const useDateMouthStore = create(() => {
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
