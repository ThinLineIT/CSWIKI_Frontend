import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import styles from '../../../../../styles/items/notes/noteDetail/detail_contents.module.css';
import {
  topicName,
  okBtnActive,
  isOnEditPage,
  isPageApproved,
  isModalActive,
  ModifyPageContent,
  pageDetailIssueId, // 이슈로 이동하기 위한 atom
  firstVisiblePageTitle,
  isModalActive,
} from '../../../../../store/atom';
import IssueCreateModal from '../../../modal/IssueCreateModal';

const MainContentsTopBar = (props) => {
  // 이슈로 이동을 위한 라우팅
  const router = useRouter();
  const issueId = useRecoilValue(pageDetailIssueId); // 이슈로 이동하기 위한 atom
  const moveToIssue = () => {
    router.push({
      pathname: '/issue',
      query: { issueId: issueId },
    });
  };

  const setPageCreateTitle = props.setPageCreateTitle;
  const onPageTitlehandler = (event) => {
    setPageCreateTitle(event.target.value);
  };

  const [slideImg, setSlideImg] = useState(false);
  const copyClipboard = () => {
    const tempWhat = document.createElement('input');
    const text = location.href;
    document.body.appendChild(tempWhat);
    tempWhat.value = text;
    tempWhat.select();
    document.execCommand('copy');
    document.body.removeChild(tempWhat);
    setSlideImg(true);
    setTimeout(fadeOutSlideImg, 1000);
  };
  const fadeOutSlideImg = () => {
    setSlideImg(false);
  };

  const setIsUserSubmit = useSetRecoilState(okBtnActive);
<<<<<<< HEAD
  const [modalActive, setModaActive] = useRecoilState(isModalActive);
=======

>>>>>>> f2dde89ef619fae577537704092a5b5e5a69830d
  const resetPageContentAndSendData = () => {
    setIsUserSubmit(true);
    setModaActive(true);
  };

  const modifyPage = useRecoilValue(ModifyPageContent);
  const isOnEditor = useRecoilValue(isOnEditPage);
  const isPageApprove = useRecoilValue(isPageApproved);
  const pageTitle = useRecoilValue(firstVisiblePageTitle);
  const topicTitle = useRecoilValue(topicName);

  return (
    <article className={styles.topBar}>
      <section className={`${styles.info_item} ${getStyles(isOnEditor)}`}>
        {modifyPage ? (
          <input
            type="text"
            className={styles.info_item_page}
            onChange={onPageTitlehandler}
            placeholder="TITLE"
          />
        ) : (
          <div className={styles.info_item_page}>{pageTitle}</div>
        )}
      </section>
      <section className={styles.icons}>
        {modifyPage ? (
          <div>
            <button
              className={styles.buttonOk}
              onClick={resetPageContentAndSendData}
            >
              확인
            </button>
          </div>
        ) : (
          <span className={styles.clipBoard}>
            <button className={styles.icons_share} onClick={copyClipboard} />
            {!isPageApprove && (
              <button onClick={moveToIssue} className={styles.icons_issue}>
                관련된 이슈 확인
              </button>
            )}
            <aside
              className={`${
                slideImg ? `${styles.slideActive}` : `${styles.slideHidden}`
              }`}
            />
          </span>
        )}
        {modalActive && <IssueCreateModal isCreatePage />}
      </section>
    </article>
  );
};

export default MainContentsTopBar;

function getStyles(status) {
  if (status) {
    return styles.info_item_edit;
  }
}
