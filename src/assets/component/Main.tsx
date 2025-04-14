import Calculator from "./Calculator.tsx";
import Bord from "./Bord.tsx";

export default function Main() {
    return (
        <div>
            <Bord />
            {/* 모바일에서 숨김 처리 */}
            <Calculator />

            {/* 모바일용 nav */}
            <div>
                <div>오늘의 내역</div>
                <div>통계 보기</div>
            </div>
        </div>
    );
}
