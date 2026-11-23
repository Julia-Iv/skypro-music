'use client';
import { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';
import styles from './filter.module.css';
import { Track } from '@/app/sharedTypes/sharedTypes';
import { getUniqueValueByKey } from '@/utils/helper';

interface FilterProps {
  tracks: Track[];
  selectedAuthors: string[];
  onSelectAuthor: (author: string) => void;
  selectedGenres: string[];
  onSelectGenre: (genre: string) => void;
  sortOrder: string;
  onSelectSort: (sort: string) => void;
}

type FilterType = 'author' | 'year' | 'genre' | null;

export default function Filter({
  tracks,
  selectedAuthors,
  onSelectAuthor,
  selectedGenres,
  onSelectGenre,
  sortOrder,
  onSelectSort,
}: FilterProps) {
  const [activeFilter, setActiveFilter] = useState<FilterType>(null);
  const filterRef = useRef<HTMLDivElement>(null);

  const defaultGenres = ['Рок', 'Хип-хоп', 'Поп-музыка', 'Техно', 'Инди'];

  const uniqueAuthors = getUniqueValueByKey(tracks, 'author');
  const uniqueGenres = Array.from(
    new Set([...defaultGenres, ...getUniqueValueByKey(tracks, 'genre')]),
  );
  const sortOptions = ['По умолчанию', 'Сначала новые', 'Сначала старые'];
  const handleFilterClick = (filter: FilterType) => {
    setActiveFilter((prev) => (prev === filter ? null : filter));
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node)
      ) {
        setActiveFilter(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={filterRef} className={styles.centerblock__filter}>
      <div className={styles.filter__title}>Искать по:</div>
      <div className={styles.filter__wrapper}>
        <div
          className={classNames(styles.filter__button, {
            [styles.active]: activeFilter === 'author',
          })}
          onClick={() => handleFilterClick('author')}
        >
          исполнителю
          {selectedAuthors.length > 0 && (
            <span className={styles.filter__badge}>
              {selectedAuthors.length}
            </span>
          )}
        </div>
        {activeFilter === 'author' && (
          <div className={styles.filter__popup}>
            <ul className={styles.filter__list}>
              {uniqueAuthors.map((author) => (
                <li
                  key={author}
                  onClick={() => onSelectAuthor(author)}
                  className={classNames(styles.filter__item, {
                    [styles.selected]: selectedAuthors.includes(author),
                  })}
                >
                  {author}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className={styles.filter__wrapper}>
        <div
          className={classNames(styles.filter__button, {
            [styles.active]:
              activeFilter === 'year' || sortOrder !== 'По умолчанию',
          })}
          onClick={() => handleFilterClick('year')}
        >
          году выпуска
        </div>
        {activeFilter === 'year' && (
          <div className={styles.filter__popup}>
            <ul className={styles.filter__list}>
              {sortOptions.map((option) => (
                <li
                  key={option}
                  onClick={() => onSelectSort(option)}
                  className={classNames(styles.filter__item, {
                    [styles.selected]: sortOrder === option,
                  })}
                >
                  {option}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className={styles.filter__wrapper}>
        <div
          className={classNames(styles.filter__button, {
            [styles.active]:
              activeFilter === 'genre' || selectedGenres.length > 0,
          })}
          onClick={() => handleFilterClick('genre')}
        >
          жанру
          {selectedGenres.length > 0 && (
            <span className={styles.filter__badge}>
              {selectedGenres.length}
            </span>
          )}
        </div>
        {activeFilter === 'genre' && (
          <div className={styles.filter__popup}>
            <ul className={styles.filter__list}>
              {uniqueGenres.map((genre) => (
                <li
                  key={genre}
                  onClick={() => onSelectGenre(genre)}
                  className={styles.filter__item}
                >
                  {genre}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
