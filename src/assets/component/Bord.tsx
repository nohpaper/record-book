import moment from "moment";
import styled from "styled-components";

import { useTotalStore } from "../store/group.ts";
import { useListStore } from "../store/list.ts";
/*import { useState } from "react";*/

const CategoryTab = styled.ul`
    display: flex;
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
    padding-top: 20px;
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

export default function Bord() {
    const total = useTotalStore((state) => state.total);
    const list = useListStore((state) => state.allList);

    const nowTime = moment().format("YYYY-MM-DD");
    const listFind = list.find((allList) => allList.date === nowTime);

    /*    const [inputState, setInputState] = useState({
        active: {
            income: false,
            export: false,
        },
    });*/

    console.log(listFind?.list);
    return (
        <>
            <div>
                <CategoryTab>
                    <li>
                        <button type="button">날짜순</button>
                    </li>
                    <li>
                        <button type="button">카테고리순</button>
                    </li>
                </CategoryTab>
                <DateList>
                    <li>
                        <b>{total.today.koreanName}</b>
                        <MoneyList>
                            <div>
                                <ul className="top4-category">
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                </ul>
                                <p className="text-income">3500원</p>
                            </div>
                            <div>
                                <ul className="top4-category">
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                </ul>
                                <p className="text-export">3500원</p>
                            </div>
                        </MoneyList>
                    </li>
                    <li>
                        <b>{total.week.koreanName}</b>
                        <MoneyList>
                            <div>
                                <ul className="top4-category">
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                </ul>
                                <p className="text-income">3500원</p>
                            </div>
                            <div>
                                <ul className="top4-category">
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                </ul>
                                <p className="text-export">3500원</p>
                            </div>
                        </MoneyList>
                    </li>
                    <li>
                        <b>{total.thisMonth.koreanName}</b>
                        <MoneyList>
                            <div>
                                <ul className="top4-category">
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                </ul>
                                <p className="text-income">3500원</p>
                            </div>
                            <div>
                                <ul className="top4-category">
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                </ul>
                                <p className="text-export">3500원</p>
                            </div>
                        </MoneyList>
                    </li>
                    <li>
                        <b>{total.lastMonth.koreanName}</b>
                        <MoneyList>
                            <div>
                                <ul className="top4-category">
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                </ul>
                                <p className="text-income">3500원</p>
                            </div>
                            <div>
                                <ul className="top4-category">
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                </ul>
                                <p className="text-export">3500원</p>
                            </div>
                        </MoneyList>
                    </li>
                </DateList>
            </div>
            <div>
                <div>
                    <button type="button">추가</button>
                    <p>14</p> {/* day */}
                    <div>
                        <div>
                            <button type="button">수입</button>
                            <button type="button">지출</button>
                        </div>
                        <div></div> {/* n원 */}
                    </div>
                    <div>{/* 카테고리 선택 및 메모 입력란 */}</div>
                </div>
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
