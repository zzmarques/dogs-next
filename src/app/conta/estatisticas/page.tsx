import { Metadata } from 'next';
import statsGet from '@/actions/stats-get';
import EstatisticasClient from './estatisticas-client';

export const metadata: Metadata = {
  title: 'Estatísticas | Minha Conta',
};

export default async function EstatisticasPage() {
  const { data } = await statsGet();

  if (!data) return null;

  return (
    <section>
      <EstatisticasClient data={data} />
    </section>
  );
}
