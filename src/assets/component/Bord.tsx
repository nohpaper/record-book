import moment from "moment";
import styled from "styled-components";

import { useDateTotalStore, useCategoryTotalStore } from "../store/group.ts";
import { useListStore } from "../store/list.ts";
import { useState, useRef } from "react";

const CategoryWrap = styled.ul`
    position: relative;
`;
const CategoryTab = styled.ul`
    display: flex;
    position: absolute;
    top: -68px;
    li {
        &:nth-of-type(n + 2) {
            margin-left: 10px;
        }
        button {
            display: block;
            padding: 12px 20px;
            border: 0;
            outline: none;
            color: #141414;
            font-size: 16px;
            font-weight: 400;
            cursor: pointer;
            background-color: #fff;
            border-radius: 40px;
            box-shadow: 2px 4px 4px rgba(0, 0, 0, 0.05);
            transition: all 0.5s;
            &.active,
            &:hover {
                color: #fff;
                background-color: #ff5858;
            }
        }
    }
`;
const DateList = styled.ul`
    width: 452px;
    display: none;
    gap: 20px;
    flex-wrap: wrap;
    &.active {
        display: flex;
    }
`;
const DataGroup = styled.li<{
    $backgroundColor: string;
    $isGradient: boolean;
    $isTextTransform: boolean;
}>`
    position: relative;
    min-height: 160px;
    padding: 15px 20px;
    box-sizing: border-box;
    border-radius: 40px;
    background-color: rgba(255, 255, 255, 0.8);
    background-image: ${(props) =>
            props.$isGradient
                    ? `linear-gradient(0deg, ${props.$backgroundColor}, transparent)`
                    : "inherit"};
    .category-name {
        width: 172px;
        display: block;
        overflow: hidden;
    }
    b {
        display: block;
        color: #3f3f3f;
        font-size: 32px;
        font-weight: 400;
        text-wrap: nowrap;
        text-wrap-mode: nowrap;
        text-align: right;
        transition: all 3s linear;
        &:hover {
            transform: ${(props) => (props.$isTextTransform ? "translateX(-100%)" : "inherit")};
        }
    }
`;
const MoneyList = styled.div`
    width: 100%;
    position: absolute;
    bottom: 27px;
    left: 0;
    display: flex;
    gap: 10px;
    padding: 24px 24px 0;
    box-sizing: border-box;
    > div {
        width: 50%;
        .top4-category {
            display: flex;
            justify-content: flex-end;
            padding-bottom: 5px;
            li {
                width: 10px;
                height: 10px;
                border-radius: 100%;
                background-color: #000;
                &:nth-of-type(n + 2) {
                    margin-left: 2px;
                }
            }
        }
        p {
            font-size: 20px;
            font-weight: 400;
            line-height: 110%;
            text-align: right;
            &.text-income {
                color: #df2121;
            }
            &.text-export {
                color: #1e82ac;
            }
        }
    }
`;
const AddInput = styled.div`
    min-width: 288px;
    position: relative;
    margin-left: 14px;
    border-radius: 40px;
    background-color: rgba(255, 255, 255, 0.7);
    box-shadow: 2px 4px 4px rgba(0, 0, 0, 0.1);
    .button-add {
        width: 55px;
        height: 55px;
        position: absolute;
        top: -12px;
        left: -14px;
        cursor: pointer;
        outline: none;
        border: none;
        border-radius: 100%;
        background-color: #ff5858;
        transition: all 0.5s;
        span {
            display: block;
            margin-top: -10px;
            color: #fff;
            font-size: 64px;
            font-weight: 300;
        }
        &:hover {
            transform: rotate(90deg);
        }
    }
    .text-day {
        padding: 12px 24px 0;
        box-sizing: border-box;
        color: #999999;
        font-size: 64px;
        font-weight: 400;
        line-height: 110%;
        text-align: right;
    }
    .money-wrap {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 22px 24px 0;
        box-sizing: border-box;
        .money-input {
            display: flex;
            font-size: 24px;
            line-height: 110%;
            text-align: right;
            input {
                width: 85px;
                outline: none;
                border: none;
                color: #000;
                font-size: 24px;
                line-height: 110%;
                text-align: right;
                &.income {
                    color: #df2121;
                }
                &.export {
                    color: #1e82ac;
                }
                /* Chrome, Safari, Edge */
                &::-webkit-outer-spin-button,
                &::-webkit-inner-spin-button {
                    -webkit-appearance: none;
                    margin: 0;
                }
                /* Firefox */
                &[type="number"] {
                    -moz-appearance: textfield;
                }
            }
        }
    }
    .active-box {
        display: flex;
        gap: 5px;
    }
    .category-wrap {
        position: relative;
        display: flex;
        justify-content: space-between;
        padding: 15px 24px 20px;
        box-sizing: border-box;
        > input {
            width: 70%;
            font-size: 14px;
            line-height: 110%;
            outline: none;
            border: none;
        }
    }
`;

const CategorySelectBox = styled.div<{ $isActive: boolean }>`
    position: absolute;
    top: 70%;
    left: 20px;
    padding: 11px 16px;
    border: 1px solid #e9e9e9;
    border-radius: 20px;
    box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.15);
    background-color: #fff;
    z-index: 10;
    display: ${(props) => (props.$isActive ? "block" : "none")};
    .select-button-box {
        display: flex;
    }
    .select-name {
        padding-top: 10px;
        input {
            font-size: 14px;
            font-weight: 400;
            outline: none;
            border: none;
        }
    }
`;
const SelectButton = styled.button<{ $defaultColor: string }>`
    width: 10px;
    height: 12px;
    position: relative;
    margin: 5px;
    outline: 0;
    border: 0;
    border-radius: 100%;
    cursor: pointer;
    box-sizing: border-box;
    background-color: ${(props) => props.$defaultColor};
    &::before {
        content: "";
        width: 0;
        height: 0;
        position: absolute;
        top: 50%;
        left: 50%;
        border-radius: 100%;
        transform: translate(-50%, -50%);
        transition: all 0.5s;
        background-color: ${(props) => props.$defaultColor};
    }
    &.active::before {
        width: 15px;
        height: 15px;
    }
    span {
        position: absolute;
        width: 1px;
        height: 1px;
        margin: -1px;
        overflow: hidden;
        clip-path: polygon(0 0, 0 0, 0 0);
    }
`;
const ActiveButton = styled.button<{ $activeText: string; $activeBackground: string }>`
    padding: 5px 14px;
    border-radius: 20px;
    outline: none;
    border: none;
    cursor: pointer;
    color: #575757;
    font-size: 14px;
    font-weight: 400;
    background-color: #d4d4d4;
    &.active {
        color: ${(props) => props.$activeText};
        background-color: ${(props) => props.$activeBackground};
    }
`;
const CategorySelectButton = styled.button<{ $activeColor: string }>`
    width: 15px;
    height: 15px;
    position: relative;
    cursor: pointer;
    outline: none;
    border: none;
    border-radius: 100%;
    background: linear-gradient(
        to right,
        #ff2323,
        #ff8c27,
        #ffee31,
        #2db64b,
        #26a1ce,
        #254c87,
        #8027ee
    );
    &::before {
        content: "";
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        border-radius: 100%;
        background-color: ${(props) => props.$activeColor};
    }
`;
const DayList = styled.ul`
    display: flex;
    gap: 10px;
    flex-direction: column;
    padding-top: 20px;
    margin-left: 14px;
`;
const DayListItem = styled.li<{ $categoryColor: string }>`
    min-width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 17px 25px;
    box-sizing: border-box;
    border-radius: 40px;
    background-color: rgba(255, 255, 255, 0.7);
    .category-info {
        width: 80px;
    }
    h5 {
        min-width: 90px;
        margin-right: 5px;
        font-size: 16px;
        font-weight: 400;
        line-height: 140%;
        text-align: right;
    }
    .active-button {
        font-size: 14px;
        font-weight: 400;
        padding: 5px 14px;
        border-radius: 20px;
    }
    &.income {
        h5 {
            color: #df2121;
        }
        .active-button {
            color: #df2121;
            background-color: #ffc2c2;
        }
    }
    &.export {
        h5 {
            color: #1c485b;
        }
        .active-button {
            color: #1e82ac;
            background-color: #c1f6ff;
        }
    }
    .category-box {
        padding-top: 10px;
        span {
            width: 15px;
            height: 15px;
            display: block;
            border-radius: 100%;
            background-color: ${(props) => props.$categoryColor};
        }
    }
`;

interface SaveInput {
    active: {
        income: { korean: string; isActive: boolean };
        export: { korean: string; isActive: boolean };
    };
    category: {
        color: string;
        name: string;
    };
    money: number | null;
    memo: string;
}
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
interface CategoryList {
    id: number;
    isActive: boolean;
    color: string;
    name: string;
}

/* TODO::
 *       1.     money-input > input 태그 saveInput.active 내에 income / export 모두 false면 color:#000으로 변경
 *       2.     카테고리 클릭 시 노출되도록 작업 ---> ok
 *       3.     카테고리 input 입력값 작업 ----> ok
 *
 *  */

export default function Bord() {
    const list = useListStore((state) => state.allList);
    const datapush = useListStore((state) => state.dataPush);
    const total = useDateTotalStore((state) => state.total);
    const todayMathSum = useDateTotalStore((state) => state.todayMathSum);

    const [isCategoryActive, setIsCategoryActive] = useState(false);
    const [categoryList, setCategoryList] = useState<CategoryList[]>([
        {
            id: 0,
            isActive: false,
            color: "#FFA742",
            name: "기본 카테고리1",
        },
        {
            id: 1,
            isActive: false,
            color: "#9EF284",
            name: "기본 카테고리2",
        },
        {
            id: 2,
            isActive: false,
            color: "#B560F5",
            name: "기본 카테고리3",
        },
        {
            id: 3,
            isActive: false,
            color: "#030417",
            name: "기본 카테고리4",
        },
    ]);
    const [saveInput, setSaveInput] = useState<SaveInput>({
        active: {
            income: {
                korean: "수입",
                isActive: false,
            },
            export: {
                korean: "지출",
                isActive: false,
            },
        },
        category: {
            color: "",
            name: "",
        },
        money: null,
        memo: "",
    });
    const [sendItem, setSendItem] = useState<ListItem>({
        index: 0,
        category: {
            color: "",
            name: "",
        },
        memo: "",
        active: {
            income: false,
            export: false,
        },
        money: null,
    });
    const [currentKey, setCurrentKey] = useState<string | null>(null);
    const prevKeyRef = useRef<string | null>(null);

    const nowTime = moment().format("YYYY-MM-DD");
    const nowDay = moment().format("DD");
    const listFind = list.find((allList) => allList.date === nowTime);
    const categorySelect = categoryList.filter((item) => item.isActive);

    //통계 관련 변수
    const dateTotal = useDateTotalStore((state) => state.total);
    const categoryTotal = useCategoryTotalStore((state) => state.total);
    const [activeTab, setActiveTab] = useState("date");

    return (
        <>
            <CategoryWrap>
                <CategoryTab>
                    <li>
                        <button
                            type="button"
                            className={activeTab === "date" ? "active" : ""}
                            onClick={() => {
                                const tabName = "date";
                                if (activeTab !== tabName) {
                                    setActiveTab(tabName);
                                }
                            }}
                        >
                            날짜순
                        </button>
                    </li>
                    <li>
                        <button
                            type="button"
                            className={activeTab === "category" ? "active" : ""}
                            onClick={() => {
                                const tabName = "category";
                                if (activeTab !== tabName) {
                                    setActiveTab(tabName);
                                }
                            }}
                        >
                            카테고리순
                        </button>
                    </li>
                </CategoryTab>
                <div>
                    <DateList className={activeTab === "date" ? "active" : ""}>
                        {Object.entries(dateTotal).map(([_key, value], index) => {
                            return (
                                <DataGroup $isGradient={false} $isTextTransform={false} key={index}>
                                    <div className="category-name">
                                        <b>{value.koreanName}</b>
                                    </div>
                                    <MoneyList>
                                        <div>
                                            <ul className="top4-category">
                                                {value.highCategory
                                                    ? value.highCategory.map((item) => {
                                                        return <li>{item}</li>;
                                                    })
                                                    : null}
                                            </ul>
                                            <p className="text-income">{value.incomeMoney}원</p>
                                        </div>
                                        <div>
                                            <ul className="top4-category">
                                                {value.highCategory
                                                    ? value.highCategory.map((item) => {
                                                        return <li>{item}</li>;
                                                    })
                                                    : null}
                                            </ul>
                                            <p className="text-export">{value.exportMoney}원</p>
                                        </div>
                                    </MoneyList>
                                </DataGroup>
                            );
                        })}
                    </DateList>
                    <DateList className={activeTab === "category" ? "active" : ""}>
                        {categoryTotal.map((element, index) => {
                            return (
                                <DataGroup
                                    $backgroundColor={element.color}
                                    $isGradient={true}
                                    $isTextTransform={true}
                                    key={index}
                                >
                                    <div className="category-name">
                                        <b>{element.koreanName}</b>
                                    </div>
                                    <MoneyList>
                                        <div>
                                            <p className="text-income">{element.incomeMoney}원</p>
                                        </div>
                                        <div>
                                            <p className="text-export">{element.exportMoney}원</p>
                                        </div>
                                    </MoneyList>
                                </DataGroup>
                            );
                        })}
                    </DateList>
                </div>
            </CategoryWrap>
            <div>
                <AddInput>
                    <form
                        onSubmit={(event) => {
                            event.preventDefault();
                            const sendCopy = {
                                ...sendItem,
                                active: { ...sendItem.active },
                                category: { ...sendItem.category },
                            };

                            const activeIsActive = Object.keys(saveInput.active).map((key) => {
                                const activeKey = key as keyof SaveInput["active"];

                                sendCopy.active[activeKey] = false; //active를 전체 false

                                if (saveInput.active[activeKey].isActive) {
                                    //isActive:ture 일 경우 sendCopy내부 내용 변경
                                    sendCopy.index = sendCopy.index + 1;
                                    sendCopy.active[activeKey] =
                                        saveInput.active[activeKey].isActive;
                                    sendCopy.category.color = saveInput.category.color;
                                    sendCopy.category.name = saveInput.category.name;
                                    sendCopy.money = saveInput.money;
                                    sendCopy.memo = saveInput.memo;
                                }
                                return saveInput.active[activeKey].isActive; //isActive를 배열에 담아 return
                            });

                            if (activeIsActive.includes(true) && sendCopy.money !== null) {
                                //active.isActive에 true가 있을 경우
                                setSendItem({ ...sendCopy });

                                console.log(total.today);

                                datapush(nowTime, sendCopy);
                                todayMathSum(nowTime, sendCopy);

                                //list.ts에 데이터 전송 후 태그에 있는 값 초기화
                                const saveCopy = {
                                    ...saveInput,
                                    active: {
                                        income: { ...saveInput.active.income },
                                        export: { ...saveInput.active.export },
                                    },
                                    category: { ...sendItem.category },
                                };

                                saveCopy.active.income.isActive = false;
                                saveCopy.active.export.isActive = false;
                                saveCopy.category.color = "";
                                saveCopy.category.name = "";
                                saveCopy.money = null;
                                saveCopy.memo = "";
                                setSaveInput({ ...saveCopy });

                                //categoryList.isActive 모두 false 로 초기화 (name은 초기화 X)
                                const categoryCopy = [...categoryList];
                                categoryCopy.map(function (element) {
                                    element.isActive = false;
                                });
                                setCategoryList([...categoryCopy]);
                            } else {
                                alert("수입/지출 버튼과 금액은 필수 입력 항목입니다.");
                            }
                        }}
                    >
                        <div>
                            <button type="submit" className="button-add">
                                <span>+</span>
                            </button>
                        </div>
                        <p className="text-day">{nowDay}</p>
                        <div className="money-wrap">
                            <div className="active-box">
                                {saveInput.active
                                    ? Object.entries(saveInput.active).map(
                                        ([key, value], index) => {
                                            const typedKey = key as keyof SaveInput["active"];

                                            return (
                                                <ActiveButton
                                                    $activeText={`${saveInput.active.income.isActive ? "#DF2121" : "#1E82AC"}`}
                                                    $activeBackground={`${saveInput.active.income.isActive ? "#FFC2C2" : "#C1F6FF"}`}
                                                    type="button"
                                                    className={`${saveInput.active[typedKey].isActive ? "active" : ""}`}
                                                    onClick={() => {
                                                        const saveCopy = { ...saveInput };

                                                        if (currentKey !== key) {
                                                            //이전 클릭 값과 다를 경우
                                                            Object.entries(saveCopy.active).map(
                                                                ([allKeys, _]) => {
                                                                    const allkey =
                                                                        allKeys as keyof SaveInput["active"];
                                                                    return (saveCopy.active[
                                                                        allkey
                                                                        ].isActive = false);
                                                                },
                                                            );
                                                            saveCopy.active[typedKey].isActive =
                                                                true;
                                                        } else {
                                                            //이전 클릭 값과 같을 경우
                                                            saveCopy.active[typedKey].isActive =
                                                                !saveCopy.active[typedKey]
                                                                    .isActive;
                                                        }

                                                        prevKeyRef.current = key; // 현재 key를 다음 클릭을 위한 prev로 저장
                                                        setCurrentKey(key);
                                                        setSaveInput({ ...saveCopy });
                                                    }}
                                                    key={index}
                                                >
                                                    {value.korean}
                                                </ActiveButton>
                                            );
                                        },
                                    )
                                    : null}
                            </div>
                            <div className="money-input">
                                <input
                                    type="number"
                                    className={`${saveInput.active.income.isActive ? "income" : "export"}`}
                                    value={saveInput.money ?? ""}
                                    onChange={(event) => {
                                        const saveCopy = { ...saveInput };
                                        saveCopy.money = Number(event.target.value);
                                        setSaveInput({ ...saveCopy });
                                    }}
                                />
                                원
                            </div>
                        </div>
                        <div className="category-wrap">
                            {/* 카테고리 선택 및 메모 입력란 */}
                            <CategorySelectButton
                                type="button"
                                $activeColor={saveInput.category.color ?? "transparent"}
                                onClick={() => {
                                    //category 선택창 toggle
                                    setIsCategoryActive((prev) => !prev);
                                }}
                            ></CategorySelectButton>
                            <input
                                type="text"
                                placeholder="메모란..."
                                value={saveInput.memo}
                                onChange={(event) => {
                                    const saveCopy = { ...saveInput };
                                    saveCopy.memo = String(event.target.value);
                                    setSaveInput({ ...saveCopy });
                                }}
                            />
                            <CategorySelectBox $isActive={isCategoryActive}>
                                <ul className="select-button-box">
                                    {categoryList.map((element, index) => {
                                        return (
                                            <li key={index}>
                                                <SelectButton
                                                    type="button"
                                                    $defaultColor={element.color}
                                                    className={element.isActive ? "active" : ""}
                                                    onClick={() => {
                                                        const categoryCopy = [...categoryList];
                                                        const saveCopy = { ...saveInput };
                                                        const clickCategory = categoryCopy.filter(
                                                            (item) => item.id === element.id,
                                                        ); //클릭한 카테고리와 동일한 id 찾기

                                                        if (!clickCategory[0].isActive) {
                                                            //클릭한 항목이 false일 경우
                                                            categoryCopy.map((item) => {
                                                                item.isActive = false;
                                                            }); //전체 isActive false
                                                            clickCategory[0].isActive = true; //클릭한 항목에만 isActive:true

                                                            saveCopy.category.color =
                                                                clickCategory[0].color;
                                                        } else {
                                                            //클릭한 항목이 true일 경우
                                                            clickCategory[0].isActive = false; //클릭한 항목에만 isActive:false
                                                            saveCopy.category.color = "";
                                                        }
                                                        setCategoryList([...categoryCopy]);
                                                        //클릭한 항목을 categoryList에 업데이트하고

                                                        setSaveInput({ ...saveCopy });
                                                    }}
                                                >
                                                    <span>{element.name}</span>
                                                </SelectButton>
                                            </li>
                                        );
                                    })}
                                </ul>
                                <div className="select-name">
                                    <input
                                        type="text"
                                        value={
                                            categorySelect.length > 0 ? categorySelect[0].name : ""
                                        }
                                        onChange={(event) => {
                                            const nameChange = categoryList.map((element) => {
                                                if (categorySelect[0].id === element.id) {
                                                    element.name = event.target.value;
                                                }
                                                return element;
                                            });
                                            setCategoryList(nameChange);
                                        }}
                                    />
                                </div>
                            </CategorySelectBox>
                        </div>
                    </form>
                </AddInput>
                <DayList>
                    {listFind
                        ? listFind.list.map((element, index) => {
                            /*console.log(element, element.active.income);*/
                            return (
                                <DayListItem
                                    key={index}
                                    $categoryColor={
                                        element.category.color ? element.category.color : ""
                                    }
                                    className={`${element.active.income ? "income" : "export"}`}
                                >
                                    <div className="category-info">
                                        <p>{element.memo}</p>
                                        <div className="category-box">
                                            <span></span>
                                        </div>
                                    </div>
                                    <h5>{element.money}원</h5>
                                    <span className="active-button">
                                          {element.active.income ? "수입" : "지출"}
                                      </span>
                                </DayListItem>
                            );
                        })
                        : null}
                </DayList>
            </div>
        </>
    );
}