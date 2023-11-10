import { useState } from 'react';
import '../App.css';
import reactLogo from '../assets/react.svg';
import viteLogo from '/vite.svg';
import './help.css';

function Help() {
    const title = '역3역 즐기기';
    const explain1 = '① 3×3 표에 제공되는 글자 9개를 조합하여 수도권 지하철명 3개를 입력하세요.'
    const explain2 = '② 각 라운드는 20초의 제한시간이 주어지며 입력한 내용이 정답이 아닌 경우 제한시간 5초가 감소합니다.'
    const explain3 = '③ 도달한 라운드가 높을수록, 같은 라운드일 시 소요된 시간이 적을수록 높은 순위에 랭크됩니다.'

    



    return (
        <div className="help-container">
            <div className="title">{title}</div>
            <div className="explanation">
                <p>{explain1}</p>
                <p>{explain2}</p>
                <p>{explain3}</p>
                <a href="/" className="home-button"></a>
            </div>
            
        </div>
    );
   
}

export default Help
