import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios'

// import '../App.css';
import '../Modal.css'
import errorCode from '../errorCode.json'
import Kill from '../Api/Kill'

const customStyles = {
  content: {
    top: '0%',
    left: '0%',
    right: '0%',
    bottom: '0%',
    backgroundColor: "rgba(40, 44, 52, 0.75)",
  },
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
export default function NoticePageModal(props) {
  const [noticeModalIsOpen, setNoticeIsOpen] = useState(false);
  const [noticeChangeMonthModalIsOpen, setMonthModalIsOpen] = useState(false);
  const [userNum, setNum] = useState(0);

  async function openModal() {

    const { data: { notice, num, error } } = await axios.post('/start', {
      today: props.startDate
    })
    console.log(notice)
    if (notice) {
      setNum(num)
      openMonthModal() // Modal 2 open

    }
    else {
      if (error === 4 || error === 5) {
        alert(errorCode[error])
        Kill()
      }
      setNoticeIsOpen(true);
    }
  }

  function openMonthModal() {
    setMonthModalIsOpen(true);
  }

  async function closeModal() {
    setNoticeIsOpen(false);
    setMonthModalIsOpen(false);
    props.setIsOpen(false);
  }

  async function closeMonthModal() {
    setMonthModalIsOpen(false);
    setNoticeIsOpen(true);
  }

  // useEffect(() => {


  // }, [startDate])

  return (
    <div style={{
      display: "flex",
      justifyContent: "Center",
      alignItems: "center"
    }}>
      <button
       onClick={openModal}
       style={{
        width: "100px",
        height: "30px"
       }}
      >시작하기</button>
      <Modal
        isOpen={noticeModalIsOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        ariaHideApp={false}
        style={customStyles}
        // contentLabel="Example Modal"
        // className='Modal-main'
      >
        <div className='Modal-Main'>
          <h2>경로 식당 이용을 시작하겠습니다</h2>
          <h4>카드를 찍으시는 경우 번호 입력 바랍니다</h4>
          <h4>카드를 가져오시지 않은 경우, 이름을 입력해주세요</h4>
          <h4>작업을 취소하고 싶으면 취소 버튼을 눌러주세요</h4>
          <h4>정보를 저장할 경우 저장 버튼을 눌러주세요</h4>
          <h4>식당 운영을 마무리할 경우 종료 버튼을 누르거나 혹은 종료라고 입력바랍니다</h4>

          <div style={{
            display: "flex",
            justifyContent: "Center",
            alignItems: "center"
          }}>
            <button
            onClick={closeModal}
            style={{
              width: "100px",
              height: "30px"
            }}
            >창 닫기</button>
          </div>
        </div>
      </Modal>


      <Modal
        isOpen={noticeChangeMonthModalIsOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeMonthModal}
        ariaHideApp={false}
        style={customStyles}
        // contentLabel="Example Modal"
        // className='Modal-main'
      >
        <div className='Modal-Main'>
          <h2 style={{textAlign: 'center'}}>공지</h2>
          <h4>새 달이 시작했습니다. 명부를 초기화하였습니다.</h4>
          <h4>지난 달의 기록은 'data' 폴더에서 확인바랍니다.</h4>
          <h4>'user_list_new.csv'에서 회원 명단을 불러왔습니다.</h4>
          <h4>차트의 길이는 {userNum} 입니다.</h4>
          
          <div style={{
            display: "flex",
            justifyContent: "Center",
            alignItems: "center"
          }}>
            <button
            onClick={closeMonthModal}
            style={{
              width: "100px",
              height: "30px"
            }}
            >창 닫기</button>
          </div>
        </div>
      </Modal>

      
    </div>
  );
}