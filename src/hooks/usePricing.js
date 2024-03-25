import { useQuery } from '@tanstack/react-query';
import { getPricing } from '../services/apiPricing';

export function usePricing() {
  const {
    data: pricings,
    isLoading: gettingPricing,
    error,
  } = useQuery({
    queryFn: getPricing,
    queryKey: ['prices'],
  });

  return { pricings, gettingPricing, error };
}
