'use client';

import { useState, useMemo } from 'react';
import styles from './centerblock.module.css';
import classNames from 'classnames';
import Search from '../Search/Search';
import Filter from '../Filter/Filter';
import Track from '../Track/Track';
import { data } from '@/data';

export default function CenterBlock() {
  const [selectedAuthors, setSelectedAuthors] = useState<string[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState<string>('По умолчанию');

  const handleSelectAuthor = (author: string) => {
    setSelectedAuthors((prev) =>
      prev.includes(author)
        ? prev.filter((item) => item !== author)
        : [...prev, author],
    );
  };

  const handleSelectGenre = (genre: string) => {
    setSelectedGenres((prev) =>
      prev.includes(genre)
        ? prev.filter((item) => item !== genre)
        : [...prev, genre],
    );
  };
  const filteredTracks = useMemo(() => {
    let result = [...data];

    if (selectedAuthors.length > 0) {
      result = result.filter((track) => selectedAuthors.includes(track.author));
    }

    if (selectedGenres.length > 0) {
      result = result.filter((track) =>
        track.genre.some((g) => selectedGenres.includes(g)),
      );
    }

    if (sortOrder === 'Сначала новые') {
      result.sort(
        (a, b) =>
          new Date(b.release_date).getTime() -
          new Date(a.release_date).getTime(),
      );
    } else if (sortOrder === 'Сначала старые') {
      result.sort(
        (a, b) =>
          new Date(a.release_date).getTime() -
          new Date(b.release_date).getTime(),
      );
    }

    return result;
  }, [selectedAuthors, selectedGenres, sortOrder]);

  return (
    <div className={styles.centerblock}>
      <Search />
      <h2 className={styles.centerblock__h2}>Треки</h2>
      <Filter
        tracks={data}
        selectedAuthors={selectedAuthors}
        onSelectAuthor={handleSelectAuthor}
        selectedGenres={selectedGenres}
        onSelectGenre={handleSelectGenre}
        sortOrder={sortOrder}
        onSelectSort={setSortOrder}
      />
      <div className={styles.centerblock__content}>
        <div className={styles.content__title}>
          <div className={classNames(styles.playlistTitle__col, styles.col01)}>
            Трек
          </div>
          <div className={classNames(styles.playlistTitle__col, styles.col02)}>
            Исполнитель
          </div>
          <div className={classNames(styles.playlistTitle__col, styles.col03)}>
            Альбом
          </div>
          <div className={classNames(styles.playlistTitle__col, styles.col04)}>
            <svg className={styles.playlistTitle__svg}>
              <use xlinkHref="/img/icon/sprite.svg#icon-watch"></use>
            </svg>
          </div>
        </div>
        <div className={styles.content__playlist}>
          {filteredTracks.map((track) => (
            <Track key={track._id} track={track} />
          ))}
        </div>
      </div>
    </div>
  );
}
