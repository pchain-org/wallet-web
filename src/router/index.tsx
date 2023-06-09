import { ReactElement, useEffect, useState } from 'react';
import { Routes, Route } from "react-router-dom";
import { useWeb3, useSwitchChain, useCheckChain, useCheckWallet } from '../utils/hooks';
import * as View from '../views/view';
import './index.scss'
import { useContext } from 'react';
import { PWallet } from '../App';
import { Button } from 'antd';
import BoxModal from '../components/modal';

const RouterConfig = (): ReactElement => {
    const { monitorAccount, monitorChain } = useWeb3();
    const { switchC } = useSwitchChain();
    const { checkWallet } = useCheckWallet();
    const { check } = useCheckChain();
    const { state } = useContext(PWallet);
    const [isWallet, setIsWallet] = useState<number>(0);
    useEffect(() => {
        setTimeout(() => {
            checkWallet();
        }, 200)
        return () => {
            checkWallet()
        }
    }, []);
    useEffect(() => {
        if (state.is_wallet === 1) {
            check();
            monitorAccount();
            monitorChain();
        } else {
            setIsWallet(1)
        };
        return () => {
            check();
            monitorAccount();
            monitorChain();
        }
    }, [state.is_wallet])
    return (
        <>
            <Routes>
                <Route path='/' element={<View.IndexView />}>
                    <Route index element={<View.BridgeView />}></Route>
                    <Route path='/stake' element={<View.StakeView />}></Route>
                    <Route path='/l2' element={<View.L2View />}>
                        {/* <Route index element={<View.HistoryView/>}></Route>
                        <Route path='/l2/create' element={<View.CreatView/>}></Route>
                        <Route path='/l2/edit' element={<View.EditView/>}></Route> */}
                    </Route>
                </Route>
            </Routes>
            {/* Chain cutting prompt */}
            {state.check_chain === 0 && <div className='switch-chain'>
                <div className='info-inner'>
                    <p>Please switch to Plian to continue using the service.</p>
                    <Button type='primary' onClick={() => {
                        switchC();
                    }}>Confirm</Button>
                </div>
            </div>}
            {/* The browser does not have a wallet installed */}
            <BoxModal title="Wallet not installed" onClose={(val: number) => {
                setIsWallet(val)
            }} type='error' icon visible={isWallet} text='Your browser has not installed the wallet, please refresh and try again after installation.' install></BoxModal>
        </>

    )
};

export default RouterConfig;