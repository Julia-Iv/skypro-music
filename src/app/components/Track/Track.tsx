'use client';
import Link from 'next/link';
import classNames from 'classnames';
import styles from './track.module.css';
import { Track as TrackType } from '@/app/sharedTypes/sharedTypes';
import { formatTime } from '@/utils/helper';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { setCurrentTrack } from '@/store/features/trackSlice';

interface TrackProps {
  track: TrackType;
}

export default function Track({ track }: TrackProps) {
  const dispatch = useAppDispatch();
  const { currentTrack, isPlay } = useAppSelector((state) => state.tracks);
  const isCurrentTrack = currentTrack?._id === track._id;

  const onClickTrack = () => {
    dispatch(setCurrentTrack(track));
  };
  return (
    <div onClick={onClickTrack} className={styles.playlist__item}>
      <div className={styles.playlist__track}>
        <div className={styles.track__title}>
          <div className={styles.track__titleImage}>
            {isCurrentTrack ? (
              <span
                className={classNames(styles.playingDot, {
                  [styles.playingDotActive]: isPlay,
                })}
              />
            ) : (
              <svg className={styles.track__titleSvg}>
                <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
              </svg>
            )}
          </div>
          <div className="track__title-text">
            <Link
              className={styles.track__titleLink}
              href=""
              onClick={(e) => e.preventDefault()}
            >
              {track.name} <span className={styles.track__titleSpan}></span>
            </Link>
          </div>
        </div>
        <div className={styles.track__author}>
          <Link
            className={styles.track__authorLink}
            href=""
            onClick={(e) => e.preventDefault()}
          >
            {track.author}
          </Link>
        </div>
        <div className={styles.track__album}>
          <Link
            className={styles.track__albumLink}
            href=""
            onClick={(e) => e.preventDefault()}
          >
            {track.album}{' '}
          </Link>
        </div>
        <div className={styles.track__time}>
          <svg className={styles.track__timeSvg}>
            <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
          </svg>
          <span className={styles.track__timeText}>
            {formatTime(track.duration_in_seconds)}
          </span>
        </div>
      </div>
    </div>
  );
}
