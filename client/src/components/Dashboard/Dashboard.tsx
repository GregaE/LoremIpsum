import { useDispatch } from 'react-redux';

import { Routes, Route, Outlet, useLocation } from 'react-router-dom';

import NavBar from '../NavBar/NavBar';
import Header from '../Header/Header';

import Home from '../Home/Home';
import CVBuilder from '../CVBuilder/CVBuilder';
import MyCVs from '../MyCVs/MyCVs';
import Profile from '../Profile/Profile';

import { AnimatePresence } from 'framer-motion';
import { toggleModal } from '../../store/actions/toggleModal';
import { useTypedSelector } from '../../utils/useTypeSelector';
import { useEffect } from 'react';

//TODO props type
export default function Dashboard() {
  const dispatch = useDispatch();

  const location = useLocation();
  const { flag } = useTypedSelector(state => state.toggleModal);

  /*
    As you log in here we display your name in HEADER and HOME component (get it from state)
    Should we get also my cvs here? as we could move directly to 'MyCVs'¿¿
    Or should we fetch them from MyCVs component with a beautiful loading placeholder¿¿
  */

  const closeModal = (e: any) => {
    while (e.target.id !== 'modal-content') {
      if (e.target.id === 'modal-content') return;
      if (e.target.parentNode.localName === 'body') {
        if (flag) dispatch(toggleModal(false, ''));
        return;
      }
      e.target = e.target.parentNode;
    }
  };

  return (
    <div
      className="flex w-screen h-screen bg-primary-bg"
      onClick={e => closeModal(e)}
    >
      <NavBar />
      <div className="flex flex-col w-5/6 h-full">
        <Header />
        <AnimatePresence exitBeforeEnter>
          <Routes location={location} key={location.key}>
            <Route path="/" element={<Home />} />
            <Route path="/cvbuilder" element={<CVBuilder />} />
            <Route path="/mycvs" element={<MyCVs />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </AnimatePresence>
      </div>
      <Outlet />
    </div>
  );
}
