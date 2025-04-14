import moment from "moment";

import { useTotalStore } from "../store/group.ts";
import { useListStore } from "../store/list.ts";
import { useState } from "react";

export default function Bord() {
    const total = useTotalStore((state) => state.total);
    const list = useListStore((state) => state.allList);

    const nowTime = moment().format("YYYY-MM-DD");
    const listFind = list.find((allList) => allList.date === nowTime);

    const [inputState, setInputState] = useState({
        active: {
            income: false,
            export: false,
        },
    });

    console.log(listFind?.list);
    return (
        <>
            <div>
                <ul>
                    <li>날짜순</li>
                    <li>카테고리순</li>
                </ul>
                <ul>
                    <li>{total.today.koreanName}</li>
                    <li>{total.week.koreanName}</li>
                    <li>{total.thisMonth.koreanName}</li>
                    <li>{total.lastMonth.koreanName}</li>
                </ul>
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
