'use client';

import { useState, useEffect } from 'react';
import { fetchWebtoons } from '@/lib/api/webtoon/webtoon';
import WebtoonList from '@/components/common/WebtoonList/WebtoonList';
import { Button } from '@/components/ui/button'; // UI 버튼 추가
import { WebtoonDetailDto } from '@/lib/types/webtoon/WebtoonDetailDto';

interface WebtoonPageProps {
  searchQuery: string;
}

const WebtoonPage: React.FC<WebtoonPageProps> = ({ searchQuery }) => {
  const [webtoons, setWebtoons] = useState<WebtoonDetailDto[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1); // 전체 페이지 수

  useEffect(() => {
    if (searchQuery.trim() !== '') {
      fetchWebtoons(currentPage, 10, { webtoonName: searchQuery }).then(
        (data) => {
          if (data) {
            setWebtoons(data.content);
            setCurrentPage(data.currentPage); // 현재 페이지 업데이트
            setTotalPages(data.totalPages); // 전체 페이지 업데이트
          }
        }
      );
    }
  }, [searchQuery, currentPage]);

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-xl font-bold mb-4">웹툰 검색 결과</h1>
      {webtoons.length > 0 ? (
        <>
          <WebtoonList webtoons={webtoons} />

          {/* 페이지네이션 버튼 */}
          <div className="flex justify-between mt-4">
            <Button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
              disabled={currentPage === 0}
            >
              이전
            </Button>
            <span className="text-sm">
              {currentPage + 1} / {totalPages}
            </span>
            <Button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1))
              }
              disabled={currentPage >= totalPages - 1}
            >
              다음
            </Button>
          </div>
        </>
      ) : (
        <p>검색 결과가 없습니다.</p>
      )}
    </div>
  );
};

export default WebtoonPage;
