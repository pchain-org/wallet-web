import { ReactElement, useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import { useWeb3, useSwitchChain, useCheckChain } from '../utils/hooks';
import * as View from '../views/view';
import './index.scss'
import { useContext } from 'react';
import { PWallet } from '../App';
import { Button } from 'antd';

const RouterConfig = (): ReactElement => {
    const { monitorAccount, monitorChain } = useWeb3();
    const { switchC } = useSwitchChain();
    const { check } = useCheckChain();
    const { state } = useContext(PWallet);
    useEffect(() => {
        check();
        monitorAccount();
        monitorChain();
        return () => {
            check();
            monitorAccount();
            monitorChain();
        }
    }, [])
    return (
        <>
            <Routes>
                <Route path='/' element={<View.IndexView />}>
                    <Route index element={<View.BridgeView />}></Route>
                    <Route path='/stake' element={<View.StakeView />}></Route>
                    <Route path='/l2' element={<View.L2View/>}>
                        {/* <Route index element={<View.HistoryView/>}></Route>
                        <Route path='/l2/create' element={<View.CreatView/>}></Route>
                        <Route path='/l2/edit' element={<View.EditView/>}></Route> */}
                    </Route>
                </Route>
            </Routes>
            {/* 切链提示 */}
            {state.check_chain === 0 && <div className='switch-chain'>
                <div className='info-inner'>
                    <p>Please switch to Plian to continue using the service.</p>
                    <Button type='primary' onClick={() => {
                        switchC();
                    }}>Confirm</Button>
                </div>
            </div>}
        </>

    )
};

export default RouterConfig;