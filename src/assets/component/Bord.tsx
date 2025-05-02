import moment from "moment";
import styled from "styled-components";

import { useTotalStore } from "../store/group.ts";
import { useListStore } from "../store/list.ts";
import { useState } from "react";

const CategoryWrap = styled.ul`
    position: relative;
`;
const CategoryTab = styled.ul`
    display: flex;
    position: absolute;
    top: -68px;
    li {
        background-color: #fff;
        border-radius: 40px;
        box-shadow: 2px 4px 4px rgba(0, 0, 0, 0.05);
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
            background-color: transparent;
        }
    }
`;
const DateList = styled.ul`
    width: 452px;
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
    > li {
        padding: 15px 20px;
        box-sizing: border-box;
        border-radius: 40px;
        background-color: rgba(255, 255, 255, 0.8);
        b {
            width: 172px;
            display: block;
            color: #3f3f3f;
            font-size: 48px;
            font-weight: 400;
            text-align: right;
        }
    }
`;
const MoneyList = styled.div`
    display: flex;
    gap: 10px;
    padding-top: 24px;
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
                font-size: 24px;
                line-height: 110%;
                text-align: right;
                &.income {
                    color: #df2121;
                }
                &.export {
                    color: #1e82ac;
                }
            }
        }
    }
    .active-box {
        display: flex;
        gap: 5px;
    }
    .category-wrap {
        display: flex;
        justify-content: space-between;
        padding: 15px 24px 20px;
        box-sizing: border-box;
        > button {
            width: 15px;
            height: 15px;
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
        }
        > input {
            width: 70%;
            font-size: 14px;
            line-height: 110%;
            outline: none;
            border: none;
        }
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

interface SaveInput {
    active: {
        income: { korean: string; isActive: boolean };
        export: { korean: string; isActive: boolean };
    };
    money: number;
    memo: string;
}

export default function Bord() {
    const total = useTotalStore((state) => state.total);
    const list = useListStore((state) => state.allList);
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
        money: 0,
        memo: "",
    });
    const [saveCategory, setSaveCategory] = useState({
        color: "",
        name: "",
    });

    const nowTime = moment().format("YYYY-MM-DD");
    const nowDay = moment().format("DD");
    const listFind = list.find((allList) => allList.date === nowTime);

    /*    const [inputState, setInputState] = useState({
        active: {
            income: false,
            export: false,
        },
    });*/

    /*console.log(listFind?.list);*/
    return (
        <>
            <CategoryWrap>
                <CategoryTab>
                    <li>
                        <button type="button">날짜순</button>
                    </li>
                    <li>
                        <button type="button">카테고리순</button>
                    </li>
                </CategoryTab>
                <DateList>
                    {Object.entries(total).map(([_key, value], index) => {
                        return (
                            <li key={index}>
                                <b>{value.koreanName}</b>
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
                            </li>
                        );
                    })}
                </DateList>
            </CategoryWrap>
            <div>
                <AddInput>
                    <div>
                        <button type="button" className="button-add">
                            <span>+</span>
                        </button>
                    </div>
                    <p className="text-day">{nowDay}</p>
                    <div className="money-wrap">
                        <div className="active-box">
                            {saveInput.active
                                ? Object.entries(saveInput.active).map(([key, value], index) => {
                                      const typedKey = key as keyof SaveInput["active"];

                                      return (
                                          <ActiveButton
                                              $activeText={`${saveInput.active.income.isActive ? "#DF2121" : "#1E82AC"}`}
                                              $activeBackground={`${saveInput.active.income.isActive ? "#FFC2C2" : "#C1F6FF"}`}
                                              type="button"
                                              className={`${saveInput.active[typedKey].isActive ? "active" : ""}`}
                                              onClick={() => {
                                                  /* TODO:: 동시에 두개 활성화될 수 없도록 작업 예정 */
                                                  const copy = { ...saveInput };

                                                  /* 1. 버튼 하나 on/off 기능을 만든다
                                                   *  2. 어떤 버튼을 클릭했는지 확인한다
                                                   *  3. 이전과 다른 버튼을 클릭했을 경우 모두 false되고 클릭한 것만 true
                                                   *  4. 이전과 같은 버튼을 클릭했을 경우 prev 값의 반대
                                                   *  */

                                                  setSaveInput({ ...copy });
                                              }}
                                              key={index}
                                          >
                                              {value.korean}
                                          </ActiveButton>
                                      );
                                  })
                                : null}
                        </div>
                        <div className="money-input">
                            <input
                                type="text"
                                className={`${saveInput.active.income.isActive ? "income" : "export"}`}
                            />
                            원
                        </div>
                    </div>
                    <div className="category-wrap">
                        {/* 카테고리 선택 및 메모 입력란 */}
                        <button type="button"></button>
                        <input type="text" placeholder="메모란..." />
                    </div>
                </AddInput>
                <div>
                    {listFind
                        ? listFind.list.map((element, index) => {
                              return <div key={index}>{element.memo}</div>;
                          })
                        : null}
                </div>
            </div>
        </>
    );
}
