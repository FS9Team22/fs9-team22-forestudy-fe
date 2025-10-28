import { useState } from 'react';
import Reaction from '@/components/Reaction/Reaction';
import { Toast } from '@/components/ui';
import { DeleteStudyModal } from '@/components/ui/Modal/DeleteStudyModal.jsx';

export default function DetailLayoutTop({ studyId }) {
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setShowSuccessToast(true);
    } catch (err) {
      console.error('클립보드 복사 실패:', err);
      setShowErrorToast(true);
    }
  };
  return (
    <>
      <div className="section-top-wrap">
        <div className="study-reaction">
          <Reaction studyId={studyId} />
        </div>
        <ul className="top-btn-list">
          <li>
            <button type="button" onClick={handleShare} className="top-btn">
              공유하기
            </button>
          </li>
          <span>|</span>
          <li>
            <button type="button" className="top-btn">
              수정하기
            </button>
          </li>
          <span>|</span>
          <li>
            <button
              type="button"
              className="top-btn"
              onClick={() => setIsDeleteModalOpen(true)}
            >
              삭제하기
            </button>
          </li>
        </ul>
      </div>
      {showSuccessToast && (
        <Toast
          message="주소가 복사되었습니다!"
          type="success"
          onClose={() => setShowSuccessToast(false)}
        />
      )}
      {showErrorToast && (
        <Toast
          message="주소 복사에 실패했습니다. 다시 시도해주세요."
          type="error"
          onClose={() => setShowErrorToast(false)}
        />
      )}
      {isDeleteModalOpen && (
        <DeleteStudyModal
          studyId={studyId}
          onClose={() => setIsDeleteModalOpen(false)}
        />
      )}
    </>
  );
}
