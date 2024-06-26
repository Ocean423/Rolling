import 'assets/styles/CardModal.scss';
import { useEffect, useState } from 'react';
import DeleteButton from 'components/DeleteButton';
import Badge from 'components/badge/Badge';
import PlusButton from 'components/PlusButton';
import classNames from 'classnames';
import FormatDate from 'utils/FormatDate';

import { MessagesAPI } from 'data/CallAPI';
import { useLocation, useParams } from 'react-router-dom';
import iconCheck from 'assets/images/ic_check.svg';
import useNavigator from 'hooks/useNavigator';
import getFonts from 'utils/getFonts';
import Sanitizer from 'utils/Sanitizer';
import Checkbox from 'components/checkbox/CheckBox';

function Card({
  type = 'normal',
  message = {},
  handleClick,
  checkedItems,

  handleSelectDelete,
  handleCheckboxClick,
}) {
  const location = useLocation();

  const isEditPage = location.pathname.includes('/edit');
  const isEditSelectPage = location.pathname.includes('/edit/select');

  const isTypeNormal = type === 'normal';

  const {
    id,
    sender,
    profileImageURL,
    relationship,
    font,
    content,
    createdAt,
  } = message;

  return (
    <div
      onClick={handleClick}
      className={classNames('container', 'card', type)}
    >
      {isTypeNormal ? (
        <>
          <div className='header card'>
            <div className='profile-container card'>
              <img
                className='profile-img'
                src={profileImageURL}
                alt='프로필 이미지'
              />
              <div className='profile-text-wrapper'>
                <p className='profile-name'>
                  From. <span>{sender}</span>
                </p>
                <Badge>{relationship}</Badge>
              </div>
            </div>
            <div className='card-button-wrapper'>
              {isEditPage && !isEditSelectPage && (
                <DeleteButton handleClick={() => handleSelectDelete(id)} />
              )}
              {isEditSelectPage && (
                <Checkbox
                  id={id}
                  isChecked={!!checkedItems[message.id]}
                  handleChange={handleCheckboxClick}
                />
              )}
            </div>
          </div>
          <div>
            <p
              className='card-letter card'
              dangerouslySetInnerHTML={{ __html: Sanitizer(content) }}
              style={{ fontFamily: getFonts(font) }}
            ></p>
          </div>
          <div>
            <p className='date'>{FormatDate(createdAt)}</p>
          </div>
        </>
      ) : (
        <div className='plus-wrapper'>
          <PlusButton />
        </div>
      )}
    </div>
  );
}

export default Card;
