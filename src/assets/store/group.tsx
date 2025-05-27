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

interface HighCategory {
    isView: boolean;
    lengthColor: {
        "#FFA742": number;
        "#9EF284": number;
        "#B560F5": number;
        "#030417": number;
    };
}
interface moneyBase<T> {
    money: T;
    highCategory: HighCategory;
}
interface DateTotalStoreType<T> {
    date?: string | number | null;
    koreanName: string;
    income: moneyBase<T>;
    export: moneyBase<T>;
}
interface DateTotalStore {
    total: {
        today: DateTotalStoreType<number>;
        week: DateTotalStoreType<number>;
        thisMonth: DateTotalStoreType<number[]>;
        lastMonth: DateTotalStoreType<number[]>;
    };
    dateUpdate: (nowTime: string) => void;
    moneyMathSum: (nowTime: string, item: ListItem) => void;
}
/* 오늘, 주간 */
export const useDateTotalStore = create<DateTotalStore>((set) => {
    return {
        total: {
            today: {
                date: "",
                koreanName: "오늘",
                income: {
                    money: 0,
                    highCategory: {
                        isView: false,
                        lengthColor: {
                            "#FFA742": 0,
                            "#9EF284": 0,
                            "#B560F5": 0,
                            "#030417": 0,
                        },
                    },
                },
                export: {
                    money: 0,
                    highCategory: {
                        isView: false,
                        lengthColor: {
                            "#FFA742": 0,
                            "#9EF284": 0,
                            "#B560F5": 0,
                            "#030417": 0,
                        },
                    },
                },
                /*incomeMoney: 0,
                exportMoney: 0,
                highCategory: {
                    isView: false,
                    lengthColor: {
                        "#FFA742": 0,
                        "#9EF284": 0,
                        "#B560F5": 0,
                        "#030417": 0,
                    },
                },*/
            },
            week: {
                date: null,
                koreanName: "주간",
                income: {
                    money: 0,
                    highCategory: {
                        isView: false,
                        lengthColor: {
                            "#FFA742": 0,
                            "#9EF284": 0,
                            "#B560F5": 0,
                            "#030417": 0,
                        },
                    },
                },
                export: {
                    money: 0,
                    highCategory: {
                        isView: false,
                        lengthColor: {
                            "#FFA742": 0,
                            "#9EF284": 0,
                            "#B560F5": 0,
                            "#030417": 0,
                        },
                    },
                },
            },
            thisMonth: {
                koreanName: "월간",
                income: {
                    money: [],
                    highCategory: {
                        isView: false,
                        lengthColor: {
                            "#FFA742": 0,
                            "#9EF284": 0,
                            "#B560F5": 0,
                            "#030417": 0,
                        },
                    },
                },
                export: {
                    money: [],
                    highCategory: {
                        isView: false,
                        lengthColor: {
                            "#FFA742": 0,
                            "#9EF284": 0,
                            "#B560F5": 0,
                            "#030417": 0,
                        },
                    },
                },
            },
            lastMonth: {
                koreanName: "저번달",
                income: {
                    money: [],
                    highCategory: {
                        isView: false,
                        lengthColor: {
                            "#FFA742": 0,
                            "#9EF284": 0,
                            "#B560F5": 0,
                            "#030417": 0,
                        },
                    },
                },
                export: {
                    money: [],
                    highCategory: {
                        isView: false,
                        lengthColor: {
                            "#FFA742": 0,
                            "#9EF284": 0,
                            "#B560F5": 0,
                            "#030417": 0,
                        },
                    },
                },
            },
        },
        dateUpdate: (nowTime) => {
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

                if (!total.today.date) {
                    totalCopy.today.date = nowTime;
                }
                //주간
                if (total.week.date === null) {
                    totalCopy.week.date = week;
                }

                return { total: totalCopy };
            });
        },
        moneyMathSum: (nowTime, sendItem) =>
            set((state) => {
                const total = state.total;
                const totalCopy = {
                    ...total,
                    today: {
                        ...total.today,
                        income: {
                            ...total.today.income,
                            highCategory: {
                                ...total.today.income.highCategory,
                                lengthColor: { ...total.today.income.highCategory.lengthColor },
                            },
                        },
                        export: {
                            ...total.today.income,
                            highCategory: {
                                ...total.today.income.highCategory,
                                lengthColor: { ...total.today.income.highCategory.lengthColor },
                            },
                        },
                    },
                    week: {
                        ...total.week,
                        income: {
                            ...total.week.income,
                            highCategory: {
                                ...total.week.income.highCategory,
                                lengthColor: { ...total.week.income.highCategory.lengthColor },
                            },
                        },
                        export: {
                            ...total.week.income,
                            highCategory: {
                                ...total.week.income.highCategory,
                                lengthColor: { ...total.week.income.highCategory.lengthColor },
                            },
                        },
                    },
                    thisMonth: {
                        ...total.thisMonth,
                        income: {
                            ...total.thisMonth.income,
                            highCategory: {
                                ...total.thisMonth.income.highCategory,
                                lengthColor: { ...total.thisMonth.income.highCategory.lengthColor },
                            },
                        },
                        export: {
                            ...total.thisMonth.income,
                            highCategory: {
                                ...total.thisMonth.income.highCategory,
                                lengthColor: { ...total.thisMonth.income.highCategory.lengthColor },
                            },
                        },
                    },
                };

                /*
                 * sendItem 의 category 색상 갯수를 확인,
                 * highCategory는 리스트에 5개 이상 있을 경우 제일 높은 것 먼저 노출 / 제일 갯수가 높은 것 2개 노출됨
                 * 오늘 : 오늘 날짜인지 확인, 같으면 합계 / 다르면 초기화
                 * 월간 : 주간별로 카테고리 저장
                 * */

                //주간 체크 변수
                const currentWeek = moment.utc(nowTime).local().week();
                const firstMonthWeek = moment.utc(nowTime).startOf("month").week();
                const week = currentWeek - firstMonthWeek + 1;

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
                                if (
                                    typeof totalCopy.thisMonth.income.money[week - 1] !== "number"
                                ) {
                                    totalCopy.thisMonth.income.money[week - 1] = 0;
                                }
                                totalCopy.today.income.money += sendItem.money;
                                totalCopy.thisMonth.income.money[week - 1] += sendItem.money;

                                const colorKey = sendItem.category
                                    .color as keyof (typeof totalCopy.today.income.highCategory)["lengthColor"];
                                if (sendItem.category.color !== "") {
                                    totalCopy.today.income.highCategory.lengthColor[colorKey] += 1;
                                }
                            }
                        }
                        if (String(activeTrue) === "export") {
                            //export:true일 경우
                            if (sendItem.money !== null) {
                                if (
                                    typeof totalCopy.thisMonth.export.money[week - 1] !== "number"
                                ) {
                                    totalCopy.thisMonth.export.money[week - 1] = 0;
                                }
                                totalCopy.today.export.money += sendItem.money;
                                totalCopy.thisMonth.export.money[week - 1] += sendItem.money;

                                const colorKey = sendItem.category
                                    .color as keyof (typeof totalCopy.today.export.highCategory)["lengthColor"];
                                if (sendItem.category.color !== "") {
                                    totalCopy.today.export.highCategory.lengthColor[colorKey] += 1;
                                }
                            }
                        }
                    } else {
                        //내용이 다를 경우
                        //money 두 항목 내용 삭제 -> incomeMoney or exportMoney 에 합산

                        totalCopy.today.income.money = 0;
                        totalCopy.today.export.money = 0;

                        const activeTrue = Object.keys(sendItem.active).find((key) => {
                            const typeKey = key as keyof (typeof sendItem)["active"];
                            return sendItem.active[typeKey] === true;
                        });

                        if (String(activeTrue) === "income") {
                            //income:true일 경우
                            if (sendItem.money !== null) {
                                if (
                                    typeof totalCopy.thisMonth.income.money[week - 1] !== "number"
                                ) {
                                    totalCopy.thisMonth.income.money[week - 1] = 0;
                                }
                                totalCopy.today.income.money += sendItem.money;
                                totalCopy.thisMonth.income.money[week - 1] += sendItem.money;
                            }
                        }
                        if (String(activeTrue) === "export") {
                            //export:true일 경우
                            if (sendItem.money !== null) {
                                if (
                                    typeof totalCopy.thisMonth.export.money[week - 1] !== "number"
                                ) {
                                    totalCopy.thisMonth.export.money[week - 1] = 0;
                                }
                                totalCopy.today.export.money += sendItem.money;
                                totalCopy.thisMonth.export.money[week - 1] += sendItem.money;
                            }
                        }
                    }
                }

                //주간
                if (total.week.date !== null) {
                    //공란이 아닐 경우
                    if (total.week.date === week) {
                        //주차가 동일할경우
                        totalCopy.week.income.money = totalCopy.thisMonth.income.money[week - 1];
                        totalCopy.week.export.money = totalCopy.thisMonth.export.money[week - 1];
                    } else {
                        //주차가 동일하지 않을 경우
                        //초기화
                        totalCopy.week.date = week;
                        totalCopy.week.income.money = 0;
                        totalCopy.week.export.money = 0;
                    }
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
