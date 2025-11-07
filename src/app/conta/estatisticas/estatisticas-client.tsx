'use client';

import { StatsData } from '@/actions/stats-get';
import dynamic from 'next/dynamic';

const ContaEstatisticas = dynamic(
  () => import('@/components/conta/conta-estatisticas'),
  {
    loading: () => <p>Carregando...</p>,
    ssr: false,
  },
);

export default function EstatisticasClient({ data }: { data: StatsData[] }) {
  return <ContaEstatisticas data={data} />;
}
